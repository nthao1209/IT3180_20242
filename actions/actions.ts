// D:/NMCNPM/Project2/thelibrary/actions.ts
'use server'
import { prisma } from '@/lib/prisma' 
import { Prisma } from '@prisma/client';
import { revalidatePath } from "next/cache"
import bcrypt from 'bcryptjs'
import { auth} from "@/auth" 
import { addDays, addMonths, differenceInCalendarDays } from "date-fns"
import { z } from "zod"
import { stripe } from "@/lib/stripe" 
import { formatAmountForStripe } from "@/lib/utils" 
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import EPub from 'epub2'; 
import fs from 'fs/promises'; 
import path from 'path'; 


export type State = {
    message?: string | null
}



////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////
export async function addCategory(name: string, path: string) {
    try {
        const category = await prisma.book_categories.create({ // Đúng tên model
            data: {
                category_name: name
            }
        });
        revalidatePath(path);
        return category;
    } catch(error) {
        console.error("Error adding category:", error);
        throw error;
    }
}

export async function updateCategory(id: number, name: string, path: string) {
    if (!id) throw new Error("Missing id for category update");
    try {
        await prisma.book_categories.update({ 
            where: { category_id: id },
            data: { category_name: name }
        });
        revalidatePath(path);
    } catch(error) {
        console.error("Error updating category:", error);
        throw error;
    }
}

export async function deleteCategory(id: number, path: string) {
    try {
        await prisma.book_categories.delete({ 
            where: { category_id: id }
        });
        revalidatePath(path);
    } catch(error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}

export async function getCategories(offset: number, limit: number) {
    try {
        let categories;
        let total;
        
        if (limit === -1) { // Lấy tất cả
            categories = await prisma.book_categories.findMany(); 
            total = categories.length;
        } else {
            [categories, total] = await prisma.$transaction([
                prisma.book_categories.findMany({ skip: offset, take: limit}), 
                prisma.book_categories.count() 
            ]);
        }
        return { data: categories, total: total};
    } catch(error) {
        console.error("Error getting categories:", error);
        throw error;
    }
}

////////////////////////////////////////////////////////////////////////////////
//              Books
////////////////////////////////////////////////////////////////////////////////
export interface BookSearchResult {
  book_id: number;
  isbn: string;
  name: string;
  author: string | null;
  description: string | null;
  published_date: number;
  cover_image: string | null;
  file_path: string | null;
  state: boolean;
  price: number; 
  created_at: string; 
  totalPages: number | null;
  book_photos: { url: string }[];
}

export interface PaginatedBookSearchResult {
  books: BookSearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}

const SEARCH_ITEMS_PER_PAGE = 20; 


export async function searchBooks(
    query: string,
    criteria: 'name' | 'author' | 'description' | 'all',
    page: number = 1 // Thêm tham số page, mặc định là 1
): Promise<PaginatedBookSearchResult> { // Cập nhật kiểu trả về
    if (!query || query.trim() === '') {
        console.log("[searchBooks] Query is empty, returning empty paginated result.");
        return { books: [], totalResults: 0, totalPages: 0, currentPage: 1 };
    }

    const searchQuery = query.trim();
    let whereClause: Prisma.booksWhereInput = {};

    if (criteria === 'name') {
        whereClause = { name: { contains: searchQuery } };
    } else if (criteria === 'author') {
        whereClause = { author: { contains: searchQuery } };
    } else if (criteria === 'description') {
        whereClause = { description: { contains: searchQuery } };
    } else if (criteria === 'all') {
        whereClause = {
            OR: [
                { name: { contains: searchQuery } },
                { author: { contains: searchQuery } },
                { description: { contains: searchQuery } },
            ],
        };
    } else {
        console.warn(`[searchBooks] Invalid search criteria received: ${criteria}`);
        return { books: [], totalResults: 0, totalPages: 0, currentPage: page };
    }

    console.log(`[searchBooks] Searching for: "${searchQuery}", Criteria: "${criteria}", Page: ${page}, WhereClause:`, JSON.stringify(whereClause));

    try {
        const skipAmount = (page - 1) * SEARCH_ITEMS_PER_PAGE;

        const [foundBooksFromDb, totalResults] = await prisma.$transaction([
            prisma.books.findMany({
                where: whereClause,
                include: {
                    book_photos: {
                        select: { url: true },
                        take: 1,
                    },
                },
                skip: skipAmount,
                take: SEARCH_ITEMS_PER_PAGE,
                orderBy: { 
                    name: 'asc' 
                }
            }),
            prisma.books.count({ // Đếm tổng số kết quả khớp với whereClause
                where: whereClause,
            }),
        ]);
        
        console.log(`[searchBooks] Found ${foundBooksFromDb.length} books for page ${page}, Total results: ${totalResults}.`);

        const serializableBooks = foundBooksFromDb.map(book => {
            const { price, created_at, totalPages, ...restOfBook } = book;
            return {
                ...restOfBook,
                price: price.toNumber(),
                created_at: created_at.toISOString(),
                totalPages: totalPages === null ? null : Number(totalPages),
                book_photos: book.book_photos || [],
            };
        });
        
        return {
            books: serializableBooks as BookSearchResult[],
            totalResults,
            totalPages: Math.ceil(totalResults / SEARCH_ITEMS_PER_PAGE),
            currentPage: page,
        };

    } catch (error) {
        console.error("[searchBooks] Error during paginated book search:", error);
        return { books: [], totalResults: 0, totalPages: 0, currentPage: page };
    }
}

export async function addBook({
    name,
    isbn,
    category, 
    path,
    photos,
    publish_year, 
    author,
    description, 
    price,       
    state       
}: {
    name: string;
    isbn: string;
    category: number[];
    path: string;
    photos: string[];
    publish_year: number;
    author: string;
    description?: string; 
    price: number; 
    state?: boolean; 
}) {
    try {
        await prisma.$transaction(async t => {
            const book = await t.books.create({ 
                data: {
                    name: name,
                    isbn: isbn,
                    published_date: publish_year, 
                    author: author,
                    description: description,
                    price: price, 
                    state: state === undefined ? false : state, 
                    
                }
            });

            if (category && category.length > 0) {
                const data = category.map(cat_id => ({ // đổi tên biến cho rõ
                    book_id: book.book_id,
                    category_id: cat_id
                }));
                await t.book_category_links.createMany({ data }); 
            }

            if (photos && photos.length > 0) {
                const data = photos.map(photo_url => ({ 
                    book_id: book.book_id,
                    url: photo_url
                }));
                await t.book_photos.createMany({ data }); 
            }
            revalidatePath(path);
        });
    } catch(error) {
        console.error("Error adding book:", error);
        throw error;
    }
}

export async function updateBook({
    id,
    name,
    isbn,
    category,
    path,
    publish_year,
    author,
    description,
    price,
    state
}: {
    id: number;
    name?: string; 
    isbn?: string;
    category?: number[];
    path: string;
    publish_year?: number;
    author?: string;
    description?: string;
    price?: number;
    state?: boolean;
}) {
    try {
        await prisma.$transaction(async t => {
            await t.books.update({ 
                where: { book_id: id },
                data: {
                    name: name,
                    isbn: isbn,
                    published_date: publish_year,
                    author: author,
                    description: description,
                    price: price,
                    state: state,
                    
                }
            });


            if (category !== undefined) { // Chỉ cập nhật nếu category được truyền vào
                await t.book_category_links.deleteMany({ 
                    where: { book_id: id }
                });
                if (category.length > 0) {
                    const data = category.map(cat_id => ({
                        book_id: id, 
                        category_id: cat_id
                    }));
                    await t.book_category_links.createMany({ data }); 
                }
            }
            revalidatePath(path);
        });
    } catch(error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

export async function deleteBook(book_id: number, path: string) {
    try {
        await prisma.books.delete({ 
            where: { book_id: book_id }
        });
        revalidatePath(path);
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}


////////////////////////////////////////////////////////////////////////////////
//              Users
////////////////////////////////////////////////////////////////////////////////
export async function addUser({ // Sử dụng destructuring cho tham số object
    name,
    email,
    role,
    username, 
    password, 
    path
}: {
    name?: string;
    email: string;
    role: string;
    username: string;
    password?: string; // Password  được hash từ một giá trị mặc định
    path: string;
}) {
    try {
        // Nếu password không được cung cấp, hash một password mặc định
        const finalPassword = password || 'defaultPassword123'; 
        const hashPassword = await bcrypt.hash(finalPassword, 10);

        const newUser = await prisma.users.create({ // Đúng tên model
            data: {
                name: name,
                email: email,
                username: username, 
                role: role,
                password: hashPassword, // Luôn lưu password đã hash

            }
        });
        revalidatePath(path);
        return newUser;
    } catch(error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export async function updateUser({ // Sử dụng destructuring
    user_id,
    name,
    email,   
    role,
    username,
    path
}: {
    user_id: number;
    name?: string;
    email?: string;
    role?: string;
    username?: string;
    path?: string; 
}) {
    if (!user_id) return { message: 'Missing user_id is required' };
    try {
        await prisma.users.update({ // Đúng tên model
            where: { user_id: user_id },
            data: {
                name: name,
                email: email,
                role: role,
                username: username,
               
            }
        });
        if (path) revalidatePath(path);
        return { message: 'user updated' };
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function deleteUser(id: number, path: string) {
    try {
        await prisma.users.delete({ 
            where: { user_id: id }
        });
        revalidatePath(path);
        return { message: "User deleted" };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

const passwordFormSchema = z.object({
    new_password: z.string().min(8, { message: "Mật khẩu mới phải có ít nhất 8 ký tự" }) 
});

export async function updateProfile(prevState: State, formData: FormData): Promise<State> { 
    const new_password = formData.get('new_password') as string;
    const old_password = formData.get('old_password') as string;

    const session = await auth();
    if (!session?.user?.user_id || !session?.user?.email) { 
        return { message: "Bạn cần đăng nhập để cập nhật hồ sơ." };
    }

    const userIdFromSession = session.user.user_id as number; // Ép kiểu nếu chắc chắn là number

    const user = await prisma.users.findUnique({ 
        where: {
            user_id: userIdFromSession,
            email: session.user.email 
        }
    });

    if (!user) {
        return { message: 'Người dùng không hợp lệ.' };
    }

    if (new_password) {
        if (!old_password) { // Cần mật khẩu cũ để đổi mật khẩu mới
             return { message: 'Vui lòng nhập mật khẩu cũ.'};
        }

        const passwordValidate = passwordFormSchema.safeParse({
            new_password: new_password
        });

        if (!passwordValidate.success) {
            return { message: passwordValidate.error.errors.map(e => e.message).join(', ') };
        }

        const password_match = await bcrypt.compare(old_password, user.password);
        if (!password_match) {
            return { message: 'Mật khẩu cũ không đúng.' };
        }

        const new_hash_password = bcrypt.hashSync(new_password, 10);
        await prisma.users.update({ 
            where: { user_id: userIdFromSession },
            data: {
                password: new_hash_password,
            }
        });

       
        return { message: 'Mật khẩu đã được cập nhật thành công.' };
    }
    
    return { message: 'Hồ sơ đã được cập nhật (không có thay đổi mật khẩu).' };
}





////////////////////////////////////////////////////////////////////////////////
//              Photos
////////////////////////////////////////////////////////////////////////////////
export async function addPhoto(table: string, entity_id: number, url: string, path: string) {
    try {
        let newPhoto;
        if (table === 'book') {
            newPhoto = await prisma.book_photos.create({ 
                data: {
                    book_id: entity_id,
                    url: url
                }
            });
        } else if (table === 'activity') {
            
            console.warn("Model 'activity_photos' not found in schema. Cannot add photo for activity.");
            return undefined; 
        } else {
            throw new Error(`Unsupported table type for adding photo: ${table}`);
        }
        revalidatePath(path);        
        return newPhoto ? { photo_id: newPhoto.photo_id, url: newPhoto.url } : undefined;
    } catch(error) {
        console.error("Error adding photo:", error);
        throw error;
    }
}

export async function deletePhoto(table: string, id: number, path: string) {
    try {
        if (table === 'book') {
            await prisma.book_photos.delete({ 
                where: { photo_id: id }
            });
        } else if (table === 'activity') {
            console.warn("Model 'activity_photos' not found in schema. Cannot delete photo for activity.");
        } else {
            throw new Error(`Unsupported table type for deleting photo: ${table}`);
        }
        revalidatePath(path);
        return { message: "Photo deleted successfully (if applicable)" };
    } catch(error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
}

////////////////////////////////////////////////////////////////////////////////
//              Rating
////////////////////////////////////////////////////////////////////////////////
export async function addRating(book_id: number, prevState: State, formData: FormData): Promise<State> { // Thêm kiểu trả về
    const session = await auth();
    if (!session?.user?.user_id) { // Kiểm tra session và user_id
        return { message: "Bạn cần đăng nhập để đánh giá." };
    }

    const ratingValue = +(formData.get('rating') || 0); // Chuyển sang number, default là 0 nếu null/undefined
    const reviewText = formData.get('comment')?.toString();

    if (ratingValue < 1 || ratingValue > 5) { // Giả sử rating từ 1-5
        return { message: "Vui lòng chọn số sao đánh giá hợp lệ." };
    }
    
    // Giả sử session.user.user_id đã là number.
    const userIdFromSession = session.user.user_id as number;

    try {
        await prisma.ratings.create({ 
            data: {
                book_id: book_id,
                user_id: userIdFromSession,
                rating: ratingValue,
                review: reviewText
            }
        });
        revalidatePath(`/book/${book_id}`); 
        return { message: "Cảm ơn bạn đã đánh giá!" };
    } catch (error) {
        console.error("Error adding rating:", error);
        if ((error as any).code === 'P2002') { // Lỗi unique constraint, ví dụ user đã rate sách này
            return { message: "Bạn đã đánh giá cuốn sách này rồi." };
        }
        return { message: "Đã có lỗi xảy ra khi gửi đánh giá." };
    }
}

/////////////////////////////////////////////////////
// --- Types cho tính năng đọc sách ---
export interface ReadingSessionDataForClient {
  session_id: string;
  user_id: number;
  book_id: number;
  last_location: string | null;
  last_read_timestamp: Date;
  book_file_path: string | null; 
  book_name?: string | null; // Thêm tên sách để hiển thị
}


// --- Server Actions cho ReaderController ---

/**
 * Tải thông tin sách và session đọc cho người dùng.
 * Nếu chưa có session, tạo một session mới.
 * @param bookId ID của sách
 * @returns ReadingSessionData hoặc lỗi
 */

export async function loadBookForReading(bookId: number): Promise<{ data?: ReadingSessionDataForClient; error?: string }> {
  const session = await auth();
  if (!session?.user?.user_id) {
    return { error: 'User not authenticated. Please sign in to read.' };
  }
  const userId = session.user.user_id as number;

  try {
    const book = await prisma.books.findUnique({
      where: { book_id: bookId },
      select: { 
        name: true, 
        file_path: true, 
        state: true 
      },
    });

    if (!book) {
      return { error: 'Book not found.' };
    }

    if (!book.state) { 
      return { error: 'You do not have permission to read this book. It may require purchase.' };
    }

    if (!book.file_path) {
      return { error: 'Book file (digital copy) is not available for reading.' };
    }

    // Logic tìm hoặc tạo reading session giữ nguyên
    let readingSession = await prisma.reading_sessions.findUnique({
      where: { user_id_book_id: { user_id: userId, book_id: bookId } },
    });

    if (!readingSession) {
      readingSession = await prisma.reading_sessions.create({
        data: {
          user_id: userId,
          book_id: bookId,
          last_location: null,
        },
      });
    }

    return {
      data: {
        session_id: readingSession.session_id,
        user_id: readingSession.user_id,
        book_id: readingSession.book_id,
        last_location: readingSession.last_location,
        last_read_timestamp: readingSession.last_read_timestamp,
        book_file_path: book.file_path,
        book_name: book.name,
      },
    };
  } catch (error) {
    console.error('Error loading book for reading:', error);
    return { error: 'Failed to load book for reading due to a server error.' };
  }
}

/**
 * Lấy nội dung của một trang sách cụ thể.
 * Đây là phần phức tạp nhất, cần thư viện xử lý EPUB.
 * Tạm thời, chúng ta sẽ giả lập việc lấy nội dung.
 * @param bookId ID của sách
 * @param pageNumber Số trang cần lấy
 * @param bookFilePath Đường dẫn đến file sách (EPUB)
 * @param bookTotalPages Tổng số trang của sách
 * @returns PageData hoặc lỗi
 */


/**
 * Lưu tiến trình đọc (trang hiện tại) của người dùng.
 * @param bookId ID của sách
 * @param currentPage Trang hiện tại người dùng đang đọc
 * @returns Object chứa success hoặc error message
 */




export async function saveReadingProgress(
  bookId: number,
  currentLocation: string // Nhận CFI string
): Promise<{ success?: string; error?: string }> {
  const session = await auth();
  if (!session?.user?.user_id) return { error: 'User not authenticated.' };
  const userId = session.user.user_id as number;

  if (!currentLocation || typeof currentLocation !== 'string') { // Kiểm tra currentLocation
    return { error: 'Invalid reading location (CFI) provided.' };
  }

  try {
    await prisma.reading_sessions.update({
      where: { user_id_book_id: { user_id: userId, book_id: bookId } },
      data: { last_location: currentLocation }, // Lưu CFI vào last_location
    });
    return { success: 'Reading progress saved.' };
  } catch (error) {
    console.error('Error saving reading progress:', error);
    if ((error as any).code === 'P2025') { // Record to update not found
        // Thử tạo session nếu chưa có (mặc dù loadBookForReading nên làm điều này)
        try {
            await prisma.reading_sessions.create({
                data: {
                    user_id: userId,
                    book_id: bookId,
                    last_location: currentLocation,
                }
            });
            return { success: 'Reading progress saved (new session created).' };
        } catch (createError) {
            console.error('Error creating new session while saving progress:', createError);
            return { error: 'Failed to save reading progress and could not create a new session.' };
        }
    }
    return { error: 'Failed to save reading progress.' };
  }
}

export async function handleSearchBarSearch(formData: FormData) {
  const search_by_value = formData.get('search_by') as string; // Giá trị từ Select (all, name, author, description)
  const search_query = formData.get('search') as string;

  console.log('[Search Bar Action] Criteria (search_by):', search_by_value);
  console.log('[Search Bar Action] Query (search):', search_query);

  if (search_query && search_query.trim() !== '' && search_by_value) {
    const params = new URLSearchParams();
    params.set('q', search_query.trim());      // 'q' cho query (từ khóa tìm kiếm)
    params.set('crit', search_by_value); // 'crit' cho criteria (tiêu chí tìm kiếm)

    redirect(`/search?${params.toString()}`);
  } else {
    // Nếu không có query hoặc criteria, có thể redirect về trang search trống
    redirect('/search'); 
  }
}
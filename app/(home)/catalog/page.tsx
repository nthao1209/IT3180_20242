// app/(home)/catalog/page.tsx
import { prisma } from '@/lib/prisma';
import BookCard from '@/components/bookcard'; // IMPORT BOOKCARD MỚI
import PaginationControls from '@/components/PaginationControls'; // IMPORT PaginationControls
// Link và Image không cần import trực tiếp ở đây nữa nếu BookCard đã xử lý chúng

// Định nghĩa kiểu cho sách trả về từ Prisma (nếu chưa có ở một nơi dùng chung)
// Hoặc import từ một file types.ts nếu bạn có
interface CatalogBook {
  book_id: number;
  name: string | null;
  author: string | null;
  book_photos: { url: string }[];
  // Thêm các trường khác nếu getCatalogBooks trả về
}

// Trong app/(home)/catalog/page.tsx hoặc actions/actions.ts

// Định nghĩa lại kiểu trả về cho hàm lấy sách catalog
interface PaginatedCatalogResult {
  books: CatalogBook[]; // CatalogBook là kiểu bạn đã định nghĩa cho sách
  totalBooks: number;
  currentPage: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 2; // Số lượng sách trên mỗi trang, bạn có thể thay đổi

export async function getPaginatedCatalogBooks(
  page: number = 1 // Mặc định là trang 1
): Promise<PaginatedCatalogResult> {
  try {
    const skipAmount = (page - 1) * ITEMS_PER_PAGE;

    const [books, totalBooks] = await prisma.$transaction([
      prisma.books.findMany({
        select: {
          book_id: true,
          name: true,
          author: true,
          book_photos: {
            select: { url: true },
            take: 1,
          },
        },
        orderBy: {
          name: 'asc',
        },
        skip: skipAmount,
        take: ITEMS_PER_PAGE,
      }),
      prisma.books.count(), // Đếm tổng số sách
    ]);

    return {
      books: books as CatalogBook[],
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error("Failed to fetch paginated catalog books:", error);
    return { books: [], totalBooks: 0, currentPage: 1, totalPages: 0 };
  }
}



// async function getCatalogBooks(): Promise<CatalogBook[]> { // Sử dụng kiểu CatalogBook
//   try {
//     const books = await prisma.books.findMany({
//       select: { // Chỉ chọn các trường cần thiết cho BookCard và logic trang
//         book_id: true,
//         name: true,
//         author: true,
//         book_photos: {
//           select: { url: true },
//           take: 1,
//         },
//         // Thêm các trường khác nếu cần
//       },
//       orderBy: {
//         name: 'asc',
//       },
//     });
//     return books as CatalogBook[]; // Ép kiểu nếu cần, hoặc Prisma tự suy luận đúng
//   } catch (error) {
//     console.error("Failed to fetch catalog books:", error);
//     return [];
//   }
// }

// COMPONENT TRANG CATALOG
export default async function CatalogPage({
  searchParams, // Next.js tự động truyền searchParams vào Page component
}: {
  searchParams?: {
    page?: string; // 'page' sẽ là query parameter từ URL, ví dụ: /catalog?page=2
    // Thêm các params khác cho filter, sort sau này nếu cần
  };
}) {
  // Lấy số trang hiện tại từ URL query parameter 'page'
  // Nếu không có, hoặc không phải là số, mặc định là trang 1
  const currentPage = Number(searchParams?.page) || 1;

  // Gọi hàm lấy sách đã phân trang
  const { books, totalBooks, totalPages } = await getPaginatedCatalogBooks(currentPage);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        Book Catalog
      </h1>
      {/* Hiển thị thông báo nếu không có sách */}
      {totalBooks === 0 ? ( // Kiểm tra tổng số sách
        (<p className="text-center text-gray-500">Hiện tại chưa có sách nào trong danh mục.
                  </p>)
      ) : books.length === 0 && currentPage > 1 ? ( // Nếu trang hiện tại không có sách (ví dụ: người dùng nhập URL page quá lớn)
         (<p className="text-center text-gray-500">Không tìm thấy sách ở trang này. Vui lòng quay lại trang trước.
                    </p>)
      ) : (
        // Hiển thị danh sách sách nếu có
        (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>)
      )}
      {/* HIỂN THỊ PAGINATION CONTROLS NẾU CÓ NHIỀU HƠN 1 TRANG */}
      {totalPages > 1 && ( // Chỉ hiển thị nếu có nhiều hơn 1 trang
         (<PaginationControls
             currentPage={currentPage}
             totalPages={totalPages}
         />)
      )}
    </div>
  );
}
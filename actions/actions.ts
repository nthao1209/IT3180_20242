/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
'use server'


import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { Prisma, PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache"
import bcrypt from 'bcryptjs'
import { auth, signIn, signOut } from "@/auth"
//import { addDays, addMonths, differenceInCalendarDays } from "date-fns"
import { z } from "zod"
//import { stripe } from "@/lib/stripe"
//import { formatAmountForStripe } from "@/lib/utils"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Gender } from '@prisma/client';

// Add type assertion to allow any type
// @ts-ignore

// Define the Book type to match your schema
type Book = {
    book_id: number;
    name: string;
    isbn: string;
    author_id: number;
    published_date: number;
    no_of_copies: number;
    is_active: boolean;
    publish_year: number;
    author_name: string;
    book_photos: { photo_id: number; url: string; }[];
    book_category_links: { category_id: number; }[];
};

////////////////////////////////////////////////////////////////////////////////
//              Author
////////////////////////////////////////////////////////////////////////////////
// async function checkAuthorRole(bookId: number) {
//     const session = await auth();
//     if (!session || session.user.role !== "author") {
//       throw new Error("Unauthorized");
//     }
//     const book = await prisma.books.findUnique({
//       where: { book_id: bookId },
//       select: { author_id: true },
//     });
//     if (!book || book.author_id !== session.user.user_id) {
//       throw new Error("Unauthorized");
//     }
//   }
export async function requestAddBook({
    id,
    name,
    isbn,
    category,
    path,
    published_date,
    price,
    file_path,
    author_name
  }: {
    id: number,
    name: string
    isbn: string
    category: number[]
    path: string,
    photos: string[],
    published_date: number,
    price: number,
    file_path: string,
    author_name: string
  }) {
   
    try {
        const session = await auth();
        await prisma.book_requests.create({
            data: {
            book_id: id,
             author_id: parseInt(session?.user.id),
            action: "add",
            details: JSON.stringify({
                name,
                isbn,
                category,
                file_path,
                price,
                published_date,
                author_name
            }),
            status: "pending",
            },
        });
        revalidatePath(path);
        return { message: "Update book request submitted" };
    } catch (error) {
        throw error
    }
    
  
    
  }
 
export async function requestUpdateBook({
    id,
    name,
    isbn,
    category,
    path,
    published_date,
    price,
    file_path,
    author_name
  }: {
    id: number,
    name: string
    isbn: string
    category: number[]
    path: string,
    photos: string[],
    published_date: number,
    price: number,
    file_path: string,
    author_name: string
  }) {
    try {
        const session = await auth();
        await prisma.book_requests.deleteMany({
            where: {
                book_id: id,
                action: 'update',
            }
        });
        await prisma.book_requests.create({
            data: {
            book_id: id,
             author_id: parseInt(session?.user.id),
           
            action: "update",
            details: JSON.stringify({
                name,
                isbn,
                category,
                file_path,
                price,
                published_date,
                author_name
            }),
            status: "pending",
            },
        });
        await prisma.books.update({
            where: {
                book_id: id
            },
            data: {
              state: false
            }
        });
       
        revalidatePath(path);
        return { message: "Update book request submitted" };
    } catch (error) {
        throw error
    }
    

  }
  
  export async function requestDeleteBook(book_id: number, path: string) {
    const session = await auth();
  
    const existingRequest = await prisma.book_requests.findFirst({
      where: {
        book_id,
        action: "delete",
        status: "pending",
      },
    });
  
    if (existingRequest) {
      throw new Error("A delete request is already pending for this book");
    }
    const book = await prisma.books.findFirst({
      where: {
        book_id: book_id
      }
    })

    await prisma.book_requests.create({
      data: {
        book_id,
        author_id:  parseInt(session?.user.id),
        action: "delete",
        details: "{}",
        status: "pending",
      },
    });
    await prisma.books.update({
        where: {
            book_id: book_id
        },
        data: {
          state: false
        }
    })
  
    revalidatePath(path);
    return { message: "Delete book request submitted" };
  }
////////////////////////////////////////////////////////////////////////////////
//              Book
////////////////////////////////////////////////////////////////////////////////



export async function addBook({
    name,
    isbn,
    category,
    path,
    photos,
    price,
    published_date,
    file_path,
    author_name
}: {
    name: string
    isbn: string
    category: number[]
    path: string,
    photos: string[],
    price: number,
    published_date: number,
    file_path: string,
    author_name: string
}) {
    // Validate required fields
    if (!name || !isbn ) {
        throw new Error('Name, ISBN and author are required fields')
    }

    if (isbn.length < 10 || isbn.length > 13) {
        throw new Error('ISBN must be between 10 and 13 characters')
    }

    if (!category || category.length === 0) {
        throw new Error('At least one category is required')
    }

    const existingBook = await prisma.books.findFirst({ where: { isbn } });
    const existingRequest = await prisma.book_requests.findFirst({
         where: { details: { contains: `"isbn":"${isbn}"` }, status: "pending" },
    });
    if (existingBook || existingRequest) {
        throw new Error("ISBN already exists");
    }

    try {
        const result = await prisma.$transaction(async t => {
            const session = await auth();
            const book = await t.books.create({
                data: {
                    name: name,
                    isbn: isbn,
                    author_id: parseInt(session?.user.id),
                    author_name: author_name,
                    price: price,
                    published_date: published_date,
                    file_path: file_path
                },
                select: {
                    book_id: true,
                    name: true, 
                  },
            })

            if (category && category.length > 0) {
                const data = category.map(cat => ({
                    book_id: book.book_id,
                    category_id: cat
                }))

                await t.book_category_links.createMany({ data })
            }
            if (photos && photos.length > 0) {
                const data = photos.map(photo => ({
                    book_id: book.book_id,
                    url: photo
                }))

                await t.book_photos.createMany({ data })
            }
            revalidatePath(path)
            return book;
        })
        return result;
    } catch(error) {
        console.error('Error adding book:', error)
        throw error
    }
}

export async function updateBook({
    id,
    name,
    isbn,
    category,
    path,
    published_date,
    price,
    file_path,
    author_name
}: {
    id: number,
    name: string
    isbn: string
    category: number[]
    path: string,
    photos: string[],
    published_date: number,
    price: number,
    file_path: string,
    author_name: string
}) {

    try {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await prisma.$transaction(async (t: { books: { update: (arg0: { where: { book_id: number; }; data: { name: string; isbn: string; file_path: string; price: number; published_date: number; }; }) => any; }; book_category_links: { deleteMany: (arg0: { where: { book_id: number; }; }) => any; createMany: (arg0: { data: { book_id: any; category_id: number; }[]; }) => any; }; }) => {

            const book = await t.books.update({
                where: {
                    book_id: id
                },
                data: {
                    name: name,
                    isbn: isbn,
                    file_path: file_path,
                    price: price,
                    published_date: published_date,
                    author_name: author_name
                }
            })

            await t.book_category_links.deleteMany({
                where: {
                    book_id: id
                }
            })

            if (category && category.length > 0) {
                const data = category.map(cat => ({
                    book_id: book.book_id,
                    category_id: cat
                }))

                await t.book_category_links.createMany({ data })
            }

            revalidatePath(path)
        })

    } catch (error) {
        throw error
    }
}

export async function deleteBook(book_id: number, path: string) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.$transaction(async (t: { books: { delete: (arg0: { where: { book_id: number; }; }) => any; }; }) =>

        await t.books.delete({
            where: {
                book_id: book_id
            }
        })
    )

    revalidatePath(path)
}

//export async function placeHold(book_id: number, path: string) {
//     const session = await auth()

//     if (!session) {
//         throw new Error("You must be logged in")
//     }

//     await prisma.$transaction(t => (
//         t.reservations.create({
//             data: {
//                 book_id: +book_id,
//                 user_id: session?.user.user_id,
//                 reservation_date: new Date(),
//                 expiration_date: addDays(new Date(), 15)
//             }
//         })
//     ))

//     revalidatePath(path)
//}

//export async function cancelHold(id: number, path: string) {
//     await prisma.$transaction(t => (
//         t.reservations.delete({
//             where: {
//                 reservation_id: id
//             }
//         })
//     ))

//     revalidatePath(path)
//}

////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////


export async function addCategory(name: string, path: string) {

    try {

        const category = await prisma.$transaction([
            prisma.book_categories.create({
                data: {
                    category_name: name
                }
            })
        ])

        revalidatePath(path)
        return category

    } catch (error) {
        throw error
    }
}

export async function updateCategory(id: number, name: string, path: string) {

    if (!id) throw new Error("Missing id")
    try {

        await prisma.$transaction([
            prisma.book_categories.update({
                where: {
                    category_id: id
                },
                data: {
                    category_name: name
                }
            })
        ])

        revalidatePath(path)

    } catch (error) {
        throw error
    }
}

export async function deleteCategory(id: number, path: string) {

    try {

        await prisma.$transaction([
            prisma.book_categories.delete({
                where: {
                    category_id: id
                }
            })
        ])

        revalidatePath(path)

    } catch (error) {
        throw error
    }
}

export async function getCategories(offset: number, limit: number) {

    try {

        let categories
        let total

        if (limit === -1) {
            categories = await prisma.book_categories.findMany()
            total = categories.length
        } else {
            [categories, total] = await prisma.$transaction([
                prisma.book_categories.findMany({ skip: offset, take: limit }),
                prisma.book_categories.count()
            ])
        }

        return { data: categories, total: total }

    } catch (error) {
        throw error
    }
}


////////////////////////////////////////////////////////////////////////////////
//              Users
////////////////////////////////////////////////////////////////////////////////
export async function addUser(username: string, name: string, email: string, date_of_birth: string, gender: string, role: string, path: string) {

    try {

        const hashPassword = await bcrypt.hash('password', 10)
        const genderEnum = Gender[gender as keyof typeof Gender];

        const category = await prisma.$transaction([
            prisma.users.create({
                data: {
                    username: username,
                    name: name,
                    email: email,
                    date_of_birth: date_of_birth,
                    gender: genderEnum,
                    role: role,
                    password: role === 'staff' ? hashPassword : '',
                }
            })
        ])

        revalidatePath(path)
        return category

    } catch (error) {
        throw error
    }
}

export async function updateUser(user_id: number, username: string, name: string, email: string, date_of_birth: string, gender: string, role: string, path: string) {

    const dobDate = new Date(date_of_birth);

    if (isNaN(dobDate.getTime())) {
        throw new Error("Ngày sinh không hợp lệ");
    }
    const genderEnum = Gender[gender as keyof typeof Gender];


    if (!user_id) return { message: 'Missing data is required' }

    try {

        // use transaction. If book creation fails we don't want to create category links
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await prisma.$transaction(async (transaction: { users: { update: (arg0: { where: { user_id: number; }; data: { username: string; name: string; email: string; date_of_birth: Date; gender: any; role: string; }; }) => any; }; }) => {

            await transaction.users.update({
                where: {
                    user_id: user_id
                },
                data: {
                    username: username,
                    name: name,
                    email: email,
                    date_of_birth: dobDate,
                    gender: genderEnum,
                    role: role,
                }
            })
        })

        if (path) revalidatePath(path)

        return { message: 'user updated' }

    } catch (error) {
        return { message: 'Database Error: Failed to Update User.' };
        throw error
    }
}

export async function deleteUser(id: number, path: string) {

    try {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await prisma.$transaction(async (transaction: { users: { delete: (arg0: { where: { user_id: number; }; }) => any; }; }) => {
            await transaction.users.delete({
                where: {
                    user_id: id
                }
            })
        })

        revalidatePath(path)

        return result

    } catch (error) {
        throw error
    }
}

const passwordFormSchema = z.object({
    new_password: z.string().min(8)
})


export async function updateProfile(state: State | undefined, formData: FormData): Promise<State> {
    const session = await auth();

    if (!session) {
        await signIn();
        return { message: 'Vui lòng đăng nhập' };
    }

    console.log('session:', session);
    const user = await prisma.users.findUnique({
        where: {
            email: session.user.email ?? undefined
        },
    });

    if (!user) {
        return { message: 'Người dùng không hợp lệ' };
    }

    // Lấy các trường cá nhân
    const username = formData.get('username') as string | null;
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const date_of_birth_str = formData.get('date_of_birth') as string | null;
    const gender_str = formData.get('gender') as string | null;
    const role = formData.get('role') as string | null;

    // Xử lý ngày sinh
    let date_of_birth: Date | undefined = undefined;
    if (date_of_birth_str) {
        const d = new Date(date_of_birth_str);
        if (!isNaN(d.getTime())) {
            date_of_birth = d;
        } else {
            return { message: 'Ngày sinh không hợp lệ' };
        }
    }

    // Xử lý giới tính
    let gender: Gender | undefined = undefined;
    if (gender_str) {
        const g = Gender[gender_str as keyof typeof Gender];
        if (g) {
            gender = g;
        } else {
            return { message: 'Giới tính không hợp lệ' };
        }
    }

    // Lấy mật khẩu mới, mật khẩu cũ và xác nhận mật khẩu
    const new_password = formData.get('new_password') as string | null;
    const old_password = formData.get('old_password') as string | null;
    const confirm_password = formData.get('confirm_password') as string | null;

    // Chuẩn bị object cập nhật
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    if (username) updateData.username = username;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (date_of_birth) updateData.date_of_birth = date_of_birth;
    if (gender) updateData.gender = gender;
    if (role) updateData.role = role;

    // Nếu có thay đổi mật khẩu
    if (new_password) {
        if (!old_password) {
            return { message: 'Bạn phải nhập mật khẩu cũ để đổi mật khẩu mới' };
        }

        if (!confirm_password) {
            return { message: 'Vui lòng nhập lại mật khẩu mới để xác nhận' };
        }

        if (new_password !== confirm_password) {
            return { message: 'Mật khẩu mới và mật khẩu xác nhận không khớp' };
        }

        const passwordValidate = passwordFormSchema.safeParse({ new_password });
        if (!passwordValidate.success) {
            return { message: 'Định dạng mật khẩu mới không hợp lệ' };
        }

        const password_match = await bcrypt.compare(old_password, user.password);
        if (!password_match) {
            return { message: 'Mật khẩu cũ không đúng' };
        }

        const new_hash_password = bcrypt.hashSync(new_password, 10);
        updateData.password = new_hash_password;
    }

    try {
        await prisma.users.update({
            where: { email: session.user.email ?? undefined },
            data: updateData,
        });

        await signOut({
            redirectTo: `/auth/signin?callbackUrl=${encodeURIComponent('/admin')}&message=${encodeURIComponent('Mật khẩu đã được cập nhật, vui lòng đăng nhập lại.')}`,
        });

        return { message: 'Profile updated successfully' };
    } catch (error) {
        console.error(error);
        return { message: 'Lỗi cơ sở dữ liệu: Cập nhật thông tin thất bại.' };
    }
}



////////////////////////////////////////////////////////////////////////////////
//              Fines
////////////////////////////////////////////////////////////////////////////////
//export async function markAsPaid(id: number, path: string) {
//    try {

//       await prisma.$transaction(async (transaction) => {
// await transaction.fines.update({
//     where: {
//         fine_id: id
//     }, 
//                data: {
//                    paid_date: new Date()
//                }
//            })
//        })

//        revalidatePath(path)

//        return { message: "Fine paid" }

//    } catch (error) {
//        throw error
//    }
//}



////////////////////////////////////////////////////////////////////////////////
//              Checkout & Payment Processing
////////////////////////////////////////////////////////////////////////////////

/**
 * Handles the checkout process for books in cart
 * Processes direct bank payment and grants book access
 */
export async function processCheckout(
    items: { book_id: number; price: number }[]
) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in to make a purchase")

    try {
        // Get book details and validate
        const books = await prisma.books.findMany({
            where: {
                book_id: {
                    in: items.map(item => item.book_id)
                }
            },
            select: {
                book_id: true,
                name: true,
                price: true,
                state: true
            }
        })

        // Validate books are available
        const invalidBooks = books.filter((book: { state: boolean }) => !book.state)
        if (invalidBooks.length > 0) {
            throw new Error('Some books are not available for purchase')
        }

        // Calculate total amount
        const totalAmount = books.reduce((sum: number, book: { price: number }) => sum + Number(book.price), 0)

        // Generate reference number
        const timestamp = Date.now().toString()
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        const referenceNumber = `EB${timestamp}${random}`

        // Create payment records and grant access in a transaction
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Create payment record
            const payment = await tx.payments.create({
                data: {
                    user_id: Number(session.user.id),
                    amount: totalAmount,
                    status: 'pending',
                    payment_method: 'bank_transfer',
                    payment_details: JSON.stringify({
                        referenceNumber,
                        timestamp: new Date().toISOString()
                    })
                }
            })

            // Create payment-book links
            await tx.payment_books.createMany({
                data: books.map((book: { book_id: number; price: number }) => ({
                    payment_id: payment.pay_id,
                    book_id: book.book_id,
                    amount: book.price
                }))
            })

            // Add books to user's library (will be confirmed after payment verification)
            await tx.user_books.createMany({
                data: books.map((book: { book_id: number }) => ({
                    user_id: Number(session.user.id),
                    book_id: book.book_id,
                    status: 'pending_payment'
                }))
            })
        })

        return { 
            success: true, 
            totalAmount,
            referenceNumber,
            message: 'Payment instructions generated. Please complete the bank transfer to access your books.'
        }
    } catch (error) {
        console.error('Checkout error:', error)
        throw new Error(error instanceof Error ? error.message : 'Failed to process checkout')
    }
}

/**
 * Verifies the payment status for a user's pending payments
 */
export async function verifyPaymentStatus() {
    const session = await auth()
    if (!session) throw new Error("You must be logged in to check payment status")

    try {
        const pendingPayments = await prisma.payments.findMany({
            where: {
                user_id: Number(session.user.id),
                status: 'pending'
            },
            include: {
                payment_books: {
                    include: {
                        books: true
                    }
                }
            }
        })

        if (pendingPayments.length === 0) {
            return { success: true, status: 'no_pending_payments' }
        }

        // Here you would typically check with your bank's API or admin verification
        // For now, we'll simulate admin verification
        const verifiedPayments = pendingPayments.filter(payment => {
            const paymentDetails = JSON.parse(payment.payment_details as string)
            const paymentTime = new Date(paymentDetails.timestamp).getTime()
            const now = Date.now()
            // Simulate admin verification after 5 minutes
            return now - paymentTime > 5 * 60 * 1000
        })

        if (verifiedPayments.length > 0) {
            await prisma.$transaction(async (tx) => {
                // Update payment status
                await tx.payments.updateMany({
                    where: {
                        pay_id: {
                            in: verifiedPayments.map(p => p.pay_id)
                        }
                    },
                    data: {
                        status: 'completed',
                        completed_at: new Date()
                    }
                })

                // Update user_books status
                await tx.user_books.updateMany({
                    where: {
                        user_id: Number(session.user.id),
                        status: 'pending_payment',
                        book_id: {
                            in: verifiedPayments.flatMap(p => 
                                p.payment_books.map(pb => pb.book_id)
                            )
                        }
                    },
                    data: {
                        status: 'active'
                    }
                })
            })

            // TODO: Send email notification
            return { success: true, status: 'completed' }
        }

        return { success: true, status: 'pending' }
    } catch (error) {
        console.error('Payment verification error:', error)
        throw new Error('Failed to verify payment status')
    }
}

////////////////////////////////////////////////////////////////////////////////
//              Photos
////////////////////////////////////////////////////////////////////////////////
export async function addPhoto(table: string, entity_id: number, url: string, path: string) {
    try {
        const result = await prisma.$transaction(async (tx: { book_photos: { create: (arg0: { data: { book_id: number; url: string; }; }) => any; }; }) => {
            if (table === 'book') {
                return await tx.book_photos.create({
                    data: {
                        book_id: entity_id,
                        url
                    }
                });
            }
            throw new Error('Invalid table specified');
        });

        revalidatePath(path);
        return { photo_id: result.photo_id, url: result.url };
    } catch (error) {
        throw error;
    }
}

export async function deletePhoto(table: string, id: number, path: string) {
    try {
        const result = await prisma.$transaction(async (tx: { book_photos: { delete: (arg0: { where: { photo_id: number; }; }) => any; }; }) => {
            if (table === 'book') {
                return await tx.book_photos.delete({
                    where: {
                        photo_id: id
                    }
                });
            }
            throw new Error('Invalid table specified');
        });

        revalidatePath(path);
        return result;
    } catch (error) {
        throw error;
    }
}

////////////////////////////////////////////////////////////////////////////////
//              User Purchase History
////////////////////////////////////////////////////////////////////////////////

/**
 * Fetches books the user has purchased but are still pending payment confirmation
 */
export async function getPendingPurchases() {
    const session = await auth()
    if (!session) return { success: false }

    const userId = Number(session.user.id)

    try {
        const pending = await prisma.user_books.findMany({
            where: {
                user_id: userId,
                status: 'pending_payment'
            },
            include: {
                books: {
                    include: {
                        users: true,
                        book_photos: true
                    }
                }
            }
        })

        return {
            success: true,
            books: pending.map(entry => ({
                ...entry.books,
                author: entry.books.users
            }))
        }
    } catch (error) {
        console.error("Error fetching pending purchases:", error)
        return { success: false, error: 'Could not fetch pending purchases' }
    }
}



////////////////////////////////////////////////////////////////////////////////
//              Rating
////////////////////////////////////////////////////////////////////////////////
export async function addRating(book_id: number, prevState: State, formData: FormData) {

    const session = await auth()

    if (!session) {
        return { message: "You must be logged in" }
    }

    await prisma.$transaction([
        prisma.ratings.create({
            data: {
                book_id: book_id,
                user_id: Number(session?.user.id),
                rating: +formData.get('rating')!,
                //review: formData.get('comment')?.toString()
            }
        })
    ])

    return {
        message: "Thank you for your review"
    }
}


export type State = {
    message?: string | null
    requireSignOut?: boolean
}


//////////////////////////////////////////////////
//SEARCH BOOK 
///////////////////////////////////////////////////
export type BookAuthorInfo = { // Chỉ lấy các trường cần thiết của tác giả
    user_id: number;
    name: string | null;
};

export type BookSearchResult = Omit<Prisma.booksGetPayload<{
    include: { book_photos: true, users: true } // Bao gồm cả users (tác giả)
}>, 'price' | 'created_at' | 'totalPages' | 'author_id' | 'users'> & { // Loại bỏ các trường cần serialize và author_id, users gốc
    price: number; // price sẽ là number sau khi serialize
    created_at: string; // created_at sẽ là string (ISO) sau khi serialize
    totalPages: number | null; // totalPages sẽ là number hoặc null
    book_photos: { url: string }[]; // Đảm bảo kiểu này
    author: BookAuthorInfo | null; // Thêm thông tin tác giả đã được xử lý
};

export interface PaginatedBookSearchResult {
    books: BookSearchResult[];
    totalResults: number;
    totalPages: number;
    currentPage: number;
}

const SEARCH_ITEMS_PER_PAGE = 20; // Hoặc một giá trị bạn muốn

export async function searchBooks(
    query: string,
    criteria: 'name' | 'author' | 'description' | 'all',
    page: number = 1
): Promise<PaginatedBookSearchResult> {
    if (!query || query.trim() === '') {
        console.log("[searchBooks] Query is empty, returning empty paginated result.");
        return { books: [], totalResults: 0, totalPages: 0, currentPage: 1 };
    }

    const searchQuery = query.trim();
    let whereClause: Prisma.booksWhereInput = {};

    if (criteria === 'name') {
        whereClause = { name: { contains: searchQuery } };
    } else if (criteria === 'author') {
        // SỬA Ở ĐÂY: Tìm kiếm theo tên của user (tác giả) liên quan
        whereClause = {
            users: { // 'users' là tên trường quan hệ trong model 'books'
                name: {
                    contains: searchQuery,

                }
            }
        };
    } else if (criteria === 'description') {
        whereClause = { description: { contains: searchQuery } };
    } else if (criteria === 'all') {
        whereClause = {
            OR: [
                { name: { contains: searchQuery } },
                { users: { name: { contains: searchQuery } } }, // Tìm theo tên tác giả
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
                    users: { // QUAN TRỌNG: Include thông tin tác giả (user)
                        select: {
                            user_id: true,
                            name: true,
                        }
                    }
                },
                skip: skipAmount,
                take: SEARCH_ITEMS_PER_PAGE,
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.books.count({
                where: whereClause,
            }),
        ]);

        console.log(`[searchBooks] Found ${foundBooksFromDb.length} books for page ${page}, Total results: ${totalResults}.`);

        // Serialize sách và định dạng lại thông tin tác giả
        const serializableBooks = foundBooksFromDb.map((book: { [x: string]: any; book_photos?: any; price?: any; created_at?: any; totalPages?: any; users?: any; author_id?: any; }) => {
            const { price, created_at, totalPages, users, author_id, ...restOfBook } = book;
            return {
                ...restOfBook,
                price: price.toNumber(), // Chuyển Decimal sang number
                created_at: created_at.toISOString(), // Chuyển Date sang ISO string
                totalPages: totalPages === null ? null : Number(totalPages), // Chuyển BigInt? sang number?
                book_photos: book.book_photos || [], // Đảm bảo book_photos là mảng
                author: users ? { user_id: users.user_id, name: users.name } : null, // Trích xuất thông tin tác giả
            };
        });

        return {
            books: serializableBooks as BookSearchResult[], // Ép kiểu sau khi đã serialize
            totalResults,
            totalPages: Math.ceil(totalResults / SEARCH_ITEMS_PER_PAGE),
            currentPage: page,
        };

    } catch (error) {
        console.error("[searchBooks] Error during paginated book search:", error);
        return { books: [], totalResults: 0, totalPages: 0, currentPage: page };
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


///////////////////////////////////////////////
//Reading
///////////////////////////////////////////////
export interface ReadingSessionDataForClient {
    session_id: string;
    user_id: number; // Vẫn giữ user_id là number ở đây vì DB của bạn dùng Int
    book_id: number;
    last_location: string | null;
    last_read_timestamp: Date;
    book_file_path: string | null;
    book_name?: string | null;
}

// --- Server Actions cho ReaderController ---

/**
 * Tải thông tin sách và session đọc cho người dùng.
 * Nếu chưa có session, tạo một session mới.
 * @param bookID ID của sách
 * @returns ReadingSessionData hoặc lỗi
 */

export async function loadBookForReading(bookId: number): Promise<{ data?: ReadingSessionDataForClient; error?: string }> {
    const session = await auth(); // Hàm auth từ file auth.ts của dự án chung

    // Kiểm tra session và session.user.id (là user_id dạng string)
    if (!session?.user?.id) { // DÙNG session.user.id
        console.log('[loadBookForReading] User not authenticated or session.user.id is missing.');
        return { error: 'User not authenticated. Please sign in to read.' };
    }
    console.log('[loadBookForReading] session.user.id (string from session):', session.user.id);
    // Chuyển đổi session.user.id (string) thành number
    const userId = parseInt(session.user.id, 10);
    console.log('[loadBookForReading] userId (after parseInt):', userId);
    if (isNaN(userId)) {
        console.error('[loadBookForReading] Error: userId is NaN. session.user.id was:', session.user.id);
        return { error: 'Invalid user session data.' };
    }

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
            return { error: 'You do not have permission to read this book or it is not available for reading online.' };
        }

        if (!book.file_path) {
            return { error: 'Book file (digital copy) is not available for reading.' };
        }

        let readingSession = await prisma.reading_sessions.findUnique({
            where: { user_id_book_id: { user_id: userId, book_id: bookId } }, // userId đã là number
        });

        if (!readingSession) {
            console.log(`[loadBookForReading] Creating new reading session for userId: ${userId}, bookId: ${bookId}`);
            // Kiểm tra xem user có tồn tại không trước khi tạo session (tùy chọn, nhưng tốt cho debug)
            const userExists = await prisma.users.findUnique({ where: { user_id: userId } });
            if (!userExists) {
                console.error(`[loadBookForReading] CRITICAL: User with ID ${userId} does not exist in DB. Cannot create reading session.`);
                return { error: `User session is invalid or user does not exist (ID: ${userId}). Please sign out and sign in again.` };
            }
            readingSession = await prisma.reading_sessions.create({
                data: {
                    user_id: userId, // userId đã là number
                    book_id: bookId,
                    last_location: null,
                },
            });
        }

        return {
            data: {
                session_id: readingSession.session_id,
                user_id: readingSession.user_id, // Đây là user_id (number) từ DB
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
    currentLocation: string
): Promise<{ success?: string; error?: string }> {
    const session = await auth(); // Hàm auth từ file auth.ts của dự án chung

    // Kiểm tra session và session.user.id (là user_id dạng string)
    if (!session?.user?.id) { // DÙNG session.user.id
        return { error: 'User not authenticated. Cannot save progress.' };
    }

    // Chuyển đổi session.user.id (string) thành number
    const userId = parseInt(session.user.id, 10);
    if (isNaN(userId)) {
        return { error: 'Invalid user session data.' };
    }

    if (!currentLocation || typeof currentLocation !== 'string') {
        return { error: 'Invalid reading location (CFI) provided.' };
    }

    try {
        await prisma.reading_sessions.upsert({
            where: { user_id_book_id: { user_id: userId, book_id: bookId } }, // userId đã là number
            update: { last_location: currentLocation },
            create: {
                user_id: userId, // userId đã là number
                book_id: bookId,
                last_location: currentLocation,
            },
        });
        return { success: 'Reading progress saved.' };
    } catch (error) {
        console.error('Error saving reading progress:', error);
        return { error: 'Failed to save reading progress due to a server error.' };
    }
}

export async function likeBook(book_id: number, path: string) {
    const session = await auth()

    if (!session?.user) {
        throw new Error("You must be logged in")
    }

    // Ensure user_id is a number
    const userId = parseInt(session.user.id)
    if (isNaN(userId)) {
        throw new Error("Invalid user ID")
    }

    try {
        await prisma.liked_books.create({
            data: {
                book_id: book_id,
                user_id: userId
            }
        })

        revalidatePath(path)
        return { message: "Book added to favorites" }
    } catch (error) {
        console.error('Error liking book:', error)
        throw new Error("Failed to add book to favorites")
    }
}

export async function unlikeBook(book_id: number, path: string) {
    const session = await auth()

    if (!session?.user) {
        throw new Error("You must be logged in")
    }

    // Ensure user_id is a number
    const userId = parseInt(session.user.id)
    if (isNaN(userId)) {
        throw new Error("Invalid user ID")
    }

    try {
        await prisma.liked_books.delete({
            where: {
                user_id_book_id: {
                    user_id: userId,
                    book_id: book_id
                }
            }
        })

        revalidatePath(path)
        return { message: "Book removed from favorites" }
    } catch (error) {
        console.error('Error unliking book:', error)
        throw new Error("Failed to remove book from favorites")
    }
}

export async function approveBookRequestAction(requestId: number, path: string) {
    try {
        const result = await prisma.$transaction(async (tx: {
            book_requests: {
                findUnique: (arg0: {
                    where: { request_id: number; };
                    include: { books: boolean; };
                }) => any; update: (arg0: { where: { request_id: number; }; data: { status: string; }; }) => any;
            }; books: {
                create: (arg0: { data: { name: any; isbn: any; author_id: any; file_path: any; price: any; published_date: any; state: boolean; }; })
                    => any; update: (arg0: {
                        where: { book_id: any; };
                        data: { name: any; isbn: any; file_path: any; price: any; published_date: any; };
                    }) => any;
            };
            book_category_links: { createMany: (arg0: { data: any; }) => any; deleteMany: (arg0: { where: { book_id: any; }; }) => any; };
        }) => {
            const request = await tx.book_requests.findUnique({
                where: { request_id: requestId },
                include: { books: true }
            });

            if (!request) {
                throw new Error('Request not found');
            }

            if (request.status !== 'pending') {
                throw new Error('Request is not pending');
            }

            const details = JSON.parse(request.details || '{}');

            if (request.action === 'add') {
                await tx.books.update({
                    where: {
                        book_id: request.book_id
                    },
                    data: {
                        state: true
                    }
                });
                await tx.book_requests.delete({
                    where: {
                        request_id: requestId
                    }
                });

            } else if (request.action === 'update' && request.book_id) {
                await tx.books.update({
                    where: { book_id: request.book_id },
                    data: {
                        name: details.name,
                        isbn: details.isbn,
                        file_path: details.file_path,
                        price: details.price,
                        published_date: details.published_date,
                        state: true
                    }
                });
              

                // Handle categories separately
                if (details.category && Array.isArray(details.category)) {
                    // Delete existing category links
                    await tx.book_category_links.deleteMany({
                        where: { book_id: request.book_id }
                    });

                    // Create new category links
                    const categoryLinks = details.category.map((catId: number) => ({
                        book_id: request.book_id,
                        category_id: catId
                    }));
                    await tx.book_category_links.createMany({
                        data: categoryLinks
                    });
                }

                // Xóa các request update khác của cùng book_id
                

                await tx.book_requests.update({
                    where: { request_id: requestId },
                    data: { status: 'approved' }
                });
            } else if (request.action === 'delete') {
                await tx.books.delete({
                    where: {
                        book_id: request.book_id
                    }
                });
                await tx.book_requests.delete({
                    where: {
                        request_id: requestId
                    }
                });
            }
           
           
        });

        revalidatePath(path);
        return { success: true };
    } catch (error) {
        console.error('Error approving book request:', error);
        return { error: 'Failed to approve request' };
    }
}

export async function rejectBookRequestAction(requestId: number, path: string) {
    try {
        await prisma.book_requests.update({
            where: { request_id: requestId },
            data: { status: 'rejected' }
        });

        revalidatePath(path);
        return { success: true };
    } catch (error) {
        console.error('Error rejecting book request:', error);
        return { error: 'Failed to reject request' };
    }
}

export async function deleteActivity(activity_id: number, path: string) {
    try {
        await prisma.activities.delete({
            where: {
                activity_id: activity_id
            }
        });
        revalidatePath(path);
        return { message: "Activity deleted successfully" };
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
}

export async function createTestAccount() {
    try {
        const hashPassword = await bcrypt.hash('password123', 10);
        const timestamp = Date.now();
        const uniqueUsername = `testuser1_${timestamp}`;
        
        const user = await prisma.users.create({
            data: {
                username: uniqueUsername,
                name: 'Test User',
                email: `test1_${timestamp}@example.com`,
                date_of_birth: new Date('2000-01-01'),
                gender: 'Nam' as Gender,
                role: 'member',
                password: hashPassword,
            }
        });

        return { 
            success: true, 
            user: {
                username: uniqueUsername,
                email: `test1_${timestamp}@example.com`,
                password: 'password123'
            }
        };
    } catch (error) {
        console.error('Error creating test account:', error);
        return { success: false, error };
    }
}

// //'use server'

// import { prisma } from "@/lib/prisma"
// import { Prisma } from '@prisma/client';
// import { revalidatePath } from "next/cache"
// import bcrypt from 'bcryptjs'
// import { auth, signIn, signOut } from "@/auth"
// // import { addDays, addMonths, differenceInCalendarDays } from "date-fns"
// import { z } from "zod"
// import { stripe } from "@/lib/stripe"
// import { formatAmountForStripe } from "@/lib/utils"
// import { redirect } from "next/navigation"
// import { headers } from "next/headers"
// import { Gender } from '@prisma/client';



// ////////////////////////////////////////////////////////////////////////////////
// //              Author
// ////////////////////////////////////////////////////////////////////////////////
// // async function checkAuthorRole(bookId: number) {
// //     const session = await auth();
// //     if (!session || session.user.role !== "author") {
// //       throw new Error("Unauthorized");
// //     }
// //     const book = await prisma.books.findUnique({
// //       where: { book_id: bookId },
// //       select: { author_id: true },
// //     });
// //     if (!book || book.author_id !== session.user.user_id) {
// //       throw new Error("Unauthorized");
// //     }
// //   }

// export async function requestAddBook({
//     id,
//     name,
//     isbn,
//     category,
//     path,
//     published_date,
//     price,
//     file_path
// }: {
//     id: number,
//     name: string
//     isbn: string
//     category: number[]
//     path: string,
//     photos: string[],
//     published_date: number,
//     price: number,
//     file_path: string
// }) {

//     try {
//         await prisma.book_requests.create({
//             data: {
//                 book_id: id,
//                 // author_id: (await auth())!.user.user_id,
//                 author_id: 1,
//                 action: "add",
//                 details: JSON.stringify({
//                     name,
//                     isbn,
//                     category,
//                     file_path,
//                     price,
//                     published_date,
//                 }),
//                 status: "pending",
//             },
//         });
//         revalidatePath(path);
//         return { message: "Update book request submitted" };
//     } catch (error) {
//         throw error
//     }



// }

// export async function requestUpdateBook({
//     id,
//     name,
//     isbn,
//     category,
//     path,
//     published_date,
//     price,
//     file_path
// }: {
//     id: number,
//     name: string
//     isbn: string
//     category: number[]
//     path: string,
//     photos: string[],
//     published_date: number,
//     price: number,
//     file_path: string
// }) {
//     try {
//         await prisma.book_requests.create({
//             data: {
//                 book_id: id,
//                 // author_id: (await auth())!.user.user_id,
//                 author_id: 1,
//                 action: "update",
//                 details: JSON.stringify({
//                     name,
//                     isbn,
//                     category,
//                     file_path,
//                     price,
//                     published_date,
//                 }),
//                 status: "pending",
//             },
//         });
//         revalidatePath(path);
//         return { message: "Update book request submitted" };
//     } catch (error) {
//         throw error
//     }


// }

// export async function requestDeleteBook(book_id: number, path: string) {
//     const session = await auth();

//     const existingRequest = await prisma.book_requests.findFirst({
//         where: {
//             book_id,
//             action: "delete",
//             status: "pending",
//         },
//     });

//     if (existingRequest) {
//         throw new Error("A delete request is already pending for this book");
//     }

//     await prisma.book_requests.create({
//         data: {
//             book_id,
//             // author_id: session.user.user_id,
//             author_id: 1,
//             action: "delete",
//             details: "{}",
//             status: "pending",
//         },
//     });
//     await prisma.books.update({
//         where: {
//             book_id: book_id
//         },
//         data: {
//             state: false
//         }
//     })

//     revalidatePath(path);
//     return { message: "Delete book request submitted" };
// }
// ////////////////////////////////////////////////////////////////////////////////
// //              Book
// ////////////////////////////////////////////////////////////////////////////////



// export async function addBook({
//     name,
//     isbn,
//     category,
//     path,
//     photos,
//     price,
//     published_date,
//     file_path
// }: {
//     name: string
//     isbn: string
//     category: number[]
//     path: string,
//     photos: string[],
//     price: number,
//     published_date: number,
//     file_path: string
// }) {
//     // Validate required fields
//     if (!name || !isbn ) {
//         throw new Error('Name, ISBN and author are required fields')
//     }

//     if (isbn.length < 10 || isbn.length > 13) {
//         throw new Error('ISBN must be between 10 and 13 characters')
//     }

//     if (!category || category.length === 0) {
//         throw new Error('At least one category is required')
//     }

//     const existingBook = await prisma.books.findFirst({ where: { isbn } });
//     const existingRequest = await prisma.book_requests.findFirst({
//         where: { details: { contains: `"isbn":"${isbn}"` }, status: "pending" },
//     });
//     if (existingBook || existingRequest) {
//         throw new Error("ISBN already exists");
//     }


//     try {
//         await prisma.$transaction(async t => {
//             const book = await t.books.create({
//                 data: {
//                     name: name,
//                     isbn: isbn,
//                     // author_id: (await auth())!.user.user_id,
//                     author_id: 1,
//                     price: price,
//                     published_date: published_date,
//                     file_path: file_path
//                 }
//             })

//             if (category && category.length > 0) {
//                 const data = category.map(cat => ({
//                     book_id: book.book_id,
//                     category_id: cat
//                 }))

//                 await t.book_category_links.createMany({ data })
//             }
//             if (photos && photos.length > 0) {
//                 const data = photos.map(photo => ({
//                     book_id: book.book_id,
//                     url: photo
//                 }))

//                 await t.book_photos.createMany({ data })
//             }
//             revalidatePath(path)
//         })
//     } catch (error) {
//         console.error('Error adding book:', error)
//         throw error
//     }
// }

// export async function updateBook({
//     id,
//     name,
//     isbn,
//     category,
//     path,
//     published_date,
//     price,
//     file_path
// }: {
//     id: number,
//     name: string
//     isbn: string
//     category: number[]
//     path: string,
//     photos: string[],
//     published_date: number,
//     price: number,
//     file_path: string
// }) {

//     try {

//         await prisma.$transaction(async t => {

//             const book = await t.books.update({
//                 where: {
//                     book_id: id
//                 },
//                 data: {
//                     name: name,
//                     isbn: isbn,
//                     file_path: file_path,
//                     price: price,
//                     published_date: published_date
//                 }
//             })

//             await t.book_category_links.deleteMany({
//                 where: {
//                     book_id: id
//                 }
//             })

//             if (category && category.length > 0) {
//                 const data = category.map(cat => ({
//                     book_id: book.book_id,
//                     category_id: cat
//                 }))

//                 await t.book_category_links.createMany({ data })
//             }

//             revalidatePath(path)
//         })

//     } catch (error) {
//         throw error
//     }
// }

// export async function deleteBook(book_id: number, path: string) {

//     await prisma.$transaction(async t =>

//         await t.books.delete({
//             where: {
//                 book_id: book_id
//             }
//         })
//     )

//     revalidatePath(path)
// }

// export async function placeHold(book_id: number, path: string) {
// //     const session = await auth()

// //     if (!session) {
// //         throw new Error("You must be logged in")
// //     }

// //     await prisma.$transaction(t => (
// //         t.reservations.create({
// //             data: {
// //                 book_id: +book_id,
// //                 user_id: session?.user.user_id,
// //                 reservation_date: new Date(),
// //                 expiration_date: addDays(new Date(), 15)
// //             }
// //         })
// //     ))

// //     revalidatePath(path)
// }

// export async function cancelHold(id: number, path: string) {
// //     await prisma.$transaction(t => (
// //         t.reservations.delete({
// //             where: {
// //                 reservation_id: id
// //             }
// //         })
// //     ))

// //     revalidatePath(path)
// }

// ////////////////////////////////////////////////////////////////////////////////
// //              Category
// ////////////////////////////////////////////////////////////////////////////////


// export async function addCategory(name: string, path: string) {

//     try {

//         const category = await prisma.$transaction([
//             prisma.book_categories.create({
//                 data: {
//                     category_name: name
//                 }
//             })
//         ])

//         revalidatePath(path)
//         return category

//     } catch (error) {
//         throw error
//     }
// }

// export async function updateCategory(id: number, name: string, path: string) {

//     if (!id) throw new Error("Missing id")
//     try {

//         await prisma.$transaction([
//             prisma.book_categories.update({
//                 where: {
//                     category_id: id
//                 },
//                 data: {
//                     category_name: name
//                 }
//             })
//         ])

//         revalidatePath(path)

//     } catch (error) {
//         throw error
//     }
// }

// export async function deleteCategory(id: number, path: string) {

//     try {

//         await prisma.$transaction([
//             prisma.book_categories.delete({
//                 where: {
//                     category_id: id
//                 }
//             })
//         ])

//         revalidatePath(path)

//     } catch (error) {
//         throw error
//     }
// }

// export async function getCategories(offset: number, limit: number) {

//     try {

//         let categories
//         let total

//         if (limit === -1) {
//             categories = await prisma.book_categories.findMany()
//             total = categories.length
//         } else {
//             [categories, total] = await prisma.$transaction([
//                 prisma.book_categories.findMany({ skip: offset, take: limit }),
//                 prisma.book_categories.count()
//             ])
//         }

//         return { data: categories, total: total }

//     } catch (error) {
//         throw error
//     }
// }


// ////////////////////////////////////////////////////////////////////////////////
// //              Users
// ////////////////////////////////////////////////////////////////////////////////
// export async function addUser(username: string, name: string, email: string, date_of_birth: string, gender: string, role: string, path: string) {

//     try {

//         const hashPassword = await bcrypt.hash('password', 10)
//         const genderEnum = Gender[gender as keyof typeof Gender];

//         const category = await prisma.$transaction([
//             prisma.users.create({
//                 data: {
//                     username: username,
//                     name: name,
//                     email: email,
//                     date_of_birth: date_of_birth,
//                     gender: genderEnum,
//                     role: role,
//                     password: role === 'staff' ? hashPassword : '',
//                 }
//             })
//         ])

//         revalidatePath(path)
//         return category

//     } catch (error) {
//         throw error
//     }
// }

// export async function updateUser(user_id: number, username: string, name: string, email: string, date_of_birth: string, gender: string, role: string, path: string) {

//     const dobDate = new Date(date_of_birth);

//     if (isNaN(dobDate.getTime())) {
//         throw new Error("Ngày sinh không hợp lệ");
//     }
//     const genderEnum = Gender[gender as keyof typeof Gender];


//     if (!user_id) return { message: 'Missing data is required' }

//     try {

//         // use transaction. If book creation fails we don't want to create category links
//         await prisma.$transaction(async (transaction) => {

//             await transaction.users.update({
//                 where: {
//                     user_id: user_id
//                 },
//                 data: {
//                     username: username,
//                     name: name,
//                     email: email,
//                     date_of_birth: dobDate,
//                     gender: genderEnum,
//                     role: role,
//                 }
//             })
//         })

//         if (path) revalidatePath(path)

//         return { message: 'user updated' }

//     } catch (error) {
//         return { message: 'Database Error: Failed to Update User.' };
//         throw error
//     }
// }

// export async function deleteUser(id: number, path: string) {

//     try {

//         const result = await prisma.$transaction(async (transaction) => {
//             await transaction.users.delete({
//                 where: {
//                     user_id: id
//                 }
//             })
//         })

//         revalidatePath(path)

//         return result

//     } catch (error) {
//         throw error
//     }
// }

// const passwordFormSchema = z.object({
//     new_password: z.string().min(8)
// })


// export async function updateProfile(state: State | undefined, formData: FormData): Promise<State> {
//     const session = await auth();

//     if (!session) {
//         await signIn();
//         return { message: 'Vui lòng đăng nhập' };
//     }

//     console.log('session:', session);
//     const user = await prisma.users.findUnique({
//         where: {
//             email: session.user.email ?? undefined
//         },
//     });

//     if (!user) {
//         return { message: 'Người dùng không hợp lệ' };
//     }

//     // Lấy các trường cá nhân
//     const username = formData.get('username') as string | null;
//     const name = formData.get('name') as string | null;
//     const email = formData.get('email') as string | null;
//     const date_of_birth_str = formData.get('date_of_birth') as string | null;
//     const gender_str = formData.get('gender') as string | null;
//     const role = formData.get('role') as string | null;

//     // Xử lý ngày sinh
//     let date_of_birth: Date | undefined = undefined;
//     if (date_of_birth_str) {
//         const d = new Date(date_of_birth_str);
//         if (!isNaN(d.getTime())) {
//             date_of_birth = d;
//         } else {
//             return { message: 'Ngày sinh không hợp lệ' };
//         }
//     }

//     // Xử lý giới tính
//     let gender: Gender | undefined = undefined;
//     if (gender_str) {
//         const g = Gender[gender_str as keyof typeof Gender];
//         if (g) {
//             gender = g;
//         } else {
//             return { message: 'Giới tính không hợp lệ' };
//         }
//     }

//     // Lấy mật khẩu mới, mật khẩu cũ và xác nhận mật khẩu
//     const new_password = formData.get('new_password') as string | null;
//     const old_password = formData.get('old_password') as string | null;
//     const confirm_password = formData.get('confirm_password') as string | null;

//     // Chuẩn bị object cập nhật
//     const updateData: any = {};

//     if (username) updateData.username = username;
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     if (date_of_birth) updateData.date_of_birth = date_of_birth;
//     if (gender) updateData.gender = gender;
//     if (role) updateData.role = role;

//     // Nếu có thay đổi mật khẩu
//     if (new_password) {
//         if (!old_password) {
//             return { message: 'Bạn phải nhập mật khẩu cũ để đổi mật khẩu mới' };
//         }

//         if (!confirm_password) {
//             return { message: 'Vui lòng nhập lại mật khẩu mới để xác nhận' };
//         }

//         if (new_password !== confirm_password) {
//             return { message: 'Mật khẩu mới và mật khẩu xác nhận không khớp' };
//         }

//         const passwordValidate = passwordFormSchema.safeParse({ new_password });
//         if (!passwordValidate.success) {
//             return { message: 'Định dạng mật khẩu mới không hợp lệ' };
//         }

//         const password_match = await bcrypt.compare(old_password, user.password);
//         if (!password_match) {
//             return { message: 'Mật khẩu cũ không đúng' };
//         }

//         const new_hash_password = bcrypt.hashSync(new_password, 10);
//         updateData.password = new_hash_password;
//     }

//     try {
//         await prisma.users.update({
//             where: { email: session.user.email ?? undefined },
//             data: updateData,
//         });

//         await signOut({
//             redirectTo: `/auth/signin?callbackUrl=${encodeURIComponent('/admin')}&message=${encodeURIComponent('Mật khẩu đã được cập nhật, vui lòng đăng nhập lại.')}`,
//         });

//     } catch (error) {
//         console.error(error);
//         return { message: 'Lỗi cơ sở dữ liệu: Cập nhật thông tin thất bại.' };
//     }
// }



// ////////////////////////////////////////////////////////////////////////////////
// //              Activities
// ////////////////////////////////////////////////////////////////////////////////
// export async function addActivity({ title, description, activity_date, start_time, end_time, age_group, capacity, photos, path }:
//     { title: string, description: string, activity_date: Date, start_time: string, end_time: string, age_group: string, capacity: number, photos: string[], path: string }
// ) {

//     try {

//         await prisma.$transaction(async t => {
//             const result = await t.activities.create({
//                 data: {
//                     title: title,
//                     description: description,
//                     activity_date: activity_date,
//                     start_time: start_time,
//                     end_time: end_time,
//                     age_group: age_group,
//                     capacity: capacity
//                 }
//             })

//             console.log(result)
//             // save photos
//             if (photos && photos.length > 0) {
//                 const data = photos.map(photo => ({
//                     activity_id: result.activity_id,
//                     url: photo
//                 }))

//                 await t.activity_photos.createMany({ data })
//             }
//         })

//         revalidatePath(path)

//     } catch (error) {
//         throw error
//     }
// }

// export async function updateActivity({ activity_id, title, description, activity_date, start_time, end_time, age_group, capacity, path }:
//     { activity_id: number, title: string, description: string, activity_date: Date, start_time: string, end_time: string, age_group: string, capacity: number, path: string }
// ) {

//     try {

//         await prisma.$transaction([
//             prisma.activities.update({
//                 where: {
//                     activity_id: activity_id
//                 },
//                 data: {
//                     title: title,
//                     description: description,
//                     activity_date: activity_date,
//                     start_time: start_time,
//                     end_time: end_time,
//                     age_group: age_group,
//                     capacity: capacity
//                 }
//             })
//         ])

//         revalidatePath(path)

//     } catch (error) {
//         throw error
//     }
// }

// export async function deleteActivity(id: number, path: string) {

//     try {

//         await prisma.$transaction([
//             prisma.activities.delete({
//                 where: {
//                     activity_id: id
//                 }
//             })
//         ])

//         revalidatePath(path)

//     } catch (error) {
//         throw error
//     }
// }
// ////////////////////////////////////////////////////////////////////////////////
// //              Fines
// ////////////////////////////////////////////////////////////////////////////////
// export async function markAsPaid(id: number, path: string) {
//     try {

//         await prisma.$transaction(async (transaction) => {
//             await transaction.payments.update({
//                 where: {
//                     pay_id: id
//                 },
//                 data: {
//                     paid_at: new Date()
//                 }
//             })
//         })

//         revalidatePath(path)

//         return { message: "Fine paid" }

//     } catch (error) {
//         throw error
//     }
// }

// export async function deleteFine(id: number, path: string) {
//     try {

//         await prisma.$transaction(async (transaction) => {
//             await transaction.payments.delete({
//                 where: {
//                     pay_id: id
//                 }
//             })
//         })

//         revalidatePath(path)

//         return { message: "Fine deleted" }

//     } catch (error) {
//         throw error
//     }
// }

// export async function createCheckoutSession(data: FormData) {

//     const session = await auth()
//     if (!session) throw new Error("you must be logged in")

//     const pay_id = +data.get('pay_id')!
//     const fine = await prisma.payments.findUnique({
//         where: {
//             pay_id: pay_id
//         },
//         include: {
//             borrowings: {
//                 include: {
//                     books: {
//                         select: { name: true }
//                     }
//                 }
//             }
//         }
//     })

//     const checkoutSession = await stripe.checkout.sessions.create({
//         mode: 'payment',
//         submit_type: 'pay',
//         metadata: {
//             pay_id: pay_id
//         },
//         line_items: [
//             {
//                 quantity: 1,
//                 price_data: {
//                     currency: 'cad',
//                     product_data: {
//                         name: `Late return fine for ${fine?.borrowings.books.name}`
//                     },
//                     unit_amount: formatAmountForStripe((fine?.fine_amount as unknown) as number, 'CAD')
//                 }
//             }
//         ],
//         success_url: `${(await headers()).get('origin')}/fine/result?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${(await headers()).get('origin')}`
//     })

//     redirect(checkoutSession.url!)
// }

// ////////////////////////////////////////////////////////////////////////////////
// //              Photos
// ////////////////////////////////////////////////////////////////////////////////
// export async function addPhoto(table: string, entity_id: number, url: string, path: string) {

//     try {

//         const newPhoto = await prisma.$transaction(async t => {

//             if (table === 'book') {
//                 return await t.book_photos.create({
//                     data: {
//                         book_id: entity_id,
//                         url: url
//                     }
//                 })
//             } else if (table === 'activity') {
//                 return await t.activity_photos.create({
//                     data: {
//                         activity_id: entity_id,
//                         url: url
//                     }
//                 })
//             }
//         })

//         revalidatePath(path)
//         return { photo_id: newPhoto?.photo_id as number, url: newPhoto?.url as string }

//     } catch (error) {
//         throw error
//     }
// }

// export async function deletePhoto(table: string, id: number, path: string) {

//     try {

//         const result = await prisma.$transaction(async t => {

//             if (table === 'book') {
//                 await t.book_photos.delete({
//                     where: {
//                         photo_id: id,
//                     }
//                 })
//             } else if (table === 'activity') {
//                 await t.activity_photos.delete({
//                     where: {
//                         photo_id: id,
//                     }
//                 })
//             }
//         })

//         revalidatePath(path)
//         return result

//     } catch (error) {
//         throw error
//     }
// }

// ////////////////////////////////////////////////////////////////////////////////
// //              Rating
// ////////////////////////////////////////////////////////////////////////////////
// export async function addRating(book_id: number, prevState: State, formData: FormData) {

//     const session = await auth()

//     if (!session) {
//         return { message: "You must be logged in" }
//     }

//     await prisma.$transaction([
//         prisma.ratings.create({
//             data: {
//                 book_id: book_id,
//                 user_id: Number(session?.user.id),
//                 rating: +formData.get('rating')!,
//             }
//         })
//     ])

//     return {
//         message: "Thank you for your review"
//     }
// }


// export type State = {
//     message?: string | null
//     requireSignOut?: boolean
// }


// //////////////////////////////////////////////////
// //SEARCH BOOK 
// ///////////////////////////////////////////////////
// export type BookAuthorInfo = { // Chỉ lấy các trường cần thiết của tác giả
//     user_id: number;
//     name: string | null;
// };

// export type BookSearchResult = Omit<Prisma.booksGetPayload<{
//     include: { book_photos: true, users: true } // Bao gồm cả users (tác giả)
// }>, 'price' | 'created_at' | 'totalPages' | 'author_id' | 'users'> & { // Loại bỏ các trường cần serialize và author_id, users gốc
//     price: number; // price sẽ là number sau khi serialize
//     created_at: string; // created_at sẽ là string (ISO) sau khi serialize
//     totalPages: number | null; // totalPages sẽ là number hoặc null
//     book_photos: { url: string }[]; // Đảm bảo kiểu này
//     author: BookAuthorInfo | null; // Thêm thông tin tác giả đã được xử lý
// };

// export interface PaginatedBookSearchResult {
//     books: BookSearchResult[];
//     totalResults: number;
//     totalPages: number;
//     currentPage: number;
// }

// const SEARCH_ITEMS_PER_PAGE = 20; // Hoặc một giá trị bạn muốn

// export async function searchBooks(
//     query: string,
//     criteria: 'name' | 'author' | 'description' | 'all',
//     page: number = 1
// ): Promise<PaginatedBookSearchResult> {
//     if (!query || query.trim() === '') {
//         console.log("[searchBooks] Query is empty, returning empty paginated result.");
//         return { books: [], totalResults: 0, totalPages: 0, currentPage: 1 };
//     }

//     const searchQuery = query.trim();
//     let whereClause: Prisma.booksWhereInput = {};

//     if (criteria === 'name') {
//         whereClause = { name: { contains: searchQuery } };
//     } else if (criteria === 'author') {
//         // SỬA Ở ĐÂY: Tìm kiếm theo tên của user (tác giả) liên quan
//         whereClause = {
//             users: { // 'users' là tên trường quan hệ trong model 'books'
//                 name: {
//                     contains: searchQuery,

//                 }
//             }
//         };
//     } else if (criteria === 'description') {
//         whereClause = { description: { contains: searchQuery } };
//     } else if (criteria === 'all') {
//         whereClause = {
//             OR: [
//                 { name: { contains: searchQuery } },
//                 { users: { name: { contains: searchQuery } } }, // Tìm theo tên tác giả
//                 { description: { contains: searchQuery } },
//             ],
//         };
//     } else {
//         console.warn(`[searchBooks] Invalid search criteria received: ${criteria}`);
//         return { books: [], totalResults: 0, totalPages: 0, currentPage: page };
//     }

//     console.log(`[searchBooks] Searching for: "${searchQuery}", Criteria: "${criteria}", Page: ${page}, WhereClause:`, JSON.stringify(whereClause));

//     try {
//         const skipAmount = (page - 1) * SEARCH_ITEMS_PER_PAGE;

//         const [foundBooksFromDb, totalResults] = await prisma.$transaction([
//             prisma.books.findMany({
//                 where: whereClause,
//                 include: {
//                     book_photos: {
//                         select: { url: true },
//                         take: 1,
//                     },
//                     users: { // QUAN TRỌNG: Include thông tin tác giả (user)
//                         select: {
//                             user_id: true,
//                             name: true,
//                         }
//                     }
//                 },
//                 skip: skipAmount,
//                 take: SEARCH_ITEMS_PER_PAGE,
//                 orderBy: {
//                     name: 'asc'
//                 }
//             }),
//             prisma.books.count({
//                 where: whereClause,
//             }),
//         ]);

//         console.log(`[searchBooks] Found ${foundBooksFromDb.length} books for page ${page}, Total results: ${totalResults}.`);

//         // Serialize sách và định dạng lại thông tin tác giả
//         const serializableBooks = foundBooksFromDb.map(book => {
//             const { price, created_at, totalPages, users, author_id, ...restOfBook } = book;
//             return {
//                 ...restOfBook,
//                 price: price.toNumber(), // Chuyển Decimal sang number
//                 created_at: created_at.toISOString(), // Chuyển Date sang ISO string
//                 totalPages: totalPages === null ? null : Number(totalPages), // Chuyển BigInt? sang number?
//                 book_photos: book.book_photos || [], // Đảm bảo book_photos là mảng
//                 author: users ? { user_id: users.user_id, name: users.name } : null, // Trích xuất thông tin tác giả
//             };
//         });

//         return {
//             books: serializableBooks as BookSearchResult[], // Ép kiểu sau khi đã serialize
//             totalResults,
//             totalPages: Math.ceil(totalResults / SEARCH_ITEMS_PER_PAGE),
//             currentPage: page,
//         };

//     } catch (error) {
//         console.error("[searchBooks] Error during paginated book search:", error);
//         return { books: [], totalResults: 0, totalPages: 0, currentPage: page };
//     }
// }

// export async function handleSearchBarSearch(formData: FormData) {
//     const search_by_value = formData.get('search_by') as string; // Giá trị từ Select (all, name, author, description)
//     const search_query = formData.get('search') as string;

//     console.log('[Search Bar Action] Criteria (search_by):', search_by_value);
//     console.log('[Search Bar Action] Query (search):', search_query);

//     if (search_query && search_query.trim() !== '' && search_by_value) {
//         const params = new URLSearchParams();
//         params.set('q', search_query.trim());      // 'q' cho query (từ khóa tìm kiếm)
//         params.set('crit', search_by_value); // 'crit' cho criteria (tiêu chí tìm kiếm)

//         redirect(`/search?${params.toString()}`);
//     } else {
//         // Nếu không có query hoặc criteria, có thể redirect về trang search trống
//         redirect('/search');
//     }
// }


// ///////////////////////////////////////////////
// //Reading
// ///////////////////////////////////////////////
// export interface ReadingSessionDataForClient {
//     session_id: string;
//     user_id: number; // Vẫn giữ user_id là number ở đây vì DB của bạn dùng Int
//     book_id: number;
//     last_location: string | null;
//     last_read_timestamp: Date;
//     book_file_path: string | null;
//     book_name?: string | null;
// }

// // --- Server Actions cho ReaderController ---

// /**
//  * Tải thông tin sách và session đọc cho người dùng.
//  * Nếu chưa có session, tạo một session mới.
//  * @param bookID ID của sách
//  * @returns ReadingSessionData hoặc lỗi
//  */

// export async function loadBookForReading(bookId: number): Promise<{ data?: ReadingSessionDataForClient; error?: string }> {
//     const session = await auth(); // Hàm auth từ file auth.ts của dự án chung

//     // Kiểm tra session và session.user.id (là user_id dạng string)
//     if (!session?.user?.id) { // DÙNG session.user.id
//         console.log('[loadBookForReading] User not authenticated or session.user.id is missing.');
//         return { error: 'User not authenticated. Please sign in to read.' };
//     }
//     console.log('[loadBookForReading] session.user.id (string from session):', session.user.id);
//     // Chuyển đổi session.user.id (string) thành number
//     const userId = parseInt(session.user.id, 10);
//     console.log('[loadBookForReading] userId (after parseInt):', userId);
//     if (isNaN(userId)) {
//         console.error('[loadBookForReading] Error: userId is NaN. session.user.id was:', session.user.id);
//         return { error: 'Invalid user session data.' };
//     }

//     try {
//         const book = await prisma.books.findUnique({
//             where: { book_id: bookId },
//             select: {
//                 name: true,
//                 file_path: true,
//                 state: true
//             },
//         });

//         if (!book) {
//             return { error: 'Book not found.' };
//         }

//         if (!book.state) {
//             return { error: 'You do not have permission to read this book or it is not available for reading online.' };
//         }

//         if (!book.file_path) {
//             return { error: 'Book file (digital copy) is not available for reading.' };
//         }

//         let readingSession = await prisma.reading_sessions.findUnique({
//             where: { user_id_book_id: { user_id: userId, book_id: bookId } }, // userId đã là number
//         });

//         if (!readingSession) {
//             console.log(`[loadBookForReading] Creating new reading session for userId: ${userId}, bookId: ${bookId}`);
//             // Kiểm tra xem user có tồn tại không trước khi tạo session (tùy chọn, nhưng tốt cho debug)
//             const userExists = await prisma.users.findUnique({ where: { user_id: userId } });
//             if (!userExists) {
//                 console.error(`[loadBookForReading] CRITICAL: User with ID ${userId} does not exist in DB. Cannot create reading session.`);
//                 return { error: `User session is invalid or user does not exist (ID: ${userId}). Please sign out and sign in again.` };
//             }
//             readingSession = await prisma.reading_sessions.create({
//                 data: {
//                     user_id: userId, // userId đã là number
//                     book_id: bookId,
//                     last_location: null,
//                 },
//             });
//         }

//         return {
//             data: {
//                 session_id: readingSession.session_id,
//                 user_id: readingSession.user_id, // Đây là user_id (number) từ DB
//                 book_id: readingSession.book_id,
//                 last_location: readingSession.last_location,
//                 last_read_timestamp: readingSession.last_read_timestamp,
//                 book_file_path: book.file_path,
//                 book_name: book.name,
//             },
//         };
//     } catch (error) {
//         console.error('Error loading book for reading:', error);
//         return { error: 'Failed to load book for reading due to a server error.' };
//     }
// }



// /**
//  * Lấy nội dung của một trang sách cụ thể.
//  * Đây là phần phức tạp nhất, cần thư viện xử lý EPUB.
//  * Tạm thời, chúng ta sẽ giả lập việc lấy nội dung.
//  * @param bookId ID của sách
//  * @param pageNumber Số trang cần lấy
//  * @param bookFilePath Đường dẫn đến file sách (EPUB)
//  * @param bookTotalPages Tổng số trang của sách
//  * @returns PageData hoặc lỗi
//  */


// /**
//  * Lưu tiến trình đọc (trang hiện tại) của người dùng.
//  * @param bookId ID của sách
//  * @param currentPage Trang hiện tại người dùng đang đọc
//  * @returns Object chứa success hoặc error message
//  */





// export async function saveReadingProgress(
//     bookId: number,
//     currentLocation: string
// ): Promise<{ success?: string; error?: string }> {
//     const session = await auth(); // Hàm auth từ file auth.ts của dự án chung

//     // Kiểm tra session và session.user.id (là user_id dạng string)
//     if (!session?.user?.id) { // DÙNG session.user.id
//         return { error: 'User not authenticated. Cannot save progress.' };
//     }

//     // Chuyển đổi session.user.id (string) thành number
//     const userId = parseInt(session.user.id, 10);
//     if (isNaN(userId)) {
//         return { error: 'Invalid user session data.' };
//     }

//     if (!currentLocation || typeof currentLocation !== 'string') {
//         return { error: 'Invalid reading location (CFI) provided.' };
//     }

//     try {
//         await prisma.reading_sessions.upsert({
//             where: { user_id_book_id: { user_id: userId, book_id: bookId } }, // userId đã là number
//             update: { last_location: currentLocation },
//             create: {
//                 user_id: userId, // userId đã là number
//                 book_id: bookId,
//                 last_location: currentLocation,
//             },
//         });
//         return { success: 'Reading progress saved.' };
//     } catch (error) {
//         console.error('Error saving reading progress:', error);
//         return { error: 'Failed to save reading progress due to a server error.' };
//     }
// }


// ////////////////////////////////////////////////////////////////////////////////
// //              Request
// ////////////////////////////////////////////////////////////////////////////////

// // Kiểu dữ liệu khi tạo yêu cầu thay đổi sách (admin hoặc user gửi request)
// type BookRequestInput = Omit<
//     Prisma.book_requestsCreateInput,
//     "id" | "status" | "requested_at" | "processed_at"
// >

// /**
//  * Dùng khi admin muốn tạo request thay mặt ai đó (hiếm khi, chủ yếu là user sẽ gửi)
//  */
// export async function requestBookChange(input: BookRequestInput) {
//     const session = await auth()
//     if (!session) throw new Error("Unauthorized")

//     await prisma.book_requests.create({
//         data: {
//             ...input,
//             author_id: session.user.id,
//         },
//     })
// }

// /**
//  * Admin phê duyệt yêu cầu thay đổi sách
//  * - id: id của bảng book_requests
//  * - path: đường dẫn cần revalidate
//  */
// export async function approveBookRequest(id: number, path: string) {
//     const req = await prisma.book_requests.findUnique({ where: { request_id: id } })
//     if (!req) throw new Error("Request not found")

//     await prisma.$transaction(async (tx) => {
//         const { action, book_id, details } = req

//         const parsedDetails = JSON.parse(details ?? "{}")

//         if (action === "add" || action === "create") {
//             // Tạo sách mới
//             await tx.books.create({
//                 data: {
//                     name: parsedDetails.name,
//                     isbn: parsedDetails.isbn,
//                     author_id: parsedDetails.author_id, // đảm bảo có giá trị hợp lệ
//                     file_path: parsedDetails.file_path,
//                     price: parsedDetails.price,
//                     published_date: parsedDetails.published_date,
//                     description: parsedDetails.description,
//                     cover_image: parsedDetails.cover_image,
//                     state: false,
//                     totalPages: parsedDetails.totalPages,
//                 },
//             })
//             // Sau đó nếu muốn xử lý categories (qua bảng book_category_links), có thể thêm đoạn riêng
//         } else if (action === "update") {
//             if (!book_id) throw new Error("Missing book_id for update")
//             await tx.books.update({
//                 where: { book_id },
//                 data: {
//                     name: parsedDetails.name,
//                     isbn: parsedDetails.isbn,
//                     author_id: parsedDetails.author_id,
//                     file_path: parsedDetails.file_path ?? null,
//                     price: parsedDetails.price,
//                     published_date: parsedDetails.published_date,
//                     description: parsedDetails.description ?? null,
//                     cover_image: parsedDetails.cover_image ?? null,
//                     state: parsedDetails.state ?? false,
//                     totalPages: parsedDetails.totalPages ?? null,
//                 },
//             })
//         } else if (action === "delete") {
//             if (!book_id) throw new Error("Missing book_id for delete")
//             await tx.books.delete({
//                 where: { book_id },
//             })
//         } else {
//             throw new Error(`Unknown request action: ${action}`)
//         }

//         // Cập nhật trạng thái yêu cầu thành "approved"
//         await tx.book_requests.update({
//             where: { request_id: id },
//             data: {
//                 status: "approved",
//                 // processed_at: new Date(), // Nếu cần, bạn có thể thêm cột processed_at vào schema
//             },
//         })
//     })

//     revalidatePath(path)
// }


// export async function rejectBookRequest(id: number) {
//     await prisma.book_requests.update({
//         where: { request_id: id },
//         data: {
//             status: "rejected",
//             // processed_at: new Date(),
//         },
//     })
// }

// export async function likeBook(bookId: number, path: string) {
//   const session = await auth()
//   if (!session?.user) {
//     throw new Error('Not authenticated')
//   }

//   try {
//     await prisma.liked_books.create({
//       data: {
//         book_id: bookId,
//         user_id: parseInt(session.user.id)
//       }
//     })
//     revalidatePath(path)
//   } catch (error) {
//     console.error('Error liking book:', error)
//     throw new Error('Failed to like book')
//   }
// }

// export async function unlikeBook(bookId: number, path: string) {
//   const session = await auth()
//   if (!session?.user) {
//     throw new Error('Not authenticated')
//   }

//   try {
//     await prisma.liked_books.deleteMany({
//       where: {
//         AND: [
//           { book_id: bookId },
//           { user_id: parseInt(session.user.id) }
//         ]
//       }
//     })
//     revalidatePath(path)
//   } catch (error) {
//     console.error('Error unliking book:', error)
//     throw new Error('Failed to unlike book')
//   }
// }


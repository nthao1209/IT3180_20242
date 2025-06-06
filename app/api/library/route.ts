// app/api/library/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth' // Đảm bảo đường dẫn đúng
import { prisma } from '@/lib/prisma' // Đảm bảo đường dẫn đúng

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            )
        }

        const userId = parseInt(session.user.id, 10)
        if (isNaN(userId)) {
            console.error("[API/LIBRARY] Invalid user ID in session:", session.user.id);
            return NextResponse.json(
                { error: 'Invalid user session data.' },
                { status: 400 }
            )
        }

        const userBooksRecords = await prisma.user_books.findMany({
            where: {
                user_id: userId
            },
            select: { // Sử dụng select để chỉ lấy các trường cần thiết từ user_books
                book_id: true, // Cần để lấy thông tin sách
                status: true, // LẤY TRỰC TIẾP TỪ user_books
                // Thêm id của user_books nếu cần cho key hoặc mục đích khác
                // id: true, 
                book: { // Include thông tin sách liên quan
                    select: {
                        book_id: true,
                        name: true,
                        cover_image: true,
                        file_path: true,
                        users: { // Tác giả của sách
                            select: {
                                name: true,
                                user_id: true,
                            }
                        },
                        book_photos: { // Lấy ảnh bìa từ book_photos nếu cover_image null
                            select: { url: true },
                            take: 1
                        }
                    }
                }
            }
        });

        if (!userBooksRecords) {
            return NextResponse.json({ books: [] });
        }

        const transformedBooks = userBooksRecords.map(ub => {
            if (!ub.book) {
                console.warn(`User_book record for user ${userId} is missing associated book data. UserBook book_id: ${ub.book_id}`);
                return null;
            }
            return {
                book_id: ub.book.book_id,
                name: ub.book.name,
                cover_image: ub.book.cover_image || ub.book.book_photos[0]?.url || null,
                file_path: ub.book.file_path,
                users: ub.book.users ? { name: ub.book.users.name, user_id: ub.book.users.user_id } : null,
                status: ub.status || "unknown", // LẤY TRỰC TIẾP TỪ ub (user_book record)
            };
        }).filter(book => book !== null);

        return NextResponse.json({ books: transformedBooks });

    } catch (error) {
        console.error('Error fetching user library:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user library due to a server error.' },
            { status: 500 }
        );
    }
}
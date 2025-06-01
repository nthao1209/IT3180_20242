// app/(home)/book/[bookId]/page.tsx
import { auth } from '@/auth';
import BackButton from '@/components/back-button';
import CommentBox from '@/components/comment-box';
import CommentCard from '@/components/comment-card';
import Rating from '@/components/rating';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { BookOpenCheck, BookText } from 'lucide-react'; 
import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button'; 

// app/(home)/book/[bookId]/page.tsx
// export default function BookDetailPageTest({ params }: { params: { bookId: string } }) {
//   return (
//     <div>
//       <h1>Book Detail Page</h1>
//       <p>Book ID: {params.bookId}</p>
//     </div>
//   );
// }

async function BookDetailsPage({ params }: {
    params: { bookId: string }
}) {
    const session = await auth();
    const bookIdFromParams = params.bookId;
    const bookIdAsNumber = Number(bookIdFromParams);

    if (isNaN(bookIdAsNumber)) {
        notFound();
    }

    // Cập nhật query để include thông tin tác giả (users)
    const [book_details, stats] = await prisma.$transaction([
        prisma.books.findUnique({
            where: { book_id: bookIdAsNumber },
            include: {
                ratings: { select: { rating: true } },
                book_photos: { select: { url: true }, take: 1 }, // Lấy ảnh đầu tiên làm ảnh bìa chính
                book_category_links: {
                    include: {
                        book_categories: { select: { category_name: true } }
                    }
                },
                users: { // Include thông tin tác giả từ model users
                    select: {
                        user_id: true,
                        name: true
                    }
                }
            }
        }),
        prisma.ratings.aggregate({
            _avg: { rating: true },
            _count: { rating: true },
            where: { book_id: bookIdAsNumber }
        }),
    ]);

    if (!book_details) {
        notFound();
    }
    
    // Kiểm tra xem sách có file_path và state là true để có thể đọc
    const canReadBook = book_details.state && book_details.file_path;
    // Lấy ảnh bìa: ưu tiên cover_image, nếu không có thì lấy ảnh đầu tiên từ book_photos
    const coverImageDisplay = book_details.cover_image || book_details.book_photos[0]?.url || '/default-book-cover.png';


    return (
        <div className='max-w-6xl mx-auto p-4 md:p-6'>
            <div className="mb-4">
              <BackButton />
            </div>
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <Image
                        width={300}
                        height={450}
                        src={coverImageDisplay} // Sử dụng ảnh bìa đã xác định
                        alt={book_details.name || 'Book cover'}
                        className='object-cover rounded-md shadow-lg'
                    />
                </div>

                <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                    <div>
                        <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-1 capitalize'>{book_details.name}</h1>
                        {/* Cập nhật hiển thị tên tác giả */}
                        <p className="text-lg text-blue-600 font-medium mb-3 capitalize">
                            By: {book_details.users?.name || "Unknown Author"}
                        </p>

                        <div className="flex items-center space-x-1 mb-3">
                            <Rating rating={stats._avg.rating || 0} />
                            <p className="text-gray-600 text-sm">({stats._count.rating} ratings)</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <div className='flex items-center p-2 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md space-x-1'>
                                <BookOpenCheck size={18} />
                                <span>Book, {book_details.published_date}</span>
                            </div>
                            {book_details.book_category_links.map((bcl: { category_id: React.Key | null | undefined; book_categories: { category_name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }) => (
                                <div key={bcl.category_id} className='capitalize px-3 py-1.5 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md'>
                                    {bcl.book_categories.category_name}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {canReadBook ? (
                        <Link href={`/read/${book_details.book_id}`} passHref legacyBehavior>
                            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                                <BookText className="mr-2 h-5 w-5" /> Đọc sách
                            </Button>
                        </Link>
                    ) : (
                        <Button size="lg" className="w-full sm:w-auto" disabled>
                            <BookText className="mr-2 h-5 w-5" /> Sách không có sẵn để đọc
                        </Button>
                    )}
                    
                    <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 border rounded-md">
                        <p className="font-medium text-gray-700 mb-1">Availability:</p>
                        <p>{book_details.state ? "Available for reading" : "Not available for online reading"}</p>
                        {book_details.file_path ? null : <p className="text-red-500">Digital copy not available.</p>}
                    </div>
                    

                    <Separator className='my-4' />

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">Mô tả</h2>
                        <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                            {/* Sử dụng dangerouslySetInnerHTML nếu description là HTML, nếu không thì chỉ cần text */}
                            {book_details.description ? (
                                (<p>{book_details.description}</p>) // Hoặc nếu description là HTML:
                                // <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book_details.description) }} />
                            ) : (
                                <p>No description available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Separator className='my-6 md:my-8' />
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Đánh giá & Bình luận</h2>
                {session?.user ? (
                    <CommentBox book_id={book_details.book_id} />
                ) : (
                    <p className='font-medium border rounded-md p-4 bg-yellow-50 text-yellow-700'>
                        <Link href={`/auth/signin?callbackUrl=/book/${book_details.book_id}`}
                            className='text-blue-600 hover:underline font-semibold'>Đăng nhập</Link> để để lại đánh giá hoặc bình luận.
                    </p>
                )}
                <CommentCard book_id={book_details.book_id} />
            </div>
        </div>
    );
}

export default BookDetailsPage;
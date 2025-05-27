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



async function BookDetailsPage({ params }: {
    params: { book_id: string } // book_id từ params luôn là string
}) {
    const session = await auth();
    const bookIdAsNumber = Number(params.book_id);

    if (isNaN(bookIdAsNumber)) {
        notFound();
    }

    const [book_details, stats] = await prisma.$transaction([
        prisma.books.findUnique({
            where: { book_id: bookIdAsNumber },
            include: {
                ratings: { select: { rating: true } },
                book_photos: { select: { url: true } },
                book_category_links: {
                    include: {
                        book_categories: { select: { category_name: true } }
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
    
    const canReadBook = book_details.state && book_details.file_path;

    return (
        <div className='max-w-6xl mx-auto p-4 md:p-6'> {/* Thêm padding cho toàn trang */}
            <div className="mb-4"> {/* Đặt BackButton ở vị trí hợp lý */}
              <BackButton />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                {/* Cột ảnh bìa */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <Image
                        width={300} // Tăng kích thước ảnh bìa
                        height={450}
                        src={book_details.book_photos[0]?.url || '/default-book-cover.png'}
                        alt={book_details.name || 'Book cover'}
                        className='object-cover rounded-md shadow-lg'
                    />
                </div>

                {/* Cột thông tin sách và hành động */}
                <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                    <div>
                        <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-1 capitalize'>{book_details.name}</h1>
                        <p className="text-lg text-blue-600 font-medium mb-3 capitalize">
                            By: {book_details.author || "Unknown Author"}
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
                            {book_details.book_category_links.map(bcl => (
                                <div key={bcl.category_id} className='capitalize px-3 py-1.5 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md'>
                                    {bcl.book_categories.category_name}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* NÚT ĐỌC SÁCH */}
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
                    
                    {/* (Tùy chọn) Hiển thị thông tin Availability nếu cần */}
                    {
                    <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 border rounded-md">
                        <p className="font-medium text-gray-700 mb-1">Availability:</p>
                        <p>{book_details.state ? "Available" : "Not Available"}</p>
                        {book_details.file_path ? null : <p className="text-red-500">Digital copy not available.</p>}
                    </div>
                    }

                    <Separator className='my-4' />

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">Mô tả</h2>
                        <p className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                            {book_details.description || "No description available."}
                        </p>
                    </div>
                </div>
            </div>

            <Separator className='my-6 md:my-8' />

            {/* Phần Bình luận và Đánh giá */}
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
    )
}

export default BookDetailsPage;
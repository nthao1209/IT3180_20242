import BackButton from '@/components/back-button'
import CommentBox from '@/components/comment-box'
import CommentCard from '@/components/comment-card'
import Rating from '@/components/rating'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth' 
import React from 'react'
import LikeButton from '@/components/like-button'
import PurchaseButton from '@/components/purchase-button'
import { notFound } from 'next/navigation'

type BookCategoryLink = {
  category_id: number;
  book_categories: {
    category_name: string;
  };
};

type BookDetails = {
  name: string;
  book_id: number;
  isbn: string;
  description: string | null;
  cover_image: string | null;
  file_path: string | null;
  price: any;
  published_date: number;
  created_at: Date;
  no_of_copies?: number;
  publish_year?: string | number;
  ratings?: { rating: number }[];
  book_photos?: { url: string }[];
  book_category_links?: BookCategoryLink[];
  users: { name: string };
  author?: string | null;
};

export default async function BookPage({ params }: { params: { book_id: string } }) {
  // Validate book_id parameter
  const bookId = parseInt(params.book_id);
  if (isNaN(bookId)) {
    notFound();
  }

  const session = await auth()
  const book = await prisma.books.findUnique({
    where: {
      book_id: bookId
    },
    include: {
      users: {
        select: {
          name: true
        }
      },
      book_photos: true,
      ratings: {
        select: {
          rating: true
        }
      },
      book_category_links: {
        include: {
          book_categories: {
            select: { category_name: true }
          }
        }
      }
    }
  })

  if (!book) {
    notFound()
  }

  const stats = await prisma.ratings.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    where: { book_id: bookId }
  })

  const isLiked = session?.user ? await prisma.liked_books.findFirst({
    where: {
      AND: [
        { book_id: bookId },
        { user_id: parseInt(session.user.id) }
      ]
    }
  }) : null

  const authorName = book.users?.name ?? null

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="flex flex-col lg:flex-row p-4 pt-16 space-y-8 sm:space-x-4">
        {book.book_photos?.[0]?.url && (
          <Image
            width={200}
            height={0}
            src={book.book_photos[0].url}
            alt='book'
            className='object-cover h-auto rounded-l-md'
          />
        )}

        <div className="flex-grow max-w-3xl">
          <h1 className='text-2xl font-bold text-gray-800 mb-1 capitalize'>{book.name}</h1>
          <p className="text-blue-500 font-medium mb-3 capitalize">
            {authorName}
          </p>

          <div className="flex items-center space-x-1 mb-3">
            <Rating rating={stats._avg.rating ?? 0} />
            <p className="text-gray-600 text-sm space-x-1">{stats._count.rating} (đánh giá)</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className='flex p-2 text-green-700 border border-green-500 rounded-md space-x-1'>
              <BookOpen /><span>Book,</span><span>{book.published_date}</span>
            </div>

            {book.book_category_links?.map((bcl: BookCategoryLink) => (
              <div key={bcl.category_id} className='capitalize px-4 py-2 text-gray-500 border border-gray-300 rounded-md'>
                {bcl.book_categories.category_name}
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-6 mb-6">
            {book.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
          </p>
        </div>

        <div className="lg:w-64 flex flex-col space-y-2">
          {session?.user && (
            <LikeButton 
              bookId={bookId} 
              initialLiked={!!isLiked} 
            />
          )}
          <PurchaseButton
            bookId={book.book_id}
            price={Number(book.price)}
            name={book.name}
            author={{ name: authorName }}
            cover_image={book.cover_image}
          />
        </div>
      </div>

      <Separator className='mt-4 mb-4' />

      {/* Phần đánh giá */}
      <div>
        <h2 className='text-xl font-bold mb-3'>Đánh giá</h2>
        {session?.user ? (
          <>
            <CommentBox book_id={bookId} />
            <CommentCard book_id={bookId} />
          </>
        ) : (
          <p className='font-bold border rounded-sm p-4'>
            <Link href={`/auth/signin?callbackUrl=/book/${params.book_id}`} className='text-blue-500'>
              Đăng nhập
            </Link> để gửi đánh giá
          </p>
        )}
      </div>

      <Separator className='mt-4 mb-4' />

      {/* Phần bình luận */}
      <div>
        <h2 className='text-xl font-bold mb-3'>Bình luận</h2>
        {session?.user ? (
          <div>
            {String(bookId)}
          </div>
        ) : (
          <p className='font-bold border rounded-sm p-4'>
            <Link href={`/auth/signin?callbackUrl=/book/${params.book_id}`} className='text-blue-500'>
              Đăng nhập
            </Link> để gửi bình luận
          </p>
        )}
      </div>
    </div>
  )
}
import BackButton from '@/components/back-button'
import CommentBox from '@/components/comment-box'
import CommentCard from '@/components/comment-card'
import CommentList from '@/components/CommentList' // Nhập CommentList
import HoldButton from '@/components/hold-button'
import Rating from '@/components/rating'
import StaffPickButton from '@/components/staff-pick-button'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth' 
import React from 'react'

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
  author: string | null;
  description: string | null;
  cover_image: string | null;
  file_path: string | null;
  price: any;
  published_date: Date | null;
  created_at: Date;
  no_of_copies?: number;
  publish_year?: string | number;
  ratings?: { rating: number }[];
  book_photos?: { url: string }[];
  book_category_links?: BookCategoryLink[];
};

async function BookDetailsPage({ params }: { params: { book_id: number } }) {
  //const session = await auth()
  const p = await params

  const [book_details, stats, reservation_count]: [BookDetails | null, any, number] = await prisma.$transaction([
    prisma.books.findUnique({
      where: {
        book_id: +p.book_id,
      },
      include: {
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
    }),
    prisma.ratings.aggregate({
      _avg: { rating: true },
      _count: { rating: true },
      where: { book_id: +p.book_id }
    }),
    prisma.reservations.count({
      where: { book_id: +p.book_id }
    }),
  ])

  if (!book_details) {
    return <div>Không tìm thấy sách!</div>
  }

  const copies_available = () => {
    if (book_details?.no_of_copies != null) {
      const count = book_details.no_of_copies - reservation_count
      return count < 0 ? 0 : count
    }
    return 0
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <BackButton />
      <div className="flex flex-col lg:flex-row p-4 pt-16 space-y-8 sm:space-x-4">
        {book_details?.book_photos?.[0]?.url && (
          <Image
            width={200}
            height={0}
            src={book_details.book_photos[0].url}
            alt='book'
            className='object-cover h-auto rounded-l-md'
          />
        )}

        <div className="flex-grow max-w-3xl">
          <h1 className='text-2xl font-bold text-gray-800 mb-1 capitalize'>{book_details.name}</h1>
          <p className="text-blue-500 font-medium mb-3 capitalize">
            {book_details.author}
          </p>

          <div className="flex items-center space-x-1 mb-3">
            <Rating rating={stats._avg.rating ?? 0} />
            <p className="text-gray-600 text-sm space-x-1">{stats._count.rating} (đánh giá)</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className='flex p-2 text-green-700 border border-green-500 rounded-md space-x-1'>
              <BookOpen /><span>Book,</span><span>{book_details.publish_year}</span>
            </div>

            {book_details.book_category_links?.map(bcl => (
              <div key={bcl.category_id} className='capitalize px-4 py-2 text-gray-500 border border-gray-300 rounded-md'>
                {bcl.book_categories.category_name}
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-6 mb-6">
            {book_details.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
          </p>
        </div>

        <div className="flex flex-col space-y-2 flex-grow">
          <div className="text-gray-600 flex flex-row space-x-4 sm:space-x-0 sm:flex-col sm:space-y-1 bg-green-50 p-2 border-l-4 border-green-500">
            <p className="text-green-700 font-medium pb-2">Tình trạng</p>
            <p className='text-sm'><span className='font-bold'>{book_details.no_of_copies}</span> bản</p>
            <p className='text-sm'><span className='font-bold'>{copies_available()}</span> bản sẵn có</p>
            <p className='text-sm'><span className='font-bold'>{reservation_count}</span> bản đang giữ</p>
          </div>

          <HoldButton book_id={p.book_id} />
          <StaffPickButton book_id={p.book_id} />
        </div>
      </div>

      <Separator className='mt-4 mb-4' />

      {/* Phần đánh giá */}
      <div>
        <h2 className='text-xl font-bold mb-3'>Đánh giá</h2>
        {session?.user ? (
          <>
            <CommentBox book_id={book_details.book_id} />
            <CommentCard book_id={book_details.book_id} />
          </>
        ) : (
          <p className='font-bold border rounded-sm p-4'>
            <Link href={`/auth/signin?callbackUrl=/book/${book_details.book_id}`} className='text-blue-500'>
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
          <CommentList bookId={book_details.book_id} />
        ) : (
          <p className='font-bold border rounded-sm p-4'>
            <Link href={`/auth/signin?callbackUrl=/book/${book_details.book_id}`} className='text-blue-500'>
              Đăng nhập
            </Link> để gửi bình luận
          </p>
        )}
      </div>
    </div>
  )
}

export default BookDetailsPage
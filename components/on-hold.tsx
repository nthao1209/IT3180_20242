import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import React from 'react'
import { getReservationRankForBook } from '@prisma/client/sql'
import Image from 'next/image'
import { formatISBN } from '@/lib/utils'
import HoldButton from './hold-button'

async function OnHold() {

  const session = await auth()

  const results = await prisma.reservations.findMany({
    where: {
      user_id: session?.user.user_id
    },
    include: {
      books: {
        select: {
          name: true,
          author: true,
          isbn: true,
          book_photos: {
            select: { url: true }
          }
        }
      }
    }
  })

  const getRankForUser = async (book_id: number) => {
    const rank = await prisma.$queryRawTyped(getReservationRankForBook(book_id, session?.user.user_id as number))

    return rank.length > 0 ? rank[0].queue_number : 0
  }

  return (
    <div className="space-y-2">
      {
        results.map(result => (
          <div key={result.book_id} className="flex flex-col sm:flex-row p-4 sm:space-x-4 border rounded-sm justify-between" >

            <div className="flex flex-col md:flex-row max-w-md sm:space-x-2">
              <Image
                width={100}
                height={0}
                src={result.books.book_photos[0].url!}
                alt="Book Cover"
                className="hidden sm:block object-fill rounded-l-md"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{result.books?.name}</h1>
                <p className="font-medium capitalize">
                  By: {result.books.author}
                </p>
                <p className='text-slate-400'>{formatISBN(result.books.isbn)}</p>
              </div>

            </div>

            <div className="flex flex-col space-y-1 max-w-2xl">
              <div className=" text-green-600 bg-green-50 p-2 border-l-4 border-green-500 ">
                <p className='font-bold'>You are # {getRankForUser(result.book_id)} in the waitlist.</p>
              </div>

              <HoldButton book_id={result.book_id} />
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default OnHold
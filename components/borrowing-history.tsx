import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { formatISBN, getDateWithOffset } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

async function BorrowingHistory() {
    const session = await auth()

    const results = await prisma.borrowings.findMany({
        where: {
            user_id: session?.user.user_id,
            return_date: {not: null}
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

    return (
        <div>

            {
                results.length > 0 ?
                    results.map(result => (
                        <div key={result.borrowing_id} className="flex flex-col lg:flex-row p-4 sm:space-x-4 border rounded-sm justify-evenly">
                            <Image
                                width={100}
                                height={0}
                                src={result.books.book_photos[0].url!}
                                alt="Book Cover"
                                className="hidden sm:block object-fill rounded-l-md"
                            />

                            <div className="flex-grow max-w-md space-y-1 mb-1">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{result.books?.name}</h1>
                                <p className="font-medium capitalize">
                                    By: {result.books.author}
                                </p>
                                <p className='text-slate-400'>{formatISBN(result.books.isbn)}</p>
                            </div>

                            <div className="flex flex-col space-y-1 border rounded-sm p-4 bg-slate-50">
                                <p>Checkout date: {format(getDateWithOffset(result.borrow_date),'MMM dd, yyyy')}</p>
                                <p>Due date: {format(getDateWithOffset(result.due_date),'MMM dd, yyyy')}</p>
                            </div>
                        </div>
                    ))
                    :
                    <h1 className='text-2xl text-slate-400 text-center p-8'>No bororwing history.</h1>
            }
        </div>
    )
}

export default BorrowingHistory
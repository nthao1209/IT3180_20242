import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { formatAmountForDisplay, formatISBN, getDateWithOffset } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'
import PayFineButton from './pay-fine-button'

async function Fines() {
    const session = await auth()

    const results = await prisma.fines.findMany({
        where: {
            user_id: session?.user.user_id,
            paid_date: null
        },
        include: {
            borrowings: {
                select: {
                    borrow_date: true,
                    return_date: true,
                    books: {
                        select: {
                            name: true,
                            author: true,
                            isbn: true,
                        }
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
                        <div key={result.fine_id} className="flex flex-col lg:flex-row p-4 sm:space-x-4 border rounded-sm justify-evenly">

                            <div className="flex-grow max-w-md space-y-1 mb-1">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{result.borrowings.books.name}</h1>
                                <p className="font-medium capitalize">
                                    By: {result.borrowings.books.author}
                                </p>
                                <p className='text-slate-400'>{formatISBN(result.borrowings.books.isbn)}</p>
                                <div>
                                    <p>Checkout date: {format(getDateWithOffset(result.borrowings.borrow_date), 'MMM dd, yyyy')}</p>
                                    <p>Return date: {format(getDateWithOffset(result.borrowings.return_date!), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2 border rounded-sm p-2 bg-slate-50 justify-between">
                                <div className=" text-red-600 bg-red-50 p-2 border-l-4 border-red-500 ">
                                    <p className='font-bold'>Fine: {formatAmountForDisplay((result.fine_amount as unknown) as number, 'CAD')}</p>
                                </div>

                                <PayFineButton fine_id={result.fine_id} />
                            </div>
                        </div>
                    ))
                    :
                    <h1 className='text-2xl text-slate-400 text-center p-8'>No fines.</h1>
            }
        </div>
    )
}

export default Fines
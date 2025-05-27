import { prisma } from '@/lib/prisma'
import { getAvatarLetter } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'
import Rating from './rating'
import { Separator } from './ui/separator'

async function CommentCard({ book_id }: { book_id: number }) {

    const ratings = await prisma.ratings.findMany({
        where: {
            book_id: book_id
        },
        include: {
            users: {
                select: { name: true }
            }
        }
    })

    return (
        <>
            {
                ratings.map(rating => (
                    <div key={rating.rating_id} className="flex flex-col p-2">
                        <div  className="flex items-start space-x-4 p-4 max-w-md sm:max-w-4xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">
                                {getAvatarLetter(rating.users.name)}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-lg font-semibold capitalize">{rating.users.name}</h4>

                                <div className="flex items-center space-x-2">
                                    <p className='text-sm text-gray-500'>{format(rating.created_at, 'MMM dd, yyyy')}</p>
                                    <Rating rating={rating.rating} />
                                </div>

                                <p className='mt-2 text-gray-700'>{rating.review}</p>
                            </div>
                        </div>
                        <Separator className='max-w-lg' />
                    </div>
                ))
            }
        </>
    )
}

export default CommentCard
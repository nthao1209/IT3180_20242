'use client'

import React, { useActionState, useState } from 'react'
import Rating from './rating'
import { Textarea } from './ui/textarea'
import { addRating, State } from '@/actions/actions'
import { Button } from './ui/button'

function CommentBox({ book_id }: { book_id: number }) {
    const intialState: State = { message: null }
    const [rating, setRating] = useState(0)
    const addRatingWithBookId = addRating.bind(null, book_id)
    const [state, formAction, isPending] = useActionState(addRatingWithBookId, intialState)

    return (
        <div className='flex flex-col p-2 max-w-4xl'>
            <div className='flex flex-col border rounded-sm bg-gray-50 p-4'>
                <p className='font-semibold text-lg'>Give your feedback</p>
                <form action={formAction}>
                    <input type='hidden' name='rating' value={rating} />
                    <Rating rating={rating} ratingClick={(index) => setRating(index)} />
                    <Textarea
                        maxLength={200}
                        className='bg-white'
                        name='comment'
                        placeholder='Leave your comments'
                    />
                    <Button type='submit' className='mt-2' disabled={isPending}>Submit</Button>
                    <div>
                        {state?.message ? (
                            <p className='my-2 text-sm'>{state.message}</p>
                        ) : null}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CommentBox
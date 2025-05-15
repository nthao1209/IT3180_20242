import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import React from 'react'
import CancelHoldButton from './cancel-hold-button'
import PlaceHoldButton from './place-hold-button'

async function HoldButton({ book_id }: { book_id: number }) {

    const session = await auth()

    if (!session) return null

    const reservation = await prisma.reservations.findFirst({
        where: {
            user_id: session.user.user_id,
            book_id: +book_id
        }
    })

    return (
        <>
        {
            reservation ? <CancelHoldButton reservation_id={reservation.reservation_id} /> 
            : <PlaceHoldButton book_id={book_id} />
        }
        </>
    )
}

export default HoldButton
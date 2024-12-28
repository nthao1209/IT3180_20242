import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import React from 'react'
import RemoveFromStaffPickButton from './remove-from-staffpick-button'
import AddToStaffPickButton from './add-to-staffpick-button'

async function StaffPickButton({ book_id }: { book_id: number }) {

    const session = await auth()

    if (!session) return null

    if (session && session.user.role !== 'staff') return null

    const has_staff_pick = await prisma.staff_picks.findFirst({
        where: {
            book_id: +book_id,
            user_id: +session.user.id!
        }
    })
  return (
    <>
        {
            has_staff_pick ? <RemoveFromStaffPickButton pick_id={has_staff_pick.pick_id} /> : <AddToStaffPickButton book_id={book_id} />
        }
    </>
  )
}

export default StaffPickButton
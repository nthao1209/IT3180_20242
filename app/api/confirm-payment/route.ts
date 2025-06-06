// app/api/admin/confirm-payment/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // sửa theo đường dẫn của bạn

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    const payment = await prisma.payments.findUnique({
      where: { id },
      include: {
        payment_books: true
      }
    })

    if (!payment || payment.status !== 'pending') {
      return NextResponse.json({ success: false, message: "Invalid or already processed" }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.payments.update({
        where: { id },
        data: {
          status: 'completed',
          completed_at: new Date()
        }
      })

      await tx.user_books.updateMany({
        where: {
          user_id: payment.user_id,
          book_id: {
            in: payment.payment_books.map(pb => pb.book_id)
          },
          status: 'pending_payment'
        },
        data: {
          status: 'active',
          purchased_at: new Date()
        }
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 })
  }
}

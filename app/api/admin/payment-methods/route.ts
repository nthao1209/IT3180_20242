// app/api/admin/payment-methods/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET     /api/admin/payment-methods
 *   → trả về danh sách các giá trị payment_method (distinct) hiện có trong bảng payments
 *
 * POST    /api/admin/payment-methods
 * PUT     /api/admin/payment-methods?id=xxx
 * DELETE  /api/admin/payment-methods?id=xxx
 *   → không support (405)
 */

export async function GET() {
  try {
    // 1) Sử dụng Prisma.PaymentsScalarFieldEnum.payment_method để chỉ định đúng enum
    const grouped = await prisma.payments.groupBy({
      by: [Prisma.PaymentsScalarFieldEnum.payment_method],
      where: {
        // Lọc loại bỏ các bản ghi payment_method = null
        payment_method: { not: null },
      },
    })

    // 2) Prisma trả về mảng { payment_method: string | null }, nên ép non-null để lấy string
    const methods = grouped.map((g) => g.payment_method as string)

    return NextResponse.json({ success: true, data: methods })
  } catch (error) {
    console.error('[GET] /api/admin/payment-methods error:', error)
    return NextResponse.json(
      { success: false, message: 'Không thể lấy danh sách phương thức thanh toán' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  )
}

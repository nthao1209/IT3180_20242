// app/api/admin/pending-payments/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pending = await prisma.payments.findMany({
      where: {
        status: 'pending'
      },
      select: {
        pay_id: true,
        user_id: true
      }
    })

    return NextResponse.json(pending)
  } catch (error) {
    console.error("Fetch pending payments error:", error)
    return NextResponse.json([], { status: 500 })
  }
}

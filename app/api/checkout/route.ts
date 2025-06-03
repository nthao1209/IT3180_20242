import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await request.json()

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    // Get book details and validate
    const books = await prisma.books.findMany({
      where: {
        book_id: {
          in: items.map(item => item.book_id)
        }
      },
      select: {
        book_id: true,
        name: true,
        price: true,
        state: true
      }
    })

    // Check if all books exist and are completed
    const invalidBooks = books.filter(book => !book.state)
    if (invalidBooks.length > 0) {
      return NextResponse.json(
        { error: 'Some books are not available for purchase' },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = books.reduce((sum, book) => sum + Number(book.price), 0)

    // Create payment records
    await prisma.$transaction(async (tx) => {
      // Create payment records
      await tx.payments.createMany({
        data: books.map(book => ({
          user_id: Number(session.user.id),
          book_id: book.book_id,
          amount: book.price,
          status: 'pending'
        }))
      })

      // Add books to user's library
      await tx.user_books.createMany({
        data: books.map(book => ({
          user_id: Number(session.user.id),
          book_id: book.book_id
        }))
      })
    })

    // Redirect to success page
    const headersList = await headers()
    const origin = headersList.get('origin')
    return NextResponse.json({
      url: `${origin}/purchase/success`
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
} 
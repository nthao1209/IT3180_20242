import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId || userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            )
        }

        const books = await prisma.user_books.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                book: {
                    include: {
                        users: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        // Transform the data to match the expected format
        const transformedBooks = books.map(book => ({
            book_id: book.book_id,
            name: book.book.name,
            cover_image: book.book.cover_image,
            file_path: book.book.file_path,
            users: book.book.users
        }))

        return NextResponse.json({ books: transformedBooks })
    } catch (error) {
        console.error('Error fetching library:', error)
        return NextResponse.json(
            { error: 'Failed to fetch library' },
            { status: 500 }
        )
    }
} 
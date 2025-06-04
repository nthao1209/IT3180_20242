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

        const reviews = await prisma.ratings.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                books: {
                    select: {
                        book_id: true,
                        name: true,
                        cover_image: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return NextResponse.json({ reviews })
    } catch (error) {
        console.error('Error fetching reviews:', error)
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        )
    }
} 
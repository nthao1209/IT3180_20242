'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Rating from './rating'

interface Review {
    rating_id: number
    rating: number
    created_at: Date
    books: {
        book_id: number
        name: string
        cover_image: string | null
    }
}

export default function RecentlyReviewed() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const session = await auth()
                if (!session?.user) {
                    setError('Please sign in to view your reviews')
                    return
                }

                const response = await fetch(`/api/reviews?userId=${session.user.id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews')
                }

                const data = await response.json()
                setReviews(data.reviews)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load reviews')
            } finally {
                setIsLoading(false)
            }
        }

        fetchReviews()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-600">
                {error}
            </div>
        )
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600">
                <p>You haven't reviewed any books yet</p>
                <Link href="/catalog" className="text-blue-500 hover:underline mt-2 inline-block">
                    Browse books
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
                <div key={review.rating_id} className="border rounded-lg overflow-hidden">
                    <Link href={`/book/${review.books.book_id}`}>
                        <div className="aspect-[3/4] relative">
                            {review.books.cover_image ? (
                                <Image
                                    src={review.books.cover_image}
                                    alt={review.books.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No cover</span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-1">{review.books.name}</h3>
                            <div className="flex items-center gap-2">
                                <Rating rating={review.rating} />
                                <span className="text-sm text-gray-600">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
} 
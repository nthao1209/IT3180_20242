'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Book {
    book_id: number
    name: string
    cover_image: string | null
    file_path: string | null
    users: {
        name: string
    }
}

export default function MyLibrary() {
    const [books, setBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const session = await auth()
                if (!session?.user) {
                    setError('Please sign in to view your library')
                    return
                }

                const response = await fetch(`/api/library?userId=${session.user.id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch library')
                }

                const data = await response.json()
                setBooks(data.books)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load library')
            } finally {
                setIsLoading(false)
            }
        }

        fetchBooks()
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

    if (books.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600">
                <p>Your library is empty</p>
                <Link href="/catalog" className="text-blue-500 hover:underline mt-2 inline-block">
                    Browse books
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <div key={book.book_id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] relative">
                        {book.cover_image ? (
                            <Image
                                src={book.cover_image}
                                alt={book.name}
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
                        <h3 className="font-semibold mb-1">{book.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{book.users.name}</p>
                        {book.file_path && (
                            <Link
                                href={book.file_path}
                                target="_blank"
                                className="block w-full text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Read Book
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
} 
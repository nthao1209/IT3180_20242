'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface Purchase {
    pay_id: number
    amount: number
    status: 'pending' | 'completed' | 'failed'
    created_at: Date
    completed_at: Date | null
    payment_method: string
    payment_details: string
    payment_books: {
        book_id: number
        amount: number
        books: {
            name: string
            cover_image: string | null
        }
    }[]
}

export default function PurchaseHistory() {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const session = await auth()
                if (!session?.user) {
                    setError('Please sign in to view your purchase history')
                    return
                }

                const response = await fetch(`/api/purchases?userId=${session.user.id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch purchase history')
                }

                const data = await response.json()
                setPurchases(data.purchases)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load purchase history')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPurchases()
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

    if (purchases.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600">
                No purchase history found
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {purchases.map((purchase) => (
                <div key={purchase.pay_id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-semibold">
                                Order #{purchase.pay_id}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {format(new Date(purchase.created_at), 'PPP')}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">
                                ${purchase.amount.toFixed(2)}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                purchase.status === 'completed' ? 'bg-green-100 text-green-800' :
                                purchase.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {purchase.payment_books.map((item) => (
                            <div key={item.book_id} className="flex items-center gap-4">
                                {item.books.cover_image && (
                                    <div className="relative w-16 h-24">
                                        <Image
                                            src={item.books.cover_image}
                                            alt={item.books.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h4 className="font-medium">{item.books.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        ${item.amount.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {purchase.status === 'completed' && purchase.completed_at && (
                        <p className="text-sm text-gray-600 mt-4">
                            Completed on {format(new Date(purchase.completed_at), 'PPP')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
} 
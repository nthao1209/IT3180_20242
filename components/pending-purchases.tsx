/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import { getPendingPurchases } from '@/actions/actions'
import BookCard from './bookcard'

export default function PendingPurchases() {
  // ← Tell TS “this is just an array of anything,” so it won’t infer `never[]`.
  const [pendingBooks, setPendingBooks] = useState<any[]>([])

  useEffect(() => {
    const fetchPending = async () => {
      const result = await getPendingPurchases()

      if (result.success && Array.isArray(result.books)) {
        // We’re asserting that result.books is at least an array of things.
        setPendingBooks(result.books as any[])
      } else {
        setPendingBooks([])
      }
    }
    fetchPending()
  }, [])

  if (pendingBooks.length === 0) {
    return <p className="text-gray-600">No pending purchases.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pendingBooks.map((book: any) => (
        // We’re assuming that `book.book_id` exists at runtime.
        <BookCard key={book.book_id} book={book} />
      ))}
    </div>
  )
}

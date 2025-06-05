// app/(admin)/admin/requests/page.tsx

import React from 'react'
import { prisma } from '@/lib/prisma'         
import RequestsTable from './requests-table' 
import type { Request } from './type'
import type { NextPage } from 'next'


export type RawBookRequest = {
  request_id: number
  author_id: number
  book_id: number | null
  created_at: Date
  action: string
  status: string
  details: string | null
  users: {
    name: string
  }
  books?: { name: string } | null 
}

const RequestsPage: NextPage = async () => {
  const rawRequests: RawBookRequest[] = await prisma.book_requests.findMany({
    where: { status: 'pending' },
    include: {
      users: { select: { name: true } },
      books: { select: { name: true } },
      // book_photos: true
    },
    orderBy: { created_at: 'desc' },
  })

  const mapped: Request[] = rawRequests.map((r) => ({
    id: r.request_id,
    book_title: r.books?.name ?? 'Không rõ',
    author_name: r.users.name,
    action: r.action as 'add' | 'update' | 'delete',
    status: r.status as 'pending' | 'approved' | 'rejected',
    created_at: r.created_at.toISOString(),
    // book_photos: r.book_photos ?? []
  }))

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Book Requests</h1>
      {/* total = mapped.length, data.data = mapped */}
      <RequestsTable data={{ data: mapped, total: mapped.length }} />
    </div>
  )
}

export default RequestsPage

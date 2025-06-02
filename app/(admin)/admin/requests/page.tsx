import RequestTable from './requests-table'
import { Request } from './columns'
import { prisma } from '@/lib/prisma'

// async function getBookRequests(): Promise<{ data: Request[], total: number }> {
//   // Gọi API hoặc truy vấn từ DB (mock dưới đây)
//   const res = await fetch('http://localhost:3000/api/book-requests', {
//     cache: 'no-store',
//   })


async function getBookRequests(): Promise<{ data: Request[], total: number }> {
  const dbResults = await prisma.bookRequest.findMany({
    orderBy: { requested_at: 'desc' }
  })

  const requests: Request[] = dbResults.map(req => ({
    id: req.id,
    book_title: req.book_title,
    author_name: req.author ?? 'Không rõ',
    type: (req.type === 'add' ? 'create' : req.type) as "create" | "update" | "delete",
    status: req.status as "pending" | "approved" | "rejected",
    created_at: req.requested_at.toISOString(),
  }))

  return {
    data: requests,
    total: requests.length,
  }
}


export default async function Page() {
  const requests = await getBookRequests()

  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Requests</h1>
      <RequestTable data={requests} />
    </div>
  )
}
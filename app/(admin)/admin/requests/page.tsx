import RequestTable from './requests-table'
import { Request } from './columns'
import { prisma } from '@/lib/prisma'

// async function getBookRequests(): Promise<{ data: Request[], total: number }> {
//   // Gọi API hoặc truy vấn từ DB (mock dưới đây)
//   const res = await fetch('http://localhost:3000/api/book-requests', {
//     cache: 'no-store',
//   })


async function getBookRequests(): Promise<{ data: Request[], total: number }> {
  const dbResults = await prisma.book_requests.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      books: {
        select: {
          name: true,
          users: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  const requests: Request[] = dbResults.map(req => ({
    id: req.request_id,
    book_title: req.books?.name ?? 'Unknown',
    author_name: req.books?.users?.name ?? 'Unknown',
    type: (req.action === 'add' ? 'create' : req.action) as "create" | "update" | "delete",
    status: req.status as "pending" | "approved" | "rejected",
    created_at: req.created_at.toISOString(),
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
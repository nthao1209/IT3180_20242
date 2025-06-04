// app/(admin)/admin/requests/page.tsx

import RequestTable from "./requests-table"
import { Request } from "./columns"
import { prisma } from "@/lib/prisma"


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

  const requests: Request[] = dbResults.map((req) => {
    // Nếu details là null hoặc không parse được, để rỗng {}
    const parsedDetails = req.details ? JSON.parse(req.details) : {}
    return {
      id: req.request_id,
      book_title: parsedDetails.name || "—", // Giả sử bạn lưu tên sách dưới key `name`
      author_name: req.users?.name || "Không rõ",
      type: (req.action === "add" ? "create" : req.action) as
        | "create"
        | "update"
        | "delete",
      status: req.status as "pending" | "approved" | "rejected",
      created_at: req.created_at.toISOString(),
    }
  })

  return {
    data: requests,
    total: requests.length,
  }
}

export default async function Page() {
  const { data, total } = await getBookRequests()

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Requests ({total})</h1>
      <RequestTable data={{ data, total }} />
    </div>
  )
}

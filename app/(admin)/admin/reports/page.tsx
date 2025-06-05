// /app/admin/reports/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type SalesReport = {
  totalRevenue: number
  totalBooksSold: number
  totalReads: number
  averageRating: number
}

export default function AdminReportsPage() {
  const [report, setReport] = useState<SalesReport | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchReport() {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/reports')
        const json = await res.json()
        if (json.success) {
          setReport(json.data)
        } else {
          toast.error(json.message || 'Lấy báo cáo thất bại')
        }
      } catch (error) {
        console.error('Fetch report error:', error)
        toast.error('Lỗi mạng khi lấy báo cáo')
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span>Đang tải báo cáo...</span>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="p-8">
        <p>Không có dữ liệu báo cáo.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Báo cáo thống kê</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-gray-500">Tổng doanh thu</p>
          <p className="text-2xl font-semibold text-green-600">
            ${report.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-gray-500">Tổng sách đã bán</p>
          <p className="text-2xl font-semibold">{report.totalBooksSold}</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-gray-500">Tổng lượt đọc</p>
          <p className="text-2xl font-semibold">{report.totalReads}</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-gray-500">Đánh giá trung bình</p>
          <p className="text-2xl font-semibold">{report.averageRating.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

// app/api/admin/reports/route.ts

import { NextResponse } from 'next/server'
import { fetchSalesReportFromDB } from '../../../../lib/db'

export async function GET() {
  try {
    const report = await fetchSalesReportFromDB()
    return NextResponse.json({ success: true, data: report })
  } catch (error) {
    console.error('[GET] /api/admin/reports error:', error)
    return NextResponse.json(
      { success: false, message: 'Không thể lấy báo cáo thống kê' },
      { status: 500 }
    )
  }
}

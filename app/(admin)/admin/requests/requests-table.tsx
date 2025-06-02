'use client'

import React, { startTransition, useState } from 'react'
import { columns, Request } from './columns'
import { DataTable } from '@/components/data-table'
import { usePathname } from 'next/navigation'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useToast } from '@/hooks/use-toast'
import { approveBookRequest, rejectBookRequest } from '@/actions/actions'
import RequestDetailDialog from './requestDialogy'

type Props = {
  data: Request[],
  total: number
}

function RequestsTable({ data }: { data: Props }) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>()
  const [selectedRequest, setSelectedRequest] = useState<Request>()
  const [openDetailDialog, setOpenDetailDialog] = useState(false)

  const pathname = usePathname()
  const { toast } = useToast()

  const handleApprove = (item: Request) => {
    setActionType('approve')
    setSelectedRequest(item)
    setOpenConfirmDialog(true)
  }

  const handleReject = (item: Request) => {
    setActionType('reject')
    setSelectedRequest(item)
    setOpenConfirmDialog(true)
  }

  const handleViewDetail = (item: Request) => {
    setSelectedRequest(item)
    setOpenDetailDialog(true)
  }

  const handleConfirm = async () => {
    if (!selectedRequest || !actionType) return
    setOpenConfirmDialog(false)

    startTransition(async () => {
      if (actionType === 'approve') {
        await approveBookRequest(selectedRequest.id, pathname)
        toast({ description: `The request for "${selectedRequest.book_title}" has been approved.` })
      } else {
        await rejectBookRequest(selectedRequest.id)
        toast({ description: `The request for "${selectedRequest.book_title}" has been rejected.` })
      }
    })
  }

  return (
    <>
      <DataTable
        columns={columns({ onApprove: handleApprove, onReject: handleReject, onView: handleViewDetail })}
        data={data.data}
        total={data.total}
        filter_column='book_title'
        onRowDelete={() => {}}
        onRowEdit={() => {}}
      />

      <RequestDetailDialog
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        request={selectedRequest}
      />

      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to ${actionType === 'approve' ? 'approve' : 'reject'} this request?`}
      />
    </>
  )
}

export default RequestsTable

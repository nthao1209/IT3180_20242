// app/(admin)/admin/requests/requests-table.tsx
'use client'

import React, { startTransition, useState } from 'react'
import type { Request } from './type'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { usePathname } from 'next/navigation'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useToast } from '@/hooks/use-toast'
import { approveBookRequest, rejectBookRequest } from '@/app/actions/actions'
import RequestDetailDialog from './requestDialogy'

type Props = {
  data: {
    data: Request[]
    total: number
  }
}

function RequestsTable({ data }: Props) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>()
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
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
      try {
        if (actionType === 'approve') {
          await approveBookRequest(selectedRequest.id, pathname)
          toast({
            description: `The request for "${selectedRequest.book_title}" has been approved.`,
          })
        } else {
          await rejectBookRequest(selectedRequest.id, pathname)
          toast({
            description: `The request for "${selectedRequest.book_title}" has been rejected.`,
          })
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Something went wrong'
        console.error(error)
        toast({
          variant: 'destructive',
          description: message,
        })
      }
    })
  }

  return (
    <>
      <DataTable
        columns={columns({
          onApproveAction: handleApprove,
          onRejectAction: handleReject,
          onViewAction: handleViewDetail,
        })}
        data={data.data}
        total={data.total}
        filter_column="book_title"
        onRowDelete={() => {}}
        onRowEdit={() => {}}
      />

      {selectedRequest && (
        <RequestDetailDialog
          open={openDetailDialog}
          setOpen={setOpenDetailDialog}
          request={selectedRequest}
        />
      )}

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

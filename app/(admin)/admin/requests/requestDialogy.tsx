'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Request } from './columns'

type Props = {
  open: boolean,
  setOpen: (open: boolean) => void,
  request?: Request
}

export default function RequestDetailDialog({ open, setOpen, request }: Props) {
  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        <div className='space-y-2'>
          <p><strong>Book title:</strong> {request.book_title}</p>
          <p><strong>Author:</strong> {request.author_name}</p>
          <p><strong>Request:</strong> {request.action}</p>
          <p><strong>Date:</strong> {request.created_at}</p>
          <p><strong>Status:</strong> {request.status}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

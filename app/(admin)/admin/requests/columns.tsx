// app/(admin)/admin/requests/columns.tsx
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import DataTableColumnHeader from '@/components/data-table-column-header'
import Image from 'next/image'
import type { Request } from './type'


type ColumnProps = {
  onApproveAction: (item: Request) => void
  onRejectAction: (item: Request) => void
  onViewAction: (item: Request) => void
}

type Photo = {
  photo_id: number
  url: string
}

export function columns({
  onApproveAction,
  onRejectAction,
  onViewAction,
}: ColumnProps): ColumnDef<Request>[] {
  return [
    {
      accessorKey: 'book_photos',
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
      ),
      cell: ({ row }) => {
        const photos = (row.getValue('book_photos') as Photo[] | undefined) ?? []
        if (photos.length === 0) return null
        const lastUrl = photos[photos.length - 1]?.url
        return (
          <Image width={40} height={40} alt="Book cover" src={lastUrl} />
        )
      },
    },
    {
      accessorKey: 'book_title',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Book title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'author_name',
      header: 'Author',
    },
    {
      accessorKey: 'action',
      header: 'Request',
      cell: ({ row }) => {
        const action = row.original.action
        if (action === 'add') return 'Add'
        if (action === 'update') return 'Update'
        return 'Delete'
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Date submitted',
      cell: ({ row }) => {
        return new Date(row.original.created_at).toLocaleDateString()
      },
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewAction(item)}>
              Check
            </Button>
            <Button variant="default" size="sm" onClick={() => onApproveAction(item)}>
              Accept
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onRejectAction(item)}>
              Reject
            </Button>
          </div>
        )
      },
    },
  ]
}

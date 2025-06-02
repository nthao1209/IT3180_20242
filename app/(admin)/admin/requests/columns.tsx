'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import DataTableColumnHeader from "@/components/data-table-column-header"
// import { Check, CircleOff } from "lucide-react"
import Image from "next/image"

export type Request = {
  id: number
  book_title: string
  author_name: string
  type: 'create' | 'update' | 'delete'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

type ColumnProps = {
  onApprove: (item: Request) => void
  onReject: (item: Request) => void
  onView: (item: Request) => void
}

type Photo = {
    photo_id: number,
    url: string
}
export function columns({ onApprove, onReject, onView }: ColumnProps): ColumnDef<Request>[] {
  return [
      {
      accessorKey: 'book_photos',
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
      ),
      cell: ({ row }) => {
        const photos = (row.getValue('book_photos') as Photo[] | undefined) ?? [];
        if (photos.length === 0) return null;
        const lastUrl = photos[photos.length - 1]?.url;
        return (
          <Image
            width={40}
            height={40}
            alt="Book cover"
            src={lastUrl}
          />
        );
      },
    },
    {
      accessorKey: 'book_title',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Book title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
    },
    {
      accessorKey: 'author_name',
      header: 'Author'
    },
    {
      accessorKey: 'type',
      header: 'Request',
      cell: ({ row }) => {
        const type = row.original.type
        if (type === 'create') return 'Add'
        if (type === 'update') return 'Update'
        return 'Delete'
      }
    },
    {
      accessorKey: 'created_at',
      header: 'Date submitted',
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={() => onView(item)}>Check</Button>
            <Button variant='success' size='sm' onClick={() => onApprove(item)}>Accept</Button>
            <Button variant='destructive' size='sm' onClick={() => onReject(item)}>Reject</Button>
          </div>
        )
      }
    }
  ]
}

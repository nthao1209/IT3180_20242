import { createRowActions } from "@/components/data-table-actions"
import DataTableColumnHeader from "@/components/data-table-column-header"
import { formatISBN } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Check, CircleOff } from "lucide-react"
import Image from "next/image"
import { Decimal } from "@prisma/client/runtime/library"

export type Book = {
    book_id: number,
    name: string,
    isbn: string,
    published_date: number,
    price: number | Decimal,
    state: boolean,
    totalPages: number | null,
    book_photos?: { photo_id: number, url: string }[],
    book_category_links?: { category_id: number }[]
}

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'book_photos',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
        cell: ({ row }) => ((row.getValue('book_photos') as unknown) as { photo_id: number, url: string }[]).length > 0 && <Image width={40} height={0} alt="" 
        src={((row.getValue('book_photos') as unknown) as { photo_id: number, url: string }[]).map(p => p.url).pop()!} />
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <p className="capitalize">{row.getValue('name')}</p>
    },
    {
        accessorKey: 'isbn',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="ISBN" />,
        cell: ({ row }) => formatISBN(row.getValue('isbn'))
    },
    {
        accessorKey: 'published_date',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Publish year" />
    },
    {
        accessorKey: 'state',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
        cell: ({ row }) => (
            row.getValue('state') ? <Check size={16} className="text-green-500" />
            : <CircleOff size={16} className="text-red-500" />
        )
    },
    createRowActions<Book>()
]

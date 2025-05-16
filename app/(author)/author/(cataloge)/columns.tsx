import { createRowActions } from "@/components/data-table-actions"
import DataTableColumnHeader from "@/components/data-table-column-header"
import { formatISBN } from "@/lib/utils"
import { ColumnDef, StringOrTemplateHeader } from "@tanstack/react-table"
import { Check, CircleOff } from "lucide-react"
import Image from "next/image"


export type Book = {
    book_id: number,
    name: string,
    isbn: string,
    file_path: string,
    price: number,
    book_category_links?: { category_id: number }[],
    published_date: number,
    author: string
}

export const columns: ColumnDef<Book>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Publish year" />,
        cell: ({ row }) => <p className="capitalize">{row.getValue('published_date')}</p>
    },
    {
        accessorKey: 'price',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => <p className="capitalize">{row.getValue('price')}</p>
    },
    // {
    //     accessorKey: 'no_of_copies',
    //     enableSorting: false,
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="No of copies" />
    // },
    // {
    //     accessorKey: 'is_active',
    //     enableSorting: false,
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    //     cell: ({ row }) => (
    //         row.getValue('is_active') ? <Check size={16} className="text-green-500" />
    //         : <CircleOff size={16} className="text-red-500" />
    //     )
    // },
    createRowActions<Book>()
]
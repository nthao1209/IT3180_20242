import { createRowActions } from "@/components/data-table-actions"
import DataTableColumnHeader from "@/components/data-table-column-header"
import { formatISBN } from "@/lib/utils"
import { ColumnDef, StringOrTemplateHeader } from "@tanstack/react-table"
import { Check, CircleOff } from "lucide-react"
import Image from "next/image"

type Photo = {
    photo_id: number,
    url: string
}


export type Book = {
    book_id: number,
    name: string,
    isbn: string,
    file_path: string | null,
    price: number,
    book_category_links?: { category_id: number }[],
    book_photos?: Photo[],
    published_date: number,
    author_id: string,
    state: Boolean
}

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'book_photos',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
        cell: ({ row }) => ((row.getValue('book_photos') as unknown) as Photo[]).length > 0 && <Image width={40} height={0} alt="" 
        src={((row.getValue('book_photos') as unknown) as Photo[]).map(p => p.url).pop()!} />
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
        cell: ({ row }) => <p>{formatISBN(row.getValue('isbn'))}</p>
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
    {
        accessorKey: 'state',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
        cell: ({ row }) => (
          <p className="capitalize">{row.getValue('state') ? 'Done' : 'Wait'}</p>
        )
      },
    
    createRowActions<Book>()
]
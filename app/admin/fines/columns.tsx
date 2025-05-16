import { createRowActions } from "@/components/data-table-actions";
import DataTableColumnHeader from "@/components/data-table-column-header";
import { formatAmountForDisplay, getDateWithOffset } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";


export type Fine = {
    fine_id: number,
    fine_amount: number,
    fine_date: Date,
    paid_date: Date | null,
    users: {
        name: string
    }
}

export const columns: ColumnDef<Fine>[] = [
    {
        accessorKey: 'users.name',
        id: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
        accessorKey: 'fine_date',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fine date" />,
        cell: ({ row }) => format(getDateWithOffset(row.getValue('fine_date')), 'MMM, dd yyyy')
    },
    {
        accessorKey: 'fine_amount',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => formatAmountForDisplay(row.getValue('fine_amount'), 'CAD')
    },
    {
        accessorKey: 'paid_date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date paid" />,
        cell: ({ row }) => (
            row.getValue('paid_date') ? format(getDateWithOffset(row.getValue('paid_date')), 'MMM, dd yyyy')
            : <p className="text-red-500 font-bold">Not paid</p>
        )
    },
    createRowActions<Fine>({edit_label: 'Mark as paid'})
   
]
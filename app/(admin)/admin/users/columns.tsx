import { createRowActions } from "@/components/data-table-actions";
import DataTableColumnHeader from "@/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CircleOff } from "lucide-react";


export type User = {
    user_id: number,
    name: string,
    email: string,
    role: string,
    library_card_no: string,
    is_active: boolean | number,
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
        accessorKey: 'role',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    },
    {
        accessorKey: 'library_card_no',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Card no." />
    },
    {
        accessorKey: 'is_active',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
        cell: ({ row }) => (
            row.getValue('is_active') ? <Check size={16} className="text-green-500" /> : 
            <CircleOff size={16} className="text-red-500" />
        )
    },
    createRowActions<User>()
   
]
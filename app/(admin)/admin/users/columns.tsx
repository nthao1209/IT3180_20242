import { createRowActions } from "@/components/data-table-actions";
import DataTableColumnHeader from "@/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CircleOff } from "lucide-react";


export type User = {
    user_id: number,
    name: string,
    email: string,
    username: string,
    role: string,
    date_of_birth: Date | null,
    gender: string | null,
    created_at: Date
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
        accessorKey: 'username',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    },
    {
        accessorKey: 'email',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
    },
    {
        accessorKey: 'role',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    },
    createRowActions<User>()
]
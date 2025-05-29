// import { createRowActions } from "@/components/data-table-actions";
// import DataTableColumnHeader from "@/components/data-table-column-header";
// import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";

// export type Activity = {
//     activity_id: number,
//     title: string,
//     description?: string | null,
//     activity_date: Date,
//     start_time: string,
//     end_time: string,
//     age_group: string | null,
//     capacity?: number | null,
//     activity_photos?: {photo_id: number, url: string}[]
// }

// export const columns: ColumnDef<Activity>[] = [
//     {
//         accessorKey: 'title',
//         header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
//     },
//     {
//         accessorKey: 'activity_date',
//         header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
//         cell: ({ row }) => format(row.getValue('activity_date'), 'MMM dd, yyyy')
//     },
//     {
//         accessorKey: 'start_time',
//         header: ({ column }) => <DataTableColumnHeader column={column} title="Starts" />
//     },
//     {
//         accessorKey: 'end_time',
//         header: ({ column }) => <DataTableColumnHeader column={column} title="End" />
//     },
//     createRowActions<Activity>()

// ]

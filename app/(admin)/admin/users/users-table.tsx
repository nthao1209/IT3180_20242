'use client'

import { DataTable } from '@/components/data-table'
import React, { startTransition, useState } from 'react'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { usePathname } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { deleteUser } from '@/actions/actions'
import { columns, User } from './columns'
import AddUserDialog from '@/components/add-user-dialog'

type props = {
    data: User[],
    total: number
}
function UsersTable({ data }: { data: props }) {

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
    const [itemToAction, setItemToAction] = useState<User>()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { toast } = useToast()

    const handleRowDelete = (item: User) => {
        setOpenConfirmationDialog(true)
        setItemToAction(item)
    }

    const handleRowEdit = (item: User) => {
        setItemToAction(item)
        setOpen(true)
    }

    const handleConfirm = async () => {
        setOpenConfirmationDialog(false)

        if (itemToAction) {

            startTransition( async () => {
                await deleteUser(itemToAction.user_id, pathname)
            })

            toast({
                description: `${itemToAction.name} deleted`
            })
        }
    }

    return (
        <>
            <DataTable
                data={data.data}
                columns={columns}
                total={data.total}
                filter_column='name'
                onRowDelete={handleRowDelete}
                onRowEdit={handleRowEdit}
            />
            <AddUserDialog open={open} setOpen={setOpen} user={itemToAction} />
            <ConfirmationDialog 
                open={openConfirmationDialog}
                onClose={() => setOpenConfirmationDialog(false)}
                onConfirm={handleConfirm}
                message='By continuing you are going to delete the user, continue?'
            />
        </>

    )
}

export default UsersTable
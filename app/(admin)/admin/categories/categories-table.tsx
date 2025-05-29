// 'use client'

// import { DataTable } from '@/components/data-table'
// import React, { startTransition, useState } from 'react'
// import { Category, columns } from './columns'
// import ConfirmationDialog from '@/components/confirmation-dialog'
// import { usePathname } from 'next/navigation'
// import { useToast } from '@/hooks/use-toast'
// import { deleteCategory } from '@/actions/actions'
// import AddCategoryDialog from '@/components/add-category-dialog'

// type props = {
//     data: {
//         category_id: number,
//         category_name: string
//     }[],
//     total: number
// }
// function CategoriesTable({ data }: { data: props }) {

//     const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
//     const [itemToAction, setItemToAction] = useState<Category>()
//     const [open, setOpen] = useState(false)
//     const pathname = usePathname()
//     const { toast } = useToast()

//     const handleRowDelete = (item: Category) => {
//         setOpenConfirmationDialog(true)
//         setItemToAction(item)
//     }

//     const handleRowEdit = (item: Category) => {
//         setItemToAction(item)
//         setOpen(true)
//     }

//     const handleConfirm = async () => {
//         setOpenConfirmationDialog(false)

//         if (itemToAction) {

//             startTransition( async () => {
//                 await deleteCategory(itemToAction.category_id, pathname)
//             })

//             toast({
//                 description: `${itemToAction.category_name} deleted`
//             })
//         }
//     }

//     return (
//         <>
//             <DataTable
//                 data={data.data}
//                 columns={columns}
//                 total={data.total}
//                 filter_column='category_name'
//                 onRowDelete={handleRowDelete}
//                 onRowEdit={handleRowEdit}
//             />
//             <AddCategoryDialog open={open} setOpen={setOpen} category={itemToAction} />
//             <ConfirmationDialog
//                 open={openConfirmationDialog}
//                 onClose={() => setOpenConfirmationDialog(false)}
//                 onConfirm={handleConfirm}
//                 message='By continuing you are going to delete the category, continue?'
//             />
//         </>

//     )
// }

// export default CategoriesTable

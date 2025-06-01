import AddCategoryButton from '@/components/add-category-button'
import { prisma } from '@/lib/prisma'
import React from 'react'
import CategoriesTable from './categories-table'

async function CategoriesPage({
    searchParams
}: { searchParams: { page: string, limit: string } }) {

    const params = await searchParams
    const offset = parseInt(params.page || '10')
    const take = parseInt(params.limit || '10')

    const [categories, total ] = await prisma.$transaction([
        prisma.book_categories.findMany({ skip: offset, take: take}),
        prisma.book_categories.count()
    ])

    return (
        <div className='flex flex-col space-y-4'>
            <AddCategoryButton />
            <CategoriesTable data={{data: categories, total: total}} />
        </div>
    )
}

export default CategoriesPage
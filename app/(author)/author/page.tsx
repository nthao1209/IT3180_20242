import AddBookButton from '@/components/add-book-button'
import React from 'react'
import CatalogTable from './(cataloge)/catalog-table'
import { prisma } from '@/lib/prisma'

async function AdminPage({
  searchParams
}: { searchParams: { page: string, limit: string } })  {

  const params = await searchParams
  const offset = parseInt(params.page || '1')
  const take = parseInt(params.limit || '10')

  const [books, total] = await prisma.$transaction([
    prisma.books.findMany({
      skip: offset, take: take,
      select: {
        book_id: true,
        name: true,
        isbn: true,
        author: true,
        price: true,
        published_date: true,
        book_category_links: {
          select: {
            category_id: true
          }
        }
      }
    }),
    prisma.books.count()
  ])

  return (
    <div>
      <AddBookButton />
      <CatalogTable data={{data: books, total: total}} />
    </div>
  )
}

export default AdminPage
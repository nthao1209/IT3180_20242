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
        no_of_copies: true,
        isbn: true,
        is_active: true,
        publish_year: true, 
        author: true,
        book_photos: {
          select: {
            photo_id: true,
            url : true
          }
        },
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
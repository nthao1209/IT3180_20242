import AddBookButton from '@/components/add-book-button'
import React from 'react'
import CatalogTable from './(cataloge)/catalog-table'
import { prisma } from '@/lib/prisma'
import { Book } from './(cataloge)/columns'

async function AdminPage({
  searchParams
}: { searchParams: { page: string, limit: string } }) {

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
        published_date: true,
        author_id: true,
        state: true,
        users: {
          select: {
            name: true
          }
        },
        book_photos: {
          select: {
            photo_id: true,
            url: true
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

  // Transform the data to match the Book type
  const transformedBooks: Book[] = books.map(book => ({
    book_id: book.book_id,
    name: book.name,
    isbn: book.isbn,
    publish_year: book.published_date,
    no_of_copies: 1, // Default value since it's not in the schema
    is_active: book.state,
    author: book.users.name,
    book_photos: book.book_photos,
    book_category_links: book.book_category_links
  }))

  return (
    <div>
      <AddBookButton />
      <CatalogTable data={{ data: transformedBooks, total: total }} />
    </div>
  )
}

export default AdminPage

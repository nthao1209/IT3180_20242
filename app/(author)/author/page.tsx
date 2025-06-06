import AddBookButton from '@/components/add-book-button'
import React from 'react'
import CatalogTable from './(cataloge)/catalog-table'
import { prisma } from '@/lib/prisma'
import { auth, signIn, signOut } from "@/auth";

async function AuthorPage({
  searchParams
}: { searchParams: { page: string, limit: string } })  {

  const params = await searchParams
  const offset = parseInt(params.page || '1')
  const take = parseInt(params.limit || '10')
  const session = await auth();

  const [books, total] = await prisma.$transaction([
    prisma.books.findMany({
      skip: offset, take: take,
      where: {author_id: parseInt(session.user.id, 10) },
      select: {
        book_id: true,
        name: true,
        isbn: true,
        author_id: true,
        price: true,
        state: true,
        published_date: true,
        book_category_links: {
          select: {
            category_id: true
          }
        },
        book_photos: {
          select: {
            photo_id: true,
            url : true
          }
        },
        book_requests: {
          where:{
            action: 'update'
          },
          orderBy: {
            created_at: 'desc'
          },
          take: 1,
          select: {
            action: true,
            status: true
          }
        }
       
      }
    }),
    prisma.books.count()
  ])

  return (
    <div>
      <AddBookButton />
      <CatalogTable data={books} total={total} />
    </div>
  )
}

export default AuthorPage

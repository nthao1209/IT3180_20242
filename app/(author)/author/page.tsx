import AddBookButton from '@/components/add-book-button'
import React from 'react'
import CatalogTable from './(cataloge)/catalog-table'
import { prisma } from '@/lib/prisma'
import { auth, signIn, signOut } from "@/auth";
import { Decimal } from "@prisma/client/runtime/library"

type Book = {
  book_id: number;
  name: string;
  isbn: string;
  published_date: number;
  price: Decimal;
  state: boolean;
  book_photos: { url: string; photo_id: number; }[];
  book_category_links: { category_id: number; }[];
  author_id: number;
  file_path: string;
  author: {
    user_id: number;
    name: string | null;
  };
}

async function AuthorPage({
  searchParams
}: { searchParams: { page: string, limit: string } })  {

  const params = await searchParams
  const offset = parseInt(params.page || '1')
  const take = parseInt(params.limit || '10')
  const session = await auth();

  const [books, total] = await prisma.$transaction([
    prisma.books.findMany({
      skip: offset,
      take: take,
      include: {
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
        },
        users: {
          select: {
            user_id: true,
            name: true
          }
        }
      }
    }),
    prisma.books.count()
  ])

  const booksWithAuthor = books.map(book => ({
    ...book,
    author: book.users
  }))

  return (
    <div>
      <AddBookButton />
      <CatalogTable data={{data: booksWithAuthor, total: total}} />
    </div>
  )
}

export default AuthorPage

import AddBookButton from "@/components/request-add-book-button";
import CatalogTable from "./(cataloge)/catalog-table";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  requestAddBook,
  requestUpdateBook,
  requestDeleteBook,
} from "@/actions/actions";
import { Decimal } from "@prisma/client/runtime/library";

type Book = {
  book_id: number;
  name: string;
  isbn: string;
  published_date: Date;
  price: Decimal;
  state: boolean;
  book_photos: { url: string; photo_id: number; }[];
  book_category_links: { category_id: number; }[];
  author_id: number;
  file_path: string | null;
  author: {
    user_id: number;
    name: string | null;
  };
};

async function AuthorPage({
  searchParams,
}: {
  searchParams: { page: string; limit: string };
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const params = await searchParams;
  const offset = parseInt(params.page || "1") - 1;
  const take = parseInt(params.limit || "10");

  const [books, total] = await prisma.$transaction([
    prisma.books.findMany({
      skip: offset,
      take: take,
      where: { author_id: parseInt(session.user.id) },
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
    prisma.books.count({
      where: { author_id: parseInt(session.user.id) }
    })
  ]);

  const booksWithAuthor = books.map(book => ({
    ...book,
    author: book.users,
    published_date: new Date(book.published_date)
  }));

  return (
    <div>
      <AddBookButton requestAddBookAction={requestAddBook} />
      <CatalogTable 
        data={{data: booksWithAuthor, total: total}}
        offset={offset}
        take={take}
        requestUpdateBook={requestUpdateBook}
        requestDeleteBook={requestDeleteBook}
      />
    </div>
  );
}

export default AuthorPage;

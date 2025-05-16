import AddBookButton from "@/components/add-book-button";
import CatalogTable from "./(cataloge)/catalog-table";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  requestAddBook,
  requestUpdateBook,
  requestDeleteBook,
} from "@/actions/actions";

async function AuthorPage({
  searchParams,
}: {
  searchParams: { page: string; limit: string };
}) {
  const session = await auth();
  const author_id = session?.user?.user_id;
  if (!session || session.user.role !== "author" || !author_id) {
    throw new Error("Unauthorized: Please log in as an author");
  }

  const params = await searchParams;
  const offset = parseInt(params.page || "1") - 1;
  const take = parseInt(params.limit || "10");

  const [books, total] = await prisma.$transaction([
    prisma.books.findMany({
      where: { author_id },
      skip: offset * take,
      take,
      select: {
        book_id: true,
        name: true,
        isbn: true,
        author_id: true,
        file_path: true,
        price: true,
        published_date: true,
        description: true,
        cover_image: true,
      },
    }),
    prisma.books.count({ where: { author_id } }),
  ]);

  return (
    <div>
      <AddBookButton requestAddBookAction={requestAddBook} />
      <CatalogTable
        data={{ data: books, total }}
        offset={offset}
        take={take}
        requestUpdateBook={requestUpdateBook}
        requestDeleteBook={requestDeleteBook}
      />
    </div>
  );
}

export default AuthorPage;

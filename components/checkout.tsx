import Image from "next/image"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatISBN } from "@/lib/utils"

async function Library() {
  const session = await auth()

  if (!session?.user.user_id) {
    return <p>Please login to see your library.</p>
  }

  const purchasedBooks = await prisma.user_books.findMany({
    where: {
      user_id: session.user.user_id,
    },
    include: {
      book: {
        select: {
          name: true,
          author: true,
          isbn: true,
          cover_image:true,
        },
      },
    },
  })

  return (
    <div>
      {purchasedBooks.length > 0 ? (
        purchasedBooks.map((item) => (
          <div key={item.id} className="book-item">
            <Image
              src={item.book.cover_image || "/default-cover.jpg"}
              alt={item.book.name}
              width={100}
              height={150}
              unoptimized
            />
            <h2>{item.book.name}</h2>
            <p>{item.book.author}</p>
            <p>{formatISBN(item.book.isbn)}</p>
          </div>
        ))
      ) : (
        <p>No books purchased yet.</p>
      )}
    </div>
  )
}

export default Library

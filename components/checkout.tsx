<<<<<<< HEAD
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
=======
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatISBN, getDateWithOffset } from "@/lib/utils";
import { differenceInCalendarDays, format } from "date-fns";
import Image from "next/image";
import React from "react";

async function Checkout() {
  const session = await auth();

  const results = await prisma.borrowings.findMany({
    where: {
      user_id: session?.user.user_id,
      return_date: null,
    },
    include: {
      books: {
>>>>>>> origin/author
        select: {
          name: true,
          author: true,
          isbn: true,
<<<<<<< HEAD
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
=======
          book_photos: {
            select: { url: true },
          },
        },
      },
    },
  });

  const daysBookDue = (refDate: Date) => {
    return differenceInCalendarDays(refDate, new Date());
  };

  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.borrowing_id}
            className="flex flex-col md:flex-row p-4 sm:space-x-2 border rounded-sm justify-between"
          >
            <div className="flex max-w-md space-y-1 mb-1 space-x-4">
              <Image
                width={100}
                height={0}
                src={result.books.book_photos[0].url!}
                alt="Book Cover"
                className="hidden md:block object-fill rounded-l-md"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                  {result.books?.name}
                </h1>
                <p className="font-medium capitalize">
                  By: {result.books.author}
                </p>
                <p className="text-slate-400">
                  {formatISBN(result.books.isbn)}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-1 border rounded-sm p-4 bg-slate-50">
              {daysBookDue(result.due_date) < 0 ? (
                <div>
                  <div className="text-red-500 bg-red-50 p-2 border-l4 border-red-500">
                    <p className="font-bold">
                      {Math.abs(daysBookDue(result.due_date))} days overdue.
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" text-green-600 bg-green-50 p-2 border-l-4 border-green-500 ">
                  <p className="font-bold">
                    Due in {daysBookDue(result.due_date)} days.
                  </p>
                </div>
              )}
              <p>
                Checkout date:{" "}
                {format(getDateWithOffset(result.borrow_date), "MMM dd, yyyy")}
              </p>
              <p>
                Due date:{" "}
                {format(getDateWithOffset(result.due_date), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-2xl text-slate-400 text-center p-8">
          No items checked out.
        </h1>
      )}
    </div>
  );
}

export default Checkout;
>>>>>>> origin/author

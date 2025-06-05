// components/BookCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface BookAuthorInfo {
  user_id: number;
  name: string | null;
}

interface BookCardBook {
  cover_image: string | null;
  book_id: number;
  name: string | null;
  author: BookAuthorInfo | null;
  book_photos: { url: string }[];
}

interface BookCardProps {
  book: BookCardBook;
}

export default function BookCard({ book }: BookCardProps) {
  const imageToDisplay =
    book.cover_image ||
    (book.book_photos && book.book_photos.length > 0
      ? book.book_photos[0].url
      : null) ||
    '/default-book-cover.png';

  return (
    <div className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col transform hover:-translate-y-1">
      <Link
        href={`/book/${book.book_id}`}
        className="block group h-full flex flex-col"
      >
        <div className="relative w-full aspect-[2/3] bg-gray-100">
          <Image
            src={imageToDisplay!}
            alt={book.name || 'Book cover'}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 flex-grow flex flex-col justify-between">
          <div>
            <h3
              className="text-md font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate"
              title={book.name || ""}
            >
              {book.name || "Untitled Book"}
            </h3>
            <p
              className="text-xs text-gray-500 mt-1 truncate"
              title={book.author?.name || ""}
            >
              {book.author?.name || "Unknown Author"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

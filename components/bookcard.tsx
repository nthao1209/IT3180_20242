// components/BookCard.tsx
import Image from 'next/image';
import Link from 'next/link';

// Định nghĩa kiểu cho prop 'book'
// Kiểu này nên khớp với dữ liệu sách bạn thường lấy từ Prisma
// Bao gồm cả book_photos và các trường cần thiết khác
interface Book {
  book_id: number;
  name: string | null;
  author: string | null;
  book_photos: { url: string }[]; // Mảng các ảnh, mỗi ảnh có url
  // Thêm các trường khác nếu bạn muốn hiển thị trên card, ví dụ:
  // price?: number | Prisma.Decimal;
  // ratings_avg?: number | null;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const coverImage = book.book_photos && book.book_photos.length > 0 
                    ? book.book_photos[0].url 
                    : '/default-book-cover.png'; // Ảnh bìa mặc định

  return (
    <div 
      key={book.book_id} // key có thể không cần ở đây nếu BookCard được dùng trong .map ở component cha
      className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col transform hover:-translate-y-1"
    >
      <Link href={`/book/${book.book_id}`} className="block group h-full flex flex-col">
        <div className="relative w-full aspect-[2/3] bg-gray-100"> {/* aspect-[2/3] cho tỉ lệ bìa sách phổ biến */}
          <Image
            src={coverImage}
            alt={book.name || 'Book cover'}
            fill // Để ảnh tự điều chỉnh kích thước theo div cha
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw" // Giúp Next.js tối ưu ảnh
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 flex-grow flex flex-col justify-between"> {/* flex-grow và flex-col để đẩy nội dung xuống dưới nếu card có chiều cao cố định */}
          <div>
            <h3 
              className="text-md font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate" 
              title={book.name || ""} // Hiển thị đầy đủ tên sách khi hover
            >
              {book.name || "Untitled Book"}
            </h3>
            <p 
              className="text-xs text-gray-500 mt-1 truncate" 
              title={book.author || ""} // Hiển thị đầy đủ tên tác giả khi hover
            >
              {book.author || "Unknown Author"}
            </p>
            {/* Bạn có thể thêm các thông tin khác ở đây nếu muốn, ví dụ: giá, rating */}
          </div>
          {/* Có thể thêm nút "Add to cart" hoặc "View details" nhỏ ở đây nếu cần */}
        </div>
      </Link>
    </div>
  );
}
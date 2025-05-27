// app/(home)/page.tsx
import Rating from "@/components/rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import BookCard from "@/components/bookcard"; 



interface HomePageBook {
  book_id: number;
  name: string | null;
  author: string | null; 
  book_photos: { url: string }[];
  
}

interface RecentlyReviewedBook extends HomePageBook {
  rating: number; 
}


export default async function HomePage() {
 
  const arrivalsData = await prisma.books.findMany({
    skip: 0,
    take: 10,
    select: { 
      book_id: true,
      name: true,
      author: true,
      book_photos: {
        select: { url: true },
        take: 1,
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });
  const arrivals: HomePageBook[] = arrivalsData as HomePageBook[]; 

  // Query cho Recently Reviewed
  const recentlyReviewedData = await prisma.ratings.findMany({
    skip: 0,
    take: 10,
    distinct: ['book_id'],
    orderBy: {
      created_at: 'desc'
    },
    select: { 
      book_id: true,
      rating: true,
      books: {
        select: {
          book_id: true, 
          name: true,
          author: true,
          book_photos: { select: { url: true }, take: 1 }
        }
      }
    }
  });

  // Chuyển đổi dữ liệu cho recently_reviewed để khớp với kiểu mong đợi của BookCard và thêm rating
  const recently_reviewed: RecentlyReviewedBook[] = recentlyReviewedData.map(rr => ({
    book_id: rr.books.book_id, 
    name: rr.books.name,
    author: rr.books.author,
    book_photos: rr.books.book_photos,
    rating: rr.rating,
  }));


  return (
    <>
      <div className="container mx-auto p-16 sm:p-32 flex flex-col justify-center space-y-16">
        {/* new arrivals */}
        {arrivals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold pb-4 pl-4">New arrivals</h2>
            <Carousel
              opts={{
                slidesToScroll: 'auto',
                align: 'start'
              }}
              className="flex w-full min-w-xl"
            >
              <CarouselContent>
                {
                  arrivals.map(arrival => (
                    <CarouselItem key={arrival.book_id} className='basis-auto'>
                      {/* SỬ DỤNG BOOKCARD */}
                      <BookCard book={arrival} />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* recently reviewed */}
        {recently_reviewed.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold pb-4 pl-4">Recently reviewed</h2>
            <Carousel
              opts={{
                slidesToScroll: 'auto',
                align: 'start'
              }}
              className="flex w-full min-w-xl"
            >
              <CarouselContent>
                {
                  recently_reviewed.map(rr_book => ( // Đổi tên biến để tránh nhầm lẫn
                    <CarouselItem key={rr_book.book_id} className='basis-auto'>
                      {/* SỬ DỤNG BOOKCARD */}
                      <div className="flex flex-col"> {/* Bọc BookCard và Rating */}
                        <BookCard book={rr_book} />
                        {/* Hiển thị Rating bên dưới BookCard nếu muốn */}
                        <div className="mt-2 flex justify-center">
                           <Rating rating={rr_book.rating} />
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
}
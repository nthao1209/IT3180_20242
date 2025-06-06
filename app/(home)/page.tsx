import Rating from "@/components/rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import { Sidebar } from  "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import  {BookAuthorInfo}  from "@/actions/actions";
import BookCard from "@/components/bookcard"; 


interface HomePageBook {
  book_id: number;
  cover_image: string | null; // Thêm trường cover_image
  author: BookAuthorInfo | null;
  name: string | null;
  author_id: number | null; 
  book_photos: { url: string }[];
  
}

interface RecentlyReviewedBook extends HomePageBook {
  rating: number; 
}

// A simple placeholder component for when images are not available
const ImagePlaceholder = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md",
      className
    )}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-off text-gray-400 dark:text-gray-500 h-10 w-10">
      <path d="M21.19 21.19L2.81 2.81"/>
      <path d="M10.29 3.29a2 2 0 0 1 3.42 0l.88.88"/>
      <path d="M6.28 6.28A2 2 0 0 0 5 8v8a2 2 0 0 0 .29 1.02"/>
      <path d="M19 12v3.72A2 2 0 0 1 18.71 17"/>
      <path d="M5 12V8a2 2 0 0 1 2-2h3.72"/>
      <path d="m2 2 20 20"/>
      <circle cx="9" cy="9" r="2"/>
    </svg>
  </div>
);

// Helper function from your sidebar for cn, if not globally available, define or import it
// For simplicity, defining a basic version here if not imported from "@/lib/utils"
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');


export default async function HomePage() {

  const arrivalsData = await prisma.books.findMany({
      skip: 0,
      take: 10,
      where:{
        state: true
      },
      select: { 
        book_id: true,
        name: true,
        author_id: true,
        cover_image: true,
        book_photos: {
          select: { url: true },
          take: 1,
        },
        users: { // Lấy thông tin tác giả
          select: { 
            name: true,
            user_id: true,
      }
    }
        
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    const arrivals: HomePageBook[] = arrivalsData.map(book => ({
      book_id: book.book_id,
      name: book.name,
      author_id: book.author_id,
      cover_image: book.cover_image,
      book_photos: book.book_photos,
      author: book.users ? { name: book.users.name, user_id: book.users.user_id } : null,
    })); 
  
  
  
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
            cover_image: true, 
            author_id: true,
            book_photos: { select: { url: true }, take: 1 },
            users: { select: { name: true, user_id: true } }
          }
        }
      }
    })
   
    const recently_reviewed: RecentlyReviewedBook[] = recentlyReviewedData.map(rr => ({
      author: rr.books.users ? { name: rr.books.users.name, user_id: rr.books.users.user_id } : null,
      book_id: rr.books.book_id, 
      cover_image: rr.books.cover_image, 
      name: rr.books.name,
      author_id: rr.books.author_id,
      book_photos: rr.books.book_photos,
      rating: rr.rating,
    }));

  // const staff_picks = await prisma.staff_picks.findMany({ ... }); // Kept as is

  const imageBaseClassName = "h-[200px] w-[150px] sm:w-[200px] sm:h-[290px] object-cover rounded-md shadow-md";

  return (
    <>
      {/* Changed justify-center to justify-start (or remove justify-center) 
          for content to align to top after padding */}
      <div className="container mx-auto px-4 py-8 sm:px-8 sm:py-16 flex flex-col space-y-12 sm:space-y-16">
        {/* Reduced padding a bit for better visual, adjust as needed: p-16 -> py-8, px-4 etc. */}
        
        {/* new arrivals */}
                {arrivals.length > 0 && ( // Thêm kiểm tra arrivals.length
                  (<section>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">New arrivals</h2>
                    <Carousel
                      opts={{
                        slidesToScroll: 'auto',
                        align: 'start'
                      }}
                      className=" w-full "
                    >
                      <CarouselContent>
                        {
                          arrivals.map(arrival => (
                            <CarouselItem key={arrival.book_id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                              {/* SỬ DỤNG BOOKCARD */}
                              <BookCard book={arrival} />
                            </CarouselItem>
                          ))
                        }
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </section>)
                )}


        {/* recently reviewed */}
        {recently_reviewed.length > 0 && ( // Thêm kiểm tra
          (<section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Recently reviewed</h2>
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
          </section>)
        )}        
        </div>
    </>
  );
}
    

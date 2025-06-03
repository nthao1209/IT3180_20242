import Rating from "@/components/rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import { Sidebar } from  "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

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

  const arrivals = await prisma.books.findMany({
    skip: 0,
    take: 10,
    include: {
      book_photos: {
        select: { url: true },
        take: 1 // Only need one photo for the cover
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  const recently_reviewed = await prisma.ratings.findMany({
    skip: 0,
    take: 10,
    distinct: ['book_id'],
    orderBy: {
      created_at: 'desc'
    },
    include: {
      books: {
        include: {
          book_photos: { 
            select: { url: true },
            take: 1 // Only need one photo
          }
        }
      }
    }
  });

  // const staff_picks = await prisma.staff_picks.findMany({ ... }); // Kept as is

  const imageBaseClassName = "h-[200px] w-[150px] sm:w-[200px] sm:h-[290px] object-cover rounded-md shadow-md";

  return (
    <>
      {/* Changed justify-center to justify-start (or remove justify-center) 
          for content to align to top after padding */}
      <div className="container mx-auto px-4 py-8 sm:px-8 sm:py-16 flex flex-col space-y-12 sm:space-y-16">
        {/* Reduced padding a bit for better visual, adjust as needed: p-16 -> py-8, px-4 etc. */}
        
        {/* new arrivals */}
        {arrivals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold pb-4 pl-4">New arrivals</h2>
            <Carousel
              opts={{
                slidesToScroll: 'auto',
                align: 'start'
              }}
              className="flex w-full" // Removed min-w-xl, carousel usually handles its width
            >
              <CarouselContent>
                {
                  arrivals.map(arrival => (
                    <CarouselItem key={arrival.book_id} className='basis-auto'>
                      <Link href={`/book/${arrival.book_id}`} className="group block">
                        {arrival.book_photos && arrival.book_photos.length > 0 && arrival.book_photos[0].url ? (
                          <Image
                            className={imageBaseClassName}
                            src={arrival.book_photos[0].url}
                            width={150} // Base width for aspect ratio
                            height={200} // Base height for aspect ratio
                            alt={arrival.name} />
                        ) : (
                          <ImagePlaceholder className={imageBaseClassName} />
                        )}
                        <p className="mt-2 text-sm font-medium truncate group-hover:underline">{arrival.name}</p>
                      </Link>
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
              className="flex w-full"
            >
              <CarouselContent>
                {
                  recently_reviewed.map(rr => (
                    <CarouselItem key={rr.book_id} className='basis-auto'>
                      <Link href={`/book/${rr.book_id}`} className="group block">
                        {rr.books.book_photos && rr.books.book_photos.length > 0 && rr.books.book_photos[0].url ? (
                          <Image
                            className={imageBaseClassName}
                            src={rr.books.book_photos[0].url}
                            width={150}
                            height={200}
                            alt={rr.books.name} />
                        ) : (
                          <ImagePlaceholder className={imageBaseClassName} />
                        )}
                        <p className="mt-2 text-sm font-medium truncate group-hover:underline">{rr.books.name}</p>
                      </Link>
                      <Rating rating={rr.rating} />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* staff picks - kept logic mostly commented as in original */}
        <div>
          <h2 className="text-2xl font-bold pb-4 pl-4">Staff picks</h2>
          <Carousel
            opts={{
              slidesToScroll: 'auto',
              align: 'start'
            }}
            className="flex w-full"
          >
            <CarouselContent>
              {/* Example if staff_picks were active:
              {
                staff_picks.map(sp => (
                  <CarouselItem key={sp.book_id} className='basis-auto'>
                    <Link href={`/book/${sp.book_id}`} className="group block">
                      {sp.books.book_photos && sp.books.book_photos.length > 0 && sp.books.book_photos[0].url ? (
                        <Image
                          className={imageBaseClassName}
                          src={sp.books.book_photos[0].url}
                          width={150}
                          height={200}
                          alt={sp.books.name} />
                      ) : (
                        <ImagePlaceholder className={imageBaseClassName} />
                      )}
                      <p className="mt-2 text-sm font-medium truncate group-hover:underline">{sp.books.name}</p>
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">Picked by: {sp.users.name}</p>
                  </CarouselItem>
                ))
              } 
              */}
              {/* Placeholder if no staff picks or data is not ready */}
              <CarouselItem>
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No staff picks available at the moment.
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}
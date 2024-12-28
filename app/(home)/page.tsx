import Rating from "@/components/rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {

  const arrivals = await prisma.books.findMany({
    skip: 0,
    take: 10,
    include: {
      book_photos: {
        select: { url: true }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })

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
          book_photos: { select: { url: true } }
        }
      }
    }
  })

  const staff_picks = await prisma.staff_picks.findMany({
    skip: 0,
    take: 10,
    distinct: ['book_id'],
    include: {
      books: {
        include: {
          book_photos: { select: { url: true } }
        }
      },
      users: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <>
      <div className="container mx-auto p-16 sm:p-32 flex flex-col justify-center space-y-16">
        {/* new arrivals */}
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
                    <Link href={`/book/${arrival.book_id}`}>
                      <Image
                        className="h-[200px] w-[150px] sm:w-[200px] sm:h-[290px]"
                        src={arrival.book_photos[0].url}
                        width={190}
                        height={0}
                        alt={arrival.name} />
                    </Link>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>



        {/* recently reviewed */}
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
                recently_reviewed.map(rr => (
                  <CarouselItem key={rr.book_id} className='basis-auto'>
                    <Link href={`/book/${rr.book_id}`}>
                      <Image
                        className="h-[200px] w-[150px] sm:w-[200px] sm:h-[290px]"
                        src={rr.books.book_photos[0].url}
                        width={190}
                        height={0}
                        alt={rr.books.name} />
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

        {/* staff picks */}
        <div>
          <h2 className="text-2xl font-bold pb-4 pl-4">Staff picks</h2>
          <Carousel
            opts={{
              slidesToScroll: 'auto',
              align: 'start'
            }}
            className="flex w-full min-w-xl"
          >
            <CarouselContent>
              {
                staff_picks.map(sp => (
                  <CarouselItem key={sp.book_id} className='basis-auto'>
                    <Link href={`/book/${sp.book_id}`}>
                      <Image
                        className="h-[200px] w-[150px] sm:w-[200px] sm:h-[290px]"
                        src={sp.books.book_photos[0].url}
                        width={190}
                        height={0}
                        alt={sp.books.name} />
                    </Link>
                    <p className="text-sm text-slate-500 pt-2">By: {sp.users.name}</p>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}

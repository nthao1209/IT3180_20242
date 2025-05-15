import Rating from "@/components/rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Lấy 10 sách mới nhất
  const arrivals = await prisma.books.findMany({
    skip: 0,
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });

  // Lấy 10 đánh giá mới nhất, kèm theo thông tin sách
  const recently_reviewed = await prisma.ratings.findMany({
    skip: 0,
    take: 10,
    orderBy: {
      created_at: "desc",
    },
    include: {
      books: true, // quan hệ với bảng books
    },
  });

  return (
    <>
      <div className="container mx-auto p-16 sm:p-32 flex flex-col justify-center space-y-16">
        {/* New arrivals */}
        <section>
          <h2 className="text-2xl font-bold pb-4 pl-4">New arrivals</h2>
          <Carousel
            opts={{
              slidesToScroll: "auto",
              align: "start",
            }}
            className="flex w-full min-w-xl"
          >
            <CarouselContent>
              {arrivals.map((arrival) => (
                <CarouselItem key={arrival.book_id} className="basis-auto">
                  <Link href={`/book/${arrival.book_id}`}>
                    <Image
                      className="h-[200px] w-[150px] sm:w-[200px] sm:h-[290px]"
                      src={arrival.cover_image || "/default-book.png"}
                      width={190}
                      height={290}
                      alt={arrival.name || "Book cover"}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Recently reviewed */}
        <section>
          <h2 className="text-2xl font-bold pb-4 pl-4">Recently reviewed</h2>
          <Carousel
            opts={{
              slidesToScroll: "auto",
              align: "start",
            }}
            className="flex w-full min-w-xl"
          >
            <CarouselContent>
              {recently_reviewed.map((rr) => (
                <CarouselItem key={rr.rating_id} className="basis-auto">
                  <Link href={`/book/${rr.book_id}`}>
                    <Image
                      className="h-[200px] w-[150px] sm:w-[200px] sm:h-[290px]"
                      src={rr.books.cover_image || "/default-book.png"}
                      width={190}
                      height={290}
                      alt={rr.books.name || "Book cover"}
                    />
                  </Link>
                  <Rating rating={rr.rating} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </>
  );
}


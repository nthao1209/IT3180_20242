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


  return (
    <>
      {/* Bỏ flex flex-col justify-center từ đây */}
      <div className="container mx-auto p-8 md:p-12 lg:p-16 space-y-12 md:space-y-16">
        {/* new arrivals */}
        {arrivals.length > 0 && ( // Thêm kiểm tra arrivals.length
          (<section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">New arrivals</h2>
            {/* ... Carousel ... */}
          </section>)
        )}

        {/* recently reviewed */}
        {recently_reviewed.length > 0 && ( // Thêm kiểm tra
          (<section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Recently reviewed</h2>
            {/* ... Carousel ... */}
          </section>)
        )}

        {/* staff picks - XÓA HOÀN TOÀN NẾU KHÔNG CÓ DỮ LIỆU */}
        {/* 
        <div>
          <h2 className="text-2xl font-bold pb-4 pl-4">Staff picks</h2>
          <Carousel ... >
            <CarouselContent></CarouselContent> // Để trống nếu không có dữ liệu
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        */}
      </div>
    </>
  );
}
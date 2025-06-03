// components/PaginationControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Giả sử bạn dùng Button từ Shadcn/ui
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  // basePath?: string; // Nếu bạn muốn dùng component này cho nhiều trang khác nhau
}

export default function PaginationControls({
  currentPage,
  totalPages,
  // basePath = '/catalog', // Mặc định cho trang catalog
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('page', newPage.toString());
    // router.push(`${basePath}?${currentParams.toString()}`);
    // Vì chúng ta đang ở trang catalog, có thể dùng pathname hiện tại
    router.push(`/catalog?${currentParams.toString()}`);
  };

  if (totalPages <= 1) {
    return null; // Không hiển thị phân trang nếu chỉ có 1 trang hoặc không có trang nào
  }

  // Logic để hiển thị một vài nút số trang (tùy chọn, có thể làm phức tạp hơn)
  const pageNumbers = [];
  const maxPagesToShow = 5; // Số lượng nút trang tối đa hiển thị
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const  endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
     startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {startPage > 1 && (
         <>
             <Button onClick={() => handlePageChange(1)} variant={1 === currentPage ? "default" : "outline"} size="icon">1</Button>
             {startPage > 2 && <span className="px-2">...</span>}
         </>
      )}

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          variant={pageNumber === currentPage ? 'default' : 'outline'}
          size="icon" // Hoặc để text nếu muốn hiển thị số
        >
          {pageNumber}
        </Button>
      ))}

     {endPage < totalPages && (
         <>
             {endPage < totalPages - 1 && <span className="px-2">...</span>}
             <Button onClick={() => handlePageChange(totalPages)} variant={totalPages === currentPage ? "default" : "outline"} size="icon">{totalPages}</Button>
         </>
     )}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
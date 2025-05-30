// app/(home)/read/[bookId]/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { ReactReader, type IReactReaderStyle} from 'react-reader';
import { useSession, signIn } from 'next-auth/react'; 

import {
  loadBookForReading,
  saveReadingProgress,
  type ReadingSessionDataForClient, 
} from '@/actions/actions';




// (Tùy chọn) Style cho ReactReader



export default function ReadBookPage() {
  const { data: authSession, status: authStatus } = useSession();
  const params = useParams();
  const router = useRouter();
  const bookId = Number(params.bookId);

  const [sessionData, setSessionData] = useState<ReadingSessionDataForClient | null>(null);
  const [epubUrl, setEpubUrl] = useState<string | null>(null);
  const [initialLocation, setInitialLocation] = useState<string | null>(null); // CFI ban đầu
  
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref để lưu trữ vị trí hiện tại (CFI) mà không gây re-render không cần thiết
  const currentLocationRef = useRef<string | null>(null);

  // Load thông tin sách và session
  useEffect(() => {
    if (authStatus === 'loading') return;

    if (authStatus === 'unauthenticated') {
      setError("Please sign in to read this book.");
      setIsLoadingBook(false);
      return;
    }

    if (isNaN(bookId)) {
      setError("Invalid Book ID.");
      setIsLoadingBook(false);
      return;
    }

    if (authStatus === 'authenticated') {
      async function loadInitialData() {
        setIsLoadingBook(true);
        setError(null);
        const result = await loadBookForReading(bookId);
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setSessionData(result.data);
          if (result.data.book_file_path) {
            // Đường dẫn file EPUB phải là URL có thể truy cập từ client
            // Nếu file_path là /ebooks/file.epub, nó sẽ là localhost:3000/ebooks/file.epub
            setEpubUrl(result.data.book_file_path);
          } else {
            setError("Book file path is missing.");
          }
          setInitialLocation(result.data.last_location); // Set CFI ban đầu
          currentLocationRef.current = result.data.last_location; // Lưu vào ref
        }
        setIsLoadingBook(false);
      }
      loadInitialData();
    }
  }, [bookId, authStatus]);


  // Callback khi vị trí đọc thay đổi trong ReactReader
  const handleLocationChanged = (epubcifi: string) => {
    currentLocationRef.current = epubcifi; // Cập nhật ref
    if (bookId && epubcifi) {
      saveReadingProgress(bookId, epubcifi)
        .then(result => {
          if (result.success) {
          } else if (result.error) {
            console.error("Failed to save progress:", result.error);
          }
        })
        .catch(err => console.error("Error in saveReadingProgress call:", err));
    }
  };

  // Lưu tiến trình khi người dùng rời khỏi trang (ví dụ: đóng tab, chuyển trang)
  // Lưu ý: API này không phải lúc nào cũng đáng tin cậy 100% trên tất cả trình duyệt
  useEffect(() => {
    const saveBeforeUnload = () => {
      if (bookId && currentLocationRef.current) {
        // navigator.sendBeacon có thể được dùng ở đây để gửi request mà không chặn việc unload
        // Hoặc một cách tiếp cận khác là lưu thường xuyên hơn (ví dụ: sau mỗi vài phút hoặc vài lần lật trang)
        saveReadingProgress(bookId, currentLocationRef.current);
      }
    };
    window.addEventListener('beforeunload', saveBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', saveBeforeUnload);
      //  nên lưu một lần cuối khi component unmount
      saveBeforeUnload();
    };
  }, [bookId]);


  if (authStatus === 'loading' || isLoadingBook) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!epubUrl) { // Nếu không có URL sách để hiển thị
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-lg text-muted-foreground">Book content is currently unavailable.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col"> {/* Chiếm toàn bộ chiều cao màn hình */}
      {/* Header của trang đọc sách */}
      <div className="p-4 border-b flex justify-between items-center bg-background z-10">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <h1 className="text-lg font-semibold truncate px-2">
          {sessionData?.book_name || `Reading Book ID: ${bookId}`}
        </h1>
        {/* Có thể thêm các nút cài đặt (font, theme) ở đây */}
        <div className="w-20"> {/* Placeholder */} </div>
      </div>

      {/* Khu vực hiển thị ReactReader */}
      {/* Cần một div cha có chiều cao xác định để ReactReader hoạt động tốt */}
      <div style={{ height: 'calc(100vh - 65px)' }} className="relative flex-grow"> {/* 65px là chiều cao giả định của header */}
        <ReactReader
          url={epubUrl}
          location={initialLocation} // CFI ban đầu
          locationChanged={handleLocationChanged} // Callback khi vị trí thay đổi
        />
      </div>
    </div>
  );
}
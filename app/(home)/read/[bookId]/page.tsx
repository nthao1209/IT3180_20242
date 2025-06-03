// app/(home)/read/[bookId]/page.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react'; // Thêm useCallback
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { ReactReader, type IReactReaderStyle, ReactReaderStyle } from 'react-reader'; // Import ReactReaderStyle nếu muốn dùng defaultStyles
import { useSession } from 'next-auth/react'; // Bỏ signIn nếu không tự động gọi

import {
  loadBookForReading,
  saveReadingProgress,
  type ReadingSessionDataForClient, 
} from '@/actions/actions';

// (Tùy chọn) Style cho ReactReader
const readerStyles: IReactReaderStyle = {
  ...ReactReaderStyle, // Kế thừa style mặc định của ReactReader
  readerArea: {
    ...(ReactReaderStyle.readerArea || {}), // Kế thừa readerArea nếu có
    backgroundColor: '#f8f0e3', // Ví dụ: màu nền tùy chỉnh
    transition: 'background-color .3s ease',
  },
  arrow: {
    ...(ReactReaderStyle.arrow || {}), // Kế thừa arrow nếu có
    color: '#333',
    opacity: 0.7,
  },
  // Thêm các tùy chỉnh khác nếu muốn
};


export default function ReadBookPage() {
  const { data: authSession, status: authStatus } = useSession();
  const params = useParams();
  const router = useRouter();
  const bookId = Number(params.bookId);

  const [sessionData, setSessionData] = useState<ReadingSessionDataForClient | null>(null);
  const [epubUrl, setEpubUrl] = useState<string | null>(null);
  const [initialLocation, setInitialLocation] = useState<string | null>(null);
  
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentLocationRef = useRef<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load thông tin sách và session
  useEffect(() => {
    if (authStatus === 'loading') return;

    if (authStatus === 'unauthenticated') {
      setError("Please sign in to read this book and save your progress.");
      setIsLoadingBook(false);
      return;
    }

    if (isNaN(bookId)) {
      setError("Invalid Book ID provided in the URL.");
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
            setEpubUrl(result.data.book_file_path);
          } else {
            setError("Book file path is missing. Cannot load book.");
          }
          setInitialLocation(result.data.last_location);
          currentLocationRef.current = result.data.last_location;
        } else {
            setError("Could not load book data."); // Trường hợp data không có nhưng cũng không có error
        }
        setIsLoadingBook(false);
      }
      loadInitialData();
    }
  }, [bookId, authStatus]);


  // Callback khi vị trí đọc thay đổi trong ReactReader
  const handleLocationChanged = useCallback((epubcifi: string) => {
    currentLocationRef.current = epubcifi;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      if (bookId && epubcifi && !isNaN(bookId) && authStatus === 'authenticated') {
        saveReadingProgress(bookId, epubcifi)
          .then(result => {
            if (result.success) {
              // console.log("Progress saved:", epubcifi);
            } else if (result.error) {
              console.error("Failed to save progress:", result.error);
              // Có thể hiển thị một toast nhỏ ở đây
            }
          })
          .catch(err => console.error("Error in saveReadingProgress call:", err));
      }
    }, 2500); // Lưu sau 2.5 giây không lật trang
  }, [bookId, authStatus]); // Thêm authStatus để đảm bảo chỉ lưu khi đã đăng nhập

  // Lưu tiến trình khi người dùng rời khỏi trang
  useEffect(() => {
    const saveCurrentLocationOnUnload = () => {
      if (bookId && currentLocationRef.current && !isNaN(bookId) && authStatus === 'authenticated') {
        // Đây là best-effort, không đảm bảo chạy hoàn tất
        saveReadingProgress(bookId, currentLocationRef.current);
      }
    };

    window.addEventListener('beforeunload', saveCurrentLocationOnUnload);
    return () => {
      window.removeEventListener('beforeunload', saveCurrentLocationOnUnload);
      saveCurrentLocationOnUnload(); // Lưu lần cuối khi component unmount
    };
  }, [bookId, authStatus]); // Thêm authStatus


  if (authStatus === 'loading' || isLoadingBook) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="ml-4 text-lg text-gray-700">Loading book...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-red-700 mb-3">Oops! Something went wrong.</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Button onClick={() => router.back()} variant="outline">Go Back</Button>
      </div>
    );
  }

  if (!epubUrl) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Book Not Available</h2>
        <p className="text-lg text-muted-foreground mb-6">The content for this book is currently unavailable.</p>
        <Button onClick={() => router.back()} variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="p-3 border-b flex justify-between items-center bg-white shadow-sm z-10">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="mr-1 h-5 w-5" /> Back
        </Button>
        <h1 className="text-md sm:text-lg font-semibold text-gray-800 truncate px-2 mx-auto">
          {sessionData?.book_name || `Book ID: ${bookId}`}
        </h1>
        <div className="w-20"> {/* Placeholder để căn giữa title */} </div>
      </header>

      <main style={{ height: 'calc(100vh - 57px)' }} className="relative flex-grow"> {/* 57px là chiều cao header ví dụ */}
        <ReactReader
          url={epubUrl}
          location={initialLocation}
          locationChanged={handleLocationChanged}
          loadingView={
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
          }
          // styles={readerStyles} // Bỏ comment nếu muốn dùng style tùy chỉnh
          // epubOptions cho phép tùy chỉnh sâu hơn epub.js
          // tocChanged={(toc) => console.log(toc)} // Lấy mục lục nếu cần
        />
      </main>
    </div>
  );
}
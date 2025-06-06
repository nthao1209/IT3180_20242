// my-library.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react' // Giả sử bạn có icon này

interface Book {
    book_id: number;
    name: string;
    cover_image: string | null;
    status: string | null; // Giả sử status là một chuỗi mô tả trạng thái sách
    file_path: string | null; // Vẫn giữ lại để kiểm tra sách có file để đọc không
    users: { // Giả sử API trả về thông tin tác giả như thế này
        name: string;
    };
}

export default function MyLibrary() {
    const [books, setBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true); // Set loading khi bắt đầu fetch
            setError(null);     // Reset lỗi
            try {
                const response = await fetch('/api/library') // API endpoint để lấy sách của người dùng
                if (!response.ok) {
                    if (response.status === 401) { // Lỗi chưa đăng nhập
                         throw new Error('Please sign in to view your library.');
                    }
                    throw new Error(`Failed to load library. Status: ${response.status}`);
                }
                const data = await response.json();
                if (data && Array.isArray(data.books)) { // Kiểm tra data.books là mảng
                    setBooks(data.books);
                } else {
                    console.error("API response for /api/library is not in expected format:", data);
                    setBooks([]); // Set mảng rỗng nếu data không đúng
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while loading your library');
            } finally {
                setIsLoading(false)
            }
        }
        fetchBooks()
    }, [])

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-12 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-3" />
                <p className="text-gray-600">Loading your library...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600 bg-red-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h2>
                <p>{error}</p>
                {error.includes("sign in") && ( // Nếu lỗi liên quan đến đăng nhập
                    <Link href="/auth/signin" className="text-blue-500 hover:underline mt-4 inline-block">
                        Sign In
                    </Link>
                )}
            </div>
        )
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12 text-gray-600">
                <p className="text-lg mb-2">Your library is empty.</p>
                <p className="mb-4">Looks like you haven't added any books yet.</p>
                <Link href="/catalog" className="text-blue-600 hover:underline font-semibold">
                    Browse and add books to your library
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
            {books.map((book) => (
                <div key={book.book_id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <Link href={`/book/${book.book_id}`} className="block">
                        <div className="aspect-[3/4] relative bg-gray-100">
                            <Image
                                src={book.cover_image || '/default-book-cover.png'}
                                alt={book.name || 'Book cover'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                        </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg mb-1 truncate" title={book.name}>{book.name || "Untitled Book"}</h3>
                        <p className="text-sm text-gray-500 mb-3 truncate" title={book.users?.name || "Unknown Author"}>
                            By: {book.users?.name || "Unknown Author"}
                        </p>
                        <div className="mt-auto">
                            {book.file_path ? (
                                book.status === "completed" ? (
                                    <Link
                                        href={`/read/${book.book_id}`}
                                        className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                                    >
                                        Read Book
                                    </Link>
                                ) : (
                                    <p className="block w-full text-center py-2 px-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md text-sm">
                                        Đang chờ xác nhận thanh toán
                                    </p>
                                )
                            ) : (
                                <p className="text-xs text-center text-gray-400 py-2">Reading not available</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
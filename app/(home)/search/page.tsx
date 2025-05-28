// app/(home)/search/page.tsx
'use client';

import { useState, FormEvent, useEffect, useCallback } from 'react'; // Thêm useCallback    
// Đảm bảo searchBooks và BookSearchResult được import đúng
import { searchBooks, type PaginatedBookSearchResult, type BookSearchResult } from '@/actions/actions'; // Import kiểu mới
import { useSearchParams, useRouter } from 'next/navigation';
import BookCard from '@/components/bookcard';
import PaginationControls from '@/components/PaginationControls'; // IMPORT PaginationControls
import { Loader2 } from 'lucide-react'; // Import Loader2 nếu chưa có


export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    type BookSearchCriteria = 'name' | 'author' | 'description' | 'all';

    // Lấy giá trị ban đầu từ URL
    const initialQuery = searchParams.get('q') || '';
    const initialCriteria = (searchParams.get('crit') as BookSearchCriteria) || 'all';
    const initialPage = Number(searchParams.get('page')) || 1; // Lấy page ban đầu

    const [query, setQuery] = useState(initialQuery);
    const [criteria, setCriteria] = useState<BookSearchCriteria>(initialCriteria);
    const [currentPage, setCurrentPage] = useState(initialPage); // State cho trang hiện tại
    
    const [results, setResults] = useState<BookSearchResult[]>([]);
    const [totalPages, setTotalPages] = useState(0); // State cho tổng số trang
    const [totalResults, setTotalResults] = useState(0); // State cho tổng số kết quả (tùy chọn)

    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Để biết đã thực hiện tìm kiếm lần nào chưa

    // Hàm thực hiện tìm kiếm, giờ nhận thêm page
    const performSearch = useCallback(async (currentQuery: string, currentCriteria: BookSearchCriteria, pageNum: number) => {
        if (!currentQuery.trim()) {
            setResults([]);
            setTotalPages(0);
            setTotalResults(0);
            setHasSearched(true); // Vẫn đánh dấu đã tìm kiếm (để hiển thị "không có kết quả")
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setHasSearched(true);
        try {
            // Gọi searchBooks với pageNum
            const searchResult: PaginatedBookSearchResult = await searchBooks(currentQuery, currentCriteria, pageNum);
            setResults(searchResult.books);
            setTotalPages(searchResult.totalPages);
            setTotalResults(searchResult.totalResults); // Lưu tổng số kết quả
            setCurrentPage(searchResult.currentPage); // Cập nhật trang hiện tại từ kết quả
        } catch (error) {
            console.error("Search failed on client:", error);
            setResults([]);
            setTotalPages(0);
            setTotalResults(0);
        } finally {
            setIsLoading(false);
        }
    }, []); // useCallback không có dependencies vì các giá trị được truyền trực tiếp

    // useEffect để tìm kiếm khi query params (q, crit, page) thay đổi
    useEffect(() => {
        const queryFromUrl = searchParams.get('q');
        const criteriaFromUrl = searchParams.get('crit') as BookSearchCriteria;
        const pageFromUrl = Number(searchParams.get('page')) || 1;

        if (queryFromUrl && criteriaFromUrl) {
            setQuery(queryFromUrl); // Cập nhật state query từ URL
            setCriteria(criteriaFromUrl); // Cập nhật state criteria từ URL
            setCurrentPage(pageFromUrl); // Cập nhật state page từ URL
            performSearch(queryFromUrl, criteriaFromUrl, pageFromUrl);
        } else {
            // Nếu không có query, reset kết quả
            setResults([]);
            setTotalPages(0);
            setTotalResults(0);
            setHasSearched(false); // Chưa tìm kiếm nếu không có query
        }
    }, [searchParams, performSearch]); // Chạy lại khi searchParams thay đổi


    // Xử lý submit form (chỉ cập nhật URL, useEffect sẽ trigger tìm kiếm)
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (query.trim()) {
            params.set('q', query.trim());
            params.set('crit', criteria);
            // Khi submit form, luôn tìm từ trang 1
            params.set('page', '1'); 
            router.push(`/search?${params.toString()}`);
        } else {
            // Nếu query rỗng, có thể redirect về /search không có params
            // hoặc không làm gì cả và để useEffect xử lý
            router.push('/search');
        }
        // Không cần gọi performSearch ở đây nữa, useEffect sẽ xử lý
    };

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800">Tìm kiếm sách</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
                {/* Input và Select không thay đổi nhiều, chỉ cần value và onChange */}
                <input
                    type="text"
                    value={query} // Controlled input
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nhập tên sách, tác giả, mô tả..."
                    className="border border-gray-300 p-3 rounded-lg flex-grow focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                />
                <select
                    value={criteria} // Controlled select
                    onChange={(e) => setCriteria(e.target.value as BookSearchCriteria)}
                    className="border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="all">Tất cả (Keyword)</option>
                    <option value="name">Theo tên sách</option>
                    <option value="author">Theo tác giả</option>
                    <option value="description">Theo mô tả</option>
                </select>
                <button
                    type="submit"
                    disabled={isLoading} // Vẫn dùng isLoading cho nút submit
                    className="bg-blue-600 text-white p-3 px-6 rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-gray-400 font-semibold"
                >
                    {/* Nút submit không cần hiển thị "Đang tìm..." nếu isLoading chỉ cho phần kết quả */}
                    Tìm kiếm
                </button>
            </form>

            {isLoading && (
                <div className="text-center py-10">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-lg text-primary mt-2">Đang tải kết quả...</p>
                </div>
            )}

            {!isLoading && hasSearched && results.length === 0 && query.trim() !== '' && (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">Không tìm thấy cuốn sách nào phù hợp với từ khóa <strong className="font-medium">"{query}"</strong> theo tiêu chí <strong className="font-medium">{criteria}</strong>.</p>
                    <p className="text-md text-gray-400 mt-2">Vui lòng thử lại với từ khóa hoặc tiêu chí khác.</p>
                </div>
            )}
            
            {!isLoading && !hasSearched && query.trim() === '' && (
                 <div className="text-center py-10">
                    <p className="text-xl text-gray-500">Nhập từ khóa để bắt đầu tìm kiếm.</p>
                </div>
            )}


            {!isLoading && results.length > 0 && (
                <div>
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-700">
                            Tìm thấy <strong className="font-semibold">{totalResults}</strong> kết quả cho từ khóa: <strong className="font-semibold">"{query}"</strong>
                        </p>
                        <p className="text-sm text-blue-700">
                            Theo tiêu chí: <strong className="font-semibold">
                                {criteria === 'all' ? 'Từ khóa chung' : 
                                 criteria === 'name' ? 'Tên sách' :
                                 criteria === 'author' ? 'Tác giả' :
                                 criteria === 'description' ? 'Mô tả' : criteria}
                            </strong> (Trang {currentPage} / {totalPages})
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {results.map((book) => (
                            <BookCard key={book.book_id} book={book} />
                        ))}
                    </div>
                    {/* HIỂN THỊ PAGINATION CONTROLS */}
                    {totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            // basePath="/search" // Không cần nếu PaginationControls tự lấy pathname
                        />
                    )}
                </div>
            )}
        </div>
    );
}
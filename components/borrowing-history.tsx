'use client';

import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';

interface BorrowingHistoryItem {
  id: number;
  book_id: number;
  book_name: string;
  borrowed_at: Date;
  returned_at: Date | null;
}

export default function BorrowingHistory() {
  const [history, setHistory] = useState<BorrowingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/borrowing-history');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch borrowing history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Borrowing History</h2>
      {history.length === 0 ? (
        <p>No borrowing history found.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{item.book_name}</h3>
              <div className="text-sm text-gray-500">
                <p>Borrowed: {new Date(item.borrowed_at).toLocaleDateString()}</p>
                <p>Returned: {item.returned_at ? new Date(item.returned_at).toLocaleDateString() : 'Not returned yet'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

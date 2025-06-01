'use client';

import { useEffect, useState } from 'react';

interface Fine {
  id: number;
  book_id: number;
  book_name: string;
  amount: number;
  due_date: Date;
  paid: boolean;
}

export default function Fines() {
  const [fines, setFines] = useState<Fine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch('/api/fines');
        const data = await response.json();
        setFines(data);
      } catch (error) {
        console.error('Failed to fetch fines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fines</h2>
      {fines.length === 0 ? (
        <p>No fines found.</p>
      ) : (
        <div className="grid gap-4">
          {fines.map((fine) => (
            <div key={fine.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{fine.book_name}</h3>
              <div className="text-sm text-gray-500">
                <p>Amount: ${fine.amount.toFixed(2)}</p>
                <p>Due Date: {new Date(fine.due_date).toLocaleDateString()}</p>
                <p>Status: {fine.paid ? 'Paid' : 'Unpaid'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
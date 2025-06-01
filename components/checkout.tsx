'use client';

import { useEffect, useState } from 'react';

interface CheckoutItem {
  id: number;
  book_id: number;
  book_name: string;
  checkout_date: Date;
  due_date: Date;
}

export default function Checkout() {
  const [checkouts, setCheckouts] = useState<CheckoutItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await fetch('/api/checkouts');
        const data = await response.json();
        setCheckouts(data);
      } catch (error) {
        console.error('Failed to fetch checkouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Checked Out Books</h2>
      {checkouts.length === 0 ? (
        <p>No books currently checked out.</p>
      ) : (
        <div className="grid gap-4">
          {checkouts.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{item.book_name}</h3>
              <div className="text-sm text-gray-500">
                <p>Checkout Date: {new Date(item.checkout_date).toLocaleDateString()}</p>
                <p>Due Date: {new Date(item.due_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

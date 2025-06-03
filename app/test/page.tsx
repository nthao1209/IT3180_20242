'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, History, Star, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

// Mock data
const mockBooks = [
  {
    book_id: 1,
    name: "Test Book 1",
    author: { user_id: 1, name: "Test Author 1" },
    cover_image: "https://picsum.photos/200/300",
    price: 19.99,
    isLiked: false,
    isPurchased: false,
    rating: 4.5,
    description: "This is a test book description for Book 1."
  },
  {
    book_id: 2,
    name: "Test Book 2",
    author: { user_id: 2, name: "Test Author 2" },
    cover_image: "https://picsum.photos/200/300",
    price: 29.99,
    isLiked: true,
    isPurchased: true,
    rating: 4.0,
    description: "This is a test book description for Book 2."
  },
  {
    book_id: 3,
    name: "Test Book 3",
    author: { user_id: 3, name: "Test Author 3" },
    cover_image: "https://picsum.photos/200/300",
    price: 15.99,
    isLiked: false,
    isPurchased: false,
    rating: 3.5,
    description: "This is a test book description for Book 3."
  },
];

type Book = typeof mockBooks[0];
type PurchaseHistory = {
  id: string;
  book_id: number;
  book_name: string;
  price: number;
  purchase_date: Date;
  status: 'completed' | 'pending' | 'failed';
  error_message?: string;
};

export default function TestPage() {
  const { cart, addToCart: addToCartContext, removeFromCart: removeFromCartContext, clearCart, getTotalPrice: getTotalPriceContext } = useCart();
  const [books, setBooks] = useState(mockBooks);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const toggleLike = (bookId: number) => {
    setBooks(books.map(book => 
      book.book_id === bookId 
        ? { ...book, isLiked: !book.isLiked }
        : book
    ));
  };

  const handleAddToCart = (book: Book) => {
    addToCartContext({
      book_id: book.book_id,
      price: book.price,
      name: book.name,
      cover_image: book.cover_image,
      author: { name: book.author.name }
    });
  };

  const handleRemoveFromCart = (bookId: number) => {
    removeFromCartContext(bookId);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setPurchaseError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            book_id: item.book_id,
            price: item.price
          }))
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Add to purchase history
      const newPurchases: PurchaseHistory[] = cart.map(book => ({
        id: Math.random().toString(36).substr(2, 9),
        book_id: book.book_id,
        book_name: book.name,
        price: book.price,
        purchase_date: new Date(),
        status: 'completed'
      }));

      setPurchaseHistory([...purchaseHistory, ...newPurchases]);
      setBooks(books.map(book => 
        cart.some(cartBook => cartBook.book_id === book.book_id)
          ? { ...book, isPurchased: true }
          : book
      ));
      
      clearCart();
      window.location.href = url; // Redirect to success page
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setPurchaseError(errorMessage);
      toast.error(errorMessage);
      
      // Add failed purchase to history
      const failedPurchases: PurchaseHistory[] = cart.map(book => ({
        id: Math.random().toString(36).substr(2, 9),
        book_id: book.book_id,
        book_name: book.name,
        price: book.price,
        purchase_date: new Date(),
        status: 'failed',
        error_message: errorMessage
      }));
      
      setPurchaseHistory([...purchaseHistory, ...failedPurchases]);
    } finally {
      setIsProcessing(false);
    }
  };

  const likedBooks = books.filter(book => book.isLiked);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test Page for Books UI</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Favorites ({likedBooks.length})
          </button>
          <button
            onClick={() => setShowCart(!showCart)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart ({cart.length})
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            History
          </button>
        </div>
      </div>

      {showFavorites && (
        <div className="mb-8 p-4 border rounded-lg bg-red-50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite Books
          </h2>
          {likedBooks.length === 0 ? (
            <p>You haven't liked any books yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedBooks.map(book => (
                <div key={book.book_id} className="border rounded-lg p-4 shadow-sm bg-white">
                  <img 
                    src={book.cover_image} 
                    alt={book.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{book.name}</h3>
                  <p className="text-gray-600">{book.author.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{book.rating}</span>
                  </div>
                  <button
                    onClick={() => toggleLike(book.book_id)}
                    className="mt-4 w-full px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove from Favorites
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCart && (
        <div className="mb-8 p-4 border rounded-lg bg-blue-50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-500" />
            Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map(book => (
                <div key={book.book_id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">{book.name}</h3>
                    <p className="text-gray-600">${book.price}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(book.book_id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold">Total: ${getTotalPriceContext().toFixed(2)}</p>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded flex items-center gap-2 ${
                    isProcessing 
                      ? 'bg-gray-400' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isProcessing ? 'Processing...' : 'Checkout'}
                </button>
              </div>
              {purchaseError && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                  {purchaseError}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {showHistory && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-500" />
            Purchase History
          </h2>
          {purchaseHistory.length === 0 ? (
            <p>No purchase history</p>
          ) : (
            <div className="space-y-2">
              {purchaseHistory.map(purchase => (
                <div key={purchase.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">{purchase.book_name}</h3>
                    <p className="text-sm text-gray-600">
                      {purchase.purchase_date.toLocaleDateString()}
                    </p>
                    {purchase.error_message && (
                      <p className="text-sm text-red-600">{purchase.error_message}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${purchase.price}</p>
                    <span className={`text-sm ${
                      purchase.status === 'completed' ? 'text-green-600' : 
                      purchase.status === 'pending' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.book_id} className="border rounded-lg p-4 shadow-sm">
            <img 
              src={book.cover_image} 
              alt={book.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-600">{book.author.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{book.rating}</span>
            </div>
            <p className="text-lg font-bold mt-2">${book.price}</p>
            <p className="text-sm text-gray-500 mt-1">{book.description}</p>
            
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => toggleLike(book.book_id)}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  book.isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <Heart className={`h-4 w-4 ${book.isLiked ? 'fill-white' : ''}`} />
                {book.isLiked ? 'Unlike' : 'Like'}
              </button>
              
              {!book.isPurchased ? (
                <button
                  onClick={() => handleAddToCart(book)}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              ) : (
                <span className="px-4 py-2 rounded bg-green-500 text-white flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Purchased
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
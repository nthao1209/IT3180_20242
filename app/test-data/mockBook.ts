export const mockBook = {
  book_id: 1,
  name: "The Great Gatsby",
  author: {
    user_id: 1,
    name: "F. Scott Fitzgerald",
    email: "fitzgerald@example.com",
    bio: "American novelist and short story writer"
  },
  cover_image: "https://picsum.photos/200/300",
  price: 19.99,
  description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  isbn: "978-0743273565",
  published_date: "1925-04-10",
  genre: "Fiction",
  language: "English",
  page_count: 180,
  rating: 4.5,
  review_count: 1200,
  stock: 50,
  is_featured: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
};

// Mock book with minimal required fields
export const minimalMockBook = {
  book_id: 1,
  name: "The Great Gatsby",
  author: {
    user_id: 1,
    name: "F. Scott Fitzgerald"
  },
  cover_image: "https://picsum.photos/200/300",
  price: 19.99,
  description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
}; 
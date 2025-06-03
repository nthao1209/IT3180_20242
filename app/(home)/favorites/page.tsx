import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { FavoriteBookCard } from '@/components/bookcard'
import { Heart } from 'lucide-react'

async function FavoritesPage() {
  const session = await auth()
  
  if (!session?.user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
        <p className="text-gray-600">Please sign in to view your favorite books.</p>
      </div>
    )
  }

  const likedBooks = await prisma.liked_books.findMany({
    where: {
      user_id: parseInt(session.user.id)
    },
    include: {
      book: {
        include: {
          book_photos: true,
          users: {
            select: {
              user_id: true,
              name: true
            }
          }
        }
      }
    }
  })

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
      </div>

      {likedBooks.length === 0 ? (
        <p className="text-center text-gray-500">You haven't liked any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {likedBooks.map((likedBook) => (
            <FavoriteBookCard 
              key={likedBook.book_id} 
              book={{
                ...likedBook.book,
                author: likedBook.book.users
              }} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage 
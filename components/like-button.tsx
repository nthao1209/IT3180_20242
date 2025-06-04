'use client'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { likeBook, unlikeBook } from '@/actions/actions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface LikeButtonProps {
  bookId: number
  initialLiked: boolean
}

export default function LikeButton({ bookId, initialLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [isLoading, setIsLoading] = useState(false)
  const path = usePathname()

  const handleLike = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      if (isLiked) {
        await unlikeBook(bookId, path)
        toast.success('Book removed from favorites')
      } else {
        await likeBook(bookId, path)
        toast.success('Book added to favorites')
      }
      setIsLiked(!isLiked)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update favorites')
      } else {
        toast.error('Failed to update favorites')
      }
      console.error('Error updating favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 ${
        isLiked ? 'text-red-500 border-red-500 hover:bg-red-50' : ''
      }`}
    >
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
      {isLiked ? 'Favorited' : 'Add to Favorites'}
    </Button>
  )
} 
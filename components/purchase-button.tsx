'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'

interface PurchaseButtonProps {
  bookId: number
  price: number
  name: string
  cover_image?: string | null
  author: {
    name: string | null
  }
}

export default function PurchaseButton({ bookId, price, name, cover_image, author }: PurchaseButtonProps) {
  const { addToCart } = useCart()

  const handlePurchase = () => {
    addToCart({
      book_id: bookId,
      price,
      name,
      cover_image,
      author
    })
  }

  return (
    <Button
      onClick={handlePurchase}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart (${price.toFixed(2)})
    </Button>
  )
} 
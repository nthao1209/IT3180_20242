'use client'

import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsProcessing(true)
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
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      clearCart()
      router.push(url)
    } catch (error) {
      toast.error('Failed to process checkout')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={() => router.push('/catalog')}>
            Browse Books
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.book_id} className="flex items-center gap-4 p-4 border rounded-lg">
                {item.cover_image && (
                  <Image
                    src={item.cover_image}
                    alt={item.name}
                    width={100}
                    height={150}
                    className="object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.author.name}</p>
                  <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.book_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 
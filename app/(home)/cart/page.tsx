'use client'

import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import BankPayment from '@/components/bank-payment-form'
import { processCheckout } from '@/actions/actions'

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')

  const handlePaymentSubmit = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty or the book is not available')
      return ''
    }

    setIsProcessing(true)
    try {
      const result = await processCheckout(
        cart.map(item => ({
          book_id: item.book_id,
          price: item.price
        }))
      )

      if (result.success) {
        //setReferenceNumber(result.referenceNumber)
        toast.success(result.message)
        //router.push(`/purchase/pending?ref=${result.referenceNumber}`)
        return result.referenceNumber

      } else {
        throw new Error('Failed to process payment')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process payment')
      console.error('Payment error:', error)
      return ''
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some books to your cart to get started</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/catalog')}
          >
            Browse Books
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.book_id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {/* {item.cover_image && (
                    <Image
                      src={item.cover_image}
                      alt={item.name}
                      width={100}
                      height={150}
                      className="object-cover rounded"
                    />
                  )} */}
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.author?.name}</p>
                    <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.book_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              {!showPayment ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowPayment(true)}
                  disabled={isProcessing}
                >
                  Proceed to Payment
                </Button>
              ) : (
                <BankPayment
                  totalAmount={getTotalPrice()}
                  onPaymentSubmit={handlePaymentSubmit}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
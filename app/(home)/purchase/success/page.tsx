'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PurchaseSuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Purchase Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your books have been added to your library.
        </p>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => router.push('/library')}
          >
            View My Library
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/catalog')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
} 
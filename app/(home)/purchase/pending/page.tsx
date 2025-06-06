'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { verifyPaymentStatus } from '@/actions/actions'
import { toast } from 'sonner'
import { Loader2, Copy } from 'lucide-react'

export default function PendingPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isChecking, setIsChecking] = useState(false)
  const referenceNumber = searchParams.get('ref')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const checkPaymentStatus = async () => {
    setIsChecking(true)
    try {
      const result = await verifyPaymentStatus()
      if (result.success) {
        if (result.status === 'completed') {
          toast.success('Payment confirmed! Your books are now available in your library.')
          router.push('/my-account')
        } else if (result.status === 'no_pending_payments') {
          toast.info('No pending payments found')
          router.push('/my-account')
        } else {
          toast.info('Payment is still being processed. Please wait.')
        }
      } else {
        toast.error('Failed to check payment status')
      }
    } catch (error) {
      toast.error('Error checking payment status')
      console.error('Status check error:', error)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    // Check status immediately when page loads
    checkPaymentStatus()

    // Set up periodic status checking
    const interval = setInterval(checkPaymentStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-6">Payment Processing</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mb-4">
            Your payment is being processed
          </h2>
          <p className="text-yellow-700 mb-4">
            We are currently verifying your bank transfer. This process may take up to 24 hours.
            You will receive an email notification once your payment is confirmed.
          </p>

          {referenceNumber && (
            <div className="bg-white border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Your Reference Number</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg">{referenceNumber}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(referenceNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-yellow-600 mt-2">
                Keep this reference number for tracking your payment status
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button
              onClick={checkPaymentStatus}
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Status...
                </>
              ) : (
                'Check Status'
              )}
            </Button>
            <Button
  onClick={checkPaymentStatus}
  disabled={isChecking}
>
  {isChecking ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Checking Status...
    </>
  ) : (
    'I Have Completed the Transfer'
  )}
</Button>

            <Button
              variant="outline"
              onClick={() => router.push('/library')}
            >
              View My Library
            </Button>
          </div>
        </div>

        <div className="text-left">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Your payment details have been received</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Our team is verifying your bank transfer</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">→</span>
              <span>Once confirmed, your books will be added to your library</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">→</span>
              <span>You'll receive an email notification with confirmation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface BankPaymentProps {
    totalAmount: number
    onPaymentSubmit: (referenceNumber: string) => Promise<string>
}

  

// Bank account details
const BANK_DETAILS = {
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountHolder: 'E-Book Store',
    branch: 'Ha Noi Branch'
}

export default function BankPayment({ totalAmount, onPaymentSubmit }: BankPaymentProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState('')
    const [hasStartedPayment, setHasStartedPayment] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!')
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            const refNumber = await onPaymentSubmit('') // Server will generate reference number
            setReferenceNumber(refNumber)
            setHasStartedPayment(true)
            toast.success('Payment instructions generated')
        } catch (error) {
            toast.error('Failed to generate payment instructions')
            console.error('Payment error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Bank Transfer Instructions</h2>
            <p className="text-lg font-semibold mb-4">
                Total Amount: ${totalAmount.toFixed(2)}
            </p>

            {!hasStartedPayment ? (
                <Button 
                    className="w-full mb-6"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Generating...' : 'Proceed to Payment'}
                </Button>
            ) : (
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Important Reference Number</h3>
                        <div className="flex items-center gap-2 bg-white p-2 rounded border">
                            <span className="font-mono text-lg">{referenceNumber}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(referenceNumber)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-blue-600 mt-2">
                            Please include this reference number in your transfer description
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Bank Account Details</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-gray-600">Bank Name:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{BANK_DETAILS.bankName}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(BANK_DETAILS.bankName)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Account Number:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{BANK_DETAILS.accountNumber}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(BANK_DETAILS.accountNumber)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Account Holder:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{BANK_DETAILS.accountHolder}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(BANK_DETAILS.accountHolder)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Branch:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{BANK_DETAILS.branch}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(BANK_DETAILS.branch)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Transfer Amount</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-green-600">
                                    ${totalAmount.toFixed(2)}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(totalAmount.toFixed(2))}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-600">
                        <p className="font-semibold mb-2">Important Notes:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Please include the reference number in your transfer description</li>
                            <li>Your books will be available after payment confirmation (usually within 24 hours)</li>
                            <li>You will receive an email notification once payment is verified</li>
                            <li>Keep your reference number for tracking your payment status</li>
                        </ul>
                    </div>

                    <Button
            className="w-full mt-4"
            onClick={() => {
              // Navigate to the pending-purchases page
              //router.push('/pending-purchases')
              router.push(`/purchase/pending?ref=${encodeURIComponent(referenceNumber)}`)

            }}
          >
            Completed Payment
          </Button>
                </div>
            )}
        </div>
    )
} 
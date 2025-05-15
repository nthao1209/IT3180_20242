import { auth } from '@/auth'
import { stripe } from '@/lib/stripe'
import React from 'react'
import Stripe from 'stripe'
import { Metadata } from '@stripe/stripe-js'
import { prisma } from '@/lib/prisma'
import { CheckCircle2 } from 'lucide-react'

async function FinePaymentResultPage({ searchParams }: {
    searchParams: { session_id: string }
}) {

    const params = await searchParams
    const { session_id } = params
    const session = await auth()

    if (!session_id) {
        throw new Error("Invalid payment session id")
    }

    if (!session) {
        throw new Error("You must be logged in")
    }

    const checkout_session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['payment_intent']
    })

    const payment_intent = checkout_session.payment_intent as Stripe.PaymentIntent
    const payment_status = payment_intent.status === 'succeeded' ? 'Payment Successful' : 'Payment failed'

    if (payment_intent.status === 'succeeded') {
        const metadata = checkout_session.metadata as Metadata
        const fine_id = metadata['fine_id']

        await prisma.$transaction(async t => (
            await t.fines.update({
                where: {
                    fine_id: +fine_id!
                },
                data: {
                    paid_date: new Date()
                }
            })
        ))
    }

    return (
        <div className='container mx-auto flex flex-col items-center pt-16'>
            {
                payment_intent.status === 'succeeded' ?
                    <>
                        <CheckCircle2 size={64} className='text-green-500' />
                        <p className="font-medium text-primary text-2xl sm:text-4xl py-8">Thank you!</p>
                        <h1 className='mt-2 text-3xl text-center font-bold tracking-tight sm:text-5xl'>
                            Your fine has been paid.
                        </h1>
                    </>
                    :
                    <p className='text-2xl text-red-500 border p-4 rounded-sm'>{payment_status}</p>

            }
        </div>
    )
}

export default FinePaymentResultPage
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful checkout
      
      break

    case 'payment_intent.succeeded':
      // Handle successful payment
      break

    case 'payment_intent.payment_failed':
      // Handle failed payment
      break

    case 'charge.succeeded':
      // Handle successful charge
      break

    case 'charge.failed':
      // Handle failed charge
      break

    case 'charge.refunded':
      // Handle refund
      break

    case 'charge.refund.updated':
      // Handle refund update
      break

    case 'customer.created':
      // Handle customer creation
      break

    case 'customer.updated':
      // Handle customer update
      break

    case 'customer.deleted':
      // Handle customer deletion
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
} 
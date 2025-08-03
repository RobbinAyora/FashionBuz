import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

export async function POST(req: Request) {
  const { items } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'kes',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price  , // Stripe expects amount in cents
        },
        quantity: item.quantity ?? 1, // ✅ Make sure quantity is passed
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    })

    return NextResponse.json({ id: session.id })
  } catch (err: any) {
    console.error('Stripe session error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


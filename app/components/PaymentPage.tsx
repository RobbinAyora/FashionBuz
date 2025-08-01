'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from './CartContext'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage() {
  const { getTotal, cartItems } = useCart()
  const [method, setMethod] = useState<'mpesa' | 'card'>('mpesa')
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    if (!name || !email || !phoneNumber || !address) {
      toast.error('Please fill in all billing details.')
      return
    }

    setLoading(true)

    if (method === 'mpesa') {
      try {
        const res = await fetch('/api/stk-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            address,
            amount: getTotal(),
          }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to initiate payment.')

        toast.success('✅ STK Push sent. Check your phone...')
        const checkoutRequestID = data.data.CheckoutRequestID

        let attempts = 0
        const pollQuery = async () => {
          const pollRes = await fetch('/api/stk-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutRequestID }),
          })

          const pollData = await pollRes.json()

          if (!pollData.success) {
            toast.error('❌ Error querying payment. Try again.')
            setLoading(false)
            return
          }

          const resultCode = pollData.data.ResultCode

          if (resultCode === '0') {
            toast.success('✅ Payment confirmed!')
            setLoading(false)
          } else if (resultCode === '1' || resultCode === '1032') {
            toast.error('❌ Payment cancelled or timed out.')
            setLoading(false)
          } else if (attempts < 5) {
            attempts++
            setTimeout(pollQuery, 5000)
          } else {
            toast.error('⚠ Payment not confirmed. Try again later.')
            setLoading(false)
          }
        }

        pollQuery()
      } catch (err) {
        console.error(err)
        toast.error('❌ M-PESA payment failed.')
        setLoading(false)
      }

      return
    }

    // Stripe Checkout
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Stripe session failed.')

      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId: data.id })
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong during payment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Payment</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Billing Details</h2>
          {loading ? (
            <Skeleton count={4} height={45} className="mb-4" />
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Shipping Address"
                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </form>
          )}
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Payment Method</h2>
            {loading ? (
              <Skeleton count={2} height={30} className="mb-3" />
            ) : (
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    value="mpesa"
                    checked={method === 'mpesa'}
                    onChange={() => setMethod('mpesa')}
                    className="accent-blue-600"
                  />
                  <span>Pay with M-PESA</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    value="card"
                    checked={method === 'card'}
                    onChange={() => setMethod('card')}
                    className="accent-blue-600"
                  />
                  <span>Credit/Debit Card (Stripe)</span>
                </label>
              </div>
            )}
          </div>

          <div className="bg-blue-100 p-4 rounded-xl flex justify-between items-center shadow-inner">
            <span className="text-lg font-semibold text-blue-700">Total:</span>
            <span className="text-xl font-bold text-blue-700">
              {loading ? <Skeleton width={80} /> : `KES ${getTotal()}`}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            type="button"
            className={`w-full ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-3 rounded-lg font-semibold transition`}
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </button>

          <Link href="/checkout">
            <button className="w-full mt-2 text-blue-600 hover:underline">
              ⬅ Back to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}







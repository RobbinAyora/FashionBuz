'use client'

import Link from 'next/link'
import { useCart } from './CartContext'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CheckoutPage() {
  const { cartItems, getTotal, removeFromCart } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Checkout</h1>

      {loading ? (
        <div className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-md">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex justify-between pb-3">
              <Skeleton width={120} height={20} />
              <Skeleton width={60} height={20} />
            </div>
          ))}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-md">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-blue-200 pb-3 text-gray-800"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">KES {item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)} // ✅ Fixed spelling
                    className="text-red-600 hover:text-red-800 text-lg font-bold"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-blue-700">Total</h2>
            <span className="text-xl font-bold text-blue-700">
              KES {getTotal()}
            </span>
          </div>
        </>
      )}

      {!loading && cartItems.length > 0 && (
        <Link href="/payment" className="inline-block mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium shadow-md">
            Proceed to Payments
          </button>
        </Link>
      )}
    </div>
  )
}




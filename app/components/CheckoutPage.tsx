'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function CheckoutPage() {
  const { cartItems, getTotal } = useCart()

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-md">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-blue-200 pb-3 text-gray-800"
              >
                <span className="font-medium">{item.name}</span>
                <span className="font-semibold">KES {item.price}</span>
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

      <Link href="/payment" className="inline-block mt-10">
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium shadow-md">
          Proceed to Payments
        </button>
      </Link>
    </div>
  )
}



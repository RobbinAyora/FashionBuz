'use client'

import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Payment {
  _id: string
  name: string
  email: string
  phoneNumber: string
  address: string
  amount: number
  method: string
  status: string
  cartItems?: any[]
  mpesaCheckoutRequestID?: string
  stripeSessionID?: string
  createdAt: string
}

const PaymentSection = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('/api/payments')
        const data = await res.json()
        setPayments(data)
      } catch (err) {
        console.error('Error fetching payments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  return (
    <div className="px-4 py-6 md:px-8 bg-white rounded-2xl shadow-lg w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        💰 Customer Payments
      </h2>

      {loading ? (
        <>
          {/* Skeleton for table view */}
          <div className="hidden lg:block space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height={40} />
            ))}
          </div>

          {/* Skeleton for mobile card view */}
          <div className="lg:hidden space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-xl bg-white shadow">
                <Skeleton height={20} count={6} />
              </div>
            ))}
          </div>
        </>
      ) : payments.length === 0 ? (
        <p className="text-gray-500 text-sm">No payments yet.</p>
      ) : (
        <>
          {/* Table View for Large Screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-md shadow-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Method</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border font-medium">{p.name || '-'}</td>
                    <td className="p-3 border text-green-700 font-semibold">
                      Ksh {p.amount.toLocaleString()}
                    </td>
                    <td className="p-3 border capitalize">{p.method}</td>
                    <td
                      className={`p-3 border font-medium ${
                        p.status === 'success'
                          ? 'text-green-600'
                          : p.status === 'failed'
                          ? 'text-red-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="p-3 border">{p.phoneNumber || '-'}</td>
                    <td className="p-3 border whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 border text-xs break-all max-w-xs">
                      {p.method === 'mpesa'
                        ? p.mpesaCheckoutRequestID
                        : p.stripeSessionID || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Small & Medium Screens */}
          <div className="lg:hidden space-y-4">
            {payments.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
              >
                <div>
                  <span className="font-semibold text-gray-600">Name:</span> {p.name || '-'}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Amount:</span>{' '}
                  <span className="text-green-700 font-bold">
                    Ksh {p.amount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Method:</span>{' '}
                  {p.method}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Status:</span>{' '}
                  <span
                    className={`font-semibold ${
                      p.status === 'success'
                        ? 'text-green-600'
                        : p.status === 'failed'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Phone:</span>{' '}
                  {p.phoneNumber || '-'}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Date:</span>{' '}
                  {new Date(p.createdAt).toLocaleString()}
                </div>
                <div className="break-words">
                  <span className="font-semibold text-gray-600">Transaction ID:</span>{' '}
                  <span className="text-xs break-all">
                    {p.method === 'mpesa'
                      ? p.mpesaCheckoutRequestID
                      : p.stripeSessionID || '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentSection






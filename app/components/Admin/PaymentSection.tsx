'use client'
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/payments')
      const data = await res.json()
      setPayments(data)
    }
    fetchPayments()
  }, [])

  return (
    <div className="p-6 md:p-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💰 Customer Payments</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
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
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
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
                  <td className="p-3 border">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border text-xs break-all">
                    {p.method === 'mpesa'
                      ? p.mpesaCheckoutRequestID
                      : p.stripeSessionID || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PaymentSection


'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface AdminChartsProps {
  totalSales: number
  totalOrders: number
  pendingOrders: number
}

const AdminCharts = ({ totalSales, totalOrders, pendingOrders }: AdminChartsProps) => {
  const [loading, setLoading] = useState(true)

  const barData = [
    { name: 'Sales', value: totalSales },
    { name: 'Orders', value: totalOrders },
    { name: 'Pending', value: pendingOrders }
  ]

  const lineData = [
    { day: 'Mon', sales: 8000 },
    { day: 'Tue', sales: 5000 },
    { day: 'Wed', sales: 4000 },
    { day: 'Thu', sales: 7000 },
    { day: 'Fri', sales: 2000 },
    { day: 'Sat', sales: 6500 },
    { day: 'Sun', sales: 3000 }
  ]

  const pieData = [
    { name: 'Paid', value: totalOrders - pendingOrders },
    { name: 'Pending', value: pendingOrders }
  ]

  const COLORS = ['#3b82f6', '#facc15']

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // simulate loading
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Overview</h3>
        {loading ? (
          <Skeleton height={250} />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Sales</h3>
        {loading ? (
          <Skeleton height={250} />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Status</h3>
        {loading ? (
          <Skeleton height={250} />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default AdminCharts



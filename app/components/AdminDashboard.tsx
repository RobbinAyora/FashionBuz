'use client'

import { useEffect, useState, useRef } from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Menu,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  LogOut,
  X,
} from 'lucide-react'

import PaymentSection from '../components/PaymentSection'
import ProductSection from '../components/ProductSection'

interface Payment {
  amount: number
  status: string
}

const StatSkeleton = () => (
  <div className="animate-pulse bg-white rounded-xl shadow p-4 w-full sm:w-1/2 md:w-1/3 flex-1">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-8 bg-gray-300 rounded w-1/2" />
  </div>
)

const ChartSkeleton = () => (
  <div className="animate-pulse bg-white rounded-xl shadow p-4 w-full h-72">
    <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-56 bg-gray-100 rounded" />
  </div>
)

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white rounded-xl shadow p-4 w-full sm:w-1/2 md:w-1/3 flex-1">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
)

const ChartCard = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="bg-white rounded-xl shadow p-4 w-full h-72">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    {children}
  </div>
)

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'payments'>('dashboard')
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('/api/payments')
        const data = await res.json()
        setPayments(data)
      } catch (e) {
        console.error('Error fetching payments:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  useEffect(() => {
    const totalSales = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const totalOrders = payments.length
    const pendingOrders = payments.filter(p => p.status === 'pending').length
    setStats({ totalSales, totalOrders, pendingOrders })
  }, [payments])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }
    if (sidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [sidebarOpen])

  const pieData = [
    { name: 'Total', value: stats.totalOrders },
    { name: 'Pending', value: stats.pendingOrders },
  ]

  const lineData = [
    { name: 'Week 1', sales: stats.totalSales / 3 },
    { name: 'Week 2', sales: stats.totalSales / 2 },
    { name: 'Week 3', sales: stats.totalSales },
  ]

  const barData = [
    { name: 'Sales', value: stats.totalSales },
    { name: 'Orders', value: stats.totalOrders },
    { name: 'Pending', value: stats.pendingOrders },
  ]

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800">
      {/* Mobile hamburger top-left */}
      <div className="md:hidden p-4 bg-white shadow fixed top-0 left-0 z-50">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-transparent z-30 md:hidden"
        />
      )}

      <div className="flex pt-14 md:pt-0">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`bg-white shadow-md p-4 space-y-4 md:space-y-6 w-64 z-40 transition-transform duration-300 ease-in-out
          fixed top-0 left-0 h-full md:sticky md:top-0 md:h-screen ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-blue-600">Admin</h1>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard')
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <TrendingUp size={18} className="mr-2" />
              Dashboard
            </button>

            <button
              onClick={() => {
                setActiveTab('products')
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                activeTab === 'products' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={18} className="mr-2" />
              Products
            </button>

            <button
              onClick={() => {
                setActiveTab('payments')
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                activeTab === 'payments' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <DollarSign size={18} className="mr-2" />
              Payments
            </button>

            <button
              onClick={() => alert('Logging out...')}
              className="flex items-center w-full p-2 rounded-lg transition-colors hover:bg-red-100 text-red-600"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-6 md:px-6 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 capitalize">
            {activeTab}
          </h2>

          {activeTab === 'dashboard' && (
            <>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {loading ? (
                  <>
                    <StatSkeleton />
                    <StatSkeleton />
                    <StatSkeleton />
                  </>
                ) : (
                  <>
                    <StatCard title="Total Sales" value={stats.totalSales} />
                    <StatCard title="Total Orders" value={stats.totalOrders} />
                    <StatCard title="Pending Orders" value={stats.pendingOrders} />
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  <>
                    <ChartCard title="Sales Bar Chart">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Order Pie Chart">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            label
                          >
                            {pieData.map((_, index) => (
                              <Cell key={index} fill={['#3b82f6', '#f97316'][index]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Sales Over Time">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="sales" stroke="#10b981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === 'products' && <ProductSection />}
          {activeTab === 'payments' && <PaymentSection />}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard














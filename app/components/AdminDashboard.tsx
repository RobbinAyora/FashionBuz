'use client'
import React, { useState } from 'react'
import {
  Menu,
  DollarSign,
  ShoppingBag,
  LogOut,
  TrendingUp,
} from 'lucide-react'
import ProductSection from './Admin/ProductSection'
import PaymentSection from './Admin/PaymentSection'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'payments'>('dashboard')

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col p-4 space-y-4 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin</h1>
        <nav className="space-y-2">
          <NavItem
            icon={<TrendingUp size={18} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<ShoppingBag size={18} />}
            label="Products"
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          />
          <NavItem
            icon={<DollarSign size={18} />}
            label="Payments"
            active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
          />
          <NavItem
            icon={<LogOut size={18} />}
            label="Logout"
            onClick={() => alert('Logging out...')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="md:hidden">
            <Menu size={24} />
          </div>
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="text-sm">Welcome, Admin</div>
        </div>

        {/* Render Section Based on Active Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Sales" value="KES 120,000" icon={<DollarSign size={20} />} />
            <StatCard title="Orders" value="215" icon={<ShoppingBag size={20} />} />
            <StatCard title="Pending Orders" value="12" icon={<TrendingUp size={20} />} />
          </div>
        )}

        {activeTab === 'products' && (
          <ProductSection />
        )}

        {activeTab === 'payments' && (
          <PaymentSection />
        )}
      </main>
    </div>
  )
}

// Reusable Components

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded transition-colors 
    ${active ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
  >
    {icon}
    <span>{label}</span>
  </div>
)

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-lg font-bold">{value}</h3>
    </div>
  </div>
)

export default AdminDashboard



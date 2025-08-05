'use client'

import AdminChart from "./AdminChart";
import PaymentSection from "./PaymentSection";
import ProductSection from "./ProductSection";


export default function AdminPage() {
  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
     <AdminChart totalSales={10000} totalOrders={50} pendingOrders={10} />

      <PaymentSection />
      <ProductSection />
      
    </main>
  )
}

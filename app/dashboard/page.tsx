'use client';

import dynamic from 'next/dynamic';
import AdminDashboard from '../components/AdminDashboard';


const PaymentPage = dynamic(() => import('../components/AdminDashboard'), { ssr: false });

export default function DashboardRoute() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <AdminDashboard />
    </div>
  );
}

// app/payment/page.tsx or wherever you're rendering the form
'use client';

import dynamic from 'next/dynamic';


const PaymentPage = dynamic(() => import('../components/PaymentPage'), { ssr: false });

export default function PaymentRoute() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <PaymentPage />
    </div>
  );
}

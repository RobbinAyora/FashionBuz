import { connectDB } from '@/lib/db'
import Payments from '@/models/Payments'
import { NextResponse } from 'next/server'


export async function GET() {
  try {
    await connectDB()

    const payments = await Payments.find()
    const totalSales = payments.reduce((acc, p) => acc + Number(p.amount), 0)
    const totalOrders = payments.length
    const pendingOrders = payments.filter(p => p.status === 'pending').length

    return NextResponse.json({
      totalSales,
      totalOrders,
      pendingOrders
    })
  } catch (err) {
    console.error('Error fetching admin stats:', err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

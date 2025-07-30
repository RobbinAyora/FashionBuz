'use server'
import { sendStkPush } from '@/actions/stkPush'
import { connectDB } from '@/lib/db'
import Payments from '@/models/Payments'
import { NextRequest, NextResponse } from 'next/server'
 // Adjust the import path to your actual file location

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { phoneNumber, amount, name, email, address } = body

    if (!phoneNumber || !amount) {
      return NextResponse.json({ error: 'Phone number and amount are required.' }, { status: 400 })
    }

    const result = await sendStkPush({ phoneNumber, amount, name, email, address })

    
    const checkoutRequestID = result?.CheckoutRequestID

    // 2. Save to DB
    await connectDB()
    await Payments.create({
      method: 'mpesa',
      amount,
      phoneNumber,
      name,
      email,
      address,
      mpesaCheckoutRequestID: checkoutRequestID,
      mpesaResponse: result,
     
      status: 'pending',
    })
    console.log('✅ Payment saved to DB:', Payments);

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('❌ API Route Error:', error.message)
    return NextResponse.json(
      { success: false, error: error.message || 'STK push failed' },
      { status: 500 }
    )
  }
}

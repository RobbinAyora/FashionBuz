'use server'

import { NextRequest, NextResponse } from 'next/server'
import { stkPushQuery } from '@/actions/stkPushQuery'
import { connectDB } from '@/lib/db'
import Payments from '@/models/Payments'
// Ensure your model file is named Payment.ts

export async function POST(req: NextRequest) {
  try {
    const { checkoutRequestID } = await req.json()

    if (!checkoutRequestID) {
      return NextResponse.json({ error: 'Missing CheckoutRequestID' }, { status: 400 })
    }

    // Optional delay to avoid 429 errors from Safaricom
    await new Promise((resolve) => setTimeout(resolve, 15000))

    const result = await stkPushQuery(checkoutRequestID)

    if (result.error) {
      const errorMessage =
        result.error?.response?.data?.errorMessage || result.error.message || 'Unknown error'

      console.error('❌ STK Query Error:', errorMessage)
      return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
    }

    const queryData = result.data
    const resultCode = queryData?.ResultCode

    await connectDB()

    await Payments.findOneAndUpdate(
      { mpesaCheckoutRequestID: checkoutRequestID },
      {
        status:
          resultCode === '0'
            ? 'success'
            : resultCode === '1' || resultCode === '1032'
            ? 'cancelled'
            : 'failed',
        mpesaResponse: queryData,
      }
    )

    return NextResponse.json({ success: true, data: queryData })
  } catch (err: any) {
    console.error('❌ Unexpected Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}



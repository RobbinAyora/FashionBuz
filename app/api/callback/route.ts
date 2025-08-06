// app/api/callback/route.ts
import { NextResponse } from 'next/server'
import { stkPushQuery } from '@/actions/stkPushQuery'

export const runtime = 'nodejs' // Ensure Edge Runtime doesn't interfere

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("✅ M-PESA Callback Received:", body)

    const stkCallback = body?.Body?.stkCallback
    const resultCode = stkCallback?.ResultCode
    const resultDesc = stkCallback?.ResultDesc
    const checkoutRequestID = stkCallback?.CheckoutRequestID

    if (!checkoutRequestID) {
      console.warn("❌ Missing CheckoutRequestID in callback")
      return NextResponse.json({ success: false, message: 'Invalid callback structure' }, { status: 400 })
    }

    // Optionally verify the status using stkPushQuery
    const queryResult = await stkPushQuery(checkoutRequestID)

    console.log("📦 STK Push Query Result:", queryResult)

    // TODO: Save to DB here if needed

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Callback Error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}


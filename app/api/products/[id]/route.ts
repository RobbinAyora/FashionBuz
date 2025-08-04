import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/Mongodb'
import Product from '@/models/Products'

// PUT Handler
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()

  try {
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE Handler (Fix: Use NextRequest)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB() // 🔄 Optionally add DB connection here too
  const { id } = params

  try {
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}



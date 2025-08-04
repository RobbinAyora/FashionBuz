import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/Mongodb'
import Product from '@/models/Products'

// ✅ Type the context parameter properly
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const { id } = params
  const body = await req.json()

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const { id } = params

  try {
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}






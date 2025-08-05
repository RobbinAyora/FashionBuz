// app/api/products/route.ts
import { connectDB } from '@/lib/db'
import Products from '@/models/Products'
import { NextRequest, NextResponse } from 'next/server'

// GET all products
export async function GET() {
  await connectDB()
  const products = await Products.find()
  return NextResponse.json(products)
}

// POST a new product
export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()

  try {
    const newProduct = new Products(body)
    await newProduct.save()
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}





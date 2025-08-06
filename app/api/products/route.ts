

// POST a new product
// app/api/products/route.ts
import { connectDB } from '@/lib/db'
import Products from '@/models/Products'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const products = await Products.find()
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const newProduct = new Products(body)
    await newProduct.save()
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('POST /api/products error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}






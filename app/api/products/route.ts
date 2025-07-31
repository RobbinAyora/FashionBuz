import { connectDB } from '@/lib/db'
import Products from '@/models/Products'
import { NextResponse } from 'next/server'

const allowedCategories = ['featured', 'feop', 'upcoming']

export async function GET() {
  await connectDB()
  const products = await Products.find().sort({ createdAt: -1 })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const { name, price, image, sale = false, category } = body

  if (!allowedCategories.includes(category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  const product = await Products.create({ name, price, image, sale, category })

  return NextResponse.json(product, { status: 201 })
}



import 'dotenv/config'

import { connectDB } from "@/lib/Mongodb"
import Product from "@/models/Products"


const seedProducts = [
  { name: 'Cloth-1', price: 100, image: '/img-1.jpg' },
  { name: 'Cloth-2', price: 100, image: '/img-2.jpg' },
  { name: 'Cloth-3', price: 100, image: '/img-5.jpg' },
  { name: 'Cloth-4', price: 100, image: '/img-6.jpg' },
  { name: 'Cloth-5', price: 99.5, image: '/img-3.jpg', sale: true },
  { name: 'Cloth-6', price: 100, image: '/img-4.jpg' },
  { name: 'Cloth-7', price: 100, image: '/img-7.jpg' },
  { name: 'Cloth-8', price: 100, image: '/img-8.jpg' }
]

async function seed() {
  await connectDB()
  await Product.deleteMany({})
  await Product.insertMany(seedProducts)
  console.log('🌱 Seeded successfully')
  process.exit(0)
}

seed()

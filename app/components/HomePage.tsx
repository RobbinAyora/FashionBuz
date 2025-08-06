'use client'

import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import { Product } from '../types/Product'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const featured = products.filter((p) => p.category === 'featured')
  const feop = products.filter((p) => p.category === 'feop')
  const upcoming = products.filter((p) => p.category === 'upcoming')

  const renderSkeletonCards = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <div key={i} className="rounded-lg border p-2">
        <Skeleton height={150} />
        <Skeleton height={20} style={{ marginTop: 10 }} />
        <Skeleton height={20} width={60} />
      </div>
    ))

  return (
    <div className="pb-24 max-w-7xl mx-auto">
      <Navbar />

      {/* Featured Products */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading
            ? renderSkeletonCards(4)
            : featured.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={`Ksh.${item.price}`}
                  image={item.image}
                  sale={item.sale}
                />
              ))}
        </div>
      </section>

      {/* Feop Products */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-green-600">New Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading
            ? renderSkeletonCards(4)
            : feop.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={`Ksh.${item.price}`}
                  image={item.image}
                  sale={item.sale}
                />
              ))}
        </div>
      </section>

      {/* Upcoming Products */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-purple-600">Popular Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading
            ? renderSkeletonCards(4)
            : upcoming.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={`Ksh.${item.price}`}
                  image={item.image}
                  sale={item.sale}
                />
              ))}
        </div>
      </section>

      {!loading && products.length === 0 && (
        <p className="text-center mt-10 text-red-500">No products found.</p>
      )}
    </div>
  )
}









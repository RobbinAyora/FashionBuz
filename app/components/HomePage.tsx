'use client'

import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import { Product } from '../types/Product'


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        console.log('Fetched products:', data) // 👈 Add this log
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Optional logging
  useEffect(() => {
    products.forEach((p) => {
      console.log('Product:', {
        name: p.name,
        category: p.category,
        price: p.price,
        sale: p.sale,
      })
    })
  }, [products])

  const featured = products.filter((p) => p.category === 'featured')
  const feop = products.filter((p) => p.category === 'feop')
  const upcoming = products.filter((p) => p.category === 'upcoming')

  return (
    <div className="pb-24 max-w-7xl mx-auto">
      <Navbar />

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center mt-10 text-red-500">No products found.</p>
      ) : (
        <>
          {/* Featured Products */}
          {featured.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Featured Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {featured.map((item) => (
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
          )}

          {/* Feop Products */}
          {feop.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-green-600">Feop Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {feop.map((item) => (
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
          )}

          {/* Upcoming Products */}
          {upcoming.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-purple-600">Upcoming Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {upcoming.map((item) => (
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
          )}
        </>
      )}
    </div>
  )
}








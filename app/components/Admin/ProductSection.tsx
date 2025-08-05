'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface Product {
  _id?: string
  name: string
  price: number
  image: string
  sale?: boolean
  category?: string
}

const ProductSection = () => {
  const [form, setForm] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    sale: false,
    category: 'featured',
  })
  const [products, setProducts] = useState<Product[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Convert image to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const base64 = await convertToBase64(file)
      setForm({ ...form, image: base64 })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success('Product added successfully')
      setForm({
        name: '',
        price: 0,
        image: '',
        sale: false,
        category: 'featured',
      })
      setImageFile(null)
      setPreview(null)
      fetchProducts()
    } else {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
            required
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="featured">Featured</option>
            <option value="new">New</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.sale}
            onChange={(e) => setForm({ ...form, sale: e.target.checked })}
          />
          <label>On Sale</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow bg-white flex flex-col items-center"
          >
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            {product.sale && <p className="text-red-500 text-sm">On Sale</p>}
            <p className="text-sm text-gray-400 mt-1 capitalize">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSection













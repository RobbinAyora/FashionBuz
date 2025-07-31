'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Product } from '@/app/types/Product'

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<Omit<Product, '_id'>>({
    name: '',
    price: 0,
    image: '',
    sale: false,
    category: 'featured',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const handleImageUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageData = form.image

      if (imageFile) {
        imageData = await handleImageUpload(imageFile)
      }

      const payload = {
        ...form,
        image: imageData,
        category: form.category || 'featured',
      }

      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/products/${editingId}` : '/api/products'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(editingId ? 'Product updated!' : 'Product added!')
        setForm({ name: '', price: 0, image: '', sale: false, category: 'featured' })
        setImageFile(null)
        setEditingId(null)
        fetchProducts()
      } else {
        toast.error('Failed to save product')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success('Product deleted')
      fetchProducts()
    } else {
      toast.error('Failed to delete')
    }
  }

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      sale: product.sale ?? false,
      category: product.category || 'featured',
    })
    setImageFile(null)
    setEditingId(product._id || null)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Admin Product Section</h2>

      {/* Add/Edit Product Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setImageFile(file)
          }}
          className="border p-2 rounded"
        />

        {(imageFile || form.image) && (
          <div className="w-32 h-32 relative">
            <Image
              src={imageFile ? URL.createObjectURL(imageFile) : form.image}
              alt="preview"
              fill
              className="object-cover rounded"
            />
          </div>
        )}

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as Product['category'] })
          }
          className="border p-2 rounded"
        >
          <option value="featured">Featured</option>
          <option value="feop">Feop</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.sale}
            onChange={(e) => setForm({ ...form, sale: e.target.checked })}
          />
          On Sale?
        </label>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {loading
              ? editingId
                ? 'Updating...'
                : 'Adding...'
              : editingId
              ? 'Update Product'
              : 'Add Product'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  name: '',
                  price: 0,
                  image: '',
                  sale: false,
                  category: 'featured',
                })
                setImageFile(null)
                setEditingId(null)
              }}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-3 rounded shadow flex flex-col items-center"
          >
            <div className="w-full aspect-[3/4] relative mb-2 rounded overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">Ksh.{product.price}</p>
            <p className="text-xs text-gray-400 capitalize">
              {product.category}
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-sm text-green-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id!)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSection










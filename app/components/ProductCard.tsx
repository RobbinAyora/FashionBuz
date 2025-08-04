'use client'
import Image from 'next/image'
import { useCart } from './CartContext'
import toast from 'react-hot-toast'

interface Product {
  name: string
  price: string
  image: string
  sale?: boolean
}

const ProductCard = ({ name, price, image, sale }: Product) => {
  const { addToCart } = useCart()

  const handleOrder = () => {
    addToCart({
      name,
      price: Math.round(Number(price.replace(/[^\d]/g, '')))
,
      image,
      sale,
    })
    toast.success('Order placed successfully!')
  }

  return (
    <div className="flex flex-col justify-between p-4 rounded-2xl shadow-md bg-white w-full max-w-xs sm:max-w-sm transition hover:shadow-lg">
      <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <p className="text-base font-semibold text-gray-800">{name}</p>
        <p className="text-yellow-500 text-sm">★★★★☆</p>
        <p className="text-sm text-gray-700">
          {sale ? (
            <>
              <span className="line-through mr-1 text-gray-400">Ksh 50.00</span>
              <span className="text-red-500 font-medium">{price}</span>
            </>
          ) : (
            <span className="font-medium">{price}</span>
          )}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleOrder}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard






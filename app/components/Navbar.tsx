'use client'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from './CartContext'

const Navbar = () => {
  const { cartItems } = useCart()
  const hasItems = cartItems.length > 0

  return (
    <div className="w-full px-4 py-4 bg-white shadow flex items-center justify-between">
      {/* Brand */}
      <h1 className="text-2xl font-bold text-blue-600">FashionBuz</h1>

      {/* Right section: Cart + Admin */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Cart Icon */}
        <div className="relative">
          <Link href="/checkout">
            <FiShoppingCart size={26} aria-label="Shopping cart" />
          </Link>

          {hasItems && (
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Admin Button */}
        <Link href="/dashboard">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base">
            Admin
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar










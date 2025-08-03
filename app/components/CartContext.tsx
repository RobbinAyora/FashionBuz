'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
  id: number
  name: string
  price: number
}

type CartContextType = {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (indexToRemove: number) => void
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const removeFromCart = (indexToRemove: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== indexToRemove))
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}



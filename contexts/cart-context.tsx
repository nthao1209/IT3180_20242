'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from 'sonner'

interface Book {
  book_id: number
  name: string
  price: number
  cover_image?: string | null
  author: {
    name: string | null
  }
}

interface CartContextType {
  cart: Book[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Book[]>([])

  const addToCart = (book: Book) => {
    if (!cart.find(item => item.book_id === book.book_id)) {
      setCart([...cart, book])
      toast.success('Added to cart')
    } else {
      toast.error('Book already in cart')
    }
  }

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(book => book.book_id !== bookId))
    toast.success('Removed from cart')
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + book.price, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 
import { createContext } from 'react'
import { CartItem } from '../../types/cartTypes'

export interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: CartItem) => void
  getTotalItems: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

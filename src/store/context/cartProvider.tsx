import React, { useState } from 'react'
import { CartContext } from './cartContext'
import { CartItem } from '../../types/cartTypes'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity
      )
      return exists
        ? prev.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.color === item.color &&
            cartItem.capacity === item.capacity
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity
      )

      if (exists) {
        if (exists.quantity > 1) {
          return prev.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.color === item.color &&
            cartItem.capacity === item.capacity
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        } else {
          return prev.filter(
            (cartItem) =>
              cartItem.id !== item.id ||
              cartItem.color !== item.color ||
              cartItem.capacity !== item.capacity
          )
        }
      }
      return prev
    })
  }

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}
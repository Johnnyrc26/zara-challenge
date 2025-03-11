import { create } from 'zustand'

interface CartItem {
  id: number
  name: string
  quantity: number
}

interface CartStore { 
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        }
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] }
      }
    })
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== parseInt(itemId)),
    }))
  },
  getTotalItems: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },

}))
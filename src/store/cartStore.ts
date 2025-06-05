import { create } from 'zustand'
import { addToCart, getCartItems, removeFromCart, CartItem } from '../api/services/shoppingCartService'

interface CartStore {
  cart: CartItem[]
  loading: boolean
  error: string | null
  totalQuantity: number
  fetchCart: () => Promise<number>
  addToCart: (productId: string, color: string | null, capacity: string | null, imageUrl: string | null) => Promise<void>
  removeFromCart: (productId: string, color: string | null, capacity: string | null, imageUrl: string | null) => Promise<void>
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  loading: false,
  error: null,
  totalQuantity: 0,

  fetchCart: async () => {
    try {
      set({ loading: true, error: null })
      const items = await getCartItems()
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
      set({ cart: items, loading: false, error: null, totalQuantity })
      return totalQuantity
    } catch (error) {
      console.error('Error in fetchCart:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart'
      set({ loading: false, error: errorMessage, totalQuantity: 0 })
      throw new Error(errorMessage) 
    }
  },

  addToCart: async (productId: string, color: string | null, capacity: string | null, imageUrl: string | null) => {
    try {
      set({ loading: true, error: null })
      const newItem = await addToCart(productId, 1, color, capacity, imageUrl)
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item.productId === productId && item.color === color && item.capacity === capacity
        )
        let newCart
        if (existingItem) {
          newCart = state.cart.map((item) =>
            item.productId === productId && item.color === color && item.capacity === capacity
              ? { ...item, quantity: newItem.quantity, imageUrl: newItem.imageUrl }
              : item
          )
        } else {
          newCart = [...state.cart, newItem]
        }
        const totalQuantity = newCart.reduce((sum, item) => sum + item.quantity, 0)
        return { cart: newCart, loading: false, error: null, totalQuantity }
      })
    } catch (error) {
      console.error('Error in addToCart:', error)
      set((state) => ({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to add to cart',
        totalQuantity: state.cart.reduce((sum, item) => sum + item.quantity, 0),
      }))
    }
  },

  removeFromCart: async (productId: string, color: string | null, capacity: string | null, imageUrl: string | null) => {
    try {
      set({ loading: true, error: null })
      await removeFromCart(productId, color, capacity, imageUrl)
  
      set((state) => {
        const existingItem = state.cart.find(
          (item) =>
            item.productId === productId &&
            item.color === color &&
            item.capacity === capacity &&
            item.imageUrl === imageUrl
        )
  
        let newCart = state.cart
  
        if (existingItem) {
          if (existingItem.quantity > 1) {
            newCart = state.cart.map((item) =>
              item.productId === productId &&
              item.color === color &&
              item.capacity === capacity &&
              item.imageUrl === imageUrl
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          } else {
            newCart = state.cart.filter(
              (item) =>
                !(
                  item.productId === productId &&
                  item.color === color &&
                  item.capacity === capacity &&
                  item.imageUrl === imageUrl
                )
            )
          }
        }
  
        const totalQuantity = newCart.reduce((sum, item) => sum + item.quantity, 0)
  
        return { cart: newCart, loading: false, error: null, totalQuantity }
      })
    } catch (error) {
      console.error('Error in removeFromCart:', error)
      set((state) => ({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to remove from cart',
        totalQuantity: state.cart.reduce((sum, item) => sum + item.quantity, 0),
      }))
    }
  },

  getTotalItems: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },
}))
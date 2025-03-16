import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  imageUrl: string
  color: string
  capacity: string
}

interface CartStore {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity
      )

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.color === item.color &&
            cartItem.capacity === item.capacity
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        }
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] }
      }
    })
  },

  removeFromCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity
      );
  
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id &&
              cartItem.color === item.color &&
              cartItem.capacity === item.capacity
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          };
        } else {
          return {
            cart: state.cart.filter(
              (cartItem) =>
                cartItem.id !== item.id ||
                cartItem.color !== item.color ||
                cartItem.capacity !== item.capacity
            ),
          };
        }
      }
      return { cart: state.cart }; 
    });
  },
  
  getTotalItems: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },
}))

export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  imageUrl: string
  color: string
  capacity: string
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  getTotalItems: () => number
}
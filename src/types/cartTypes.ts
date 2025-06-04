export interface CartItem {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  imageUrl: string
  color: string | null
  capacity: string | null
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  getTotalItems: () => number
}
import React from 'react'
import { useCartStore } from '../../../store/cartStore'
import { CartItem } from '../../../types/cartTypes'
import './Product.css'

interface ProductProps {
  item: CartItem
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const { removeFromCart } = useCartStore()

  const ensureHttps = (url?: string): string => {
    if (!url) return ''
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    }
    if (!url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  return (
    <div className="cart-product">
      <img
        src={ensureHttps(item.imageUrl)}
        alt={item.name}
        className="product-image"
      />
      <div className="product-info">
        <p>{item.name?.toUpperCase() || 'Product Name'}</p>
        <div className="product-type">
          {item.capacity && <p>{item.capacity} |</p>}
          {item.color && <p>{item.color.toUpperCase()}</p>}
        </div>
        <div className="product-cart">
          <p>{item.price} EUR</p>
          <p>Quantity: {item.quantity}</p>
          <button
            className="remove-button"
            onClick={() =>
              removeFromCart(item.productId, item.color ?? null, item.capacity ?? null, item.imageUrl ?? null)
            }
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product

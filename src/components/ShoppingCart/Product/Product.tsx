import React from 'react'
import { CartItem } from '../../../store/cartStore' // Ajusta según tu interfaz
import './Product.css'

interface ProductProps {
  item: CartItem
  onRemove: () => void
}

const Product: React.FC<ProductProps> = ({ item, onRemove }) => {
  return (
    <div className="cart-product">
      <img src={item.imageUrl} alt={item.name} className="product-image" />
      <div className="product-info">
        <p>{item.name.toUpperCase()}</p>
        <div className="product-type">
          <p>{item.capacity} |</p> 
          <p>{item.color.toUpperCase()}</p>
        </div>
        <div className='product-cart'>
          <p>{item.price} EUR</p>
          <p>Quantity: {item.quantity}</p>
      <button className="remove-button" onClick={onRemove}>
        Remove
      </button>
        </div>
      </div>
    </div>
  )
}

export default Product

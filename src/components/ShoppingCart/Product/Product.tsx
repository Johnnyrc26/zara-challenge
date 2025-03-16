import React from 'react'
import { useCart } from '../../../store/context/useCart'
import { CartItem } from '../../../types/cartTypes' 
import './Product.css'

interface ProductProps {
  item: CartItem
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const { removeFromCart } = useCart()

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
          <button className="remove-button" onClick={() => removeFromCart(item)}>

        Remove
      </button>
        </div>
      </div>
    </div>
  )
}

export default Product

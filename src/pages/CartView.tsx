import React from 'react'
import { useCartStore } from '../store/cartStore'
import './CartView.css'
import ProductsCount from '../components/ShoppingCart/ProductsCount/ProductsCount'
import Product from '../components/ShoppingCart/Product/Product'
import Buttons from '../components/ShoppingCart/Buttons/Buttons'

const CartView: React.FC = () => {
  const { cart, removeFromCart, getTotalItems } = useCartStore()

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-view-container">
      <ProductsCount count={getTotalItems()} />
        <div className="cart-items">
          {cart.map((item, index) => (
            <Product
              key={index}
              item={item}
              onRemove={() => removeFromCart(item)}
            />
          ))}
        </div>
      <Buttons totalPrice={totalPrice} />
    </div>
  )
}

export default CartView

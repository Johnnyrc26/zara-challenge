import React from 'react'
import { useCart } from '../store/context/useCart'
import './CartView.css'
import ProductsCount from '../components/ShoppingCart/ProductsCount/ProductsCount'
import Product from '../components/ShoppingCart/Product/Product'
import Buttons from '../components/ShoppingCart/Buttons/Buttons'

const CartView: React.FC = () => {
  const { cart, getTotalItems } = useCart()

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
            />
          ))}
        </div>
      <Buttons totalPrice={totalPrice} />
    </div>
  )
}

export default CartView

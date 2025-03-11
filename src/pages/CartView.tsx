import React from 'react';
import { useCartStore } from '../store/cartStore';
import ProductsCount from '../components/ShoppingCart/ProductsCount/ProductsCount';
import Product from '../components/ShoppingCart/Product/Product'
import Buttons from '../components/ShoppingCart/Buttons/Buttons';


const CartView: React.FC = () => {
  const { cart, removeFromCart } = useCartStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-view-container">
      <h1>Your Cart</h1>
      <ProductsCount count={cart.length} />
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <Product
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      )}
      <Buttons totalPrice={totalPrice} />
    </div>
  );
};

export default CartView;
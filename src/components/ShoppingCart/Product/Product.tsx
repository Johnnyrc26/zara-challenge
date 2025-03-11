import React from 'react';
import { CartItem } from '../../../store/cartStore'; // Ajusta según tu interfaz
import './Product.css';

interface ProductProps {
  item: CartItem;
  onRemove: () => void;
}

const Product: React.FC<ProductProps> = ({ item, onRemove }) => {
  return (
    <div className="cart-product">
      <img src={item.imageUrl} alt={item.name} className="product-image" />
      <div className="product-info">
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Color: {item.color}</p>
        <p>Price: ${item.price * item.quantity}</p>
      </div>
      <button className="remove-button" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default Product;
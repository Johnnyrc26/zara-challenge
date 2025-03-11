import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Buttons.css';

interface ButtonsProps {
  totalPrice: number;
}

const Buttons: React.FC<ButtonsProps> = ({ totalPrice }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handlePay = () => {
    // Lógica de pago (a implementar)
    alert('Proceeding to payment...');
  };

  return (
    <div className="cart-buttons">
      <button className="continue-button" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
      <div className="total-and-pay">
        <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
        <button className="pay-button" onClick={handlePay} disabled={totalPrice === 0}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default Buttons;
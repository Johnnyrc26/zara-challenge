import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Buttons.css'

interface ButtonsProps {
  totalPrice: number
}

const Buttons: React.FC<ButtonsProps> = ({ totalPrice }) => {
  const navigate = useNavigate()

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handlePay = () => {
    // Lógica de pago (a implementar)
    alert('Proceeding to payment...')
  }

  return (
    <div className="cart-buttons">
      <button
        className="continue-button"
        arial-lable="Continue Shopping"
        onClick={handleContinueShopping}
      >
        CONTINUE SHOPPING
      </button>
      <div className="total-and-pay">
        <p className="total-price">TOTAL {totalPrice.toFixed(2)} EUR</p>
        <button
          className="pay-button"
          aria-label="Pay"
          onClick={handlePay}
          disabled={totalPrice === 0}
        >
          PAY
        </button>
      </div>
    </div>
  )
}

export default Buttons

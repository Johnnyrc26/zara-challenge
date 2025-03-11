// Navbar.tsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import './Navbar.css'

const Navbar: React.FC = () => {
  const cartCount = useCartStore((state) => state.getTotalItems())
  const navigate = useNavigate()
  const location = useLocation()

  const isCartView = location.pathname === '/cart'

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-icon" onClick={handleHomeClick}>
        <span className="home-icon">🏠</span>
      </div>
      {!isCartView && ( // Ocultamos el carrito si estamos en /cart
        <div className="navbar-icon">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      )}
    </nav>
  )
}

export default Navbar

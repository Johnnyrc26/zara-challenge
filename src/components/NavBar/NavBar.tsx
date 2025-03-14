// Navbar.tsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { SlBag } from 'react-icons/sl';
import './Navbar.css'

interface NavbarProps {
  isLoading?: boolean // Prop opcional para mostrar la barra de carga
}

const Navbar: React.FC<NavbarProps> = ({ isLoading = false }) => {
  const cartCount = useCartStore((state) => state.getTotalItems())
  const navigate = useNavigate()
  const location = useLocation()

  const isCartView = location.pathname === '/cart'

  const handleHomeClick = () => {
    navigate('/')
  }
  const handleShoppingCart = () => {
    navigate('/cart')
  }

  return (
    <nav className="navbar">
     <div className="navbar-icon" onClick={handleHomeClick}>
        <img src="/MBST.png" alt="Home" className="home-icon" />
      </div>
      {!isCartView && (
        <div className="navbar-icon cart-container" onClick={handleShoppingCart}>
          <SlBag className="cart-icon" />
         <span className="cart-badge">{cartCount}</span>
        </div>
      )}
      {isLoading && <div className="loading-bar"></div>}
    </nav>
  )
}

export default Navbar

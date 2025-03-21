import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../store/context/useCart'
import { SlBag } from 'react-icons/sl';
import './NavBar.css'

interface NavbarProps {
  isLoading?: boolean 
}

const Navbar: React.FC<NavbarProps> = ({ isLoading = false }) => {
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()
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
      {isLoading && <div className="loading-bar" data-testid="loading-bar"></div>}
    </nav>
  )
}

export default Navbar

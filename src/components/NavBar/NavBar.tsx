import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { SlBag } from 'react-icons/sl'
import UserDropdown from './UserDropdown/UserDropdown'
import { useAuth } from '../../store/hooks/useAuth'
import './NavBar.css'

interface NavbarProps {
  isLoading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isLoading = false }) => {
  const { getTotalItems, fetchCart } = useCartStore()
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const isCartView = location.pathname === '/cart'
  const isLoginView = location.pathname === '/login' || location.pathname === '/register'

  const handleHomeClick = () => {
    if (isLoginView) return
    navigate('/')
  }
  const handleShoppingCart = () => {
    navigate('/cart')
  }

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart()
        setCartCount(getTotalItems())
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }

    loadCart()

    const unsubscribe = useCartStore.subscribe(() => {
      setCartCount(getTotalItems())
    })

    return () => {
      unsubscribe()
    }
  }, [getTotalItems, fetchCart, user])

  return (
    <nav className="navbar">
      <div
        className={`navbar-icon ${isLoginView ? 'disabled' : ''}`}
        onClick={handleHomeClick}
      >
        <img
          src="/MBST.png"
          alt="Home"
          className={`home-icon ${isLoginView ? 'disabled' : ''}`}
        />
      </div>
      <div className="navbar-right">
        {!isCartView && !isLoginView && (
          <div
            className="navbar-icon cart-container"
            onClick={handleShoppingCart}
          >
            <SlBag className="cart-icon" />
            <span className={`cart-badge ${cartCount > 0 ? 'has-items' : ''}`}>
              {cartCount}
            </span>
          </div>
        )}
        <UserDropdown />
      </div>
      {isLoading && (
        <div className="loading-bar" data-testid="loading-bar"></div>
      )}
    </nav>
  )
}

export default Navbar

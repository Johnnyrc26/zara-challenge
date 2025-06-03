import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../store/context/useCart';
import { SlBag } from 'react-icons/sl';
import UserDropdown from './UserDropdown/UserDropdown';
import './NavBar.css';

// Simple auth context simulation
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage or your auth context
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

interface NavbarProps {
  isLoading?: boolean 
}

const Navbar: React.FC<NavbarProps> = ({ isLoading = false }) => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const isCartView = location.pathname === '/cart';
  const isLoginView = location.pathname === '/login';

  const handleHomeClick = () => {
    if (isLoginView) return;
    navigate('/')
  }
  const handleShoppingCart = () => {
    navigate('/cart')
  }

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
          <div className="navbar-icon cart-container" onClick={handleShoppingCart}>
            <SlBag className="cart-icon" />
            <span className={`cart-badge ${cartCount > 0 ? 'has-items' : ''}`}>
              {cartCount}
            </span>
          </div>
        )}
        <UserDropdown isLoggedIn={isLoggedIn} onLogout={logout} />
      </div>
      {isLoading && <div className="loading-bar" data-testid="loading-bar"></div>}
    </nav>
  )
}

export default Navbar

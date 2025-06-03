import React, { useState, useRef, useEffect } from 'react';
import { FiLogIn, FiLogOut, FiHeart } from 'react-icons/fi';
import { PiUser } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import './UserDropdown.css';

interface UserDropdownProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleFavorites = () => {
    // Navigate to favorites page when implemented
    console.log('Navigate to favorites');
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button className="user-dropdown-toggle" onClick={toggleDropdown}>
        <PiUser className="user-icon" />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            <>
              <button className="dropdown-item" onClick={handleFavorites}>
                <FiHeart className="dropdown-icon" />
                <span>Favoritos</span>
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                <FiLogOut className="dropdown-icon" />
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <button className="dropdown-item" onClick={handleLogin}>
              <FiLogIn className="dropdown-icon" />
              <span>Iniciar sesión</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

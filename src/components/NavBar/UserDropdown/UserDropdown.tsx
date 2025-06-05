import React, { useState, useRef, useEffect } from 'react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { PiUser } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/hooks/useAuth'
import './UserDropdown.css'

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const isLoggedIn = !!user

  const toggleDropdown = () => setIsOpen(!isOpen)
  const handleLogin = () => {
    navigate('/login')
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/') 
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button className="user-dropdown-toggle" onClick={toggleDropdown}>
        <PiUser className="user-icon" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            <>
              <button className="dropdown-item" onClick={handleLogout}>
                <FiLogOut className="dropdown-icon" /> Cerrar sesión
              </button>
            </>
          ) : (
            <button className="dropdown-item" onClick={handleLogin}>
              <FiLogIn className="dropdown-icon" /> Iniciar sesión
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDropdown

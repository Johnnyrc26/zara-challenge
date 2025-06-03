import React, { useState, useCallback } from 'react'
import { useCart } from '../../../store/context/useCart'
import { Phone } from '../../../api/phoneService'
import { RiHeartLine, RiHeartFill } from 'react-icons/ri'
import './Details.css'

interface DetailsProps {
  phone: Phone
  selectedStorage: string | null
  selectedColor: string
  onStorageChange: (storage: string | null) => void
  onColorChange: (color: string) => void
  onAddToCart: () => void
}

const Details: React.FC<DetailsProps> = ({
  phone,
  selectedStorage,
  selectedColor,
  onStorageChange,
  onColorChange,
  onAddToCart,
}) => {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = useCallback(() => {
    setIsLiked(prev => !prev)
  }, [])

  const selectedColorOption = phone.colorOptions.find(
    (option) => option.name === selectedColor
  )

  const selectedStorageOption = phone.storageOptions.find(
    (option) => option.capacity === selectedStorage
  )

  const totalPrice = selectedStorageOption
    ? phone.basePrice + selectedStorageOption.price
    : phone.basePrice

  const handleAddToCart = () => {
    if (selectedColor && selectedStorage) {
      addToCart({
        id: phone.id,
        name: `${phone.name}`,
        quantity: 1,
        price: totalPrice,
        imageUrl: selectedColorOption?.imageUrl || phone.imageUrl,
        color: selectedColorOption?.name || '',
        capacity: selectedStorageOption?.capacity || '',
      })
      onAddToCart()
    }
  }

  const ensureHttps = (url: string): string => {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }

  return (
    <div className="phone-detail">
      <div className="phone-image">
        <img
          src={ensureHttps(selectedColorOption?.imageUrl || phone.imageUrl)}
          alt={phone.name}
        />
      </div>
      <div className="phone-info">
        <h3>{phone.name}</h3>
        <p className="price">From {totalPrice} EUR</p>
        <div className="selectors">
          <div className="storage">
            <label className="storage-label">
              STORAGE ¿HOW MUCH SPACE DO YOU NEED?
            </label>
            <div className="storage-options">
              {phone.storageOptions.map((option) => (
                <button
                  key={option.capacity}
                  className={`storage-button ${
                    selectedStorage === option.capacity ? 'selected' : ''
                  }`}
                  onClick={() => onStorageChange(option.capacity)}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>
          <div className="color">
            <label className="color-label">COLOR. PICK YOUR FAVOURITE.</label>
            <div className="color-options">
              {phone.colorOptions.map((option) => (
                <button
                  key={option.name}
                  className={`color-button ${
                    selectedColor === option.name ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: option.hexCode }}
                  onClick={() => onColorChange(option.name)}
                  title={option.name}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!selectedStorage || !selectedColor}
          >
            AÑADIR
          </button>
          <button 
            className="detail-like-button" 
            onClick={toggleLike}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLiked ? (
              <RiHeartFill className="detail-heart-icon filled" />
            ) : (
              <RiHeartLine className="detail-heart-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details

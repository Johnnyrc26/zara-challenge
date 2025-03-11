import React from 'react'
import { useCartStore } from '../../../store/cartStore'
import { Phone } from '../../../api/phoneService'
import './Details.css'

interface DetailsProps {
  phone: Phone;
  selectedStorage: string | null;
  selectedColor: string;
  onStorageChange: (storage: string | null) => void;
  onColorChange: (color: string) => void;
  onAddToCart: () => void;
}

const Details: React.FC<DetailsProps> = ({
  phone,
  selectedStorage,
  selectedColor,
  onStorageChange,
  onColorChange,
  onAddToCart,
}) => { 
  const { addToCart } = useCartStore()
  
  const selectedColorOption = phone.colorOptions.find(
    (option) => option.name === selectedColor
  );

  const selectedStorageOption = phone.storageOptions.find(
    (option) => option.capacity === selectedStorage
  );

  const totalPrice = selectedStorageOption
    ? phone.basePrice + selectedStorageOption.price
    : phone.basePrice;
  
    const handleAddToCart = () => {
      if (selectedColor && selectedStorage) {
        addToCart({
          id: phone.id,
          name: `${phone.name} (${selectedStorage}, ${selectedColor})`,
          quantity: 1,
          price: totalPrice,
          imageUrl: selectedColorOption?.imageUrl || phone.imageUrl,
          color: ''
        });
        onAddToCart();
      }
    };
  
    return (
      <div className="phone-detail">
      <div className="phone-image">
          <img
            src={selectedColorOption?.imageUrl || phone.imageUrl}
            alt={phone.name}
          />
      </div>
      <div className="phone-info">
        <h1>{phone.name}</h1>
        <p className="price">{totalPrice} EUR</p>

        <div className="selectors">
          <div>
            <label>Storage ¿HOW MUCH SPACE DO YOU NEED?</label>
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
          <div>
            <label>Color, pick your favourite.</label>
            <div className="color-options">
              {phone.colorOptions.map((option) => (
                <div
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

        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={!selectedStorage || !selectedColor}
        >
          AÑADIR
        </button>
      </div>
    </div>
    );
  };
  
  export default Details;
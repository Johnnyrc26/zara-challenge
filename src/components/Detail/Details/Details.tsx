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
          <p className="brand">{phone.brand}</p>
  
          <div className="selectors">
            <div>
              <label>Storage:</label>
              <select
                value={selectedStorage || ''}
                onChange={(e) => onStorageChange(e.target.value || null)}
              >
                <option value="">Select storage</option>
                {phone.storageOptions.map((option) => (
                  <option key={option.capacity} value={option.capacity}>
                    {option.capacity}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Color:</label>
              <select
                value={selectedColor || ''}
                onChange={(e) => onColorChange(e.target.value)}
              >
                <option value="">Select color</option>
                {phone.colorOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <p className="price">Price: ${totalPrice}</p>
  
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!selectedStorage || !selectedColor}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
  
  export default Details;
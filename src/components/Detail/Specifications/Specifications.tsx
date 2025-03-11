import React from 'react';
import { Phone } from '../../../api/phoneService';
import './Specifications.css';

interface SpecificationsProps {
  phone: Phone;
  selectedStorage: string | null;
}

const Specifications: React.FC<SpecificationsProps> = ({
  phone,
  selectedStorage,
}) => {
  const storagePrices = phone.storageOptions.map((option) => ({
    capacity: option.capacity,
    price: phone.basePrice + option.price,
  }));

  return (
    <div className="specs">
      <h3>Technical Specifications</h3>
      <ul>
        {Object.entries(phone.specs).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <h3>Price Variations</h3>
      <ul>
        <li>
          <strong>Base Price:</strong> ${phone.basePrice}
        </li>
        {storagePrices.map((sp) => (
          <li
            key={sp.capacity}
            className={sp.capacity === selectedStorage ? 'selected' : ''}
          >
            <strong>{sp.capacity}:</strong> ${sp.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Specifications;
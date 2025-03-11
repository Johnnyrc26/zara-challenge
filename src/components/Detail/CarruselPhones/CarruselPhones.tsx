import React from 'react';
import { Phone } from '../../../api/phoneService';
import './CarruselPhones.css';

interface CarouselPhonesProps {
  similarProducts: Phone[];
}

const CarouselPhones: React.FC<CarouselPhonesProps> = ({ similarProducts }) => {
  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="carousel">
        {similarProducts.map((phone) => (
          <div key={phone.id} className="carousel-item">
            <img src={phone.imageUrl} alt={phone.name} />
            <p>{phone.name}</p>
            <p>{phone.brand}</p>
            <p>${phone.basePrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPhones;
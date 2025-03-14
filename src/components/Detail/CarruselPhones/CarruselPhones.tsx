import React from 'react'
import { Phone } from '../../../api/phoneService'
import { useNavigate } from 'react-router-dom'
import './CarruselPhones.css'

interface CarouselPhonesProps {
  similarProducts: Phone[]
}

const CarouselPhones: React.FC<CarouselPhonesProps> = ({ similarProducts }) => {
  const navigate = useNavigate()

  return (
    <div className="similar-products">
      <h3>Similar Items</h3>
      <div className="carousel">
        {similarProducts.map((phone) => (
          <div
            key={phone.id}
            className="card"
            onClick={() => navigate(`/phone/${phone.id}`)}
          >
            <img src={phone.imageUrl} alt={phone.name} className="image" />
            <div className="text-container">
              <p className="brand">{phone.brand}</p>
              <div className="title">
                <span className="name">{phone.name}</span>
                <span className="price">{phone.basePrice} EUR</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselPhones

import React from 'react'
import { Phone } from '../../../api/phones/phoneService'
import './Specifications.css'

interface SpecificationsProps {
  phone: Phone
  selectedStorage: string | null
}

const Specifications: React.FC<SpecificationsProps> = ({ phone }) => {
  return (
    <div className="specs">
      <h3>SPECIFICATIONS</h3>
      <ul>
        <li>
          <span>BRAND</span>
          <p>{phone.brand || 'N/A'}</p>
        </li>
        <li>
          <span>NAME</span>
          <p>{phone.name || 'N/A'}</p>
        </li>
        <li>
          <span>DESCRIPTION</span>
          <p>{phone.description || 'N/A'}</p>
        </li>
        <li>
          <span>SCREEN</span>
          <p>{phone.specs.screen || 'N/A'}</p>
        </li>
        <li>
          <span>RESOLUTION</span>
          <p>{phone.specs.resolution || 'N/A'}</p>
        </li>
        <li>
          <span>PROCESSOR</span>
          <p>{phone.specs.processor || 'N/A'}</p>
        </li>
        <li>
          <span>MAIN CAMERA</span>
          <p>{phone.specs.mainCamera || 'N/A'}</p>
        </li>
        <li>
          <span>SELFIE CAMERA</span>
          <p>{phone.specs.selfieCamera || 'N/A'}</p>
        </li>
        <li>
          <span>BATTERY</span>
          <p>{phone.specs.battery || 'N/A'}</p>
        </li>
        <li>
          <span>OS</span>
          <p>{phone.specs.os || 'N/A'}</p>
        </li>
        <li>
          <span>SCREEN REFRESH RATE</span>
          <p>{phone.specs.screenRefreshRate || 'N/A'}</p>
        </li>
      </ul>
    </div>
  )
}

export default Specifications

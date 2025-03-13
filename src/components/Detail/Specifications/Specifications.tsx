import React from 'react';
import { Phone } from '../../../api/phoneService';
import './Specifications.css';

interface SpecificationsProps {
  phone: Phone;
  selectedStorage: string | null;
}

const Specifications: React.FC<SpecificationsProps> = ({ phone }) => {
  return (
    <div className="specs">
      <h3>SPECIFICATIONS</h3>
      <ul>
        <li>
          <span className='specsification'>BRAND</span >
          <span >{phone.brand || 'N/A'}</span>
        </li>
        <li>
          <span>NAME</span>
          <span>{phone.name || 'N/A'}</span>
        </li>
        <li>
          <span>DESCRIPTION</span>
          <span>{phone.description || 'N/A'}</span>
        </li>
        <li>
          <span>SCREEN</span>
          <span>{phone.specs.screen || 'N/A'}</span>
        </li>
        <li>
          <span>RESOLUTION</span>
          <span>{phone.specs.resolution || 'N/A'}</span>
        </li>
        <li>
          <span>PROCESSOR</span>
          <span>{phone.specs.processor || 'N/A'}</span>
        </li>
        <li>
          <span>MAIN CAMERA</span>
          <span>{phone.specs.mainCamera || 'N/A'}</span>
        </li>
        <li>
          <span>SELFIE CAMERA</span>
          <span>{phone.specs.selfieCamera || 'N/A'}</span>
        </li>
        <li>
          <span>BATTERY</span>
          <span>{phone.specs.battery || 'N/A'}</span>
        </li>
        <li>
          <span>OS</span>
          <span>{phone.specs.os || 'N/A'}</span>
        </li>
        <li>
          <span>SCREEN REFRESH RATE</span>
          <span>{phone.specs.screenRefreshRate || 'N/A'}</span>
        </li>
      </ul>
    </div>
  );
};

export default Specifications;
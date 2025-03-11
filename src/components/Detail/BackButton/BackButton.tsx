import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

interface BackButtonProps {
  fallbackRoute?: string; 
}

const BackButton: React.FC<BackButtonProps> = ({ fallbackRoute = '/' }) => { 
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  }

  return (
    <button className="back-button" onClick={handleBackClick}>
      Back
    </button>
  )
}

export default BackButton;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftSLine } from "react-icons/ri";
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
     <RiArrowLeftSLine /> Back
    </button>
  )
}

export default BackButton;
import React, { InputHTMLAttributes, useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import './input.css';

type InputType = 'email' | 'password' | 'text';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  inputType?: InputType;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  inputType = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const getInputType = () => {
    if (inputType === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return inputType;
  };

  const renderIcon = () => {
    switch (inputType) {
      case 'email':
        return <FaEnvelope className="input-icon" />;
      case 'password':
        return <FaLock className="input-icon" />;
      default:
        return null;
    }
  };

  const inputClasses = `input-field ${error ? 'input-field--error' : ''} ${className}`.trim();

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {renderIcon()}
        <input
          type={getInputType()}
          className={inputClasses}
          {...props}
        />
        {inputType === 'password' && (
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;

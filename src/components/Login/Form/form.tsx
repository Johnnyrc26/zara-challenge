import React, { useState } from 'react';
import {useAuth} from '../../../store/hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import Input from '../Input/input';
import './form.css';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { error, user } = await signIn(formData.email, formData.password);
    
      if (error || !user) {
        setErrors({
          general: 'Credenciales incorrectas o cuenta no existe.'
        });
        return;
      }
    
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        general: 'Error al iniciar sesión. Verifica tus credenciales.'
      });
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      
      {errors.general && (
        <div className="error-message general-error">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          id="email"
          name="email"
          label="Correo Electrónico"
          placeholder="Ingresa tu correo electrónico"
          inputType="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />
        
        <Input
          id="password"
          name="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          inputType="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>
      
      <div className="form-footer">
        <p>
          ¿No tienes una cuenta?{' '}
          <button 
            type="button" 
            className="text-button"
            onClick={() => navigate('/register')}
          >
            Regístrate
          </button>
        </p>
        <button 
          type="button" 
          className="text-button"
          onClick={() => navigate('/forgot-password')}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
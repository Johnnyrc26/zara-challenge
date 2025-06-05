import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/hooks/useAuth'
import Input from '../../Login/Input/input'
import './regsiterForm.css'

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

const RegisterForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { signUp } = useAuth()

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required'
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRegister()
  }

  const handleRegister = async () => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        await signUp(formData.email, formData.password)
        setIsSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } catch (error) {
        console.error('Registration failed:', error)
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Registration failed. Please try again.',
        }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isSuccess) {
    return (
      <div className="register-success">
        <h2>Registration Successful!</h2>
        <p>Please check your email to verify your account.</p>
        <p>Redirecting to login page...</p>
      </div>
    )
  }

  return (
    <div className="register-form">
      <h2>Create Account</h2>
      {formErrors.general && <div className="error">{formErrors.general}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          inputType="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          inputType="password"
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          inputType="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={formErrors.confirmPassword}
        />
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <button
            type="button"
            className="text-button"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm

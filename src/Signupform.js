import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Signupform.css'

const SignUpForm = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')

  const onSubmit = (data) => {
    setLoading(true)
    setTimeout(() => {
      console.log(data)
      setLoading(false)
      alert('Form submitted successfully!')
    }, 2000)
  }

  const passwordValue = watch('password', '')
  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[/!@#$%^&*]/.test(password)

    if (minLength && hasUpperCase && hasNumber && hasSpecialChar) {
      setPasswordStrength('Strong')
    } else if (minLength && (hasUpperCase || hasNumber || hasSpecialChar)) {
      setPasswordStrength('Medium')
    } else {
      setPasswordStrength('Weak')
    }

    return minLength && hasUpperCase && hasNumber && hasSpecialChar
  }

  return (
    <div className="signup-form">
      <div className="form-wrapper">

        <h2>Sign up</h2>
        <p>See what Atlas is capable of for free</p>
        <button className="google-signup">Sign up with Google</button>

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="form-group">
            <input
              placeholder="First Name*"
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Last Name*"
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Company"
              {...register('company')}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email*"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password*"
              {...register('password', {
                required: 'Password is required',
                validate: validatePassword
              })}
            />
            {errors.password && (
              <p className="error">
                Password must be 8+ characters, include uppercase, number, and special character.
              </p>
            )}
            <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
              Strength: {passwordStrength || 'N/A'}
            </p>
          </div>
          <div className="form-group checkbox" >
            <input
              type="checkbox"
              {...register('terms', { required: 'You must accept the terms' })}
            />
            <label>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</label>
            {errors.terms && <p className="error">{errors.terms.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? <AiOutlineLoading3Quarters className="loading-spinner" /> : 'Create your Atlas account'}
          </button>
        </form>
        <p className="sign-in">Sign in</p>
      </div>

    </div>

  )

}
export default SignUpForm
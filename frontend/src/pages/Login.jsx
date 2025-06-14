import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password }
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const response = await axios.post(backendUrl + endpoint, payload)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-gray-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-gray-100 space-y-6"
      >
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold tracking-wide text-teal-300">{currentState}</h2>
          <p className="text-sm text-gray-400">
            {currentState === 'Login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Inputs */}
        {currentState === 'Sign Up' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

        {/* Navigation */}
        <div className="flex justify-between text-[11px] sm:text-sm text-gray-400">
          <p className="cursor-pointer hover:text-teal-400 transition">Forgot your password?</p>
          <p
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
            className="cursor-pointer hover:text-teal-400 transition"
          >
            {currentState === 'Login' ? 'Create account' : 'Login here'}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition font-medium"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login

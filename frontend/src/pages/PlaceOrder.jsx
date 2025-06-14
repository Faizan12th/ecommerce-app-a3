import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const res = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (res.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(res.data.message)
          }
          break

        case 'stripe':
          const stripeRes = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (stripeRes.data.success) {
            window.location.replace(stripeRes.data.session_url)
          } else {
            toast.error(stripeRes.data.message)
          }
          break

        default:
          toast.error("Invalid payment method")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" text-white px-6 py-12 min-h-screen flex flex-col lg:flex-row gap-12 mt-14"
    >
      {/* Left: Delivery Info */}
      <div className="w-full lg:max-w-[480px] space-y-6">
        <div className="text-xl sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-4">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email address"
          className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
        />

        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
        />

        <div className="flex gap-4">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex gap-4">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="number"
            placeholder="Zipcode"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="number"
          placeholder="Phone"
          className="bg-gray-800 border border-gray-700 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Right: Cart + Payment */}
      <div className="w-full lg:min-w-[400px] space-y-10">
        <CartTotal />

        <div>
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Stripe */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md border transition ${
                method === 'stripe' ? 'border-teal-500 bg-gray-800' : 'border-gray-700'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border ${
                  method === 'stripe' ? 'bg-teal-500 border-teal-500' : 'border-gray-500'
                }`}
              ></span>
              <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
            </div>

            {/* Razorpay
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md border transition ${
                method === 'razorpay' ? 'border-teal-500 bg-gray-800' : 'border-gray-700'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border ${
                  method === 'razorpay' ? 'bg-teal-500 border-teal-500' : 'border-gray-500'
                }`}
              ></span>
              <img src={assets.razorpay_logo} className="h-5" alt="Razorpay" />
            </div> */}

            {/* COD */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md border transition ${
                method === 'cod' ? 'border-teal-500 bg-gray-800' : 'border-gray-700'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border ${
                  method === 'cod' ? 'bg-teal-500 border-teal-500' : 'border-gray-500'
                }`}
              ></span>
              <span className="text-sm text-gray-300">Cash on Delivery</span>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 transition px-10 py-3 rounded-md text-white text-sm font-medium"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

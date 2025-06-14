import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className=" min-h-screen px-4 py-16 text-gray-100 mt-14">
      {/* Title */}
      <div className="text-center mb-10">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div
                key={index}
                className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md hover:shadow-teal-500/10 transition duration-300"
              >
                {/* Product Info */}
                <div className="flex items-center gap-6 w-full sm:w-1/2">
                  <img src={productData.image[0]} className="w-20 rounded-lg" alt={productData.name} />
                  <div>
                    <p className="text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span>{currency}{productData.price}</span>
                      <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-md">{item.size}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity + Delete */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value >= 1) updateQuantity(item._id, item.size, value)
                    }}
                    className="w-20 px-3 py-1 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                    src={assets.bin_icon}
                    alt="Remove"
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Checkout Section */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-16">
          <div className="w-full sm:w-[450px] space-y-6">
            <CartTotal />
            <div className="text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-teal-600 hover:bg-teal-700 transition text-white px-8 py-3 rounded-lg font-medium shadow-md"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

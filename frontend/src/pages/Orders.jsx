import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        let allOrderItems = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status
            item.payment = order.payment
            item.paymentMethod = order.paymentMethod
            item.date = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <section className=" min-h-screen px-4 md:px-10 pt-20 text-gray-100 mt-10 mb-5">
      <div className="text-2xl mb-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.length === 0 ? (
          <p className="text-gray-400">You have not placed any orders yet.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900/70 p-5 rounded-lg border border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center gap-6 shadow hover:shadow-teal-500/10 transition"
            >
              {/* Left: Product Info */}
              <div className="flex gap-4">
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div>
                  <p className="text-lg font-medium text-white">{item.name}</p>
                  <div className="mt-2 text-sm text-gray-400 space-y-1">
                    <p>
                      Price: <span className="text-teal-400">{currency}{item.price}</span>
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Date: {new Date(item.date).toDateString()}</p>
                    <p>Payment: {item.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Right: Status and Track */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Orders

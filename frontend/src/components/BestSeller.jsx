import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <section>
      {/* Section Title */}
      <div className="text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-full sm:w-3/4 md:w-2/3 mx-auto text-sm md:text-base text-gray-400 mt-3 leading-relaxed">
          Our most-loved pieces by customers. These trending favorites won't stay on the shelves for long.
        </p>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-6">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-teal-500/10"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSeller

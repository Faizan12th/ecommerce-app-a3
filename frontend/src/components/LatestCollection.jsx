import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        const filtered = [...products]     
        setLatestProducts(filtered.slice(0, 10))
    }, [products])


    return (
        <section>
            {/* Section Title */}
            <div className="text-center mb-12">
                <Title text1="LATEST" text2="COLLECTION" />
                <p className="w-full sm:w-3/4 md:w-2/3 mx-auto text-sm md:text-base text-gray-400 mt-3 leading-relaxed">
                    These are the fan-favorite pieces that everyone's talking about. Stylish, reliable, and in high demand.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-6">
                {latestProducts.map((item, index) => (
                    <div key={index} className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-teal-500/10">
                        <ProductItem
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BestSeller
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className="group text-gray-700 hover:text-teal-300 cursor-pointer">
            {/* Container with light background */}
            <div className="bg-gray-900 p-2 lg:p-3 rounded-xl transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
                {/* Product Image */}
                <div className="w-full overflow-hidden rounded-md">
                    <img src={image[0]} className="h-52 w-full object-cover group-hover:scale-105 transition-all duration-300" alt={name} />
                </div>

                <p className="h-10 mt-4 text-sm font-medium text-gray-300 group-hover:text-teal-300 transition-all duration-300 overflow-auto">
                    {name}
                </p>

                {/* Product Price */}
                <p className="text-lg font-semibold text-gray-400 group-hover:text-teal-400 mt-1">
                    {price}{currency}
                </p>
            </div>
        </Link>
    )
}

export default ProductItem

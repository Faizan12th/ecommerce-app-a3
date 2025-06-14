import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const matched = products.find(item => item._id === productId)
    if (matched) {
      setProductData(matched)
      setImage(matched.image[0])
    }
  }, [productId, products])

  if (!productData) return <div className="min-h-[60vh]"></div>

  return (
    <section className="text-gray-100 px-4 md:px-10 pt-14 mt-20">
      {/* Main Product Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[450px] lg:w-[20%]">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer transition ${
                  image === img ? 'border-teal-400' : 'border-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={image} alt="Product" className="w-full h-auto max-h-[500px] object-contain rounded" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4 h-4" alt="star" />
            ))}
            <img src={assets.star_dull_icon} className="w-4 h-4" alt="star dull" />
            <span className="ml-2 text-sm text-gray-400">(122)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-teal-400 mb-6">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-400 mb-6">{productData.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-gray-300">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded border transition ${
                    size === s
                      ? 'bg-gray-800 border-teal-400 text-teal-400'
                      : 'bg-gray-900 border-gray-700 text-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded text-sm font-medium transition"
          >
            Add to Cart
          </button>

          {/* Info */}
          <div className="border-t border-gray-800 mt-8 pt-4 text-sm text-gray-500 space-y-1">
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <div className="flex border-b border-gray-800">
          <button className="px-6 py-3 text-sm font-medium text-teal-400 border-b-2 border-teal-400">Description</button>
          <button className="px-6 py-3 text-sm text-gray-400">Reviews (122)</button>
        </div>
        <div className="border border-t-0 border-gray-800 bg-gray-950 rounded-b-lg px-6 py-6 text-sm text-gray-400 space-y-4">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum nisi eius sequi atque dolores?</p>
          <p>Consequatur quidem commodi, iusto architecto pariatur perspiciatis sit laborum incidunt maxime nihil tempora!</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </section>
  )
}

export default Product

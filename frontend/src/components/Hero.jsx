import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-10 py-12 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-gray-100 rounded-xl shadow-xl overflow-hidden">

            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center gap-3 text-teal-400 text-sm tracking-wide">
                    <div className="w-8 h-[2px] bg-teal-400" />
                    <p className="uppercase font-semibold">Our Best Sellers</p>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                    Latest Arrivals
                </h1>

                <div className="flex items-center gap-4 mt-2">
                    <button onClick={()=>navigate('/collection')} className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-sm rounded-full transition duration-300 shadow-md hover:scale-105">
                        Shop Now
                    </button>
                    <div className="w-10 h-[2px] bg-teal-500" />
                </div>
            </div>

            {/* Hero Right Side */}
            <div className="w-full sm:w-1/2 mt-10 sm:mt-0 animate-fade-in-up">
                <img
                    src={assets.hero_img}
                    alt="Hero"
                    className="w-full max-h-[451px] object-cover rounded-lg shadow-lg"
                />
            </div>
        </div>
    )
}

export default Hero

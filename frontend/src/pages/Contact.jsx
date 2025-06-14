import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className="text-gray-100 px-6 py-6 md:px-12 rounded-xl shadow-lg mt-24 mb-6">
      
      {/* Page Title */}
      <div className="text-center mb-12">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Main Contact Content */}
      <div className="flex flex-col md:flex-row gap-12 mb-28 items-center">
        <img
          className="w-full max-w-[500px] rounded-xl shadow-md hover:shadow-teal-500/10 transition duration-300"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="space-y-6 text-gray-300 text-sm md:text-base md:w-1/2">
          <div>
            <h3 className="text-teal-300 text-lg font-semibold mb-1">Our Store</h3>
            <p className="text-gray-400">Rawalpindi<br />Punjab, Pakistan</p>
          </div>

          <div>
            <h3 className="text-teal-300 text-lg font-semibold mb-1">Contact Info</h3>
            <p className="text-gray-400">Tel: +92-399-9999999<br />Email: admin@assertiveattire.com</p>
          </div>

          <div>
            <h3 className="text-teal-300 text-lg font-semibold mb-1">Careers at Assertive Attire</h3>
            <p className="text-gray-400">Learn more about our teams and job openings.</p>
            <button className="mt-3 border border-teal-500 text-teal-300 px-6 py-2 rounded-md hover:bg-teal-600 hover:text-white transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact

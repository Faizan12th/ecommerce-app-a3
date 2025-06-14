import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className=" text-gray-100 px-6 py-6 md:px-12 rounded-xl shadow-lg mt-24 mb-6">
      
      {/* ABOUT TITLE */}
      <div className="text-center mb-10">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* IMAGE + DESCRIPTION */}
      <div className="flex flex-col md:flex-row gap-12 mb-16 items-center">
        <img
          className="w-full md:max-w-[500px] rounded-xl shadow-md hover:shadow-teal-500/10 transition duration-300"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="md:w-2/3 space-y-6 text-gray-300 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aspernatur ad impedit voluptates dolore molestiae quas eius possimus, maxime laboriosam debitis reprehenderit excepturi officia ipsum accusamus! Eveniet, iusto saepe. Facilis incidunt sed consectetur maiores a facere dignissimos tempore. Consequuntur, beatae del.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, magnam ipsum tempore deleniti tempora est dolore nam quis ea Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, dolorem soluta! Quos, nobis.
          </p>
          <div>
            <h3 className="text-teal-300 font-semibold text-base mb-1">Our Mission</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non harum qui nisi quo nostrum et cumque hic itaque reprehenderit numquam esse facere explicabo blanditiis suscipit. Commodi error sequi molestias perferendis eveniet eius iusto quisquam?
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center mb-12">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: 'Quality Assurance',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus est ab velit sequi asperiores iusto dicta.'
          },
          {
            title: 'Convenience',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus est ab velit sequi asperiores iusto dicta.'
          },
          {
            title: 'Exceptional Customer Service',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus est ab velit sequi asperiores iusto dicta.'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800/30 p-6 rounded-xl shadow hover:shadow-teal-500/10 transition duration-300"
          >
            <h4 className="text-teal-300 font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  )
}

export default About

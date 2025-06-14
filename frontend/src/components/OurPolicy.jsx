import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "We offer a hassle-free exchange on all items.",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "You can return items within 7 days of purchase.",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      description: "24/7 customer support at your fingertips.",
    },
  ]

  return (
    <section className="pt-14 pb-5 px-6 text-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-12">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-teal-500/10 hover:scale-105 transition duration-300 w-full sm:w-1/3"
          >
            <img
              src={policy.icon}
              className="w-14 mx-auto mb-4 filter brightness-150 invert"
              alt={policy.title}
            />
            <h3 className="text-base font-semibold mb-1 text-teal-300">{policy.title}</h3>
            <p className="text-sm text-gray-400">{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy

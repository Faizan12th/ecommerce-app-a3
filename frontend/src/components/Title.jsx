import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col items-center gap-2 mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-gray-100">
        <span className="text-white">{text1}</span>{' '}
        <span className="text-teal-400">{text2}</span>
      </h2>
      <div className="w-16 h-[2px] bg-teal-500 rounded-full transition-all duration-300"></div>
    </div>
  )
}

export default Title

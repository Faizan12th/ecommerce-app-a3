import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
    // Handle subscription logic here
  }

  return (
    <section className="pt-5 pb-16 px-1 text-gray-100 rounded-xl shadow-lg">
      <div className="max-w-xl mx-auto text-center bg-gray-900 backdrop-blur-md p-10 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-teal-500/20 hover:border hover:border-teal-400">
        <h2 className="text-2xl sm:text-3xl font-semibold text-teal-300 mb-3">
          Subscribe & Get 20% Off
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-8">
          Be the first to hear about new arrivals, special offers & much more.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:flex-1 bg-gray-800 text-sm px-5 py-3 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-black text-sm font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow hover:shadow-teal-500/30"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetterBox

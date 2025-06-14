import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div className="text-gray-100 pt-36">
      {/* Top Hero Section */}
      <section className="mb-16">
        <Hero />
      </section>

      {/* Latest Collection Section */}
      <section className="mb-20">
        <LatestCollection />
      </section>

      {/* Best Seller Section */}
      <section className="mb-20">
        <BestSeller />
      </section>

      {/* Policy Section */}
      <section className="mb-20">
        <OurPolicy />
      </section>

      {/* Newsletter Section */}
      <section className="mb-10">
        <NewsLetterBox />
      </section>
    </div>
  )
}

export default Home

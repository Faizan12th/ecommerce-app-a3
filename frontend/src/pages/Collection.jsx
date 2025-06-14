import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { assets } from '../assets/assets'
import SearchBar from '../components/SearchBar'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const applyFilter = () => {
    let filtered = [...products]

    if (category.length) {
      filtered = filtered.filter(p => category.includes(p.category))
    }

    if (subCategory.length) {
      filtered = filtered.filter(p => subCategory.includes(p.subCategory))
    }

    if (showSearch && search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilterProducts(filtered)
  }

  const sortProduct = () => {
    let sorted = [...filterProducts]
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilter()
        return
    }
    setFilterProducts(sorted)
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <section className="px-2 py-16 md:px-10 mt-12">
      <SearchBar/>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* FILTERS */}
        <aside className={`w-full lg:w-40 ${showFilter ? 'block' : 'hidden lg:block'}`}>
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="text-lg font-semibold cursor-pointer flex items-center gap-2 mb-6 text-teal-300"
          >
            Filters
            <img
              src={assets.dropdown_icon}
              alt="dropdown icon"
              className={`h-3 transition-transform ${showFilter ? 'rotate-90' : ''}`}
            />
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div className="bg-gray-800/30 p-4 rounded-xl shadow hover:shadow-teal-500/10 transition">
              <p className="text-sm font-semibold mb-3 text-gray-300">Categories</p>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                {['Men', 'Women', 'Kids'].map(cat => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="accent-teal-400"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div className="bg-gray-800/30 p-4 rounded-xl shadow hover:shadow-teal-500/10 transition">
              <p className="text-sm font-semibold mb-3 text-gray-300">Types</p>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
                  <label key={sub} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={sub}
                      onChange={toggleSubCategory}
                      className="accent-teal-400"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-gray-800 text-gray-200 p-2 rounded-md border border-gray-700 hover:border-teal-400 transition focus:outline-none"
            >
              <option value="relavent">Sort by: Relevance</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          {filterProducts.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-6">
              {filterProducts.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-teal-500/10"
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-16">No products found for this filter.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Collection

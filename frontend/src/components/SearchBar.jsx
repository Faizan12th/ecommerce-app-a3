import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        // Show search bar only on collection page
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ? (
        <div className="flex flex-row items-center justify-between bg-gray-900 text-gray-100 py-3 px-5 mb-6 w-full max-w-4xl mx-auto rounded-lg gap-4 sm:gap-0">
            <div className="flex items-center w-full gap-3">
                <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    className="w-full p-3 rounded-full bg-gray-800 text-sm text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    type="text"
                    placeholder="Search"
                />
                <img
                    className="w-5 cursor-pointer"
                    src={assets.search_icon}
                    alt="Search Icon"
                />
            </div>

            <div className="flex justify-end sm:ml-4">
                <img
                    onClick={() => { setShowSearch(false) }}
                    className="w-4 cursor-pointer"
                    src={assets.cross_icon}
                    alt="Close"
                />
            </div>
        </div>
    ) : null
}

export default SearchBar

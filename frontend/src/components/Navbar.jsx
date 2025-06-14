import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex items-center justify-between py-5 px-4 md:px-10 bg-gray-900 text-gray-100 shadow-lg fixed top-0 left-0 right-0 z-50'>

            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-8 text-sm font-semibold tracking-wide'>
                {['/', '/collection', '/about', '/contact'].map((path, i) => {
                    const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT']
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `relative transition-all duration-300 hover:text-teal-400 ${
                                    isActive ? 'text-teal-400' : ''
                                }`
                            }
                        >
                            {labels[i]}
                            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    )
                })}
            </ul>

            <div className='flex items-center gap-6'>
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    className=' invert w-5 cursor-pointer hover:scale-110 transition-transform duration-200'
                    alt="Search"
                />

                <div className='relative group'>
                    <img
                        onClick={() => !token && navigate('/login')}
                        src={assets.profile_icon}
                        className='invert w-5 cursor-pointer hover:scale-110 transition-transform duration-200'
                        alt="Profile"
                    />
                    {token && (
                        <div className='hidden group-hover:flex absolute right-0 top-2 mt-4 bg-gray-800 backdrop-blur-md text-sm text-gray-300 p-4 rounded-lg flex-col gap-2 w-40 shadow-lg border border-gray-700 transition-all duration-300'>
                            <p className='hover:text-white cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='hover:text-white cursor-pointer'>Orders</p>
                            <p onClick={logout} className='hover:text-red-500 cursor-pointer'>Logout</p>
                        </div>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <img
                        src={assets.cart_icon}
                        className='w-5 cursor-pointer hover:scale-110 transition-transform duration-200 invert'
                        alt="Cart"
                    />
                    <p className='absolute -right-2 -bottom-2 w-4 h-4 bg-teal-500 text-black text-[10px] flex items-center justify-center rounded-full'>
                        {getCartCount()}
                    </p>
                </Link>

                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden invert'
                    alt="Menu"
                />
            </div>

            {/* Sidebar menu for small screen */}
            <div
                className={`fixed top-0 right-0 h-full w-full bg-gray-900 text-white z-40 transform ${
                    visible ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out sm:hidden`}
            >
                <div className='p-5 flex flex-col gap-4'>
                    <div
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-3 text-sm cursor-pointer text-gray-400 hover:text-white transition'
                    >
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
                        <span>Back</span>
                    </div>

                    {['/', '/collection', '/about', '/contact'].map((path, i) => {
                        const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT']
                        return (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={() => setVisible(false)}
                                className='border-b border-gray-700 pb-2 pt-3 text-lg font-medium hover:text-teal-400 transition-all'
                            >
                                {labels[i]}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar

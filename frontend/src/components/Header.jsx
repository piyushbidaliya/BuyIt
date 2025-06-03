import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'
import { TiShoppingCart } from 'react-icons/ti'
import Search from './Search'
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import UserMenu from './UserMenu'
import logo from '../assets/logo.png'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayCartItem from './DisplayCartItem'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUser] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)

  const redirectToLogin = () => {
    navigate('/login')
  }

  const handleCloseUserMenu = () => {
    setOpenUser(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    setOpenUser(prev => !prev)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Row */}
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="BuyIt" width={60} height={60} className="rounded-full" />
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:block w-full max-w-[420px] mx-6">
          <Search />
        </div>

        {/* Desktop User & Cart */}
        <div className="hidden lg:flex gap-6 items-center">
          {user?._id ? (
            <div className="relative">
              <div onClick={() => setOpenUser(prev => !prev)} className="flex select-none items-center gap-2 cursor-pointer">
                <p>Account</p>
                {openUserMenu ? <GoTriangleUp /> : <GoTriangleDown />}
              </div>
              {openUserMenu && (
                <div className="absolute right-0 top-12">
                  <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={redirectToLogin} className="cursor-pointer">
              Login
            </button>
          )}

          <button
            className="flex items-center gap-1 hover:bg-green-600 bg-[#0d878d] p-2 text-white rounded-sm"
            onClick={() => setOpenCartSection(true)}
          >
            <TiShoppingCart size={28} className="animate-bounce" />
            {cartItem[0] ? (
              <div>
                <p>{totalQty} Items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            ) : (
              <p className="font-bold">My Cart</p>
            )}
          </button>
        </div>

        {/* Mobile User & Cart */}
        <div className="flex gap-4 items-center lg:hidden relative">
          {/* Mobile Cart Button */}
          <div className="relative">
            <button
              className="hover:bg-green-600 bg-[#0d878d] p-2 text-white rounded-lg"
              onClick={() => setOpenCartSection(true)}
            >
              <TiShoppingCart size={28} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
          </div>

          {/* Mobile User Icon */}
          <button className="text-neutral-600" onClick={handleMobileUser}>
            <FaRegUserCircle size={25} />
          </button>

          {/* Mobile User Menu */}
          {openUserMenu && user._id && (
            <div className="absolute right-0 top-14 z-40">
              <div className="bg-white rounded p-4 min-w-52 shadow-lg">
                <UserMenu close={handleCloseUserMenu} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="block lg:hidden px-4 pb-3">
        <Search />
      </div>

      {/* Cart Dropdown */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  )
}

export default Header

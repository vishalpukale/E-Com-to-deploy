import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaRegHeart } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesCount from '../Products/FavoritesCount';

const Navigation = () => {

  const { userInfo } = useSelector(state => state.auth)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const closeSidebar = () => {
    setShowSidebar(false)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[3.7%] hover:w-[12%] h-[100vh] fixed`} id='navigation-container'>
      {/* icons */}
      <div className="nav-container flex flex-col justify-center space-y-4">
        {/* home path */}
        <Link to='/' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
          <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span> {" "}
        </Link>

        {/* shop path */}
        <Link to='/shop' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
          <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span> {" "}
        </Link>

        {/* cart Path */}
        <Link to='/cart' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
          <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">CART</span> {" "}
        </Link>

        {/* favourite items */}
        <Link to='/favourite' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
          <FaRegHeart size={24.5} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span> {" "}
          <FavoritesCount />
        </Link>
      </div>

      {/* userinfo if someone logged in  */}
      <div className="nav-container relative">
        {/* userinfo */}
        <button onClick={toggleDropdown} className='flex items-center text-gray-8000 focus:outline-none'>
          {userInfo ?
            (<span className='text-white'>{userInfo.username}</span>)
            : (<></>)
          }
          {userInfo && (
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="white" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 ml-14 space-y-2 bg-black text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'
            }`}>
            {userInfo.isAdmin && (
              <>
                {/* admin dashboard */}
                <li>
                  <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                </li>

                {/* product list */}
                <li>
                  <Link to='/admin/productlist' className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                </li>

                {/* categorylist */}
                <li>
                  <Link to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-100'>Category</Link>
                </li>

                {/* orderlist */}
                <li>
                  <Link to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-100'>Orders</Link>
                </li>

                {/* userlist */}
                <li>
                  <Link to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
                </li>
              </>
            )}

            {/* profile */}
            <li>
              <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
            </li>

            {/* logout */}
            <li>
              <Link onClick={logoutHandler} to='/admin/logout' className='block px-4 py-2 hover:bg-gray-100'>Logout</Link>
            </li>
          </ul>
        )}
      </div>


      {/* reg or login options if no one logged in*/}
      {!userInfo && (
        <ul className='nav-container'>
          {/* login */}
          <li>
            <Link to='/login' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
              <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />
              <span className="hidden nav-item-name mt-[3rem]">Login</span> {" "}
            </Link>
          </li>

          {/* register */}
          <li>
            <Link to='/register' className='flex items-center translate-transform transform hover:translate-x-3' style={{ transition: '0.3s ease-in-out' }}>
              <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />
              <span className="hidden nav-item-name mt-[3rem]">Register</span> {" "}
            </Link>
          </li>
        </ul>
      )}

    </div>
  )
}

export default Navigation
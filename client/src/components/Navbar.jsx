import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

import { useCart } from '../context/CartContext';




const Navbar = () => {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  return (
    
    <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-200">
      
      {/* Brand Logo */}
      <div className="flex items-center text-blue-600 font-bold text-2xl">
        <img src={logo} alt="Brand Logo" className="w-30 h-30 mr-2" />
       
      </div>
      

      {/* Search Bar - Matching Figma blue border */}
      <div className="hidden md:flex flex-grow max-w-2xl mx-10">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full px-4 py-2 border-2 border-blue-600 rounded-l-lg outline-none"
        />
        <select className="border-y-2 border-r-2 border-blue-600 px-4 outline-none bg-gray-50 text-gray-600">
          <option>All category</option>
        </select>
        <button className="bg-blue-600 text-white px-8 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex space-x-8 text-gray-500 text-xs text-center">
        <div className="cursor-pointer hover:text-blue-600">👤<p>Profile</p></div>
        <div className="cursor-pointer hover:text-blue-600">💬<p>Message</p></div>
        <div className="cursor-pointer hover:text-blue-600">❤️<p>Orders</p></div>
        <Link to="/cart" className="relative">
  <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <span className="text-xs mt-1">My cart</span>
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </div>
</Link>
      </div>
    </nav>
  );
};

export default Navbar;
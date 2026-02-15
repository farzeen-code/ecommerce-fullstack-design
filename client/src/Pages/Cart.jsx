import React, { useState } from 'react';

// Import product images
import tshirtGray from '../assets/tshirt.png';
import tshirtBlue from '../assets/tshirt1.png';
import tshirtBrown from '../assets/winter-coat.png';
import tablet from '../assets/tablet.png';
import phone from '../assets/smartphone.png';
import smartwatch from '../assets/8.svg';
import laptop from '../assets/7.svg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      price: 78.99,
      quantity: 9,
      image: tshirtGray
    },
    {
      id: 2,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Best factory LLC',
      price: 39.00,
      quantity: 3,
      image: tshirtBlue
    },
    {
      id: 3,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      price: 170.50,
      quantity: 1,
      image: tshirtBrown
    }
  ]);

  const savedItems = [
    {
      id: 1,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: tablet
    },
    {
      id: 2,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: phone
    },
    {
      id: 3,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: smartwatch
    },
    {
      id: 4,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: laptop
    }
  ];

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const removeAll = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 60.00;
  const tax = 14.00;
  const total = subtotal - discount + tax;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        
        {/* Header */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">My cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6">
                
                {/* Product Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-sm md:text-base text-gray-800 font-medium mb-2">{item.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">
                    Size: {item.size}, Color: {item.color}, Material: {item.material}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">Seller: {item.seller}</p>
                  
                  <div className="flex gap-4 text-xs md:text-sm">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
                    </button>
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                      Save for later
                    </button>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-3">
                  <p className="text-base md:text-lg font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-600">Qty:</span>
                    <select 
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-2 md:px-3 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to shop
              </button>
              
              <button 
                onClick={removeAll}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
              >
                Remove all
              </button>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Coupon Box */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
              <p className="text-xs md:text-sm text-gray-600 mb-3">Have a coupon?</p>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Add coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 rounded font-medium text-sm transition whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5 space-y-3 md:space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount:</span>
                <span className="text-red-500 font-medium">- ${discount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="text-green-600 font-medium">+ ${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-3 md:pt-4 flex justify-between">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-lg md:text-xl text-gray-800">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 md:py-3 rounded-lg font-semibold transition shadow text-sm md:text-base">
                Checkout
              </button>

              {/* Payment Icons */}
              <div className="flex justify-center gap-2 pt-2 flex-wrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 md:h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-5 md:h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5 md:h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5 md:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Secure payment</h3>
              <p className="text-xs md:text-sm text-gray-500">Have you ever finally just write dummy info</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Customer support</h3>
              <p className="text-xs md:text-sm text-gray-500">Have you ever finally just</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Free delivery</h3>
              <p className="text-xs md:text-sm text-gray-500">Have you ever finally just</p>
            </div>
          </div>
        </div>

        {/* Saved for Later */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Saved for later</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 hover:shadow-lg transition">
                <div className="h-32 md:h-48 bg-gray-50 rounded mb-3 md:mb-4 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                
                <p className="text-base md:text-lg font-bold text-gray-800 mb-2">${item.price}</p>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">{item.name}</p>
                
                <button className="w-full border border-blue-500 text-blue-500 py-1.5 md:py-2 rounded hover:bg-blue-50 transition flex items-center justify-center gap-2 text-xs md:text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BANNER SECTION */}
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
          <div className="text-center md:text-left">
            <h2 className="text-white text-xl md:text-3xl font-bold mb-2">Super discount on more than 100 USD</h2>
            <p className="text-blue-100 text-sm md:text-lg">Have you ever finally just write dummy info</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition shadow-lg text-sm md:text-base whitespace-nowrap">
            Shop now
          </button>
        </div>

      </div>
      {/* Footer Section */}
<footer className="bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-800">Brand</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Best information about the company gies here but now lorem ipsum is</p>
                
                {/* Social Icons */}
                <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                </div>
            </div>

            {/* About Column */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">About</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                    <li><a href="#" className="hover:text-blue-500">Find store</a></li>
                    <li><a href="#" className="hover:text-blue-500">Categories</a></li>
                    <li><a href="#" className="hover:text-blue-500">Blogs</a></li>
                </ul>
            </div>

            {/* Partnership Column */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Partnership</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                    <li><a href="#" className="hover:text-blue-500">Find store</a></li>
                    <li><a href="#" className="hover:text-blue-500">Categories</a></li>
                    <li><a href="#" className="hover:text-blue-500">Blogs</a></li>
                </ul>
            </div>

            {/* Information Column */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Information</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
                    <li><a href="#" className="hover:text-blue-500">Money Refund</a></li>
                    <li><a href="#" className="hover:text-blue-500">Shipping</a></li>
                    <li><a href="#" className="hover:text-blue-500">Contact us</a></li>
                </ul>
            </div>

            {/* For users Column */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">For users</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-500">Login</a></li>
                    <li><a href="#" className="hover:text-blue-500">Register</a></li>
                    <li><a href="#" className="hover:text-blue-500">Settings</a></li>
                    <li><a href="#" className="hover:text-blue-500">My Orders</a></li>
                </ul>
            </div>

            {/* Get app Column */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Get app</h3>
                <div className="space-y-2">
                    <a href="#" className="block">
                        <div className="bg-black text-white rounded-lg px-3 md:px-4 py-2 hover:bg-gray-800 transition-colors">
                            <p className="text-xs">Download on the</p>
                            <p className="text-sm font-semibold">App Store</p>
                        </div>
                    </a>
                    <a href="#" className="block">
                        <div className="bg-black text-white rounded-lg px-3 md:px-4 py-2 hover:bg-gray-800 transition-colors">
                            <p className="text-xs">GET IT ON</p>
                            <p className="text-sm font-semibold">Google Play</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-gray-600">© 2023 Ecommerce.</p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-5 h-4" />
                <span>English</span>
            </div>
        </div>
    </div>
</footer>
    </div>
  );
};

export default Cart;
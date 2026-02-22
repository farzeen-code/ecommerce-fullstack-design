import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const discount = 0; // You can add discount logic later
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal - discount + tax;

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
          <div className="bg-white rounded-lg p-12 shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link to="/products">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        
        {/* Header */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">My cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6">
                
                {/* Product Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-sm md:text-base text-gray-800 font-medium mb-2">{item.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">
                    Category: {item.category}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">Brand: {item.brand || 'N/A'}</p>
                  
                  <div className="flex gap-4 text-xs md:text-sm">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
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
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
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
              <Link to="/products">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to shop
                </button>
              </Link>
              
              <button 
                onClick={clearCart}
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

        {/* Banner */}
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
          <div className="text-center md:text-left">
            <h2 className="text-white text-xl md:text-3xl font-bold mb-2">Super discount on more than 100 USD</h2>
            <p className="text-blue-100 text-sm md:text-lg">Have you ever finally just write dummy info</p>
          </div>
          <Link to="/products">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition shadow-lg text-sm md:text-base whitespace-nowrap">
              Shop now
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Cart;
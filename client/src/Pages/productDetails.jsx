import React, { useState } from "react";

import mainImage from "../assets/tshirt.png";

import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import thumb5 from "../assets/thumb5.png";
import thumb6 from "../assets/thumb6.png";

import related1 from "../assets/smartwatch1.png";
import related2 from "../assets/tshirt.png";
import related3 from "../assets/winter-coat.png";
import related4 from "../assets/leather-wallet.png";
import related5 from "../assets/jeans-shorts.png";
import related6 from "../assets/tshirt1.png";

const ProductDetail = () => {
  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];
  
  const relatedProducts = [
    { name: 'Men Blazers Sets Elegant Formal', price: '$7.00 - $99.50', image: related1 },
    { name: 'Men Shirt Sleeve V-neck Contrast', price: '$7.00 - $99.50', image: related2 },
    { name: 'Casual Darked Swetter Halter', price: '$12.00 - $99.50', image: related3 },
    { name: 'Basketball Crew Socks Long Stuff', price: '$4.00 - $9.50', image: related4 },
    { name: 'New Summer Men\'s Castrol T-Shirts', price: '$7.00 - $99.50', image: related5 },
    { name: 'Winter Jacket for Men', price: '$45.00 - $120.00', image: related6 },
  ];

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">

        {/* BREADCRUMB */}
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap">
          <a href="#" className="hover:text-blue-500">Home</a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-blue-500">Clothings</a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-blue-500">Men's wear</a>
          <span className="mx-2">›</span>
          <span>Summer clothing</span>
        </div>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* LEFT - IMAGE GALLERY */}
          <div className="lg:col-span-1 bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            {/* Main Image */}
            <div className="border border-gray-200 rounded-lg p-4 md:p-8 mb-4 flex items-center justify-center bg-gray-50">
              <img
                src={selectedImage}
                alt="Product"
                className="max-w-full h-48 md:h-80 object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-full h-12 md:h-16 object-cover border rounded cursor-pointer hover:border-blue-500 transition
                    ${selectedImage === img ? "border-blue-500 border-2" : "border-gray-200"}`}
                />
              ))}
            </div>
          </div>

          {/* CENTER - PRODUCT INFO */}
          <div className="lg:col-span-1 bg-white p-4 md:p-6 rounded-lg border border-gray-200 space-y-3 md:space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-sm">✓</span>
              <span className="text-green-600 text-sm font-medium">In stock</span>
            </div>

            <h1 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
              Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
            </h1>

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-orange-500">9.3</span>
              </div>
              <span className="text-gray-400 hidden md:inline">•</span>
              <span className="text-blue-500 cursor-pointer hover:underline">32 reviews</span>
              <span className="text-gray-400 hidden md:inline">•</span>
              <span className="text-orange-500">⚡ 154 sold</span>
            </div>

            {/* Price Boxes */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 md:pt-4">
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-red-600 font-bold text-sm md:text-lg">$98.00</p>
                <p className="text-xs text-gray-500 mt-1">50-100 pcs</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-gray-800 font-bold text-sm md:text-lg">$90.00</p>
                <p className="text-xs text-gray-500 mt-1">100-700 pcs</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-gray-800 font-bold text-sm md:text-lg">$78.00</p>
                <p className="text-xs text-gray-500 mt-1">700+ pcs</p>
              </div>
            </div>

            {/* Product Details Table */}
            <div className="border-t border-gray-200 pt-3 md:pt-4 space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Price:</span>
                <span className="text-gray-800">Negotiable</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Type:</span>
                <span className="text-gray-800">Classic shoes</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Material:</span>
                <span className="text-gray-800">Plastic material</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Design:</span>
                <span className="text-gray-800">Modern nice</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Customization:</span>
                <span className="text-gray-800">Customized logo and design custom packages</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Protection:</span>
                <span className="text-blue-500 cursor-pointer hover:underline">Refund Policy</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Warranty:</span>
                <span className="text-gray-800">2 years full warranty</span>
              </div>
            </div>
          </div>

          {/* RIGHT - SUPPLIER & SIDEBAR */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Supplier Box */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg md:text-xl">
                  R
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Supplier</p>
                  <p className="text-sm md:text-base font-semibold text-gray-800">Guanjoi Trading LLC</p>
                </div>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🇩🇪</span>
                  <span>Germany, Berlin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🌍</span>
                  <span>Worldwide shipping</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition">
                Send inquiry
              </button>

              <button className="w-full border border-blue-600 text-blue-600 py-2 md:py-3 rounded-lg hover:bg-blue-50 font-medium text-sm md:text-base transition">
                Seller's profile
              </button>
            </div>

            {/* You May Like */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">You may like</h3>
              <div className="space-y-4">
                {relatedProducts.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                    <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-contain bg-gray-50 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-800 leading-tight mb-1 line-clamp-2">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save for Later Button */}
            <button className="w-full border border-gray-300 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-50 font-medium text-sm md:text-base transition flex items-center justify-center gap-2">
              <span className="text-blue-500">♡</span>
              Save for later
            </button>
          </div>
        </div>

        {/* DESCRIPTION TABS */}
        <div className="bg-white mt-4 md:mt-6 p-4 md:p-6 rounded-lg border border-gray-200">
          
          {/* Tab Headers */}
          <div className="border-b border-gray-200 flex gap-4 md:gap-8 mb-4 md:mb-6 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-medium transition text-sm md:text-base whitespace-nowrap ${
                activeTab === 'description' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-medium transition text-sm md:text-base whitespace-nowrap ${
                activeTab === 'reviews' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews
            </button>
            <button 
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 font-medium transition text-sm md:text-base whitespace-nowrap ${
                activeTab === 'shipping' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Shipping
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`pb-3 font-medium transition text-sm md:text-base whitespace-nowrap ${
                activeTab === 'about' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About seller
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-sm">
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Model</span>
                    <span className="text-gray-800">#8786867</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Style</span>
                    <span className="text-gray-800">Classic style</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Certificate</span>
                    <span className="text-gray-800">ISO-898921212</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Size</span>
                    <span className="text-gray-800">34mm x 450mm x 19mm</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Memory</span>
                    <span className="text-gray-800">36GB RAM</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700 text-xs md:text-sm">Some great feature name here</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700 text-xs md:text-sm">Lorem ipsum dolor sit amet, consectetur</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700 text-xs md:text-sm">Duis aute irure dolor in reprehenderit</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700 text-xs md:text-sm">Some great feature name here</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-gray-600 text-sm">
              Reviews content goes here...
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-gray-600 text-sm">
              Shipping information goes here...
            </div>
          )}

          {activeTab === 'about' && (
            <div className="text-gray-600 text-sm">
              About seller information goes here...
            </div>
          )}
        </div>
        {/* RELATED PRODUCTS */}
        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Related products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {relatedProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer"
              >
                <div className="h-24 md:h-32 flex items-center justify-center mb-3 bg-gray-50 rounded">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-xs md:text-sm text-gray-800 mb-2 line-clamp-2">{item.name}</p>
                <p className="text-sm md:text-base text-gray-600 font-semibold">{item.price}</p>
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

export default ProductDetail;
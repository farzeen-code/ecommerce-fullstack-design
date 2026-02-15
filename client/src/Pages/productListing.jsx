import React, { useState } from 'react';

// Import product images
import product1 from '../assets/tshirt.png';
import product2 from '../assets/winter-coat.png';
import product3 from '../assets/jeans-shorts.png';
import product4 from '../assets/smartwatch1.png';
import product5 from '../assets/cameraCanon.png';
import product6 from '../assets/headphonesWhite.png';
import product7 from '../assets/leather-wallet.png';
import product8 from '../assets/gamingHeadset.png';
import product9 from '../assets/7.svg';
import product10 from '../assets/smartphone.png';
import product11 from '../assets/electricKettle.png';
import product12 from '../assets/jeans-bag.png';

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  const products = [
    { id: 1, name: 'Men\'s T-shirt Cotton Base', price: 45.00, originalPrice: 60.00, rating: 4.5, reviews: 156, image: product1, category: 'clothing', brand: 'Nike' },
    { id: 2, name: 'Winter Jacket Warm Coat', price: 120.00, originalPrice: 150.00, rating: 4.8, reviews: 89, image: product2, category: 'clothing', brand: 'Adidas' },
    { id: 3, name: 'Denim Jeans Blue Slim Fit', price: 55.00, originalPrice: 75.00, rating: 4.3, reviews: 234, image: product3, category: 'clothing', brand: 'Levi\'s' },
    { id: 4, name: 'Smart Watch Series 6', price: 299.00, originalPrice: 399.00, rating: 4.7, reviews: 445, image: product4, category: 'electronics', brand: 'Apple' },
    { id: 5, name: 'Canon DSLR Camera 4K', price: 899.00, originalPrice: 1200.00, rating: 4.9, reviews: 178, image: product5, category: 'electronics', brand: 'Canon' },
    { id: 6, name: 'Wireless Headphones', price: 79.00, originalPrice: 120.00, rating: 4.4, reviews: 567, image: product6, category: 'electronics', brand: 'Sony' },
    { id: 7, name: 'Leather Wallet Premium', price: 35.00, originalPrice: 50.00, rating: 4.6, reviews: 89, image: product7, category: 'accessories', brand: 'Fossil' },
    { id: 8, name: 'Gaming Headset RGB', price: 65.00, originalPrice: 90.00, rating: 4.5, reviews: 234, image: product8, category: 'electronics', brand: 'Razer' },
    { id: 9, name: 'Laptop 15.6" Core i7', price: 799.00, originalPrice: 999.00, rating: 4.8, reviews: 345, image: product9, category: 'electronics', brand: 'Dell' },
    { id: 10, name: 'Smartphone 5G 128GB', price: 599.00, originalPrice: 799.00, rating: 4.6, reviews: 678, image: product10, category: 'electronics', brand: 'Samsung' },
    { id: 11, name: 'Electric Kettle Black', price: 45.00, originalPrice: 60.00, rating: 4.3, reviews: 123, image: product11, category: 'home', brand: 'Philips' },
    { id: 12, name: 'Travel Backpack 40L', price: 55.00, originalPrice: 80.00, rating: 4.7, reviews: 234, image: product12, category: 'accessories', brand: 'Nike' },
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: 12 },
    { id: 'electronics', name: 'Electronics', count: 6 },
    { id: 'clothing', name: 'Clothing', count: 3 },
    { id: 'accessories', name: 'Accessories', count: 2 },
    { id: 'home', name: 'Home & Kitchen', count: 1 },
  ];

  const brands = ['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony', 'Canon', 'Dell', 'Levi\'s', 'Fossil', 'Razer', 'Philips'];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    return true;
  });

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">

        {/* Breadcrumb */}
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-blue-500">Home</a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-blue-500">Products</a>
          <span className="mx-2">›</span>
          <span>All Categories</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} items found</p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filters
          </button>

          {/* Sort & View Options */}
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>

            {/* View Toggle - Desktop Only */}
            <div className="hidden md:flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            
            {/* Categories */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-base md:text-lg">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-base md:text-lg">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-base md:text-lg">Brands</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
                setSelectedBrands([]);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition text-sm md:text-base"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Products Grid/List */}
          <main className="flex-1">
            
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition cursor-pointer group">
                    <div className="relative h-40 md:h-64 bg-gray-50 flex items-center justify-center p-3 md:p-4">
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                      {product.originalPrice > product.price && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                      <button className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-sm md:text-base font-medium text-gray-800 mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-yellow-400 text-xs md:text-sm">
                          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg md:text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs md:text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 md:py-2 rounded-lg font-medium transition text-xs md:text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4 hover:shadow-lg transition cursor-pointer">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl md:text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm md:text-base text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      {product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                      )}
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition text-sm md:text-base whitespace-nowrap">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 1000]);
                    setSelectedBrands([]);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">Showing 1-{filteredProducts.length} of {filteredProducts.length} products</p>
                <div className="flex gap-2">
                  <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">Previous</button>
                  <button className="px-3 md:px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">1</button>
                  <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">2</button>
                  <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">3</button>
                  <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">Next</button>
                </div>
              </div>
            )}
          </main>
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

export default ProductListing;
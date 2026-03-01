import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';

const ProductListing = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  
  // Get search query from URL
  const searchQuery = searchParams.get('search') || '';
  const categoryFromURL = searchParams.get('category') || 'all';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products based on search query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        
        if (searchQuery) {
          // Search with query
          console.log('Searching for:', searchQuery);
          response = await productAPI.searchProducts(searchQuery);
          console.log('Search results:', response.data);
        } else {
          // Get all products
          console.log('Getting all products');
          response = await productAPI.getAllProducts();
        }
        
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]); // Re-fetch when search query changes

  // Update category from URL
  useEffect(() => {
    if (categoryFromURL !== 'all') {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
    { id: 'clothing', name: 'Clothing', count: products.filter(p => p.category === 'clothing').length },
    { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
    { id: 'home', name: 'Home & Kitchen', count: products.filter(p => p.category === 'home').length },
    { id: 'sports', name: 'Sports', count: products.filter(p => p.category === 'sports').length },
  ];

  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  // Updated filter logic - don't override search results with category filter
  const filteredProducts = products.filter(product => {
    // Don't apply category filter if we're searching
    if (!searchQuery && selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    
    // Apply price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Apply brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    
    return true;
  });

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  // Rest of your component...

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">

        {/* Breadcrumb */}
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-blue-500">Products</Link>
          <span className="mx-2">›</span>
          <span>All Categories</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <div>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
      {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
    </h1>
    <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} items found</p>
  </div>
  {/* Active Filters Tags */}
{(searchQuery || selectedBrands.length > 0 || selectedCategory !== 'all' || priceRange[1] < 1000) && (
  <div className="flex flex-wrap items-center gap-2 mb-4">
    <span className="text-sm text-gray-600 font-medium">Active filters:</span>
    
    {searchQuery && (
      <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        Search: {searchQuery}
        <button
          onClick={() => window.location.href = '/products'}
          className="hover:text-blue-900"
        >
          ×
        </button>
      </span>
    )}
    
    {selectedCategory !== 'all' && (
      <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {selectedCategory}
        <button
          onClick={() => setSelectedCategory('all')}
          className="hover:text-blue-900"
        >
          ×
        </button>
      </span>
    )}
    
    {selectedBrands.map(brand => (
      <span key={brand} className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {brand}
        <button
          onClick={() => handleBrandToggle(brand)}
          className="hover:text-blue-900"
        >
          ×
        </button>
      </span>
    ))}
    
    {priceRange[1] < 1000 && (
      <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        Max: ${priceRange[1]}
        <button
          onClick={() => setPriceRange([0, 1000])}
          className="hover:text-blue-900"
        >
          ×
        </button>
      </span>
    )}
    
    <button
      onClick={() => {
        setSelectedCategory('all');
        setPriceRange([0, 1000]);
        setSelectedBrands([]);
        window.location.href = '/products';
      }}
      className="text-sm text-blue-600 hover:text-blue-700 font-medium ml-2"
    >
      Clear all
    </button>
  </div>
)}

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
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {filteredProducts.map((product) => (
                      <Link to={`/product/${product._id}`} key={product._id}>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition cursor-pointer group">
                          <div className="relative h-40 md:h-64 bg-gray-50 flex items-center justify-center p-3 md:p-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
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
                            <h3 className="text-sm md:text-base font-medium text-gray-800 mb-2 line-clamp-2">
                              {product.name}
                            </h3>

                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex text-yellow-400 text-xs md:text-sm">
                                {'★'.repeat(Math.floor(product.rating || 0))}{'☆'.repeat(5 - Math.floor(product.rating || 0))}
                              </div>
                              <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg md:text-xl font-bold text-gray-800">
                                ${product.price?.toFixed(2)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-xs md:text-sm text-gray-400 line-through">
                                  ${product.originalPrice?.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <button 
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 md:py-2 rounded-lg font-medium transition text-xs md:text-sm"
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {filteredProducts.map(product => (
                      <Link to={`/product/${product._id}`} key={product._id}>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4 hover:shadow-lg transition cursor-pointer">
                          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex text-yellow-400 text-sm">
                                {'★'.repeat(Math.floor(product.rating || 0))}{'☆'.repeat(5 - Math.floor(product.rating || 0))}
                              </div>
                              <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xl md:text-2xl font-bold text-gray-800">${product.price?.toFixed(2)}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm md:text-base text-gray-400 line-through">${product.originalPrice?.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            {product.originalPrice > product.price && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                            )}
                            <button 
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition text-sm md:text-base whitespace-nowrap"
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </Link>
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
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
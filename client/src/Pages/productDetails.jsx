import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { productAPI, inquiryAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import InquiryModal from '../components/InquiryModal';

import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import thumb5 from "../assets/thumb5.png";
import thumb6 from "../assets/thumb6.png";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProductById(id);
        console.log('Product details:', response.data);
        setProduct(response.data.data);
        setSelectedImage(response.data.data.image);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleSendInquiry = async (formData) => {
    try {
      const response = await inquiryAPI.sendInquiry({
        productId: product._id,
        ...formData
      });
      
      setIsInquiryModalOpen(false);
      
      // Show success message
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send inquiry');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  // Show error if product not found
  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];
  
  const relatedProducts = [
    { _id: '1', name: 'Men Blazers Sets Elegant Formal', price: '$7.00 - $99.50', image: product.image },
    { _id: '2', name: 'Men Shirt Sleeve V-neck Contrast', price: '$7.00 - $99.50', image: product.image },
    { _id: '3', name: 'Casual Darked Swetter Halter', price: '$12.00 - $99.50', image: product.image },
    { _id: '4', name: 'Basketball Crew Socks Long Stuff', price: '$4.00 - $9.50', image: product.image },
    { _id: '5', name: 'New Summer Men\'s Castrol T-Shirts', price: '$7.00 - $99.50', image: product.image },
    { _id: '6', name: 'Winter Jacket for Men', price: '$45.00 - $120.00', image: product.image },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">

        {/* BREADCRUMB */}
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-blue-500">Products</Link>
          <span className="mx-2">›</span>
          <span>{product.category}</span>
          <span className="mx-2">›</span>
          <span>{product.name}</span>
        </div>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* LEFT - IMAGE GALLERY */}
          <div className="lg:col-span-1 bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="border border-gray-200 rounded-lg p-4 md:p-8 mb-4 flex items-center justify-center bg-gray-50">
              <img
                src={selectedImage}
                alt="Product"
                className="max-w-full h-48 md:h-80 object-contain"
              />
            </div>

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
              <span className="text-green-600 text-sm font-medium">
                {product.stock > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            <h1 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-orange-500">{product.rating || 0}</span>
              </div>
              <span className="text-gray-400 hidden md:inline">•</span>
              <span className="text-blue-500 cursor-pointer hover:underline">{product.reviews || 0} reviews</span>
              <span className="text-gray-400 hidden md:inline">•</span>
              <span className="text-orange-500">⚡ {product.stock} in stock</span>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 md:pt-4">
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-red-600 font-bold text-sm md:text-lg">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">Single Item</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-gray-800 font-bold text-sm md:text-lg">${(product.price * 0.95).toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">5+ items</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 px-2 md:px-4 py-2 md:py-3 rounded text-center">
                <p className="text-gray-800 font-bold text-sm md:text-lg">${(product.price * 0.90).toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">10+ items</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 md:pt-4 space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Price:</span>
                <span className="text-gray-800">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Category:</span>
                <span className="text-gray-800 capitalize">{product.category}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Brand:</span>
                <span className="text-gray-800">{product.brand || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Stock:</span>
                <span className="text-gray-800">{product.stock} available</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-28 md:w-32">Rating:</span>
                <span className="text-gray-800">{product.rating || 0}/5 ({product.reviews || 0} reviews)</span>
              </div>
            </div>
          </div>

          {/* RIGHT - SUPPLIER & SIDEBAR */}
          <div className="lg:col-span-1 space-y-4">
            
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg md:text-xl">
                  {product.brand ? product.brand.charAt(0) : 'S'}
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Supplier</p>
                  <p className="text-sm md:text-base font-semibold text-gray-800">{product.brand || 'Official Store'}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🌍</span>
                  <span>Worldwide shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">⭐</span>
                  <span>Top rated product</span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition"
              >
                Add to Cart
              </button>

              <button 
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full border border-blue-600 text-blue-600 py-2 md:py-3 rounded-lg hover:bg-blue-50 font-medium text-sm md:text-base transition"
              >
                Send inquiry
              </button>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">You may like</h3>
              <div className="space-y-4">
                {relatedProducts.slice(0, 5).map((item) => (
                  <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                    <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-contain bg-gray-50 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-800 leading-tight mb-1 line-clamp-2">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full border border-gray-300 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-50 font-medium text-sm md:text-base transition flex items-center justify-center gap-2">
              <span className="text-blue-500">♡</span>
              Save for later
            </button>
          </div>
        </div>

        {/* DESCRIPTION TABS */}
        <div className="bg-white mt-4 md:mt-6 p-4 md:p-6 rounded-lg border border-gray-200">
          
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
          </div>

          {activeTab === 'description' && (
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-sm">
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Category</span>
                    <span className="text-gray-800 capitalize">{product.category}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Brand</span>
                    <span className="text-gray-800">{product.brand || 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Stock</span>
                    <span className="text-gray-800">{product.stock} units</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24 md:w-32">Rating</span>
                    <span className="text-gray-800">{product.rating || 0}/5 stars</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-gray-600 text-sm">
              <p className="mb-4">{product.reviews || 0} customer reviews</p>
              <p className="text-gray-500">Reviews content coming soon...</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-gray-600 text-sm">
              <p className="mb-2"><strong>Free shipping</strong> on orders over $50</p>
              <p className="mb-2"><strong>Standard delivery:</strong> 5-7 business days</p>
              <p className="mb-2"><strong>Express delivery:</strong> 2-3 business days</p>
              <p className="text-gray-500">Worldwide shipping available</p>
            </div>
          )}
        </div>

        {/* BANNER SECTION */}
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

        {/* RELATED PRODUCTS */}
        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Related products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
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

      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={product}
        onSubmit={handleSendInquiry}
      />
    </div>
  );
};

export default ProductDetail;
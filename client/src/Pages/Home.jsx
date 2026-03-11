import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import banner from '../assets/banner.png'; 
import smartwatchImg from '../assets/8.svg';
import laptopImg from '../assets/7.svg';
import cameraImg from '../assets/6.svg';
import headphonesImg from '../assets/5.svg';
import canonCameraImg from '../assets/3.svg';

// Home and Outdoor images
// import plantDecor from '../assets/plant-decor.png';
import softChair from '../assets/softChair.png';
import sofaLamp from '../assets/sofaLamp.png';
import kitchenDishes from '../assets/kitchenDishes.png';
import smartWatch1 from '../assets/smartWatch1.png';
import kitchenMixer from '../assets/kitchenMixer.png';

// Consumer Electronics images
// import electronicsDecor from '../assets/electronicsDecor.png';
import smartWatch2 from '../assets/smartWatch2.png';
import cameraCanon from '../assets/cameraCanon.png';
import headphonesWhite from '../assets/headphonesWhite.png';
import electricKettle from '../assets/electricKettle.png';
import gamingHeadset from '../assets/gamingHeadset.png';

// Recommended Items images (10 products)
import tshirt from '../assets/tshirt.png';
import jeansShorts from '../assets/jeans-shorts.png';
import winterCoat from '../assets/winter-coat.png';
import jeansBag from '../assets/jeans-bag.png';
import leatherWallet from '../assets/leather-wallet.png';
import canonCamera from '../assets/canon-camera.png';
import gamingHeadset2 from '../assets/gamingHeadset.png';
import smartwatchSilver from '../assets/8.svg';
import blueWallet from '../assets/blue-wallet.png';
import blackKettle from '../assets/electricKettle.png';

// Extra Services images (4 services)
import serviceIndustry from '../assets/service-industry.png';
import serviceCustomize from '../assets/service-customize.png';
import serviceShipping from '../assets/service-shipping.png';
import serviceMonitoring from '../assets/service-monitoring.png';
import { newsletterAPI } from '../services/api';

export default function Home() {
    const categories = [
        'Automobiles',
        'Clothes and wear',
        'Home interiors',
        'Computer and tech',
        'Tools, equipments',
        'Sports and outdoor',
        'Animal and pets',
        'Machinery tools',
        'More category'
    ];
    
    // State for featured products
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

// Inside your Home component, add state:
const [email, setEmail] = useState('');
const [subscribeMessage, setSubscribeMessage] = useState('');
const [subscribeLoading, setSubscribeLoading] = useState(false);

// Add subscribe handler:
const handleNewsletterSubscribe = async (e) => {
  e.preventDefault();
  
  if (!email.trim()) {
    setSubscribeMessage('Please enter your email');
    return;
  }

  try {
    setSubscribeLoading(true);
    const response = await newsletterAPI.subscribe(email);
    setSubscribeMessage(response.data.message);
    setEmail(''); // Clear input
    setTimeout(() => setSubscribeMessage(''), 5000); // Clear message after 5s
  } catch (error) {
    setSubscribeMessage(error.response?.data?.message || 'Failed to subscribe');
    setTimeout(() => setSubscribeMessage(''), 5000);
  } finally {
    setSubscribeLoading(false);
  }
};

    // Fetch featured products on component mount
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productAPI.getFeaturedProducts();
                console.log('Featured products:', response.data);
                setFeaturedProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    

    const deals = [
        {
            name: 'Smart watches',
            image: smartwatchImg,
            discount: '-25%'
        },
        {
            name: 'Laptops',
            image: laptopImg,
            discount: '-15%'
        },
        {
            name: 'GoPro cameras',
            image: cameraImg,
            discount: '-40%'
        },
        {
            name: 'Headphones',
            image: headphonesImg,
            discount: '-25%'
        },
        {
            name: 'Canon cameras',
            image: canonCameraImg,
            discount: '-25%'
        }
    ];

    const homeOutdoorProducts = [
        { name: 'Soft chairs', price: 'USD 19', image: softChair },
        { name: 'Sofa & chair', price: 'USD 19', image: sofaLamp },
        { name: 'Kitchen dishes', price: 'USD 19', image: kitchenDishes },
        { name: 'Smart watches', price: 'USD 19', image: smartWatch1 },
        { name: 'Kitchen mixer', price: 'USD 100', image: kitchenMixer }
    ];

    const electronicsProducts = [
        { name: 'Smart watches', price: 'USD 19', image: smartWatch2 },
        { name: 'Cameras', price: 'USD 89', image: cameraCanon },
        { name: 'Headphones', price: 'USD 10', image: headphonesWhite },
        { name: 'Smart watches', price: 'USD 90', image: electricKettle },
        { name: 'Gaming set', price: 'USD 35', image: gamingHeadset }
    ];

    // Use featured products for recommended items
    const recommendedItems = featuredProducts.slice(0, 10);

    const services = [
        {
            title: 'Source from Industry Hubs',
            image: serviceIndustry,
            icon: '🔍'
        },
        {
            title: 'Customize Your Products',
            image: serviceCustomize,
            icon: '📝'
        },
        {
            title: 'Fast, reliable shipping by ocean or air',
            image: serviceShipping,
            icon: '▶️'
        },
        {
            title: 'Product monitoring and inspection',
            image: serviceMonitoring,
            icon: '🛡️'
        }
    ];

    const regions = [
        { name: 'Arabic Emirates', flag: '🇦🇪', link: 'shopname.ae' },
        { name: 'Australia', flag: '🇦🇺', link: 'shopname.au' },
        { name: 'United States', flag: '🇺🇸', link: 'shopname.us' },
        { name: 'Russia', flag: '🇷🇺', link: 'shopname.ru' },
        { name: 'Italy', flag: '🇮🇹', link: 'shopname.it' },
        { name: 'Denmark', flag: '🇩🇰', link: 'denmark.com.dk' },
        { name: 'France', flag: '🇫🇷', link: 'shopname.fr' },
        { name: 'Arabic Emirates', flag: '🇦🇪', link: 'shopname.ae' },
        { name: 'China', flag: '🇨🇳', link: 'shopname.cn' },
        { name: 'Great Britain', flag: '🇬🇧', link: 'shopname.co.uk' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner Section */}
            <div className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-0 border-2 lg:border-4 border-blue-500 rounded-lg overflow-hidden bg-white shadow-lg">
                        {/* Left Sidebar - Categories - Hidden on mobile */}
                        <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-200">
                            <div className="p-4">
                                <ul className="space-y-1">
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <button className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded transition-colors text-sm">
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 relative">
                            {/* Hero Section with Gradient Background */}
                            <div className="relative h-64 md:h-96 lg:h-full bg-gradient-to-br from-teal-200 via-emerald-100 to-cyan-200 p-4 md:p-8">
                                {/* Top Right User Menu */}
                                <div className="absolute top-3 right-3 md:top-6 md:right-6 flex items-center gap-2 md:gap-3 z-20">
                                    <div className="bg-teal-500 text-white rounded-full w-8 h-8 md:w-11 md:h-11 flex items-center justify-center font-semibold text-sm md:text-lg shadow-lg">
                                        H
                                    </div>
                                    <div className="hidden md:block bg-white rounded-lg shadow-md">
                                        <div className="px-4 py-2">
                                            <p className="text-xs text-gray-600">Hi, user</p>
                                            <p className="text-xs text-gray-600">let's get started</p>
                                        </div>
                                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-xs font-medium transition-colors">
                                            Join now
                                        </button>
                                        <button className="w-full bg-white hover:bg-gray-50 text-blue-500 px-4 py-1.5 text-xs font-medium border-t transition-colors">
                                            Log in
                                        </button>
                                    </div>
                                </div>

                                {/* Main Heading */}
                                <div className="max-w-md pt-4 md:pt-8">
                                    <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-1">
                                        Latest trending
                                    </h2>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                                        Electronic items
                                    </h1>
                                    <button className="px-4 md:px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-md font-medium shadow-md transition-colors text-sm md:text-base">
                                        Learn more
                                    </button>
                                </div>

                                {/* Product Images - Hidden on mobile */}
                                <div className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 items-center gap-6">
                                    {/* Laptop */}
                                    <div className="transform -rotate-12">
                                        <div className="w-48 h-32 bg-gray-800 rounded-lg shadow-2xl relative overflow-hidden">
                                            <div className="absolute inset-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded"></div>
                                            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gray-700"></div>
                                        </div>
                                    </div>

                                    {/* Headphones */}
                                    <div className="transform translate-y-8">
                                        <div className="w-32 h-32 relative">
                                            <div className="absolute inset-0 bg-gray-900 rounded-full"></div>
                                            <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800 rounded-full"></div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-700 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Mouse */}
                                    <div className="absolute -top-12 -right-8 transform rotate-12">
                                        <div className="w-12 h-16 bg-gray-900 rounded-full shadow-xl"></div>
                                    </div>

                                    {/* Phone */}
                                    <div className="absolute -bottom-8 right-12">
                                        <div className="w-20 h-32 bg-gray-900 rounded-2xl shadow-2xl">
                                            <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Bottom Right - Responsive */}
                                <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 flex flex-col gap-2 md:gap-3 w-44 md:w-56">
                                    <div className="bg-orange-500 hover:bg-orange-600 text-white p-3 md:p-4 rounded-lg shadow-lg cursor-pointer transition-colors">
                                        <p className="text-xs md:text-sm font-semibold">Get US $10 off</p>
                                        <p className="text-xs opacity-90">with a new supplier</p>
                                    </div>
                                    <div className="bg-teal-500 hover:bg-teal-600 text-white p-3 md:p-4 rounded-lg shadow-lg cursor-pointer transition-colors">
                                        <p className="text-xs md:text-sm font-semibold">Send quotes with</p>
                                        <p className="text-xs opacity-90">supplier preferences</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deals and Offers Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                    {/* Timer Card */}
                    <div className="col-span-2 md:col-span-1 bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1">Deals and offers</h2>
                        <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">Hygiene equipments</p>
                        
                        <div className="flex gap-2">
                            <div className="bg-gray-700 text-white rounded-lg p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                                <div className="text-xl md:text-2xl font-bold">04</div>
                                <div className="text-xs text-gray-300">Days</div>
                            </div>
                            <div className="bg-gray-700 text-white rounded-lg p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                                <div className="text-xl md:text-2xl font-bold">13</div>
                                <div className="text-xs text-gray-300">Hour</div>
                            </div>
                            <div className="bg-gray-700 text-white rounded-lg p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                                <div className="text-xl md:text-2xl font-bold">34</div>
                                <div className="text-xs text-gray-300">Min</div>
                            </div>
                            <div className="bg-gray-700 text-white rounded-lg p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                                <div className="text-xl md:text-2xl font-bold">56</div>
                                <div className="text-xs text-gray-300">Sec</div>
                            </div>
                        </div>
                    </div>

                    {/* Deals Products */}
                    {deals.map((deal, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
                            <img 
                                src={deal.image} 
                                alt={deal.name} 
                                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-3 md:mb-4"
                            />
                            <h3 className="text-sm md:text-base text-gray-800 font-medium text-center mb-2 md:mb-3">{deal.name}</h3>
                            <span className="bg-pink-100 text-red-500 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium">
                                {deal.discount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Home and Outdoor Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                    {/* Banner Card */}
                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow p-4 md:p-6 border border-gray-200 relative overflow-hidden">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                            Home and<br />outdoor
                        </h2>
                        <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 md:px-6 py-2 rounded-md font-medium shadow transition-colors mt-4 md:mt-6 text-xs md:text-sm">
                            Source now
                        </button>
                    </div>

                    {/* Home Products */}
                    {homeOutdoorProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-3 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                            <h3 className="text-sm md:text-base text-gray-800 font-medium mb-1">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                From<br />{product.price}
                            </p>
                            <div className="flex justify-center items-center h-20 md:h-28">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Consumer Electronics Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                    {/* Banner Card */}
                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-4 md:p-6 border border-gray-200 relative overflow-hidden">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                            Consumer<br />electronics and<br />gadgets
                        </h2>
                        <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 md:px-6 py-2 rounded-md font-medium shadow transition-colors mt-4 md:mt-6 text-xs md:text-sm">
                            Source now
                        </button>
                    </div>

                    {/* Electronics Products */}
                    {electronicsProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-3 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                            <h3 className="text-sm md:text-base text-gray-800 font-medium mb-1">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                From<br />{product.price}
                            </p>
                            <div className="flex justify-center items-center h-20 md:h-28">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommended Items Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Recommended items</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                    {loading ? (
    <div className="col-span-full text-center py-12">
        <p className="text-gray-500">Loading products...</p>
    </div>
) : (
    recommendedItems.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-32 md:h-48 bg-gray-100 flex items-center justify-center p-3 md:p-4">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div className="p-3 md:p-4">
                <p className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                    ${item.price.toFixed(2)}
                </p>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{item.name}</p>
            </div>
        </div>
    ))
)}
                </div>
            </div>

            {/* Our Extra Services Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Our extra services</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group">
                            <div className="h-48 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 md:p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800">{service.title}</h3>
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg md:text-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suppliers by Region Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8 md:pb-12">
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Suppliers by region</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                    {regions.map((region, index) => (
                        <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <span className="text-2xl md:text-3xl">{region.flag}</span>
                                <div>
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800">{region.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-500">{region.link}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Subscription Section */}
            <div className="bg-gray-100 py-8 md:py-12">
  <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">Subscribe on our newsletter</h2>
    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
    
    <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={subscribeLoading}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>
      <button 
        type="submit"
        disabled={subscribeLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:bg-blue-300"
      >
        {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
    
    {subscribeMessage && (
      <p className={`mt-4 text-sm ${subscribeMessage.includes('Success') || subscribeMessage.includes('subscribed') ? 'text-green-600' : 'text-red-600'}`}>
        {subscribeMessage}
      </p>
    )}
  </div>
</div>

            
        </div>
    );
}
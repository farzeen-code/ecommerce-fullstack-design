import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI, newsletterAPI, inquiryAPI } from '../services/api'; 
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import InquiryModal from '../components/InquiryModal';
import smartwatchImg from '../assets/8.svg';
import laptopImg from '../assets/7.svg';
import cameraImg from '../assets/6.svg';
import headphonesImg from '../assets/5.svg';
import canonCameraImg from '../assets/3.svg';

// Home and Outdoor images
import softChair from '../assets/softChair.png';
import sofaLamp from '../assets/sofaLamp.png';
import kitchenDishes from '../assets/kitchenDishes.png';
import smartWatch1 from '../assets/smartWatch1.png';
import kitchenMixer from '../assets/kitchenMixer.png';

// Consumer Electronics images
import smartWatch2 from '../assets/smartWatch2.png';
import cameraCanon from '../assets/cameraCanon.png';
import headphonesWhite from '../assets/headphonesWhite.png';
import electricKettle from '../assets/electricKettle.png';
import gamingHeadset from '../assets/gamingHeadset.png';

// Extra Services images (4 services)
import serviceIndustry from '../assets/service-industry.png';
import serviceCustomize from '../assets/service-customize.png';
import serviceShipping from '../assets/service-shipping.png';
import serviceMonitoring from '../assets/service-monitoring.png';

export default function Home() {
    const { user, isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [toastMessage, setToastMessage] = useState('');
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
    const [inquiryProduct, setInquiryProduct] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // Live Countdown Timer
    const [timeLeft, setTimeLeft] = useState({
        days: 4,
        hours: 13,
        minutes: 34,
        seconds: 56
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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

    const categoryLinks = {
        'Automobiles': '/products?search=Automobile',
        'Clothes and wear': '/products?category=clothing',
        'Home interiors': '/products?category=home',
        'Computer and tech': '/products?category=electronics',
        'Tools, equipments': '/products?search=Tools',
        'Sports and outdoor': '/products?category=sports',
        'Animal and pets': '/products?search=Pets',
        'Machinery tools': '/products?search=Machinery',
        'More category': '/products'
    };
    
    // State for featured products
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInquirySubmit = async (formData) => {
        try {
            const response = await inquiryAPI.sendInquiry({
                productId: inquiryProduct?._id,
                ...formData
            });
            setIsInquiryModalOpen(false);
            showToast(response.data?.message || 'Inquiry sent successfully!');
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to send inquiry');
        }
    };
    

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
                    <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        {/* Left Sidebar - Categories - Hidden on mobile */}
                        <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-200">
                            <div className="p-4">
                                <ul className="space-y-1">
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <Link to={categoryLinks[category] || '/products'} className="block">
                                                <button className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors text-sm font-medium">
                                                    {category}
                                                </button>
                                            </Link>
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
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'H'}
                                    </div>
                                    {isAuthenticated() ? (
                                        <div className="hidden md:block bg-white rounded-lg shadow-md min-w-[140px] overflow-hidden">
                                            <div className="px-4 py-2 bg-blue-50">
                                                <p className="text-xs font-semibold text-gray-800 truncate">Hi, {user?.name}</p>
                                                <p className="text-[11px] text-gray-500">Welcome back</p>
                                            </div>
                                            <Link to="/products" className="block text-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium transition-colors">
                                                Explore Shop
                                            </Link>
                                            <Link to="/cart" className="block text-center bg-white hover:bg-gray-50 text-blue-600 px-3 py-1.5 text-xs font-medium border-t transition-colors">
                                                My Cart
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="hidden md:block bg-white rounded-lg shadow-md min-w-[140px] overflow-hidden">
                                            <div className="px-4 py-2">
                                                <p className="text-xs text-gray-600">Hi, user</p>
                                                <p className="text-xs text-gray-600">let's get started</p>
                                            </div>
                                            <Link to="/register" className="block text-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium transition-colors">
                                                Join now
                                            </Link>
                                            <Link to="/login" className="block text-center bg-white hover:bg-gray-50 text-blue-600 px-3 py-1.5 text-xs font-medium border-t transition-colors">
                                                Log in
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Main Heading */}
                                <div className="max-w-md pt-4 md:pt-8">
                                    <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-1">
                                        Latest trending
                                    </h2>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                                        Electronic items
                                    </h1>
                                    <Link to="/products?category=electronics">
                                        <button className="px-4 md:px-6 py-2 bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 rounded-md font-semibold shadow-md transition-all text-sm md:text-base">
                                            Learn more
                                        </button>
                                    </Link>
                                </div>

                                {/* Product Images - Hidden on mobile */}
                                <div className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 items-center gap-6 pointer-events-none">
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
                                    <Link to="/products?category=electronics" className="bg-orange-500 hover:bg-orange-600 text-white p-3 md:p-4 rounded-lg shadow-lg cursor-pointer transition-transform hover:-translate-y-0.5 block">
                                        <p className="text-xs md:text-sm font-semibold">Get US $10 off</p>
                                        <p className="text-xs opacity-90">with a new supplier</p>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            setInquiryProduct({ name: 'Bulk Product Supplier Inquiry' });
                                            setIsInquiryModalOpen(true);
                                        }}
                                        className="bg-teal-500 hover:bg-teal-600 text-white p-3 md:p-4 rounded-lg shadow-lg text-left transition-transform hover:-translate-y-0.5 w-full cursor-pointer"
                                    >
                                        <p className="text-xs md:text-sm font-semibold">Send quotes with</p>
                                        <p className="text-xs opacity-90">supplier preferences</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deals and Offers Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {/* Timer Card */}
                    <div className="col-span-2 md:col-span-1 bg-white rounded-lg shadow p-4 md:p-5 border border-gray-200 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Deals and offers</h2>
                            <p className="text-xs md:text-sm text-gray-500 mb-4">Hygiene & tech gadgets</p>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full">
                            <div className="bg-gray-800 text-white rounded p-1.5 text-center min-w-0">
                                <div className="text-sm sm:text-base font-bold leading-tight">{String(timeLeft.days).padStart(2, '0')}</div>
                                <div className="text-[10px] text-gray-300">Days</div>
                            </div>
                            <div className="bg-gray-800 text-white rounded p-1.5 text-center min-w-0">
                                <div className="text-sm sm:text-base font-bold leading-tight">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="text-[10px] text-gray-300">Hour</div>
                            </div>
                            <div className="bg-gray-800 text-white rounded p-1.5 text-center min-w-0">
                                <div className="text-sm sm:text-base font-bold leading-tight">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="text-[10px] text-gray-300">Min</div>
                            </div>
                            <div className="bg-gray-800 text-white rounded p-1.5 text-center min-w-0">
                                <div className="text-sm sm:text-base font-bold leading-tight">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="text-[10px] text-gray-300">Sec</div>
                            </div>
                        </div>
                    </div>

                    {/* Deals Products */}
                    {deals.map((deal, index) => (
                        <Link 
                            key={index} 
                            to={`/products?search=${encodeURIComponent(deal.name.split(' ')[0])}`}
                            className="bg-white rounded-lg shadow p-3 md:p-4 border border-gray-200 flex flex-col items-center justify-center hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group"
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-3">
                                <img 
                                    src={deal.image} 
                                    alt={deal.name} 
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <h3 className="text-xs md:text-sm text-gray-800 font-medium text-center mb-2">{deal.name}</h3>
                            <span className="bg-pink-100 text-red-600 px-3 py-0.5 rounded-full text-xs font-semibold">
                                {deal.discount}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Home and Outdoor Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                    {/* Banner Card */}
                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow p-4 md:p-6 border border-gray-200 relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                Home and<br />outdoor
                            </h2>
                        </div>
                        <Link 
                            to="/products?category=home" 
                            className="inline-block bg-white hover:bg-gray-50 text-gray-700 px-4 md:px-6 py-2 rounded-md font-medium shadow transition-colors mt-4 md:mt-6 text-xs md:text-sm text-center"
                        >
                            Source now
                        </Link>
                    </div>

                    {/* Home Products */}
                    {homeOutdoorProducts.map((product, index) => (
                        <Link 
                            key={index} 
                            to={`/products?search=${encodeURIComponent(product.name)}`}
                            className="bg-white rounded-lg shadow p-3 md:p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer block group"
                        >
                            <h3 className="text-sm md:text-base text-gray-800 font-medium mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                From<br />{product.price}
                            </p>
                            <div className="flex justify-center items-center h-20 md:h-28">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Consumer Electronics Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                    {/* Banner Card */}
                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-4 md:p-6 border border-gray-200 relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                Consumer<br />electronics and<br />gadgets
                            </h2>
                        </div>
                        <Link 
                            to="/products?category=electronics" 
                            className="inline-block bg-white hover:bg-gray-50 text-gray-700 px-4 md:px-6 py-2 rounded-md font-medium shadow transition-colors mt-4 md:mt-6 text-xs md:text-sm text-center"
                        >
                            Source now
                        </Link>
                    </div>

                    {/* Electronics Products */}
                    {electronicsProducts.map((product, index) => (
                        <Link 
                            key={index} 
                            to={`/products?search=${encodeURIComponent(product.name)}`}
                            className="bg-white rounded-lg shadow p-3 md:p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer block group"
                        >
                            <h3 className="text-sm md:text-base text-gray-800 font-medium mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                                From<br />{product.price}
                            </p>
                            <div className="flex justify-center items-center h-20 md:h-28">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recommended Items Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Recommended items</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View all &rarr;
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                    {loading ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">Loading products...</p>
                        </div>
                    ) : recommendedItems.length === 0 ? (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 mb-3">No products available at the moment.</p>
                            <Link to="/products" className="text-blue-600 hover:underline text-sm font-medium">
                                Browse all catalog items
                            </Link>
                        </div>
                    ) : (
                        recommendedItems.map((item) => (
                            <div key={item._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group">
                                <Link to={`/product/${item._id}`} className="block">
                                    <div className="h-36 md:h-48 bg-gray-50 flex items-center justify-center p-3 md:p-4 overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'; }}
                                        />
                                    </div>
                                    <div className="px-3 pt-2 md:px-4">
                                        <p className="text-base md:text-lg font-bold text-gray-800 mb-1">
                                            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] font-medium group-hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </p>
                                    </div>
                                </Link>
                                <div className="p-3 md:p-4 pt-2">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(item, 1);
                                            showToast(`Added "${item.name}" to cart!`);
                                        }}
                                        className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-1.5 px-3 rounded text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to cart
                                    </button>
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
                        <div 
                            key={index} 
                            onClick={() => {
                                setInquiryProduct({ name: service.title });
                                setIsInquiryModalOpen(true);
                            }}
                            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group hover:shadow-xl transition-all"
                        >
                            <div className="h-48 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 md:p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{service.title}</h3>
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
                        <Link 
                            key={index} 
                            to={`/products?search=${encodeURIComponent(region.name)}`}
                            className="bg-white rounded-lg shadow border border-gray-200 p-3 md:p-4 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer block group"
                        >
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <span className="text-2xl md:text-3xl">{region.flag}</span>
                                <div>
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{region.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-500">{region.link}</p>
                                </div>
                            </div>
                        </Link>
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
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:bg-blue-300 cursor-pointer"
                        >
                            {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    
                    {subscribeMessage && (
                        <p className={`mt-4 text-sm font-medium ${subscribeMessage.includes('Success') || subscribeMessage.includes('subscribed') ? 'text-green-600' : 'text-red-600'}`}>
                            {subscribeMessage}
                        </p>
                    )}
                </div>
            </div>

            {/* Inquiry Modal */}
            <InquiryModal 
                isOpen={isInquiryModalOpen} 
                onClose={() => setIsInquiryModalOpen(false)} 
                product={inquiryProduct} 
                onSubmit={handleInquirySubmit} 
            />

            {/* Floating Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-medium border border-gray-700">
                    <span className="text-green-400 text-lg font-bold">✓</span>
                    <span>{toastMessage}</span>
                    <button 
                        onClick={() => setToastMessage('')}
                        className="text-gray-400 hover:text-white ml-2 text-xs"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}
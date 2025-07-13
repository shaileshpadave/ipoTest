import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header 
      className="bg-white shadow-figma"
      style={{
        width: '1920px',
        height: '125px',
        position: 'relative'
      }}
    >
      <div className="flex justify-between items-center h-full px-12">
        {/* Logo Section - Exact Figma positioning with dp.png */}
        <div className="flex items-center" style={{ marginLeft: '31px' }}>
          {/* Bluestock Logo + Text - Make it clickable to home */}
          <Link to="/" className="flex items-center space-x-4">
            {/* Bluestock Logo PNG */}
            <img 
              src="/logos/dp.png"
              alt="Bluestock Logo"
              className="w-12 h-12 object-contain"
            />
            
            {/* BLUESTOCK Text */}
            <h1 
              className="text-black font-bold hover:text-blue-600 cursor-pointer transition-colors"
              style={{
                fontSize: '45px',
                lineHeight: '68px',
                fontFamily: 'Poppins',
                color: '#1E1E1E'
              }}
            >
              BLUESTOCK
            </h1>
          </Link>
        </div>

        {/* Navigation - Exact Figma positioning */}
        <nav className="flex items-center space-x-8" style={{ marginTop: '4px' }}>
          <a 
            href="#" 
            className="font-semibold hover:text-blue-600"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              fontFamily: 'Poppins',
              color: '#9A9A9A'
            }}
          >
            PRODUCTS
          </a>
          <a 
            href="#" 
            className="font-semibold hover:text-blue-600"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              fontFamily: 'Poppins',
              color: '#9A9A9A'
            }}
          >
            PRICING
          </a>
          <a 
            href="#" 
            className="font-semibold hover:text-blue-600"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              fontFamily: 'Poppins',
              color: '#9A9A9A'
            }}
          >
            COMMUNITY
          </a>
          
          {/* Media with Dropdown */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="font-semibold hover:text-blue-600"
              style={{
                fontSize: '15px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#9A9A9A'
              }}
            >
              MEDIA
            </a>
            <svg 
              className="ml-2" 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none"
            >
              <path d="M0 0L5 6L10 0H0Z" fill="#9A9A9A"/>
            </svg>
          </div>
          
          {/* Support with Dropdown */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="font-semibold hover:text-blue-600"
              style={{
                fontSize: '15px',
                lineHeight: '22px',
                fontFamily: 'Poppins',
                color: '#9A9A9A'
              }}
            >
              SUPPORT
            </a>
            <svg 
              className="ml-2" 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none"
            >
              <path d="M0 0L5 6L10 0H0Z" fill="#9A9A9A"/>
            </svg>
          </div>
        </nav>

        {/* Auth Section - Exact Figma positioning */}
        <div className="flex items-center space-x-6" style={{ marginRight: '98px' }}>
          {/* Sign In Button - Connected to /signin */}
          <Link 
            to="/signin"
            className="font-semibold hover:text-blue-600 transition-colors"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              fontFamily: 'Poppins',
              color: '#9A9A9A'
            }}
          >
            Sign In
          </Link>
          
          {/* Sign Up Button - Connected to /signup */}
          <Link 
            to="/signup"
            className="font-semibold text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              fontFamily: 'Poppins',
              background: '#3F52FF',
              width: '135px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Sign Up Now
          </Link>
          
          {/* Menu Icon */}
          <button className="p-2">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <rect x="4" y="6" width="17" height="2" fill="#000000"/>
              <rect x="4" y="11" width="17" height="2" fill="#000000"/>
              <rect x="4" y="16" width="17" height="2" fill="#000000"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

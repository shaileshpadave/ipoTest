import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H9v6H5V3H3v10zm10-6h8V5h-8v2zm0 8h8v-2h-8v2z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">BLUESTOCK</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">PRODUCTS</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">PRICING</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">COMMUNITY</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">MEDIA ⌄</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">SUPPORT ⌄</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium">Sign In</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
              Sign Up Now
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

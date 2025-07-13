import React from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

const AdminHeader = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-5 h-5">
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
              </div>
            </div>
          </button>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-orange-800">V</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-700">Hi, Vishal</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
import React from 'react';
import BluestockLogo from '../common/BluestockLogo';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <BluestockLogo size="lg" showText={true} />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-center text-sm text-gray-600 mb-8">
            {subtitle}
          </p>
        )}
      </div>

      {/* Form Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
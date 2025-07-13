import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('hello@bluestock.in');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset for:', email);
    // TODO: Connect to Django backend password reset
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout 
        title="Check your email" 
        subtitle="We've sent a password reset link to your email address"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            If an account with email <strong>{email}</strong> exists, you will receive a password reset link shortly.
          </p>
          
          <Link
            to="/signin"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            ← Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password?" 
      subtitle="Enter your email address to get the password reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Password Reset
        </button>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 text-sm">
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
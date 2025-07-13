import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline';

const IPODashboard = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch IPOs from backend
  useEffect(() => {
    fetchIPOs();
  }, []);

  const fetchIPOs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/ipo/');
      if (response.ok) {
        const data = await response.json();
        setIpos(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'ongoing': { bg: 'bg-green-100', text: 'text-green-800', label: 'Ongoing' },
      'upcoming': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Comming' },
      'listed': { bg: 'bg-pink-100', text: 'text-pink-800', label: 'New Listed' }
    };

    const config = statusConfig[status] || statusConfig['upcoming'];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Upcomming IPO | Dashboard
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <PlusIcon className="w-4 h-4" />
            <span>Register IPO</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Band
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Close
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Listing Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete/View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ipos.map((ipo, index) => (
              <tr key={ipo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {ipo.company_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ipo.price_band}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(ipo.open_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(ipo.close_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ipo.issue_size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ipo.issue_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ipo.listing_date ? formatDate(ipo.listing_date) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(ipo.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                    Update
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="text-red-600 hover:text-red-800">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <span className="text-gray-500">...</span>
            <button 
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setCurrentPage(9)}
            >
              9
            </button>
            <button 
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setCurrentPage(10)}
            >
              10
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPODashboard;
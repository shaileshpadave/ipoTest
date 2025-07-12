import React, { useState } from 'react';
import Header from '../components/common/Header';
import SearchFilter from '../components/ipo/SearchFilter';
import IPOGrid from '../components/ipo/IPOGrid';
import IPODetailModal from '../components/ipo/IPODetailModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useIPOData from '../hooks/useIPOData';

const HomePage = () => {
  const {
    ipos,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sectorFilter,
    setSectorFilter,
    clearFilters,
    statusCounts,
    totalResults
  } = useIPOData();

  const [selectedIPO, setSelectedIPO] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (ipo) => {
    setSelectedIPO(ipo);
    setIsModalOpen(true);
  };

  const handleApply = (ipo) => {
    // In real app, this would redirect to application form
    alert(`Apply functionality for ${ipo.company.name} will be implemented!`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIPO(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-blue-600 font-medium">Bluestock</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-blue-600 font-medium">IPO</span>
            <span className="mx-2">{'>'}</span>
            <span className="font-medium">UPCOMING IPO</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Upcoming IPO
            </h1>
            <p className="text-gray-600">
              Companies that have filled for an IPO with SEBI. Few details might be disclosed by the companies later.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner size="lg" text="Loading IPO data..." />
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sectorFilter={sectorFilter}
                onSectorFilterChange={setSectorFilter}
              />
            </div>

            {/* IPO Grid */}
            <IPOGrid
              ipos={ipos}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
            />

            {/* Empty State for No Results */}
            {ipos.length === 0 && (searchTerm || statusFilter || sectorFilter) && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No IPOs match your criteria</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search term or removing some filters to see more results.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* IPO Detail Modal */}
      <IPODetailModal
        ipo={selectedIPO}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HomePage;

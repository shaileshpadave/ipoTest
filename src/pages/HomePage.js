import React, { useState } from 'react';
import Header from '../components/common/Header';
import SearchFilter from '../components/ipo/SearchFilter';
import IPOGrid from '../components/ipo/IPOGrid';
import IPODetailModal from '../components/ipo/IPODetailModal';
import FAQSection from '../components/ipo/FAQSection';
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
    alert(`Apply functionality for ${ipo.company.name} will be implemented!`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIPO(null);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F6F5F5' }}>
      <Header />
      
      {/* Breadcrumb - Exact Figma positioning */}
      <div className="pt-6 pb-4" style={{ paddingLeft: '60px' }}>
        <div className="flex items-center text-xs">
          <span className="text-blue-600 font-normal">Bluestock</span>
          <span className="mx-1 text-black">{'>'}</span>
          <span className="text-blue-600 font-normal">IPO</span>
          <span className="mx-1 text-black">{'>'}</span>
          <span className="text-black font-normal">UPCOMING IPO</span>
        </div>
      </div>

      {/* Page Header - Exact Figma styling */}
      <div style={{ paddingLeft: '60px', paddingBottom: '32px' }}>
        <h1 className="text-black font-semibold mb-3" style={{ 
          fontSize: '32px', 
          lineHeight: '48px',
          fontFamily: 'Poppins'
        }}>
          Upcoming IPO
        </h1>
        <p className="text-black font-light" style={{ 
          fontSize: '14px', 
          lineHeight: '21px',
          maxWidth: '709px',
          fontFamily: 'Poppins'
        }}>
          Companies that have filled for an IPO with SEBI. Few details might be disclosed by the companies later.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ paddingLeft: '63px', paddingRight: '63px' }}>
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

            {/* IPO Grid - Exact 3-column layout */}
            <IPOGrid
              ipos={ipos}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
            />

            {/* Empty State */}
            {ipos.length === 0 && (searchTerm || statusFilter || sectorFilter) && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-black mb-2">No IPOs match your criteria</h3>
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
            )}

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer */}
            <div className="bg-white mt-16 py-16 text-center" style={{ 
              width: '1713px', 
              height: '193px',
              marginLeft: '41px'
            }}>
              <p className="text-black font-medium" style={{ 
                fontSize: '83px', 
                lineHeight: '25px',
                fontFamily: 'Poppins'
              }}>
                Add / Extend Footer
              </p>
            </div>
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

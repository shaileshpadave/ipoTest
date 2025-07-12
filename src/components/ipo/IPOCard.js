import React from 'react';

const IPOCard = ({ ipo, onViewDetails, onApply }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Issued';
    return new Date(dateString).toLocaleDateString('en-CA'); // YYYY-MM-DD format
  };

  const formatValue = (value) => {
    return value || 'Not Issued';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Company Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
          {ipo.company.logo ? (
            <img 
              src={ipo.company.logo} 
              alt={ipo.company.name}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{display: ipo.company.logo ? 'none' : 'flex'}}>
            {ipo.company.name.charAt(0)}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-blue-600 mb-1">
            {ipo.company.name}
          </h3>
        </div>
      </div>

      {/* IPO Details Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* First Row */}
        <div>
          <p className="text-sm text-gray-600 mb-1">PRICE BAND</p>
          <p className="font-semibold text-gray-900">{formatValue(ipo.priceBand)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">OPEN</p>
          <p className="font-semibold text-gray-900">{formatDate(ipo.openDate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">CLOSE</p>
          <p className="font-semibold text-gray-900">{formatDate(ipo.closeDate)}</p>
        </div>

        {/* Second Row */}
        <div>
          <p className="text-sm text-gray-600 mb-1">ISSUE SIZE</p>
          <p className="font-semibold text-gray-900">{formatValue(ipo.issueSize)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">ISSUE TYPE</p>
          <p className="font-semibold text-gray-900">{formatValue(ipo.issueType)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">LISTING DATE</p>
          <p className="font-semibold text-gray-900">{formatDate(ipo.listingDate)}</p>
        </div>
      </div>

      {/* Document Buttons */}
      <div className="flex space-x-3">
        {ipo.documents?.rhp && (
          <button 
            onClick={() => window.open(ipo.documents.rhp, '_blank')}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 font-medium text-sm"
          >
            RHP
          </button>
        )}
        {ipo.documents?.drhp && (
          <button 
            onClick={() => window.open(ipo.documents.drhp, '_blank')}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 font-medium text-sm"
          >
            DRHP
          </button>
        )}
      </div>
    </div>
  );
};

export default IPOCard;

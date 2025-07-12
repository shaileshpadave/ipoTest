import React from 'react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';

const IPODetailModal = ({ ipo, isOpen, onClose }) => {
  if (!isOpen || !ipo) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                {ipo.company.logo ? (
                  <img 
                    src={ipo.company.logo} 
                    alt={ipo.company.name}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {ipo.company.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{ipo.company.name}</h2>
                <p className="text-gray-600">{ipo.company.sector}</p>
                <div className="mt-2">
                  <StatusBadge status={ipo.status} />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IPO Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">IPO Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Price Band</span>
                  <p className="font-medium">{ipo.priceBand}</p>
                </div>
                <div>
                  <span className="text-gray-500">Issue Size</span>
                  <p className="font-medium">{ipo.issueSize}</p>
                </div>
                <div>
                  <span className="text-gray-500">Issue Type</span>
                  <p className="font-medium">{ipo.issueType}</p>
                </div>
                <div>
                  <span className="text-gray-500">Lot Size</span>
                  <p className="font-medium">{ipo.lotSize} shares</p>
                </div>
                <div>
                  <span className="text-gray-500">Exchange</span>
                  <p className="font-medium">{ipo.exchange}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Open Date</span>
                  <p className="font-medium">{formatDate(ipo.openDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Close Date</span>
                  <p className="font-medium">{formatDate(ipo.closeDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Minimum Investment</span>
                  <p className="font-medium">{ipo.minimumInvestment}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          {ipo.documents && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
              <div className="flex flex-wrap gap-3">
                {ipo.documents.rhp && (
                  <Button variant="outline" size="sm">
                    📄 Download RHP
                  </Button>
                )}
                {ipo.documents.drhp && (
                  <Button variant="outline" size="sm">
                    📄 Download DRHP
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              variant="primary" 
              className="flex-1"
              disabled={ipo.status === 'closed' || ipo.status === 'listed'}
            >
              {ipo.status === 'closed' || ipo.status === 'listed' ? 'Closed' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPODetailModal;

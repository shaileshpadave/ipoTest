import React from 'react';

const IPOStats = ({ statusCounts, totalResults }) => {
  const stats = [
    {
      label: 'Total IPOs',
      value: statusCounts.total,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Ongoing',
      value: statusCounts.ongoing || 0,
      color: 'bg-green-100 text-green-800'
    },
    {
      label: 'Upcoming',
      value: statusCounts.upcoming || 0,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Listed',
      value: statusCounts.listed || 0,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IPOStats;

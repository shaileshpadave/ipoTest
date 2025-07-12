import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Upcoming'
    },
    ongoing: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Ongoing'
    },
    closed: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: 'Closed'
    },
    listed: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Listed'
    }
  };

  const config = statusConfig[status] || statusConfig.upcoming;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;

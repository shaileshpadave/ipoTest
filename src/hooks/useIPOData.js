import { useState, useEffect, useMemo } from 'react';
import ipoData from '../data/ipoData.json';

const useIPOData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loading time for realistic UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  const filteredIPOs = useMemo(() => {
    let filtered = ipoData.ipos;

    // Search by company name
    if (searchTerm) {
      filtered = filtered.filter(ipo =>
        ipo.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(ipo => ipo.status === statusFilter);
    }

    // Filter by sector
    if (sectorFilter) {
      filtered = filtered.filter(ipo => ipo.company.sector === sectorFilter);
    }

    // Sort by status priority and date
    return filtered.sort((a, b) => {
      const statusPriority = {
        ongoing: 1,
        upcoming: 2,
        closed: 3,
        listed: 4
      };
      
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      
      return new Date(b.openDate) - new Date(a.openDate);
    });
  }, [searchTerm, statusFilter, sectorFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSectorFilter('');
  };

  const getStatusCounts = () => {
    const counts = { total: ipoData.ipos.length };
    ipoData.ipos.forEach(ipo => {
      counts[ipo.status] = (counts[ipo.status] || 0) + 1;
    });
    return counts;
  };

  return {
    ipos: filteredIPOs,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sectorFilter,
    setSectorFilter,
    clearFilters,
    statusCounts: getStatusCounts(),
    totalResults: filteredIPOs.length
  };
};

export default useIPOData;

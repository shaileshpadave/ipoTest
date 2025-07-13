import { useState, useEffect, useMemo } from 'react';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/ipo';

const useIPOData = () => {
  const [ipos, setIpos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});

  // Fetch IPO data from backend
  const fetchIPOs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${API_BASE_URL}/`;
      const params = new URLSearchParams();
      
      // Add filters to API call
      if (statusFilter) {
        params.append('status', statusFilter);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle paginated response
      const ipoList = data.results || data;
      
      // Transform backend data to match frontend structure
      const transformedIPOs = ipoList.map(transformIPOData);
      
      setIpos(transformedIPOs);
    } catch (err) {
      console.error('Error fetching IPOs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/`);
      if (response.ok) {
        const stats = await response.json();
        setStatusCounts({
          total: stats.total_ipos,
          upcoming: stats.upcoming,
          ongoing: stats.ongoing,
          listed: stats.listed,
          closed: 0 // Add if you have closed status
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Transform backend data structure to match frontend expectations
  const transformIPOData = (backendIPO) => {
    return {
      id: backendIPO.id,
      company: {
        name: backendIPO.company_name,
        logo: backendIPO.logo || '/images/default-logo.png',
        sector: backendIPO.issue_type || 'Technology' // Map to sector if available
      },
      priceBand: backendIPO.price_band,
      openDate: backendIPO.open_date,
      closeDate: backendIPO.close_date,
      listingDate: backendIPO.listing_date,
      issueSize: backendIPO.issue_size,
      issueType: backendIPO.issue_type,
      status: backendIPO.status,
      performance: {
        ipoPrice: backendIPO.ipo_price,
        listingPrice: backendIPO.listing_price,
        currentPrice: backendIPO.current_market_price,
        listingGain: backendIPO.listing_gain,
        currentReturn: backendIPO.current_return
      },
      // Add any additional fields your frontend expects
      lotSize: 100, // Default or fetch from backend if available
      minimumAmount: backendIPO.ipo_price ? backendIPO.ipo_price * 100 : null
    };
  };

  // Initial data fetch
  useEffect(() => {
    fetchIPOs();
    fetchStats();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchIPOs();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter]);

  // Client-side filtering for sector (if not handled by backend)
  const filteredIPOs = useMemo(() => {
    let filtered = ipos;

    // Filter by sector (client-side since backend might not have this)
    if (sectorFilter) {
      filtered = filtered.filter(ipo => 
        ipo.company.sector.toLowerCase().includes(sectorFilter.toLowerCase())
      );
    }

    // Sort by status priority and date
    return filtered.sort((a, b) => {
      const statusPriority = {
        ongoing: 1,
        upcoming: 2,
        listed: 3,
        closed: 4
      };
      
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      
      return new Date(b.openDate) - new Date(a.openDate);
    });
  }, [ipos, sectorFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSectorFilter('');
  };

  // Refresh data function
  const refreshData = () => {
    fetchIPOs();
    fetchStats();
  };

  return {
    ipos: filteredIPOs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sectorFilter,
    setSectorFilter,
    clearFilters,
    statusCounts,
    totalResults: filteredIPOs.length,
    refreshData
  };
};

export default useIPOData;
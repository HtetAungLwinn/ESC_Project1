
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchHotels } from '../api/hotels';
import { Hotel, SearchParams, FilterOptions } from '../types';
import ResultsLoading from '../components/ResultsLoading';
import ResultsHeader from '../components/ResultsHeader';
import FiltersSidebar from '../components/FiltersSidebar';
import HotelsList from '../components/HotelsList';

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    starRating: [],
    guestRating: [0, 10],
    priceRange: [0, 500]
  });

  const searchData: SearchParams = {
    destId: searchParams.get('destId') || '',
    checkin: searchParams.get('checkin') || '',
    checkout: searchParams.get('checkout') || '',
    guests: parseInt(searchParams.get('guests') || '2'),
    rooms: parseInt(searchParams.get('rooms') || '1')
  };

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [hotels, filters, sortBy]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const results = await searchHotels(searchData);
      setHotels(results);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = hotels.filter(hotel => {
      // Star rating filter
      if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
        return false;
      }

      // Guest rating filter
      if (hotel.guestRating < filters.guestRating[0] || hotel.guestRating > filters.guestRating[1]) {
        return false;
      }

      // Price range filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating-high':
          return b.guestRating - a.guestRating;
        case 'stars-high':
          return b.starRating - a.starRating;
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  };

  const handleViewRooms = (hotelId: string) => {
    const params = new URLSearchParams(searchParams);
    navigate(`/hotel/${hotelId}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFilters({
      starRating: [], 
      guestRating: [0, 10], 
      priceRange: [0, 500]
    });
  };

  if (loading) {
    return <ResultsLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ResultsHeader
          hotelCount={filteredHotels.length}
          searchData={searchData}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex gap-6">
          {showFilters && (
            <FiltersSidebar
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}

          <div className="flex-1">
            <HotelsList
              hotels={filteredHotels}
              onViewRooms={handleViewRooms}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

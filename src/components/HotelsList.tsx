
import React from 'react';
import { Button } from '@/components/ui/button';
import HotelCard from './HotelCard';
import { Hotel } from '../types';

interface HotelsListProps {
  hotels: Hotel[];
  onViewRooms: (hotelId: string) => void;
  onClearFilters: () => void;
}

const HotelsList = ({ hotels, onViewRooms, onClearFilters }: HotelsListProps) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hotels match your filters</p>
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="mt-4"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hotels.map(hotel => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onViewRooms={onViewRooms}
        />
      ))}
    </div>
  );
};

export default HotelsList;

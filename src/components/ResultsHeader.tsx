
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchParams } from '../types';

interface ResultsHeaderProps {
  hotelCount: number;
  searchData: SearchParams;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ResultsHeader = ({
  hotelCount,
  searchData,
  showFilters,
  onToggleFilters,
  sortBy,
  onSortChange
}: ResultsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {hotelCount} hotels found
        </h1>
        <p className="text-gray-600">
          {searchData.checkin} - {searchData.checkout} • {searchData.guests} guests • {searchData.rooms} rooms
        </p>
      </div>

      <div className="flex gap-4 mt-4 md:mt-0">
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating-high">Guest Rating</SelectItem>
            <SelectItem value="stars-high">Star Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ResultsHeader;

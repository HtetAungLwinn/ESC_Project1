
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FilterOptions } from '../types';

interface FiltersSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FiltersSidebar = ({ filters, onFiltersChange }: FiltersSidebarProps) => {
  const handleStarRatingChange = (rating: number, checked: boolean) => {
    onFiltersChange({
      ...filters,
      starRating: checked 
        ? [...filters.starRating, rating]
        : filters.starRating.filter(r => r !== rating)
    });
  };

  return (
    <div className="w-80">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          {/* Star Rating */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Star Rating</Label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`star-${rating}`}
                    checked={filters.starRating.includes(rating)}
                    onCheckedChange={(checked) => 
                      handleStarRatingChange(rating, checked as boolean)
                    }
                  />
                  <label htmlFor={`star-${rating}`} className="flex items-center cursor-pointer">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Rating */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Guest Rating: {filters.guestRating[0]} - {filters.guestRating[1]}
            </Label>
            <Slider
              value={filters.guestRating}
              onValueChange={(value) => onFiltersChange({...filters, guestRating: value as [number, number]})}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({...filters, priceRange: value as [number, number]})}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiltersSidebar;

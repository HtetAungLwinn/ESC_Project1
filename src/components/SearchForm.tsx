
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { searchDestinations } from '../api/destinations';
import { Destination } from '../types';

const SearchForm = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkin, setCheckin] = useState<Date>();
  const [checkout, setCheckout] = useState<Date>();
  const [guests, setGuests] = useState('2');
  const [rooms, setRooms] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const suggestionRefs = useRef<HTMLDivElement[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  useEffect(() => {
    if (destination.length > 1) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchDestinations(destination);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error searching destinations:', error);
        }
      }, 200);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [destination]);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    setDestinationId('');
    setActiveSuggestion(-1);
  };

  const selectDestination = (dest: Destination) => {
    setDestination(dest.name);
    setDestinationId(dest.id);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          selectDestination(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const isFormValid = () => {
    return destinationId && checkin && checkout && guests && rooms;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const params = new URLSearchParams({
      destId: destinationId,
      checkin: format(checkin!, 'yyyy-MM-dd'),
      checkout: format(checkout!, 'yyyy-MM-dd'),
      guests: guests,
      rooms: rooms
    });

    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="lg:col-span-2 relative">
            <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="destination"
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Where are you going?"
                className="pl-10"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.id}
                      ref={el => suggestionRefs.current[index] = el!}
                      className={cn(
                        "px-4 py-3 cursor-pointer hover:bg-gray-50",
                        index === activeSuggestion && "bg-blue-50"
                      )}
                      onClick={() => selectDestination(suggestion)}
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-500">{suggestion.country}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Check-in */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkin && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkin ? format(checkin, "MMM d") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkin}
                  onSelect={setCheckin}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkout && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkout ? format(checkout, "MMM d") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkout}
                  onSelect={setCheckout}
                  disabled={(date) => !checkin || date <= checkin}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests & Rooms */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Rooms</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            disabled={!isFormValid() || isLoading}
            className="px-8 py-2 bg-blue-600 hover:bg-blue-700"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Hotels
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;

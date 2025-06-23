
import React from 'react';
import { Star, MapPin, Wifi, Car, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onViewRooms: (hotelId: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewRooms }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Hotel Image */}
          <div className="md:w-1/3">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          {/* Hotel Info */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">${hotel.price}</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {hotel.address}
            </div>

            <div className="flex items-center mb-3">
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                <Star className="h-3 w-3 mr-1" />
                {hotel.guestRating}/10
              </div>
              <span className="ml-2 text-sm text-gray-600">Guest Rating</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                  {amenity === 'Pool' && <Coffee className="h-3 w-3 mr-1" />}
                  {amenity}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Starting from ${hotel.price} per night
              </div>
              <Button 
                onClick={() => onViewRooms(hotel.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Rooms
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;

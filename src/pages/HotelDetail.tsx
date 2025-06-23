
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getHotelDetails, getAvailableRooms } from '../api/hotels';
import { Hotel, Room, SearchParams } from '../types';

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const searchData: SearchParams = {
    destId: searchParams.get('destId') || '',
    checkin: searchParams.get('checkin') || '',
    checkout: searchParams.get('checkout') || '',
    guests: parseInt(searchParams.get('guests') || '2'),
    rooms: parseInt(searchParams.get('rooms') || '1')
  };

  useEffect(() => {
    if (id) {
      loadHotelData();
    }
  }, [id]);

  const loadHotelData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const [hotelData, roomsData] = await Promise.all([
        getHotelDetails(id),
        getAvailableRooms(id, searchData)
      ]);
      
      setHotel(hotelData);
      setRooms(roomsData);
    } catch (error) {
      console.error('Error loading hotel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (roomId: string) => {
    // In a real app, this would navigate to booking flow
    alert(`Booking room ${roomId}. This would navigate to the booking flow.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        {/* Hotel Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-video w-full">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center mb-2">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hotel.address}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-lg mb-2">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="font-bold">{hotel.guestRating}/10</span>
                </div>
                <div className="text-sm text-gray-500">Guest Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary">
                  {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                  {amenity === 'Pool' && <Coffee className="h-3 w-3 mr-1" />}
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Search Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Your Search</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Check-in:</span>
                <div className="font-medium">{searchData.checkin}</div>
              </div>
              <div>
                <span className="text-gray-500">Check-out:</span>
                <div className="font-medium">{searchData.checkout}</div>
              </div>
              <div>
                <span className="text-gray-500">Guests:</span>
                <div className="font-medium">{searchData.guests}</div>
              </div>
              <div>
                <span className="text-gray-500">Rooms:</span>
                <div className="font-medium">{searchData.rooms}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rooms */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          
          {rooms.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 text-lg">No rooms available for your selected dates</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {rooms.map(room => (
                <Card key={room.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                        <p className="text-gray-600 mb-3">{room.bedConfiguration}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-sm text-gray-500">
                          Maximum {room.maxGuests} guests
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          ${room.rate}
                        </div>
                        <div className="text-sm text-gray-500 mb-1">per night</div>
                        <div className="text-lg font-semibold text-gray-900 mb-4">
                          Total: ${room.totalCost}
                        </div>
                        
                        <Button 
                          onClick={() => handleBookRoom(room.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;

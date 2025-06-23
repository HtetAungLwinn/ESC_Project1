
import { Hotel, Room, SearchParams } from '../types';

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Palace Hotel',
    price: 250,
    rating: 4.8,
    guestRating: 9.2,
    coords: { lat: 48.8566, lng: 2.3522 },
    address: '123 Rue de Rivoli, Paris',
    starRating: 5,
    image: '/placeholder.svg',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
  },
  {
    id: '2',
    name: 'Boutique City Hotel',
    price: 180,
    rating: 4.5,
    guestRating: 8.7,
    coords: { lat: 48.8606, lng: 2.3376 },
    address: '45 Boulevard Saint-Germain, Paris',
    starRating: 4,
    image: '/placeholder.svg',
    amenities: ['WiFi', 'Restaurant', 'Bar']
  },
  {
    id: '3',
    name: 'Economy Plus Inn',
    price: 120,
    rating: 4.2,
    guestRating: 8.1,
    coords: { lat: 48.8738, lng: 2.3501 },
    address: '78 Rue de la République, Paris',
    starRating: 3,
    image: '/placeholder.svg',
    amenities: ['WiFi', 'Breakfast']
  }
];

const mockRooms: Record<string, Room[]> = {
  '1': [
    {
      id: 'r1',
      type: 'Deluxe Room',
      bedConfiguration: '1 King Bed',
      rate: 250,
      totalCost: 500,
      maxGuests: 2,
      amenities: ['City View', 'Mini Bar', 'WiFi']
    },
    {
      id: 'r2',
      type: 'Suite',
      bedConfiguration: '1 King Bed + Sofa',
      rate: 350,
      totalCost: 700,
      maxGuests: 4,
      amenities: ['City View', 'Mini Bar', 'WiFi', 'Living Area']
    }
  ],
  '2': [
    {
      id: 'r3',
      type: 'Standard Room',
      bedConfiguration: '1 Queen Bed',
      rate: 180,
      totalCost: 360,
      maxGuests: 2,
      amenities: ['WiFi', 'Air Conditioning']
    }
  ],
  '3': [
    {
      id: 'r4',
      type: 'Economy Room',
      bedConfiguration: '2 Twin Beds',
      rate: 120,
      totalCost: 240,
      maxGuests: 2,
      amenities: ['WiFi']
    }
  ]
};

export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, return all hotels
  // In real app, this would filter by destination and dates
  return mockHotels;
};

export const getHotelDetails = async (hotelId: string): Promise<Hotel | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockHotels.find(hotel => hotel.id === hotelId) || null;
};

export const getAvailableRooms = async (hotelId: string, params: SearchParams): Promise<Room[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRooms[hotelId] || [];
};

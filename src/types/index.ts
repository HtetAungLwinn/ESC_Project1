
export interface Destination {
  id: string;
  name: string;
  country: string;
}

export interface Hotel {
  id: string;
  name: string;
  price: number;
  rating: number;
  guestRating: number;
  coords: {
    lat: number;
    lng: number;
  };
  address: string;
  starRating: number;
  image: string;
  amenities: string[];
}

export interface Room {
  id: string;
  type: string;
  bedConfiguration: string;
  rate: number;
  totalCost: number;
  maxGuests: number;
  amenities: string[];
}

export interface SearchParams {
  destId: string;
  checkin: string;
  checkout: string;
  guests: number;
  rooms: number;
}

export interface FilterOptions {
  starRating: number[];
  guestRating: number[];
  priceRange: [number, number];
}

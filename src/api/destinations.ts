
import { Destination } from '../types';

const mockDestinations: Destination[] = [
  { id: '1', name: 'Paris', country: 'France' },
  { id: '2', name: 'London', country: 'United Kingdom' },
  { id: '3', name: 'New York', country: 'United States' },
  { id: '4', name: 'Tokyo', country: 'Japan' },
  { id: '5', name: 'Rome', country: 'Italy' },
  { id: '6', name: 'Barcelona', country: 'Spain' },
  { id: '7', name: 'Amsterdam', country: 'Netherlands' },
  { id: '8', name: 'Dubai', country: 'UAE' },
  { id: '9', name: 'Sydney', country: 'Australia' },
  { id: '10', name: 'Bangkok', country: 'Thailand' },
];

export const searchDestinations = async (query: string): Promise<Destination[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!query) return [];
  
  return mockDestinations.filter(dest => 
    dest.name.toLowerCase().includes(query.toLowerCase()) ||
    dest.country.toLowerCase().includes(query.toLowerCase())
  );
};

export const getAllDestinations = async (): Promise<Destination[]> => {
  return mockDestinations;
};

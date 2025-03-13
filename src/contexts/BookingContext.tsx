
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define booking types
export interface Booking {
  id: string;
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  serviceName: string;
  serviceDate: string;
  eventType: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Booking;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  getBookingsByUserId: (userId: string) => Booking[];
  getBookingsByVendorId: (vendorId: string) => Booking[];
  getBookingById: (id: string) => Booking | undefined;
  refreshBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock bookings for demo
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'booking1',
    userId: 'user1',
    userName: 'Demo Client',
    vendorId: 'vendor1',
    vendorName: 'Elegant Moments Photography',
    serviceName: 'Premium Wedding Photography',
    eventType: 'Wedding',
    serviceDate: '2023-10-15',
    amount: 2500,
    status: 'confirmed',
    paymentStatus: 'paid',
    notes: 'Looking forward to capturing your special day!',
    createdAt: '2023-08-20T14:30:00.000Z',
    updatedAt: '2023-08-20T14:30:00.000Z'
  },
  {
    id: 'booking2',
    userId: 'user1',
    userName: 'Demo Client',
    vendorId: 'vendor2',
    vendorName: 'Royal Garden Venue',
    serviceName: 'Full Day Venue Rental',
    eventType: 'Wedding',
    serviceDate: '2023-10-15',
    amount: 8000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2023-08-18T10:15:00.000Z',
    updatedAt: '2023-08-18T10:15:00.000Z'
  },
  {
    id: 'booking3',
    userId: 'user2',
    userName: 'Jane Smith',
    vendorId: 'vendor1',
    vendorName: 'Elegant Moments Photography',
    serviceName: 'Engagement Photoshoot',
    eventType: 'Engagement',
    serviceDate: '2023-09-10',
    amount: 900,
    status: 'completed',
    paymentStatus: 'paid',
    notes: 'Beautiful photos delivered on time!',
    createdAt: '2023-07-25T09:45:00.000Z',
    updatedAt: '2023-09-11T16:20:00.000Z'
  }
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  // Function to load bookings from localStorage
  const loadBookings = () => {
    try {
      const storedBookings = localStorage.getItem('wedding_app_bookings');
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);
        console.log('Loading bookings from localStorage:', parsedBookings);
        setBookings(parsedBookings);
        return;
      }
    } catch (e) {
      console.error('Error parsing stored bookings:', e);
    }
    
    // If no bookings in localStorage or error parsing, use initial bookings
    console.log('Using initial bookings data');
    setBookings(INITIAL_BOOKINGS);
    localStorage.setItem('wedding_app_bookings', JSON.stringify(INITIAL_BOOKINGS));
  };

  // Function to explicitly refresh bookings from localStorage
  const refreshBookings = () => {
    console.log('Manually refreshing bookings from localStorage');
    loadBookings();
  };

  // Load initial bookings
  useEffect(() => {
    console.log('BookingProvider mounted, loading initial bookings');
    loadBookings();
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      console.log('Saving updated bookings to localStorage:', bookings);
      localStorage.setItem('wedding_app_bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  // Add a new booking
  const addBooking = (newBooking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking => {
    const now = new Date().toISOString();
    const bookingWithId: Booking = {
      ...newBooking,
      id: `booking${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    
    setBookings(prev => {
      const updatedBookings = [...prev, bookingWithId];
      console.log('Added new booking:', bookingWithId);
      console.log('Updated bookings state:', updatedBookings);
      return updatedBookings;
    });
    
    toast({
      title: "Booking Created",
      description: `Booking for ${newBooking.serviceName} has been created.`,
    });
    
    return bookingWithId;
  };

  // Update an existing booking
  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => {
      const updatedBookings = prev.map(booking => 
        booking.id === id 
          ? { 
              ...booking, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : booking
      );
      console.log(`Updated booking ${id}:`, updates);
      console.log('Updated bookings state:', updatedBookings);
      return updatedBookings;
    });
    
    toast({
      title: "Booking Updated",
      description: `Booking #${id} has been updated.`,
    });
  };

  // Get bookings by user ID
  const getBookingsByUserId = (userId: string) => {
    console.log(`Fetching bookings for user ${userId} from total ${bookings.length} bookings`);
    const filtered = bookings.filter(booking => booking.userId === userId);
    console.log(`Found ${filtered.length} bookings for user ${userId}:`, filtered);
    return filtered;
  };

  // Get bookings by vendor ID
  const getBookingsByVendorId = (vendorId: string) => {
    console.log(`Fetching bookings for vendor ${vendorId} from total ${bookings.length} bookings`);
    
    // First try exact match
    const exactMatches = bookings.filter(booking => booking.vendorId === vendorId);
    
    if (exactMatches.length > 0) {
      console.log(`Found ${exactMatches.length} bookings for vendor ${vendorId} with exact match:`, exactMatches);
      return exactMatches;
    }
    
    // If no exact matches, check for numeric/string mismatches
    console.log(`No exact matches for vendor ${vendorId}, checking numeric/string variations`);
    
    // If vendorId has a prefix (like "vendor1"), also check for the numeric part
    if (typeof vendorId === 'string' && vendorId.startsWith('vendor')) {
      const numericId = vendorId.replace('vendor', '');
      const numericMatches = bookings.filter(booking => booking.vendorId === numericId);
      
      if (numericMatches.length > 0) {
        console.log(`Found ${numericMatches.length} bookings using numeric ID ${numericId}:`, numericMatches);
        return numericMatches;
      }
    }
    
    // If vendorId is numeric or just a string, also check with "vendor" prefix
    const prefixedId = `vendor${vendorId}`;
    const prefixedMatches = bookings.filter(booking => booking.vendorId === prefixedId);
    
    if (prefixedMatches.length > 0) {
      console.log(`Found ${prefixedMatches.length} bookings using prefixed ID ${prefixedId}:`, prefixedMatches);
      return prefixedMatches;
    }
    
    // Log all bookings if nothing was found to help with debugging
    console.log('No bookings found with any ID variation. All bookings:', bookings);
    
    // Return empty array if no matches
    return [];
  };

  // Get a booking by ID
  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      updateBooking, 
      getBookingsByUserId, 
      getBookingsByVendorId, 
      getBookingById,
      refreshBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

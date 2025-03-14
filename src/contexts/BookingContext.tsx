
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
        
        // Ensure all vendorIds follow consistent format (always prepend "vendor" if not already)
        const normalizedBookings = parsedBookings.map((booking: Booking) => {
          if (!booking.vendorId.startsWith('vendor')) {
            console.log(`Normalizing vendorId from ${booking.vendorId} to vendor${booking.vendorId}`);
            return {
              ...booking,
              vendorId: `vendor${booking.vendorId}`
            };
          }
          return booking;
        });
        
        setBookings(normalizedBookings);
        // Also update localStorage with normalized bookings
        localStorage.setItem('wedding_app_bookings', JSON.stringify(normalizedBookings));
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
    localStorage.removeItem('wedding_app_bookings');
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
    
    // Ensure vendorId follows consistent format (always prepend "vendor" if not already)
    let vendorId = newBooking.vendorId;
    if (!vendorId.startsWith('vendor')) {
      vendorId = `vendor${vendorId}`;
      console.log(`Normalized vendorId in new booking from ${newBooking.vendorId} to ${vendorId}`);
    }
    
    const bookingWithId: Booking = {
      ...newBooking,
      vendorId,
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

  // Get bookings by vendor ID - now with standardized format checking
  const getBookingsByVendorId = (vendorId: string) => {
    // Ensure vendorId follows consistent format for lookup
    let lookupId = vendorId;
    if (!lookupId.startsWith('vendor')) {
      lookupId = `vendor${lookupId}`;
    }
    
    console.log(`Fetching bookings for vendor ${vendorId} (normalized: ${lookupId}) from total ${bookings.length} bookings`);
    
    const filtered = bookings.filter(booking => booking.vendorId === lookupId);
    console.log(`Found ${filtered.length} bookings for vendor ${lookupId}:`, filtered);
    
    if (filtered.length === 0) {
      // Log all bookings if nothing was found to help with debugging
      console.log('No bookings found. All bookings:', bookings);
    }
    
    return filtered;
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

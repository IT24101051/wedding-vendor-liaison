
/**
 * Service to interact with the Java backend for vendor booking operations
 */
import { Booking } from '@/contexts/BookingContext';

// Define the API URL
const API_BASE_URL = '/api/vendor';

export const JavaBackendService = {
  /**
   * Get all bookings for a vendor
   */
  getVendorBookings: async (vendorId: string): Promise<Booking[]> => {
    try {
      console.log(`Fetching bookings for vendor ${vendorId} from Java backend`);
      
      // Normalize vendor ID if needed
      const normalizedVendorId = vendorId.startsWith('vendor') ? vendorId : `vendor${vendorId}`;
      
      const response = await fetch(`${API_BASE_URL}/bookings/${normalizedVendorId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching vendor bookings: ${response.statusText}`);
      }
      
      const bookings = await response.json();
      
      console.log(`Received ${bookings.length} bookings from Java backend for vendor ${normalizedVendorId}`);
      return bookings;
    } catch (error) {
      console.error('Error in JavaBackendService.getVendorBookings:', error);
      throw error;
    }
  },
  
  /**
   * Create a new booking
   */
  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> => {
    try {
      console.log(`Creating booking via Java backend:`, booking);
      
      // Normalize vendor ID if needed
      const normalizedBooking = {
        ...booking,
        vendorId: booking.vendorId.startsWith('vendor') ? booking.vendorId : `vendor${booking.vendorId}`
      };
      
      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(normalizedBooking)
      });
      
      if (!response.ok) {
        throw new Error(`Error creating booking: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // The Java backend returns a success response with the booking ID
      // We need to construct a full booking object to return
      const now = new Date().toISOString();
      const createdBooking: Booking = {
        ...normalizedBooking,
        id: result.id,
        createdAt: now,
        updatedAt: now
      };
      
      console.log(`Booking created successfully with ID: ${result.id}`);
      return createdBooking;
    } catch (error) {
      console.error('Error in JavaBackendService.createBooking:', error);
      throw error;
    }
  },
  
  /**
   * Update an existing booking
   */
  updateBooking: async (id: string, updates: Partial<Booking>): Promise<void> => {
    try {
      console.log(`Updating booking ${id} via Java backend:`, updates);
      
      // Normalize vendor ID if needed
      const normalizedUpdates = updates.vendorId && !updates.vendorId.startsWith('vendor')
        ? { ...updates, vendorId: `vendor${updates.vendorId}` }
        : updates;
      
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(normalizedUpdates)
      });
      
      if (!response.ok) {
        throw new Error(`Error updating booking: ${response.statusText}`);
      }
      
      console.log(`Booking ${id} updated successfully`);
    } catch (error) {
      console.error('Error in JavaBackendService.updateBooking:', error);
      throw error;
    }
  }
};

export default JavaBackendService;

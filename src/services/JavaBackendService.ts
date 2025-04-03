
import { toast } from '@/components/ui/use-toast';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  serviceName: string;
  eventType: string;
  serviceDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  minPrice: number;
  maxPrice: number;
  priceDisplay: string;
  location: string;
  description: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
}

// Base URL for API calls
const API_BASE_URL = '/api';

/**
 * Service to interact with Java backend APIs
 */
class JavaBackendService {
  // Authentication methods
  async login(email: string, password: string, userType: 'user' | 'vendor' | 'admin') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async register(userData: any, userType: 'user' | 'vendor') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getVendorBookings(vendorId: string): Promise<Booking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/vendor/${vendorId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendor bookings');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching bookings for vendor ${vendorId}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load vendor bookings',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user bookings');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching bookings for user ${userId}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load your bookings',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch booking');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching booking ${bookingId}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load booking details',
        variant: 'destructive',
      });
      return null;
    }
  }

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Booking Failed',
        description: error instanceof Error ? error.message : 'Failed to create booking',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async updateBooking(bookingId: string, bookingData: Partial<Booking>): Promise<Booking> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update booking');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error updating booking ${bookingId}:`, error);
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update booking',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async deleteBooking(bookingId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete booking');
      }
      
      toast({
        title: 'Success',
        description: 'Booking has been deleted',
      });
      
      return true;
    } catch (error) {
      console.error(`Error deleting booking ${bookingId}:`, error);
      toast({
        title: 'Deletion Failed',
        description: error instanceof Error ? error.message : 'Failed to delete booking',
        variant: 'destructive',
      });
      return false;
    }
  }

  // Vendor methods - new methods to interact with our LinkedList implementation
  async getAllVendors(): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching all vendors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vendors',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getVendorById(vendorId: string): Promise<Vendor | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendor');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching vendor ${vendorId}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load vendor details',
        variant: 'destructive',
      });
      return null;
    }
  }

  async getVendorsSortedByPrice(ascending: boolean = true): Promise<Vendor[]> {
    try {
      const sortParam = ascending ? 'priceAsc' : 'priceDesc';
      const response = await fetch(`${API_BASE_URL}/vendors?sortBy=${sortParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sorted vendors');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching sorted vendors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load sorted vendors',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getVendorsByCategory(category: string): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors?category=${category}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendors by category');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching vendors by category ${category}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load vendors by category',
        variant: 'destructive',
      });
      return [];
    }
  }

  async getVendorsByLocation(location: string): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors?location=${location}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendors by location');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching vendors by location ${location}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load vendors by location',
        variant: 'destructive',
      });
      return [];
    }
  }

  async searchVendors(query: string): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors?search=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search vendors');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error searching vendors with query ${query}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to search vendors',
        variant: 'destructive',
      });
      return [];
    }
  }

  async createVendor(vendorData: Omit<Vendor, 'id'>): Promise<Vendor> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create vendor');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast({
        title: 'Vendor Creation Failed',
        description: error instanceof Error ? error.message : 'Failed to create vendor',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async updateVendor(vendorId: string, vendorData: Partial<Vendor>): Promise<Vendor> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update vendor');
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error updating vendor ${vendorId}:`, error);
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update vendor',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async deleteVendor(vendorId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete vendor');
      }
      
      toast({
        title: 'Success',
        description: 'Vendor has been deleted',
      });
      
      return true;
    } catch (error) {
      console.error(`Error deleting vendor ${vendorId}:`, error);
      toast({
        title: 'Deletion Failed',
        description: error instanceof Error ? error.message : 'Failed to delete vendor',
        variant: 'destructive',
      });
      return false;
    }
  }
}

export default new JavaBackendService();

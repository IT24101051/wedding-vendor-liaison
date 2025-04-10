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

// Mock data to use when API calls fail (for development/demo purposes)
const mockVendors = [
  {
    id: "vendor1",
    name: "Elegant Moments Photography",
    category: "Photographer",
    rating: 4.9,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    minPrice: 1200,
    maxPrice: 3000,
    priceDisplay: "$1,200 - $3,000",
    location: "New York, NY",
    description: "Specializing in candid wedding photography that captures the emotions of your special day.",
    services: []
  },
  {
    id: "vendor2",
    name: "Royal Garden Venue",
    category: "Venue",
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    minPrice: 5000,
    maxPrice: 15000,
    priceDisplay: "$5,000 - $15,000",
    location: "Chicago, IL",
    description: "A stunning garden venue with both indoor and outdoor spaces for your dream wedding.",
    services: []
  },
  {
    id: "vendor3",
    name: "Divine Cuisine Catering",
    category: "Caterer",
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    minPrice: 45,
    maxPrice: 120,
    priceDisplay: "$45 - $120",
    location: "Los Angeles, CA",
    description: "Gourmet catering services with customizable menus to suit any taste and dietary requirement.",
    services: []
  },
  {
    id: "vendor4",
    name: "Blooming Beauty Florals",
    category: "Florist",
    rating: 4.9,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1561128290-006dc4827214?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    minPrice: 800,
    maxPrice: 2500,
    priceDisplay: "$800 - $2,500",
    location: "Miami, FL",
    description: "Creating breathtaking floral arrangements that bring your wedding vision to life.",
    services: []
  }
];

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

  // Vendor methods - updated with better error handling and mock data fallback
  async getAllVendors(): Promise<Vendor[]> {
    try {
      console.log("Fetching all vendors from backend");
      const response = await fetch(`${API_BASE_URL}/vendors`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch vendors: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Failed to fetch vendors: ${response.status} ${response.statusText}`);
      }
      
      // Check if response is JSON by looking at content-type header
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON, received content type:', contentType);
        console.log('Falling back to mock data due to invalid response format');
        return mockVendors;
      }
      
      const data = await response.json();
      console.log(`Successfully fetched ${data.length} vendors`);
      return data;
    } catch (error) {
      console.error('Error fetching all vendors:', error);
      
      // For development/demo purposes, return mock data when the API fails
      console.log('Falling back to mock vendor data due to API error');
      
      toast({
        title: "Vendor Data Notice",
        description: "Using sample vendor data. The backend server may not be available.",
        variant: "default",
      });
      
      return mockVendors;
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
      
      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON, received content type:', contentType);
        console.log('Falling back to mock data due to invalid response format');
        
        // Sort mock data locally
        return [...mockVendors].sort((a, b) => 
          ascending ? a.minPrice - b.minPrice : b.minPrice - a.minPrice
        );
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching sorted vendors:', error);
      toast({
        title: "Data Notice",
        description: "Using sample vendor data for sorting. The backend server may not be available.",
        variant: "default",
      });
      
      // Sort mock data locally
      return [...mockVendors].sort((a, b) => 
        ascending ? a.minPrice - b.minPrice : b.minPrice - a.minPrice
      );
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

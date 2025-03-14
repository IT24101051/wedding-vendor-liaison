import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import VendorLayout from '@/components/layouts/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, RefreshCw, DollarSign, FileEdit, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import JavaBackendService from '@/services/JavaBackendService';
import { Booking } from '@/contexts/BookingContext';

const VendorBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  const loadBookings = async () => {
    if (!user || !user.id) {
      console.error("Cannot load bookings: user not logged in or missing ID");
      setIsLoading(false);
      return;
    }
    
    try {
      console.log(`Loading bookings for vendor ID: ${user.id}`);
      const vendorBookings = await JavaBackendService.getVendorBookings(user.id);
      
      console.log(`Loaded ${vendorBookings.length} bookings from Java backend:`, vendorBookings);
      setBookings(vendorBookings);
      applyFilter(vendorBookings, filter);
      
      toast({
        title: "Bookings Updated",
        description: `${vendorBookings.length} bookings loaded from the server`,
      });
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load bookings. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  useEffect(() => {
    loadBookings();
  }, [user]);
  
  const applyFilter = (bookingsList: Booking[], filterValue: string) => {
    if (filterValue === 'all') {
      setFilteredBookings(bookingsList);
      return;
    }
    
    const filtered = bookingsList.filter(booking => booking.status === filterValue);
    setFilteredBookings(filtered);
  };
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
    applyFilter(bookings, value);
  };
  
  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      await JavaBackendService.updateBooking(bookingId, { status: newStatus });
      
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      
      setBookings(updatedBookings);
      applyFilter(updatedBookings, filter);
      
      toast({
        title: "Status Updated",
        description: `Booking status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update booking status. Please try again.",
      });
    }
  };
  
  const handleForceRefresh = () => {
    setIsRefreshing(true);
    loadBookings();
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="mr-1 h-3 w-3" /> Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600"><XCircle className="mr-1 h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>;
    }
  };
  
  return (
    <VendorLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
            <p className="text-gray-600">View and manage all your client bookings</p>
          </div>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Select value={filter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={handleForceRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Force Refresh Bookings'}
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-b-2 border-wedding-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <CalendarClock className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
            <p className="mt-2 text-gray-500">
              {filter === 'all' 
                ? "You don't have any bookings yet." 
                : `You don't have any ${filter} bookings.`}
            </p>
            <Button 
              className="mt-4 bg-wedding-gold text-white hover:bg-wedding-gold/90"
              onClick={handleForceRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Bookings
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="bg-wedding-navy/5">
                  <div className="flex justify-between">
                    <CardTitle className="text-wedding-navy">{booking.serviceName}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>{booking.userName}</div>
                    <div>{booking.eventType}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <CalendarClock className="mr-2 h-5 w-5 text-wedding-gold" />
                        <span>{format(new Date(booking.serviceDate), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center font-semibold">
                        <DollarSign className="mr-1 h-5 w-5 text-green-600" />
                        <span>${booking.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="bg-gray-50 p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Client Notes:</p>
                        <p className="text-gray-600">{booking.notes}</p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 mb-3">Update Booking Status:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant={booking.status === 'pending' ? 'default' : 'outline'}
                          className={booking.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                          onClick={() => handleStatusChange(booking.id, 'pending')}
                          disabled={booking.status === 'pending'}
                        >
                          Pending
                        </Button>
                        <Button
                          size="sm"
                          variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                          className={booking.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600' : ''}
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          disabled={booking.status === 'confirmed'}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant={booking.status === 'completed' ? 'default' : 'outline'}
                          className={booking.status === 'completed' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          disabled={booking.status === 'completed'}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant={booking.status === 'cancelled' ? 'default' : 'outline'}
                          className={booking.status === 'cancelled' ? 'bg-red-500 hover:bg-red-600' : ''}
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          disabled={booking.status === 'cancelled'}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </VendorLayout>
  );
};

export default VendorBookings;

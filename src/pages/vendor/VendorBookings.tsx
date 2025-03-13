
import React, { useState, useEffect } from 'react';
import VendorLayout from '@/components/layouts/VendorLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useBookings, Booking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const VendorBookings = () => {
  const { bookings, updateBooking, getBookingsByVendorId, refreshBookings } = useBookings();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [vendorBookings, setVendorBookings] = useState<Booking[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to load vendor bookings
  const loadVendorBookings = () => {
    if (user && user.id) {
      const filteredBookings = getBookingsByVendorId(user.id);
      console.log("Vendor bookings loaded:", filteredBookings);
      setVendorBookings(filteredBookings);
    }
  };

  // Manual refresh function
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Manually refreshing bookings...");
    
    // First refresh bookings from localStorage
    refreshBookings();
    
    // Short timeout to ensure the refresh has time to complete
    setTimeout(() => {
      loadVendorBookings();
      setIsRefreshing(false);
      toast({
        title: "Bookings Refreshed",
        description: "Latest booking data has been loaded",
      });
    }, 500);
  };

  useEffect(() => {
    // On initial load, refresh from localStorage first
    console.log("VendorBookings mounted, refreshing bookings...");
    refreshBookings();
    loadVendorBookings();
  }, [user]);

  // When bookings state changes in context
  useEffect(() => {
    console.log("Bookings context updated, reloading vendor bookings...");
    loadVendorBookings();
  }, [bookings, user]);

  const getFilteredBookings = () => {
    if (activeTab === 'all') {
      return vendorBookings;
    }
    return vendorBookings.filter(booking => booking.status === activeTab);
  };

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status: newStatus });
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-wedding-navy">{booking.userName}</h3>
              <Badge 
                className={
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm font-medium mt-2">{booking.serviceName}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-wedding-navy" />
                {formatDate(booking.serviceDate)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-wedding-navy" />
                {booking.eventType || "Wedding"}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-wedding-navy" />
                Location details
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  {booking.userName}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  Contact Phone
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  Contact Email
                </div>
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-1">Notes:</h4>
                <p className="text-sm text-gray-600">{booking.notes}</p>
              </div>
            )}
          </div>
          
          {booking.status === 'pending' && (
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleStatusChange(booking.id, 'confirmed')}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Accept
              </Button>
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleStatusChange(booking.id, 'cancelled')}
              >
                <XCircle className="h-4 w-4 mr-2" /> Decline
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <VendorLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-wedding-navy">Manage Your Bookings</h1>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="border-wedding-navy text-wedding-navy"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Bookings'}
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {getFilteredBookings().length > 0 ? (
              getFilteredBookings().map(booking => renderBookingCard(booking))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No bookings found. When customers book your services, they will appear here.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            {getFilteredBookings().length > 0 ? (
              getFilteredBookings().map(booking => renderBookingCard(booking))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No pending bookings found.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="mt-0">
            {getFilteredBookings().length > 0 ? (
              getFilteredBookings().map(booking => renderBookingCard(booking))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No confirmed bookings found.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            {getFilteredBookings().length > 0 ? (
              getFilteredBookings().map(booking => renderBookingCard(booking))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No completed bookings found.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorBookings;

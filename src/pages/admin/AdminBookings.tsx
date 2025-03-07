
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, FileEdit, CheckCircle, XCircle } from 'lucide-react';
import { useBookings, Booking } from '@/contexts/BookingContext';
import { useToast } from '@/hooks/use-toast';

const AdminBookings = () => {
  const { bookings, updateBooking } = useBookings();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Filter bookings based on search term and active tab
  useEffect(() => {
    let filtered = [...bookings];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(booking => booking.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.userName.toLowerCase().includes(term) ||
        booking.vendorName.toLowerCase().includes(term) ||
        booking.serviceName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term)
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    setFilteredBookings(filtered);
  }, [bookings, searchTerm, activeTab]);

  // Handle updating booking status
  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    updateBooking(bookingId, { status: newStatus });
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  // Get status badge color
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get payment status badge color
  const getPaymentBadge = (status: Booking['paymentStatus']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Paid</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-2xl">Booking Management</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="p-4 border-b">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="p-0">
                <BookingsTable 
                  bookings={filteredBookings}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                  getPaymentBadge={getPaymentBadge}
                />
              </TabsContent>
              
              <TabsContent value="pending" className="p-0">
                <BookingsTable 
                  bookings={filteredBookings}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                  getPaymentBadge={getPaymentBadge}
                />
              </TabsContent>
              
              <TabsContent value="confirmed" className="p-0">
                <BookingsTable 
                  bookings={filteredBookings}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                  getPaymentBadge={getPaymentBadge}
                />
              </TabsContent>
              
              <TabsContent value="completed" className="p-0">
                <BookingsTable 
                  bookings={filteredBookings}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                  getPaymentBadge={getPaymentBadge}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

interface BookingsTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: string, status: Booking['status']) => void;
  getStatusBadge: (status: Booking['status']) => React.ReactNode;
  getPaymentBadge: (status: Booking['paymentStatus']) => React.ReactNode;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ 
  bookings, 
  onStatusChange,
  getStatusBadge,
  getPaymentBadge
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>
          {bookings.length === 0 ? 
            "No bookings found" : 
            `Showing ${bookings.length} booking${bookings.length !== 1 ? 's' : ''}`
          }
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.userName}</TableCell>
                <TableCell>{booking.vendorName}</TableCell>
                <TableCell>{booking.serviceName}</TableCell>
                <TableCell>{formatDate(booking.serviceDate)}</TableCell>
                <TableCell>${booking.amount.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      title="Edit"
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    {booking.status !== 'confirmed' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-green-600" 
                        title="Confirm"
                        onClick={() => onStatusChange(booking.id, 'confirmed')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-600" 
                        title="Cancel"
                        onClick={() => onStatusChange(booking.id, 'cancelled')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookings;

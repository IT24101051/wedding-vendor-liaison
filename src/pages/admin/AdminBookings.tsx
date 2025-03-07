
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'lucide-react';

const AdminBookings = () => {
  // Mock bookings data
  const bookings = [
    {
      id: "BK-001",
      clientName: "Jennifer & Michael Smith",
      vendorName: "Elegant Moments Photography",
      service: "Premium Wedding Photography",
      date: "2023-06-15",
      location: "Garden Grove Venue, New York",
      amount: 3000,
      status: "confirmed"
    },
    {
      id: "BK-002",
      clientName: "Sarah & David Johnson",
      vendorName: "Royal Garden Venue",
      service: "Full Day Venue Rental",
      date: "2023-07-22",
      location: "Royal Garden, Chicago",
      amount: 12000,
      status: "confirmed"
    },
    {
      id: "BK-003",
      clientName: "Emily & James Wilson",
      vendorName: "Divine Cuisine Catering",
      service: "Premium Catering Package",
      date: "2023-08-05",
      location: "Mountain View Lodge, Colorado",
      amount: 8500,
      status: "pending"
    },
    {
      id: "BK-004",
      clientName: "Olivia & Daniel Brown",
      vendorName: "Blooming Beauty Florals",
      service: "Complete Floral Package",
      date: "2023-09-18",
      location: "Sunset Beach Resort, Miami",
      amount: 2200,
      status: "pending"
    },
    {
      id: "BK-005",
      clientName: "Sophia & William Miller",
      vendorName: "Harmony Wedding Band",
      service: "6-Hour Live Band",
      date: "2023-10-30",
      location: "Grand Ballroom, Los Angeles",
      amount: 3500,
      status: "cancelled"
    },
    {
      id: "BK-006",
      clientName: "Emma & Noah Davis",
      vendorName: "Dream Wedding Planners",
      service: "Full Wedding Planning",
      date: "2023-11-12",
      location: "Lakeside Manor, Seattle",
      amount: 7500,
      status: "completed"
    }
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">All Bookings</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search bookings..." className="pl-8" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="all-statuses">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-time">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.clientName}</TableCell>
                    <TableCell>{booking.vendorName}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>${booking.amount.toLocaleString()}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                                <p>{booking.id}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Status</h3>
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
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Client</h3>
                                <p>{booking.clientName}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Event Date</h3>
                                <p>{booking.date}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Vendor</h3>
                                <p>{booking.vendorName}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Service</h3>
                                <p>{booking.service}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                <p>{booking.location}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                                <p className="font-semibold">${booking.amount.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4 mt-4">
                              <div className="flex justify-end space-x-2">
                                {booking.status === 'pending' && (
                                  <>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                      Confirm Booking
                                    </Button>
                                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                      Cancel Booking
                                    </Button>
                                  </>
                                )}
                                
                                {booking.status === 'confirmed' && (
                                  <>
                                    <Button>
                                      Mark as Completed
                                    </Button>
                                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                      Cancel Booking
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;

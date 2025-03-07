
import React from 'react';
import VendorLayout from '@/components/layouts/VendorLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

const VendorBookings = () => {
  // Mock bookings data
  const bookings = [
    {
      id: 1,
      clientName: 'Jennifer & Michael',
      email: 'jennifer@example.com',
      phone: '(555) 123-4567',
      date: '2023-06-15',
      time: '14:00 - 22:00',
      location: 'Garden Grove Venue, New York',
      service: 'Premium Wedding Photography',
      status: 'pending',
      notes: 'Would like to focus on candid shots throughout the day.'
    },
    {
      id: 2,
      clientName: 'Sarah & David',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      date: '2023-07-22',
      time: '15:00 - 23:00',
      location: 'Oceanview Resort, Miami',
      service: 'Basic Wedding Photography',
      status: 'confirmed',
      notes: 'Beach wedding - please bring appropriate gear.'
    },
    {
      id: 3,
      clientName: 'Emily & James',
      email: 'emily@example.com',
      phone: '(555) 456-7890',
      date: '2023-08-05',
      time: '12:00 - 20:00',
      location: 'Mountain View Lodge, Colorado',
      service: 'Wedding Video Package',
      status: 'completed',
      notes: 'Rustic theme, drone shots of mountain backdrop requested.'
    }
  ];

  const renderBookingCard = (booking) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-wedding-navy">{booking.clientName}</h3>
              <Badge 
                className={
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'
                }
              >
                {booking.status === 'confirmed' ? 'Confirmed' : 
                booking.status === 'pending' ? 'Pending' : 'Completed'}
              </Badge>
            </div>
            <p className="text-sm font-medium mt-2">{booking.service}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-wedding-navy" />
                {booking.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-wedding-navy" />
                {booking.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-wedding-navy" />
                {booking.location}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  {booking.clientName}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  {booking.phone}
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  {booking.email}
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
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" /> Accept
              </Button>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
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
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">Manage Your Bookings</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {bookings.map(renderBookingCard)}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            {bookings.filter(b => b.status === 'pending').map(renderBookingCard)}
          </TabsContent>
          
          <TabsContent value="confirmed" className="mt-0">
            {bookings.filter(b => b.status === 'confirmed').map(renderBookingCard)}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            {bookings.filter(b => b.status === 'completed').map(renderBookingCard)}
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorBookings;

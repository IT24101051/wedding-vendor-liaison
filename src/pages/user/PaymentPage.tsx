
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserLayout from '@/components/layouts/UserLayout';
import PaymentGateway from '@/components/payment/PaymentGateway';
import VendorMessaging from '@/components/messaging/VendorMessaging';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { getBookingById, updateBooking } = useBookings();
  
  // Get actual booking details if available
  const booking = getBookingById(id || 'booking1');
  
  // Use real booking data if available, otherwise use mock data
  const bookingDetails = booking || {
    id: id || 'booking1',
    vendorName: 'Elegant Moments Photography',
    vendorId: 'vendor1',
    serviceName: 'Premium Wedding Photography',
    serviceDate: '2023-10-15', // Using serviceDate consistently
    amount: 2500,
  };

  // Handle the date display based on whether we have a real booking or fallback data
  const displayDate = booking ? booking.serviceDate : bookingDetails.serviceDate;

  const handlePaymentSuccess = () => {
    if (booking) {
      updateBooking(booking.id, { paymentStatus: 'paid' });
    }
    navigate('/user/bookings');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // The ProtectedRoute component now handles this, but keeping it for additional safety
  if (!isAuthenticated('user')) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">You need to be logged in to complete your payment.</p>
              <Link to="/user/login" state={{ from: `/user/payment/${id}` }}>
                <Button className="bg-wedding-navy">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-wedding-navy">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Please review your booking details and complete the payment</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-medium">{bookingDetails.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Vendor</span>
                  <span className="font-medium">{bookingDetails.vendorName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{bookingDetails.serviceName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{displayDate}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-800 font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-wedding-navy">${bookingDetails.amount}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <VendorMessaging 
                  vendorId={booking?.vendorId || 'vendor1'} 
                  vendorName={booking?.vendorName || 'Elegant Moments Photography'} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <PaymentGateway 
              amount={bookingDetails.amount} 
              description={`Payment for ${bookingDetails.serviceName}`}
              vendorName={bookingDetails.vendorName}
              serviceName={bookingDetails.serviceName}
              bookingId={bookingDetails.id}
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default PaymentPage;

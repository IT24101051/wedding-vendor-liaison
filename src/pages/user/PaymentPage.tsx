
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '@/components/layouts/UserLayout';
import PaymentGateway from '@/components/payment/PaymentGateway';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock booking details
  const bookingDetails = {
    id: id || '123',
    vendorName: 'Elegant Moments Photography',
    serviceName: 'Premium Wedding Photography',
    date: 'October 15, 2023',
    amount: 2500,
  };

  const handlePaymentSuccess = () => {
    navigate('/user/bookings');
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-800 font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-wedding-navy">${bookingDetails.amount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <PaymentGateway 
              amount={bookingDetails.amount} 
              description={`Payment for ${bookingDetails.serviceName}`}
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

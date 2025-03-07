import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, CheckCircle, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReceiptGenerator from './ReceiptGenerator';
import { useAuth } from '@/contexts/AuthContext';

type PaymentGatewayProps = {
  amount: number;
  description: string;
  vendorName: string;
  serviceName: string;
  bookingId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

// Mock promocodes for demonstration
const PROMOCODES = {
  'WELCOME10': { discount: 0.1, description: '10% off your first booking' },
  'WEDDING25': { discount: 0.25, description: '25% off wedding packages' },
  'SUMMER2023': { discount: 0.15, description: '15% summer discount' }
};

const PaymentGateway = ({ amount, description, vendorName, serviceName, bookingId, onSuccess, onCancel }: PaymentGatewayProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with spaces after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setExpiryDate(value);
  };

  const applyPromoCode = () => {
    setPromoError('');
    
    if (!promoCode.trim()) {
      setPromoError('Please enter a promocode');
      return;
    }
    
    const code = promoCode.trim().toUpperCase();
    if (PROMOCODES[code as keyof typeof PROMOCODES]) {
      const discount = PROMOCODES[code as keyof typeof PROMOCODES].discount;
      const discountValue = amount * discount;
      
      setAppliedPromo(code);
      setDiscountAmount(discountValue);
      
      toast({
        title: "Promocode Applied",
        description: PROMOCODES[code as keyof typeof PROMOCODES].description,
      });
    } else {
      setPromoError('Invalid promocode');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoCode('');
  };

  const finalAmount = amount - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      toast({
        title: "Payment Successful",
        description: `Your payment of $${finalAmount.toFixed(2)} has been processed.`,
      });
      
      // Don't navigate yet, show the receipt first
      setShowReceipt(true);
    }, 2000);
  };

  const handleContinueAfterReceipt = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  if (showReceipt) {
    return (
      <div className="space-y-6">
        <ReceiptGenerator 
          paymentId={bookingId}
          customerName={user?.name || "Customer"}
          vendorName={vendorName}
          serviceName={serviceName}
          amount={amount}
          date={new Date().toISOString()}
          discountAmount={discountAmount}
          promoCode={appliedPromo || undefined}
        />
        
        <div className="flex justify-center">
          <Button className="mt-4 bg-wedding-gold text-white" onClick={handleContinueAfterReceipt}>
            Continue to My Bookings
          </Button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl mb-2">Payment Successful!</CardTitle>
            <CardDescription className="mb-4">
              Your payment of ${finalAmount.toFixed(2)} has been processed successfully.
              {appliedPromo && (
                <p className="text-sm mt-2">Promocode {appliedPromo} applied: You saved ${discountAmount.toFixed(2)}</p>
              )}
            </CardDescription>
            <Button className="mt-4 bg-wedding-navy" onClick={() => setShowReceipt(true)}>
              View Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2 flex flex-col">
          <div className="text-2xl font-bold text-wedding-navy">${finalAmount.toFixed(2)}</div>
          {discountAmount > 0 && (
            <div className="text-sm text-green-600 flex items-center mt-1">
              <Ticket className="h-4 w-4 mr-1" />
              <span>You saved ${discountAmount.toFixed(2)} with code {appliedPromo}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Promocode Section */}
        <div className="mb-6 border-b pb-4">
          <Label htmlFor="promocode" className="mb-2 block">Promocode</Label>
          <div className="flex space-x-2">
            <Input
              id="promocode"
              placeholder="Enter promocode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={!!appliedPromo}
              className="flex-1"
            />
            {appliedPromo ? (
              <Button 
                onClick={removePromoCode}
                variant="outline"
              >
                Remove
              </Button>
            ) : (
              <Button 
                onClick={applyPromoCode}
                disabled={!promoCode.trim()}
                className="bg-wedding-gold hover:bg-wedding-gold/90"
              >
                Apply
              </Button>
            )}
          </div>
          {promoError && (
            <Alert variant="destructive" className="mt-2 py-2">
              <AlertDescription>{promoError}</AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input 
                  id="cardName" 
                  placeholder="John Doe" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="cardNumber" 
                    placeholder="4242 4242 4242 4242" 
                    className="pl-9" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    maxLength={19}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    placeholder="MM/YY" 
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    required
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wedding-gold hover:bg-wedding-gold/90"
                disabled={processing}
              >
                {processing ? "Processing..." : `Pay $${finalAmount.toFixed(2)}`}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="paypal">
            <div className="text-center py-8">
              <p className="mb-4 text-gray-600">You will be redirected to PayPal to complete your payment.</p>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={processing}
                onClick={handleSubmit}
              >
                {processing ? "Connecting..." : `Pay $${finalAmount.toFixed(2)} with PayPal`}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <p className="text-sm text-gray-500">Secure payment by Stripe</p>
      </CardFooter>
    </Card>
  );
};

export default PaymentGateway;


import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserLayout from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  
  // Form state
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [service, setService] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fill in form with user data if available
  useEffect(() => {
    if (user) {
      const [first, ...rest] = user.name.split(' ');
      setFirstName(first || '');
      setLastName(rest.join(' ') || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  // Mock vendor data
  const vendor = {
    id: parseInt(id || "1"),
    name: "Elegant Moments Photography",
    category: "Photographer",
    services: [
      {
        id: "basic",
        name: "Basic Wedding Package",
        price: "$1,200",
        description: "6 hours of coverage, 1 photographer, 300+ edited digital images"
      },
      {
        id: "premium",
        name: "Premium Wedding Package",
        price: "$2,000",
        description: "8 hours of coverage, 2 photographers, engagement session, 500+ edited digital images"
      },
      {
        id: "luxury",
        name: "Luxury Wedding Package",
        price: "$3,000",
        description: "10 hours of coverage, 2 photographers, engagement session, bridal session, 700+ edited digital images"
      }
    ]
  };

  const handleNext = () => {
    if (step === 1 && (!date || !service)) {
      toast({
        title: "Missing information",
        description: "Please select both a date and service",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && (!firstName || !lastName || !email || !phone)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create booking
    const selectedServiceDetails = vendor.services.find(s => s.id === service);
    const price = selectedServiceDetails ? parseInt(selectedServiceDetails.price.replace(/[^0-9]/g, '') || '0') : 0;
    
    // Ensure vendorId follows consistent format (always prefixed with "vendor")
    let vendorId = vendor.id.toString();
    if (!vendorId.startsWith('vendor')) {
      vendorId = `vendor${vendorId}`;
    }
    
    console.log(`Creating booking with vendorId: ${vendorId}`);
    
    const newBooking = {
      userId: user?.id || 'user1',
      userName: `${firstName} ${lastName}`,
      vendorId: vendorId,
      vendorName: vendor.name,
      serviceName: selectedServiceDetails?.name || '',
      serviceDate: date ? format(date, 'yyyy-MM-dd') : '',
      eventType: 'Wedding',
      amount: price,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      notes: specialRequests
    };
    
    try {
      console.log("Creating booking with data:", newBooking);
      
      // Add booking and redirect to payment
      const booking = addBooking(newBooking);
      
      // Force local storage update for immediate consistency
      const existingBookings = JSON.parse(localStorage.getItem('wedding_app_bookings') || '[]');
      const updatedBookings = [...existingBookings, booking];
      localStorage.setItem('wedding_app_bookings', JSON.stringify(updatedBookings));
      
      console.log("Booking created successfully:", booking);
      console.log("Updated localStorage with new booking");
      
      setTimeout(() => {
        setIsSubmitting(false);
        
        toast({
          title: "Booking submitted successfully!",
          description: "You can now proceed to payment.",
        });
        
        // Redirect to payment page with the booking ID
        navigate(`/user/payment/${booking.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating booking:", error);
      setIsSubmitting(false);
      toast({
        title: "Error creating booking",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const selectedService = vendor.services.find(s => s.id === service);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link to="/user" className="text-gray-500 hover:text-wedding-navy">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/user/vendors" className="text-gray-500 hover:text-wedding-navy">Vendors</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to={`/user/vendors/${id}`} className="text-gray-500 hover:text-wedding-navy">{vendor.name}</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-wedding-navy">Book</span>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-wedding-navy mb-2">Book {vendor.name}</h1>
            <p className="text-gray-600 mb-8">Complete the form below to book this vendor for your special day</p>
          </motion.div>
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between relative">
              <div className="flex-1 h-1 bg-gray-200 absolute top-4 left-0 right-0 z-0"></div>
              <div className={`flex-1 h-1 absolute top-4 left-0 z-10 transition-all duration-300 ease-in-out bg-wedding-gold`} style={{ width: `${(step - 1) * 50}%` }}></div>
              
              <div className="flex flex-col items-center relative z-20">
                <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-wedding-gold text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center mb-2`}>
                  1
                </div>
                <span className="text-sm font-medium">Service Selection</span>
              </div>
              
              <div className="flex flex-col items-center relative z-20">
                <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-wedding-gold text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center mb-2`}>
                  2
                </div>
                <span className="text-sm font-medium">Your Details</span>
              </div>
              
              <div className="flex flex-col items-center relative z-20">
                <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-wedding-gold text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center mb-2`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Multi-step Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="service">Select a Service Package *</Label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendor.services.map((svc) => (
                            <SelectItem key={svc.id} value={svc.id}>
                              {svc.name} - {svc.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {service && (
                      <div className="bg-wedding-light p-4 rounded-lg">
                        <h3 className="font-semibold text-wedding-navy mb-2">{selectedService?.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{selectedService?.description}</p>
                        <p className="font-medium text-wedding-gold">{selectedService?.price}</p>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>Select Wedding Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-wedding-gold text-white hover:bg-wedding-gold/90"
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Personal Details */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                      <Textarea 
                        id="specialRequests" 
                        value={specialRequests} 
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Tell us about any special needs or requests you have for your wedding day"
                        rows={4}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleBack}
                        className="border-wedding-navy text-wedding-navy"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-wedding-gold text-white hover:bg-wedding-gold/90"
                      >
                        Review Booking
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-wedding-navy mb-2">Review Your Booking</h2>
                      <p className="text-gray-600">Please review the details below before confirming your booking</p>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Booking Summary</CardTitle>
                        <CardDescription>Service and date information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Vendor:</dt>
                            <dd className="font-medium text-wedding-navy">{vendor.name}</dd>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Service:</dt>
                            <dd className="font-medium text-wedding-navy">{selectedService?.name}</dd>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Price:</dt>
                            <dd className="font-medium text-wedding-gold">{selectedService?.price}</dd>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Date:</dt>
                            <dd className="font-medium text-wedding-navy">{date ? format(date, "PPP") : "Not selected"}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Your Information</CardTitle>
                        <CardDescription>Contact details</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Name:</dt>
                            <dd className="font-medium text-wedding-navy">{firstName} {lastName}</dd>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Email:</dt>
                            <dd className="font-medium text-wedding-navy">{email}</dd>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <dt className="text-gray-600">Phone:</dt>
                            <dd className="font-medium text-wedding-navy">{phone}</dd>
                          </div>
                          {specialRequests && (
                            <div className="py-1 border-b">
                              <dt className="text-gray-600 mb-1">Special Requests:</dt>
                              <dd className="text-wedding-navy">{specialRequests}</dd>
                            </div>
                          )}
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleBack}
                        className="border-wedding-navy text-wedding-navy"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-wedding-gold text-white hover:bg-wedding-gold/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>After submitting your booking request, the vendor will contact you to confirm availability and details.</p>
            <p className="mt-2">Need help? <a href="#" className="text-wedding-navy font-medium hover:underline">Contact our support team</a></p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BookingForm;

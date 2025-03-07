
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const VendorRegister = () => {
  return (
    <div className="flex min-h-screen bg-wedding-light">
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wedding-navy">Join Our Vendor Network</h2>
            <p className="text-gray-600 mt-2">Reach more couples and grow your wedding business</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Register as a Vendor</CardTitle>
              <CardDescription>
                Complete the form below to create your vendor account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Business Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" placeholder="Your Business Name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Business Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venue">Venue</SelectItem>
                        <SelectItem value="photographer">Photographer</SelectItem>
                        <SelectItem value="videographer">Videographer</SelectItem>
                        <SelectItem value="caterer">Caterer</SelectItem>
                        <SelectItem value="florist">Florist</SelectItem>
                        <SelectItem value="music">Music & Entertainment</SelectItem>
                        <SelectItem value="decorations">Decorations</SelectItem>
                        <SelectItem value="cake">Cake & Desserts</SelectItem>
                        <SelectItem value="planner">Wedding Planner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea id="description" 
                      placeholder="Tell couples about your business, services, and what makes you special" 
                      className="min-h-[100px]" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contact Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Your Full Name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Service Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Account Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link to="/terms" className="text-wedding-gold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-wedding-gold hover:underline">Privacy Policy</Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-wedding-gold hover:bg-wedding-gold/90">
                Create Vendor Account
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/vendor/login" className="text-wedding-gold hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;

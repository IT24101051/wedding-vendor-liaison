
import React from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="flex flex-col items-center p-6 text-center">
            <MapPin className="h-8 w-8 text-wedding-gold mb-4" />
            <h3 className="text-lg font-medium mb-2">Our Location</h3>
            <p className="text-gray-600">
              123 Wedding Plaza<br />
              Suite 456<br />
              San Francisco, CA 94107
            </p>
          </Card>
          
          <Card className="flex flex-col items-center p-6 text-center">
            <Mail className="h-8 w-8 text-wedding-gold mb-4" />
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">
              For general inquiries:
            </p>
            <a href="mailto:info@weddingvendorliaison.com" className="text-wedding-navy hover:underline">
              info@weddingvendorliaison.com
            </a>
            <p className="text-gray-600 mt-2 mb-2">
              For support:
            </p>
            <a href="mailto:support@weddingvendorliaison.com" className="text-wedding-navy hover:underline">
              support@weddingvendorliaison.com
            </a>
          </Card>
          
          <Card className="flex flex-col items-center p-6 text-center">
            <Phone className="h-8 w-8 text-wedding-gold mb-4" />
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">
              Customer Service:
            </p>
            <a href="tel:+18005551234" className="text-wedding-navy hover:underline">
              (800) 555-1234
            </a>
            <p className="text-gray-600 mt-2 mb-2">
              Vendor Relations:
            </p>
            <a href="tel:+18005555678" className="text-wedding-navy hover:underline">
              (800) 555-5678
            </a>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter subject" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message here" rows={5} required />
                </div>
                
                <Button type="submit" className="w-full bg-wedding-navy hover:bg-wedding-navy/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-wedding-gold mt-0.5" />
                <div>
                  <h3 className="font-medium">Customer Support Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/user/help-center" className="text-wedding-navy hover:underline">
                      How do I book a vendor?
                    </a>
                  </li>
                  <li>
                    <a href="/user/help-center" className="text-wedding-navy hover:underline">
                      Can I cancel my booking?
                    </a>
                  </li>
                  <li>
                    <a href="/user/help-center" className="text-wedding-navy hover:underline">
                      How do payments work?
                    </a>
                  </li>
                  <li>
                    <a href="/user/help-center" className="text-wedding-navy hover:underline">
                      Visit our Help Center for more questions
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default ContactUs;

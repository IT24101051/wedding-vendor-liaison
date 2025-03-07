
import React from 'react';
import VendorLayout from '@/components/layouts/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VendorServices = () => {
  // Mock services data
  const services = [
    {
      id: 1,
      name: 'Basic Wedding Photography',
      category: 'Photography',
      description: '6 hours of coverage, 1 photographer, 300+ edited photos, online gallery',
      price: 1500,
      duration: '6 hours',
    },
    {
      id: 2,
      name: 'Premium Wedding Photography',
      category: 'Photography',
      description: '10 hours of coverage, 2 photographers, 500+ edited photos, online gallery, engagement shoot',
      price: 3000,
      duration: '10 hours',
    },
    {
      id: 3,
      name: 'Wedding Video Package',
      category: 'Videography',
      description: '8 hours of coverage, highlight reel, full ceremony video, drone footage',
      price: 2500,
      duration: '8 hours',
    }
  ];

  return (
    <VendorLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-wedding-navy">Manage Your Services</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-wedding-gold hover:bg-wedding-gold/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input id="name" placeholder="e.g. Premium Wedding Photography" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="videography">Videography</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                      <SelectItem value="music">Music & Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your service in detail" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" placeholder="e.g. 1500" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g. 6 hours" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-wedding-gold hover:bg-wedding-gold/90">Save Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="bg-wedding-navy/5 pb-2">
                <CardTitle className="text-wedding-navy">{service.name}</CardTitle>
                <p className="text-sm text-gray-500">{service.category}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg text-wedding-navy">${service.price}</p>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorServices;

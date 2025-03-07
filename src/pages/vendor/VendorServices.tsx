
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import VendorLayout from '@/components/layouts/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VendorServices = () => {
  // Mock services data with more options
  const initialServices = [
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
    },
    {
      id: 4,
      name: 'Rustic Barn Venue',
      category: 'Venue',
      description: 'Beautiful rustic barn with outdoor ceremony space, accommodates up to 150 guests',
      price: 4500,
      duration: '12 hours',
    },
    {
      id: 5,
      name: 'Downtown Loft Space',
      category: 'Venue',
      description: 'Modern loft venue in downtown area, floor-to-ceiling windows, rooftop ceremony space',
      price: 5500,
      duration: '12 hours',
    },
    {
      id: 6,
      name: 'Wedding DJ & MC Services',
      category: 'Music',
      description: 'Professional DJ and MC for your wedding, includes sound equipment and lighting',
      price: 1200,
      duration: '6 hours',
    }
  ];

  const [services, setServices] = useState(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: ''
  });

  const { toast } = useToast();

  const handleAddService = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      duration: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteService = (service: any) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newService = {
      id: services.length + 1,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: Number(formData.price),
      duration: formData.duration
    };
    
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Service Added",
      description: `${newService.name} has been added to your services.`,
    });
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedServices = services.map(service => {
      if (service.id === currentService.id) {
        return {
          ...service,
          name: formData.name,
          category: formData.category,
          description: formData.description,
          price: Number(formData.price),
          duration: formData.duration
        };
      }
      return service;
    });
    
    setServices(updatedServices);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Service Updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  const handleConfirmDelete = () => {
    const updatedServices = services.filter(service => service.id !== currentService.id);
    setServices(updatedServices);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Service Deleted",
      description: `${currentService.name} has been removed from your services.`,
      variant: "destructive"
    });
  };

  const serviceForm = (onSubmit: (e: React.FormEvent) => void) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Service Name</Label>
          <Input 
            id="name" 
            placeholder="e.g. Premium Wedding Photography" 
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Videography">Videography</SelectItem>
              <SelectItem value="Catering">Catering</SelectItem>
              <SelectItem value="Venue">Venue</SelectItem>
              <SelectItem value="Decoration">Decoration</SelectItem>
              <SelectItem value="Music">Music & Entertainment</SelectItem>
              <SelectItem value="Flowers">Flowers</SelectItem>
              <SelectItem value="Beauty">Hair & Makeup</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your service in detail" 
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="e.g. 1500" 
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              placeholder="e.g. 6 hours" 
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => {
            isAddDialogOpen ? setIsAddDialogOpen(false) : setIsEditDialogOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-wedding-gold hover:bg-wedding-gold/90">
          {isAddDialogOpen ? "Add Service" : "Update Service"}
        </Button>
      </div>
    </form>
  );

  return (
    <VendorLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-wedding-navy">Manage Your Services</h1>
          <Button className="bg-wedding-gold hover:bg-wedding-gold/90" onClick={handleAddService}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>
        
        {/* Add Service Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            {serviceForm(handleSubmitAdd)}
          </DialogContent>
        </Dialog>
        
        {/* Edit Service Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            {serviceForm(handleSubmitEdit)}
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Alert variant="destructive">
                <AlertDescription>
                  Are you sure you want to delete "{currentService?.name}"? This action cannot be undone.
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="bg-wedding-navy/5 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-wedding-navy">{service.name}</CardTitle>
                    <p className="text-sm text-gray-500">{service.category}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-wedding-gold text-white">
                    ${service.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteService(service)}
                    >
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

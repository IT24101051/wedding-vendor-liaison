
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Search, CheckCircle, XCircle } from 'lucide-react';

const AdminVendors = () => {
  // Mock vendors data
  const vendors = [
    {
      id: 1,
      businessName: 'Elegant Moments Photography',
      ownerName: 'John Smith',
      category: 'Photographer',
      location: 'New York, NY',
      joinDate: '2023-01-15',
      status: 'active',
      email: 'john@elegantmoments.com',
      phone: '(555) 123-4567'
    },
    {
      id: 2,
      businessName: 'Royal Garden Venue',
      ownerName: 'Sarah Johnson',
      category: 'Venue',
      location: 'Chicago, IL',
      joinDate: '2023-02-20',
      status: 'active',
      email: 'sarah@royalgarden.com',
      phone: '(555) 234-5678'
    },
    {
      id: 3,
      businessName: 'Divine Cuisine Catering',
      ownerName: 'Michael Brown',
      category: 'Caterer',
      location: 'Los Angeles, CA',
      joinDate: '2023-03-10',
      status: 'pending',
      email: 'michael@divinecuisine.com',
      phone: '(555) 345-6789'
    },
    {
      id: 4,
      businessName: 'Blooming Beauty Florals',
      ownerName: 'Emily Davis',
      category: 'Florist',
      location: 'Miami, FL',
      joinDate: '2023-04-05',
      status: 'pending',
      email: 'emily@bloomingbeauty.com',
      phone: '(555) 456-7890'
    },
    {
      id: 5,
      businessName: 'Harmony Wedding Band',
      ownerName: 'David Wilson',
      category: 'Entertainment',
      location: 'Austin, TX',
      joinDate: '2023-05-12',
      status: 'deactivated',
      email: 'david@harmonywedding.com',
      phone: '(555) 567-8901'
    }
  ];

  // Mock pending applications
  const pendingApplications = vendors.filter(v => v.status === 'pending');

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">Manage Vendors</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Vendors</TabsTrigger>
              <TabsTrigger value="applications">Pending Applications</TabsTrigger>
            </TabsList>
            
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search vendors..." className="pl-8" />
              </div>
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="photographer">Photographer</SelectItem>
                  <SelectItem value="venue">Venue</SelectItem>
                  <SelectItem value="caterer">Caterer</SelectItem>
                  <SelectItem value="florist">Florist</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.businessName}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>{vendor.location}</TableCell>
                        <TableCell>{vendor.joinDate}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              vendor.status === 'active' ? 'bg-green-100 text-green-800' : 
                              vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }
                          >
                            {vendor.status === 'active' ? 'Active' : 
                             vendor.status === 'pending' ? 'Pending' : 'Deactivated'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Vendor Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Business Name</h3>
                                    <p>{vendor.businessName}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Owner Name</h3>
                                    <p>{vendor.ownerName}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                    <p>{vendor.category}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                    <p>{vendor.location}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p>{vendor.email}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                    <p>{vendor.phone}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                                    <p>{vendor.joinDate}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <Badge 
                                      className={
                                        vendor.status === 'active' ? 'bg-green-100 text-green-800' : 
                                        vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'
                                      }
                                    >
                                      {vendor.status === 'active' ? 'Active' : 
                                       vendor.status === 'pending' ? 'Pending' : 'Deactivated'}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="border-t pt-4 mt-4">
                                  <div className="flex justify-end space-x-2">
                                    {vendor.status === 'pending' && (
                                      <>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                          <CheckCircle className="h-4 w-4 mr-2" /> Approve
                                        </Button>
                                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                          <XCircle className="h-4 w-4 mr-2" /> Reject
                                        </Button>
                                      </>
                                    )}
                                    
                                    {vendor.status === 'active' && (
                                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                        Deactivate
                                      </Button>
                                    )}
                                    
                                    {vendor.status === 'deactivated' && (
                                      <Button className="bg-green-600 hover:bg-green-700">
                                        Reactivate
                                      </Button>
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
          </TabsContent>
          
          <TabsContent value="applications" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Pending Vendor Applications</h2>
                {pendingApplications.length === 0 ? (
                  <p className="text-gray-500">No pending applications at this time.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingApplications.map((vendor) => (
                      <div key={vendor.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{vendor.businessName}</h3>
                            <p className="text-sm text-gray-500">{vendor.category} • {vendor.location}</p>
                            <p className="text-sm mt-1">Owner: {vendor.ownerName}</p>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span>{vendor.email}</span>
                              <span>{vendor.phone}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" /> Approve
                            </Button>
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              <XCircle className="h-4 w-4 mr-2" /> Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminVendors;

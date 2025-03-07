
import VendorLayout from "@/components/layouts/VendorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Upload, User, Settings, Shield, Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const VendorProfile = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock vendor data
  const vendor = {
    name: "Elegant Moments Photography",
    email: "contact@elegantmoments.com",
    phone: "(555) 123-4567",
    address: "123 Wedding St, New York, NY 10001",
    category: "photographer",
    description: "Specializing in candid wedding photography that captures the emotions of your special day. With over 10 years of experience, we pride ourselves on our ability to document the beautiful moments that make your wedding unique.",
    websiteUrl: "https://elegantmoments.com",
    instagramUrl: "https://instagram.com/elegantmoments",
    facebookUrl: "https://facebook.com/elegantmoments",
    yearsInBusiness: "10",
    teamSize: "3",
    coverageArea: "New York City and surrounding areas",
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Profile updated successfully",
        description: "Your vendor profile has been updated.",
      });
    }, 1500);
  };

  return (
    <VendorLayout>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-wedding-navy mb-2">Vendor Profile</h1>
          <p className="text-gray-600">Manage your business information and improve your visibility to couples</p>
        </motion.div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          
          {/* Business Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Profile Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                        <CardDescription>Update your business details and description</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input id="businessName" defaultValue={vendor.name} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Business Email</Label>
                            <Input id="email" type="email" defaultValue={vendor.email} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Business Phone</Label>
                            <Input id="phone" defaultValue={vendor.phone} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Business Address</Label>
                          <Input id="address" defaultValue={vendor.address} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Vendor Category</Label>
                          <Select defaultValue={vendor.category}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="photographer">Photographer</SelectItem>
                              <SelectItem value="venue">Venue</SelectItem>
                              <SelectItem value="caterer">Caterer</SelectItem>
                              <SelectItem value="florist">Florist</SelectItem>
                              <SelectItem value="entertainment">Entertainment</SelectItem>
                              <SelectItem value="planner">Planner</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Business Description</Label>
                          <Textarea 
                            id="description" 
                            defaultValue={vendor.description}
                            rows={6}
                          />
                          <p className="text-xs text-gray-500">Write a compelling description of your business, services, and what makes you unique.</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Social Media & Website</CardTitle>
                        <CardDescription>Connect your online presence</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website URL</Label>
                          <Input id="website" defaultValue={vendor.websiteUrl} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input id="instagram" defaultValue={vendor.instagramUrl} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input id="facebook" defaultValue={vendor.facebookUrl} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                        <CardDescription>Additional information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="yearsInBusiness">Years in Business</Label>
                          <Input id="yearsInBusiness" defaultValue={vendor.yearsInBusiness} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <Input id="teamSize" defaultValue={vendor.teamSize} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="coverageArea">Coverage Area</Label>
                          <Input id="coverageArea" defaultValue={vendor.coverageArea} />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Logo & Cover Photo</CardTitle>
                        <CardDescription>Upload your business images</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label>Business Logo</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-wedding-gold transition-colors">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm font-medium">Click to upload logo</p>
                            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Cover Photo</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-wedding-gold transition-colors">
                            <img
                              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                              alt="Cover preview"
                              className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <p className="text-sm font-medium">Click to change cover photo</p>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG (recommended size: 1600x900px)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-wedding-gold text-white hover:bg-wedding-gold/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </TabsContent>
          
          {/* Photo Gallery Tab */}
          <TabsContent value="gallery">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                  <CardDescription>Showcase your best work to attract couples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button className="bg-wedding-navy text-white hover:bg-wedding-navy/90">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                      <div key={index} className="relative group">
                        <img
                          src={`https://images.unsplash.com/photo-${1510000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`}
                          alt={`Gallery image ${index}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                              <MapPin className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                              ✕
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <p className="text-sm text-gray-500">8 of 20 photos uploaded</p>
                  <Button variant="outline" className="border-wedding-navy text-wedding-navy">
                    Manage Photos
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Account Settings Tab */}
          <TabsContent value="account">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-wedding-navy" />
                    <CardTitle>Account Information</CardTitle>
                  </div>
                  <CardDescription>Manage your login details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="accountEmail">Email Address</Label>
                    <Input id="accountEmail" type="email" defaultValue={vendor.email} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input id="confirmNewPassword" type="password" />
                  </div>
                  
                  <Button className="w-full bg-wedding-navy text-white hover:bg-wedding-navy/90">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-wedding-navy" />
                      <CardTitle>Notification Settings</CardTitle>
                    </div>
                    <CardDescription>Manage when and how you get notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-wedding-navy">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about new bookings</p>
                      </div>
                      <div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-wedding-navy">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive texts about new bookings</p>
                      </div>
                      <div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-wedding-navy">Marketing Communications</p>
                        <p className="text-sm text-gray-500">Receive updates and promotions</p>
                      </div>
                      <div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-wedding-navy" />
                      <CardTitle>Privacy & Visibility</CardTitle>
                    </div>
                    <CardDescription>Control who can see your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-wedding-navy">Public Profile</p>
                        <p className="text-sm text-gray-500">Allow couples to find your business</p>
                      </div>
                      <div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-wedding-navy">Contact Information</p>
                        <p className="text-sm text-gray-500">Show email and phone to couples</p>
                      </div>
                      <div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorProfile;

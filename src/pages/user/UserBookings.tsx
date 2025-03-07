
import { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, FileText, Clock, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserBookings = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  // Mock booking data
  const bookings = [
    {
      id: 1,
      vendor: "Elegant Moments Photography",
      vendorId: 1,
      service: "Premium Wedding Package",
      date: "September 15, 2023",
      status: "Confirmed",
      price: "$2,000",
      location: "Central Park, New York",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      vendor: "Royal Garden Venue",
      vendorId: 2,
      service: "Full Day Venue Rental",
      date: "September 15, 2023",
      status: "Confirmed",
      price: "$8,500",
      location: "350 Garden Ave, Chicago, IL",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      vendor: "Divine Cuisine Catering",
      vendorId: 3,
      service: "Premium Menu for 100 guests",
      date: "September 15, 2023",
      status: "Confirmed",
      price: "$6,500",
      location: "Royal Garden Venue",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      vendor: "Harmony Wedding Band",
      vendorId: 5,
      service: "Live Band - 4 Hours",
      date: "September 15, 2023",
      status: "Pending",
      price: "$2,200",
      location: "Royal Garden Venue",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      vendor: "Blooming Beauty Florals",
      vendorId: 4,
      service: "Complete Wedding Package",
      date: "August 10, 2023",
      status: "Completed",
      price: "$1,800",
      location: "Engagement Party - Riverside Hotel",
      image: "https://images.unsplash.com/photo-1561128290-006dc4827214?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    }
  ];
  
  const upcomingBookings = bookings.filter(booking => booking.status === "Confirmed" || booking.status === "Pending");
  const pastBookings = bookings.filter(booking => booking.status === "Completed");

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-wedding-navy mb-2">Your Bookings</h1>
          <p className="text-gray-600">Manage all your wedding vendor bookings in one place</p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? "bg-wedding-navy text-white" : "border-wedding-navy text-wedding-navy"}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? "default" : "outline"}
              onClick={() => setViewMode('calendar')}
              className={`ml-2 ${viewMode === 'calendar' ? "bg-wedding-navy text-white" : "border-wedding-navy text-wedding-navy"}`}
            >
              Calendar View
            </Button>
          </div>
          
          <Link to="/user/vendors">
            <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90">
              Book New Vendor
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 gap-6">
                {upcomingBookings.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-wedding-navy mb-2">No Upcoming Bookings</h3>
                      <p className="text-gray-600 mb-6">You don't have any upcoming bookings with wedding vendors.</p>
                      <Link to="/user/vendors">
                        <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90">
                          Browse Vendors
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {upcomingBookings.map((booking, index) => (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <Card>
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="w-full md:w-1/4">
                                <img 
                                  src={booking.image} 
                                  alt={booking.vendor}
                                  className="w-full h-40 md:h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-6">
                                <div className="flex flex-col md:flex-row justify-between">
                                  <div>
                                    <div className="flex items-center mb-2">
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        booking.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                                        booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                                        "bg-blue-100 text-blue-800"
                                      }`}>
                                        {booking.status}
                                      </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-wedding-navy mb-1">{booking.vendor}</h3>
                                    <p className="text-gray-600 mb-2">{booking.service}</p>
                                    <div className="flex items-center text-gray-500 mb-1">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      {booking.date}
                                    </div>
                                    <div className="flex items-center text-gray-500 mb-4">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      {booking.location}
                                    </div>
                                  </div>
                                  <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-lg font-bold text-wedding-gold mb-4">{booking.price}</p>
                                    <div className="flex flex-col space-y-2">
                                      <Link to={`/user/vendors/${booking.vendorId}`}>
                                        <Button variant="outline" size="sm" className="border-wedding-navy text-wedding-navy">
                                          Vendor Details
                                        </Button>
                                      </Link>
                                      <Button size="sm" className="bg-wedding-navy text-white">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Message Vendor
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View your bookings in a calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center text-gray-500 border rounded-md">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-4" />
                      <p>Calendar view would be implemented here with a proper calendar component</p>
                      <p className="text-sm mt-2">Showing all {upcomingBookings.length} upcoming bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 gap-6">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-wedding-navy mb-2">No Past Bookings</h3>
                    <p className="text-gray-600">You don't have any past bookings with wedding vendors.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {pastBookings.map((booking, index) => (
                    <motion.div 
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card>
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4">
                              <img 
                                src={booking.image} 
                                alt={booking.vendor}
                                className="w-full h-40 md:h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-2">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {booking.status}
                                    </span>
                                  </div>
                                  <h3 className="text-xl font-semibold text-wedding-navy mb-1">{booking.vendor}</h3>
                                  <p className="text-gray-600 mb-2">{booking.service}</p>
                                  <div className="flex items-center text-gray-500 mb-1">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {booking.date}
                                  </div>
                                  <div className="flex items-center text-gray-500 mb-4">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {booking.location}
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                  <p className="text-lg font-bold text-wedding-gold mb-4">{booking.price}</p>
                                  <div className="flex flex-col space-y-2">
                                    <Button variant="outline" size="sm" className="border-wedding-navy text-wedding-navy">
                                      View Receipt
                                    </Button>
                                    <Button size="sm" className="bg-wedding-navy text-white">
                                      Write Review
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
};

export default UserBookings;

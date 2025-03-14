import { useEffect, useState, useCallback } from "react";
import VendorLayout from "@/components/layouts/VendorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, DollarSign, Users, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { useToast } from "@/hooks/use-toast";

const VendorDashboard = () => {
  const { user } = useAuth();
  const vendorId = user?.id || 'vendor1';
  
  const { bookings, getBookingsByVendorId, refreshBookings } = useBookings();
  const { toast } = useToast();
  
  const [vendorBookings, setVendorBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const updateDashboardData = useCallback(() => {
    console.log("Updating dashboard data for vendor:", vendorId);
    const currentVendorBookings = getBookingsByVendorId(vendorId);
    console.log("Current vendor bookings:", currentVendorBookings);
    
    setVendorBookings(currentVendorBookings);
    setTotalBookings(currentVendorBookings.length);
    setTotalRevenue(currentVendorBookings.reduce((sum, booking) => sum + booking.amount, 0));
    setPendingBookings(currentVendorBookings.filter(booking => booking.status === 'pending').length);
  }, [vendorId, getBookingsByVendorId]);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Manually refreshing bookings data...");
    
    refreshBookings();
    
    setTimeout(() => {
      updateDashboardData();
      setIsRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "Latest booking data has been loaded",
      });
    }, 500);
  };
  
  useEffect(() => {
    console.log("Bookings changed, updating dashboard...");
    updateDashboardData();
  }, [bookings, updateDashboardData]);
  
  useEffect(() => {
    console.log("Initial dashboard load...");
    refreshBookings();
    updateDashboardData();
  }, [updateDashboardData, refreshBookings]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const dashboardStats = [
    { 
      title: "Total Bookings", 
      value: totalBookings.toString(), 
      icon: <CalendarDays className="h-8 w-8 text-blue-500" />, 
      change: `${vendorBookings.length > 0 ? '+1' : '0'} from last month` 
    },
    { 
      title: "Revenue", 
      value: `$${totalRevenue.toLocaleString()}`, 
      icon: <DollarSign className="h-8 w-8 text-green-500" />, 
      change: `${totalRevenue > 0 ? '+' : ''}$${(totalRevenue * 0.08).toLocaleString()} from last month` 
    },
    { 
      title: "New Inquiries", 
      value: pendingBookings.toString(), 
      icon: <Users className="h-8 w-8 text-purple-500" />, 
      change: `${pendingBookings} pending responses` 
    },
    { 
      title: "Service Views", 
      value: "547", 
      icon: <Users className="h-8 w-8 text-amber-500" />, 
      change: "+32% from last month" 
    }
  ];

  return (
    <VendorLayout>
      <section className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-wedding-navy">Welcome back, {user?.name || "Elegant Moments Photography"}</h1>
            <p className="text-gray-600">Here's what's happening with your business today</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              className="border-wedding-navy text-wedding-navy"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            <Link to="/vendor/services">
              <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90">
                Add New Service
              </Button>
            </Link>
            <Link to="/vendor/bookings">
              <Button variant="outline" className="border-wedding-navy text-wedding-navy">
                View All Bookings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <motion.section 
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-wedding-navy mt-2">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest bookings and inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Client</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Service</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorBookings.length > 0 ? (
                    vendorBookings
                      .slice()
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .slice(0, 4)
                      .map((booking) => (
                        <tr key={booking.id} className="border-b">
                          <td className="py-4 px-2">{booking.userName}</td>
                          <td className="py-4 px-2">{new Date(booking.serviceDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td className="py-4 px-2">{booking.serviceName}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : booking.status === 'completed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <Link to={`/vendor/bookings/${booking.id}`}>
                              <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                                View Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No bookings found. Your new bookings will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <Link to="/vendor/bookings">
                <Button variant="link" className="text-wedding-navy">
                  View All Bookings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {pendingBookings > 0 && (
                <li className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-md">
                  <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Response needed for {pendingBookings} inquiries</p>
                    <p className="text-sm text-gray-500">Couples are waiting for your response</p>
                  </div>
                </li>
              )}
              <li className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Complete your profile</p>
                  <p className="text-sm text-gray-500">Add more photos to increase visibility</p>
                </div>
              </li>
              {vendorBookings.length > 0 && vendorBookings.some(b => new Date(b.serviceDate) > new Date()) && (
                <li className="flex items-start space-x-3 p-3 bg-green-50 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Upcoming wedding</p>
                    <p className="text-sm text-gray-500">
                      You have {vendorBookings.filter(b => new Date(b.serviceDate) > new Date()).length} upcoming events
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>How your services are performing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Profile Views</span>
                  <span className="text-sm font-medium text-gray-700">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Inquiry Rate</span>
                  <span className="text-sm font-medium text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Booking Conversion</span>
                  <span className="text-sm font-medium text-gray-700">{totalBookings > 0 ? "62%" : "0%"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: totalBookings > 0 ? "62%" : "0%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-gray-700">{totalBookings > 0 ? "92%" : "0%"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-wedding-gold h-2 rounded-full" style={{ width: totalBookings > 0 ? "92%" : "0%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </VendorLayout>
  );
};

export default VendorDashboard;

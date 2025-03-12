
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  UserCheck, 
  BarChart3, 
  Activity,
  ShoppingBag,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PriceCalculator from "@/components/admin/PriceCalculator";
import { useBookings } from "@/contexts/BookingContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  // Get bookings data and toast
  const { bookings } = useBookings();
  const { toast } = useToast();
  
  // State for dashboard stats
  const [totalBookings, setTotalBookings] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Update statistics when bookings change
  useEffect(() => {
    console.log('Initial dashboard load...');
    updateDashboardStats();
  }, []);

  // Watch for booking changes
  useEffect(() => {
    console.log('Bookings changed, updating dashboard...');
    updateDashboardStats();
    
    // Show toast notification for booking updates
    if (bookings.length > 0) {
      toast({
        title: "Dashboard Updated",
        description: `Dashboard statistics refreshed with latest ${bookings.length} bookings.`,
      });
    }
  }, [bookings]);

  // Function to update dashboard statistics
  const updateDashboardStats = () => {
    setTotalBookings(bookings.length);
    setConfirmedBookings(bookings.filter(booking => booking.status === 'confirmed').length);
    setPendingBookings(bookings.filter(booking => booking.status === 'pending').length);
    setCompletedBookings(bookings.filter(booking => booking.status === 'completed').length);
    
    // Calculate revenue from confirmed and completed bookings with paid status
    const revenue = bookings
      .filter(booking => booking.paymentStatus === 'paid')
      .reduce((total, booking) => total + booking.amount, 0);
    setTotalRevenue(revenue);
  };

  // Animation variants
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

  // Updated dashboard stats with real data
  const dashboardStats = [
    { title: "Total Vendors", value: "124", icon: <Store className="h-8 w-8 text-indigo-500" />, change: "+8 this month" },
    { 
      title: "Total Bookings", 
      value: totalBookings.toString(), 
      icon: <Calendar className="h-8 w-8 text-green-500" />, 
      change: `${pendingBookings} pending approval` 
    },
    { 
      title: "Active Users", 
      value: "4,628", 
      icon: <UserCheck className="h-8 w-8 text-blue-500" />, 
      change: "+324 this month" 
    },
    { 
      title: "Completed Bookings", 
      value: completedBookings.toString(), 
      icon: <CheckCircle className="h-8 w-8 text-yellow-500" />, 
      change: `${confirmedBookings} confirmed` 
    }
  ];

  // Mock data for pending vendors
  const pendingVendors = [
    { 
      id: 1, 
      name: "Luxury Events Venue", 
      category: "Venue", 
      submitted: "Sep 22, 2023", 
      status: "Pending Review"
    },
    { 
      id: 2, 
      name: "Gourmet Delights Catering", 
      category: "Caterer", 
      submitted: "Sep 21, 2023", 
      status: "Pending Review"
    },
    { 
      id: 3, 
      name: "Elite DJ Services", 
      category: "Entertainment", 
      submitted: "Sep 20, 2023", 
      status: "Pending Review"
    },
    { 
      id: 4, 
      name: "Perfect Moments Photography", 
      category: "Photographer", 
      submitted: "Sep 19, 2023", 
      status: "Pending Review"
    }
  ];

  const recentActivity = [
    { 
      id: 1, 
      action: "Vendor Approved", 
      details: "Floral Fantasy approved as Florist", 
      time: "2 hours ago",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    { 
      id: 2, 
      action: "Vendor Rejected", 
      details: "Subpar Services rejected due to incomplete profile", 
      time: "5 hours ago",
      icon: <XCircle className="h-5 w-5 text-red-500" />
    },
    { 
      id: 3, 
      action: "New Booking", 
      details: "Sarah & Michael booked Elegant Moments Photography", 
      time: "Yesterday, 3:45 PM",
      icon: <Calendar className="h-5 w-5 text-blue-500" />
    },
    { 
      id: 4, 
      action: "System Update", 
      details: "Platform maintenance completed successfully", 
      time: "Yesterday, 11:30 AM",
      icon: <Activity className="h-5 w-5 text-purple-500" />
    }
  ];

  return (
    <AdminLayout>
      {/* Header Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage and monitor the Wedding Vendor Liaison platform</p>
      </section>

      {/* Dashboard Stats */}
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

      {/* Price Calculator Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <PriceCalculator />
      </motion.section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Pending Vendor Approvals */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Pending Vendor Approvals</CardTitle>
              <CardDescription>Vendors waiting for review and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Vendor Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Submitted</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingVendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b">
                        <td className="py-4 px-2 font-medium">{vendor.name}</td>
                        <td className="py-4 px-2">{vendor.category}</td>
                        <td className="py-4 px-2">{vendor.submitted}</td>
                        <td className="py-4 px-2">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {vendor.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/admin/vendors">
                  <Button variant="link" className="text-wedding-navy">
                    View All Vendors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="flex space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 text-center">
                <Button variant="link" className="text-wedding-navy">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Statistics */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Key performance indicators for the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendor Categories</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-wedding-navy">12</p>
                      <p className="ml-2 text-sm text-green-500">+2 new</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Services Listed</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-wedding-navy">482</p>
                      <p className="ml-2 text-sm text-green-500">+35 this month</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Processing Fee Revenue</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-wedding-navy">${totalRevenue.toLocaleString()}</p>
                      <p className="ml-2 text-sm text-green-500">+12.5%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">User Growth</span>
                      <span className="text-sm font-medium text-gray-700">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Vendor Retention</span>
                      <span className="text-sm font-medium text-gray-700">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Booking Completion Rate</span>
                      <span className="text-sm font-medium text-gray-700">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">System Uptime</span>
                      <span className="text-sm font-medium text-gray-700">99.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-wedding-gold h-2 rounded-full" style={{ width: "99.8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </AdminLayout>
  );
};

export default AdminDashboard;

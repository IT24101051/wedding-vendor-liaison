
import VendorLayout from "@/components/layouts/VendorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, DollarSign, Users, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
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

  // Mock data
  const dashboardStats = [
    { title: "Total Bookings", value: "24", icon: <CalendarDays className="h-8 w-8 text-blue-500" />, change: "+12% from last month" },
    { title: "Revenue", value: "$12,580", icon: <DollarSign className="h-8 w-8 text-green-500" />, change: "+8% from last month" },
    { title: "New Inquiries", value: "8", icon: <Users className="h-8 w-8 text-purple-500" />, change: "5 pending responses" },
    { title: "Service Views", value: "547", icon: <Users className="h-8 w-8 text-amber-500" />, change: "+32% from last month" }
  ];

  const recentBookings = [
    { 
      id: 1, 
      couple: "Jessica & David", 
      date: "Sep 15, 2023", 
      service: "Full Day Photography", 
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-800"
    },
    { 
      id: 2, 
      couple: "Emma & John", 
      date: "Oct 3, 2023", 
      service: "Wedding Photography + Video", 
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    { 
      id: 3, 
      couple: "Sarah & Michael", 
      date: "Aug 28, 2023", 
      service: "Engagement Photos", 
      status: "Completed",
      statusColor: "bg-blue-100 text-blue-800"
    },
    { 
      id: 4, 
      couple: "Rachel & Thomas", 
      date: "Nov 12, 2023", 
      service: "Full Day Photography", 
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <VendorLayout>
      {/* Welcome Section */}
      <section className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-wedding-navy">Welcome back, Elegant Moments Photography</h1>
            <p className="text-gray-600">Here's what's happening with your business today</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
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

      {/* Recent Bookings */}
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
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Couple</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Service</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-4 px-2">{booking.couple}</td>
                      <td className="py-4 px-2">{booking.date}</td>
                      <td className="py-4 px-2">{booking.service}</td>
                      <td className="py-4 px-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${booking.statusColor}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
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

      {/* Pending Tasks */}
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
              <li className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-md">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Response needed for 3 inquiries</p>
                  <p className="text-sm text-gray-500">Couples are waiting for your response</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Complete your profile</p>
                  <p className="text-sm text-gray-500">Add more photos to increase visibility</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 p-3 bg-green-50 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Upcoming wedding this weekend</p>
                  <p className="text-sm text-gray-500">Jessica & David on September 15th</p>
                </div>
              </li>
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
                  <span className="text-sm font-medium text-gray-700">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-gray-700">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-wedding-gold h-2 rounded-full" style={{ width: "92%" }}></div>
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


import UserLayout from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Heart, Flag, Star, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserHome = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
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

  const vendorCategories = [
    { name: "Photographers", icon: <Search className="h-6 w-6" />, count: 45 },
    { name: "Venues", icon: <Flag className="h-6 w-6" />, count: 32 },
    { name: "Caterers", icon: <Gift className="h-6 w-6" />, count: 28 },
    { name: "Florists", icon: <Heart className="h-6 w-6" />, count: 19 },
    { name: "Musicians", icon: <Star className="h-6 w-6" />, count: 23 },
    { name: "Planners", icon: <Calendar className="h-6 w-6" />, count: 17 }
  ];

  const featuredVendors = [
    {
      id: 1,
      name: "Elegant Moments Photography",
      category: "Photographer",
      rating: 4.9,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$1,200 - $3,000",
    },
    {
      id: 2,
      name: "Royal Garden Venue",
      category: "Venue",
      rating: 4.8,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$5,000 - $15,000",
    },
    {
      id: 3,
      name: "Divine Cuisine Catering",
      category: "Caterer",
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$45 - $120 per person",
    },
    {
      id: 4,
      name: "Blooming Beauty Florals",
      category: "Florist",
      rating: 4.9,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1561128290-006dc4827214?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$800 - $2,500",
    }
  ];

  return (
    <UserLayout>
      {/* Hero Section */}
      <section className="relative bg-wedding-blush pt-20 pb-32">
        <div className="wedding-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-wedding-navy mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Perfect Wedding Starts Here
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Find and book the best vendors for your special day
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/user/vendors">
                <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90 text-lg px-8 py-6">
                  Find Vendors
                </Button>
              </Link>
              <Link to="/user/bookings">
                <Button variant="outline" className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/10 text-lg px-8 py-6">
                  My Bookings
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-wedding-light" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}></div>
      </section>
      
      {/* Vendor Categories */}
      <section className="py-16 bg-wedding-light">
        <div className="wedding-container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-wedding-navy mb-4">Browse Vendor Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From photographers to venues, find everything you need for your perfect day
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {vendorCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to="/user/vendors">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-wedding-blush rounded-full mb-4 text-wedding-navy">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-wedding-navy mb-2">{category.name}</h3>
                      <p className="text-gray-500">{category.count} vendors</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Vendors */}
      <section className="py-16 bg-white">
        <div className="wedding-container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-wedding-navy mb-4">Featured Vendors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our top-rated professionals to make your wedding unforgettable
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredVendors.map((vendor) => (
              <motion.div key={vendor.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
                  <div className="aspect-w-3 aspect-h-2">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-wedding-gold/20 text-wedding-navy text-xs font-semibold px-2.5 py-1 rounded">
                        {vendor.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-wedding-navy mb-2">{vendor.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{vendor.price}</p>
                    <Link to={`/user/vendors/${vendor.id}`}>
                      <Button className="w-full bg-wedding-blush text-wedding-navy hover:bg-wedding-blush/90">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/user/vendors">
              <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90">
                View All Vendors
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-wedding-blush/50">
        <div className="wedding-container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-wedding-navy mb-4">What Couples Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from couples who found their perfect vendors through our platform
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    "We found our photographer through this platform and couldn't be happier with the results. The process was so simple and stress-free!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-semibold text-wedding-navy">Sarah & Michael</p>
                      <p className="text-sm text-gray-500">Married May 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    "The vendor management system made it so easy to compare options and prices. We saved so much time and found the perfect venue!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-semibold text-wedding-navy">Jessica & David</p>
                      <p className="text-sm text-gray-500">Married June 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    "I can't imagine planning our wedding without this platform. All our vendors were amazing and the booking process was seamless."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-semibold text-wedding-navy">Emily & James</p>
                      <p className="text-sm text-gray-500">Married August 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-wedding-navy text-white">
        <div className="wedding-container text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Plan Your Dream Wedding?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Start exploring our vendor marketplace today and find the perfect match for your special day
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/user/vendors">
              <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90 text-lg px-8 py-6">
                Browse Vendors Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </UserLayout>
  );
};

export default UserHome;

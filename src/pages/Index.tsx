
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, ShoppingBag, Shield } from "lucide-react";

const Index = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
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

  return (
    <div className="min-h-screen flex flex-col bg-wedding-light font-body">
      {/* Hero Section */}
      <header className="relative py-32 bg-gradient-to-r from-wedding-blush to-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#F8D7DA,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#D4AF37,transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-wedding-navy mb-6 leading-tight">
              Your Perfect Wedding Journey Begins Here
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find and book the best wedding vendors to create memories that will last a lifetime
            </p>
            <Link to="/user/vendors">
              <motion.button 
                className="bg-wedding-gold hover:bg-opacity-90 text-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Vendors
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,192L48,170.7C96,149,192,107,288,112C384,117,480,171,576,181.3C672,192,768,160,864,165.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-wedding-navy mb-4">
              Plan Your Special Day With Ease
            </h2>
            <p className="text-gray-600">
              Our comprehensive platform makes wedding planning simple, organized, and stress-free
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-wedding-gold" />,
                title: "Find Your Perfect Match",
                description: "Browse hundreds of wedding vendors filtered by your preferences and budget"
              },
              {
                icon: <ShoppingBag className="h-10 w-10 text-wedding-gold" />,
                title: "Book Services Online",
                description: "Schedule appointments, make reservations, and secure the best vendors in minutes"
              },
              {
                icon: <Users className="h-10 w-10 text-wedding-gold" />,
                title: "Vendor Collaboration",
                description: "Connect directly with your vendors through our messaging platform"
              },
              {
                icon: <Shield className="h-10 w-10 text-wedding-gold" />,
                title: "Secure Payments",
                description: "Make deposits and payments safely through our protected payment system"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-wedding-blush bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-wedding-navy mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interface Selection Section */}
      <motion.section 
        className="py-20 bg-wedding-light"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-wedding-navy mb-4">
              Choose Your Journey
            </h2>
            <p className="text-gray-600">
              Whether you're planning your wedding, offering vendor services, or managing the platform,
              we have the perfect interface for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Interface Card */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full ${
                  activeCard === 'user' ? 'ring-2 ring-wedding-gold' : ''
                }`}
                onClick={() => setActiveCard('user')}
              >
                <div className="h-48 bg-gradient-to-r from-wedding-blush to-white flex items-center justify-center">
                  <Users className="h-20 w-20 text-wedding-navy opacity-30" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-wedding-navy mb-4">For Couples</h3>
                  <p className="text-gray-600 mb-6">
                    Find and book the perfect vendors for your special day. Browse services, read reviews,
                    and manage your wedding planning in one place.
                  </p>
                  <Link to="/user/login" className="block mt-auto">
                    <button className="w-full bg-wedding-navy hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-colors">
                      Enter as Couple
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Vendor Interface Card */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full ${
                  activeCard === 'vendor' ? 'ring-2 ring-wedding-gold' : ''
                }`}
                onClick={() => setActiveCard('vendor')}
              >
                <div className="h-48 bg-gradient-to-r from-wedding-gold/20 to-white flex items-center justify-center">
                  <ShoppingBag className="h-20 w-20 text-wedding-gold opacity-30" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-wedding-navy mb-4">For Vendors</h3>
                  <p className="text-gray-600 mb-6">
                    Showcase your services to engaged couples. Manage your business profile, service offerings,
                    and bookings efficiently.
                  </p>
                  <div className="flex flex-col space-y-3 mt-auto">
                    <Link to="/vendor/login" className="block">
                      <button className="w-full bg-wedding-gold hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-colors">
                        Login as Vendor
                      </button>
                    </Link>
                    <Link to="/vendor/register" className="block">
                      <button className="w-full border border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 px-6 py-3 rounded-md transition-colors">
                        Register as Vendor
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Admin Interface Card */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full ${
                  activeCard === 'admin' ? 'ring-2 ring-wedding-gold' : ''
                }`}
                onClick={() => setActiveCard('admin')}
              >
                <div className="h-48 bg-gradient-to-r from-wedding-navy/10 to-white flex items-center justify-center">
                  <Shield className="h-20 w-20 text-wedding-navy opacity-30" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-wedding-navy mb-4">For Administrators</h3>
                  <p className="text-gray-600 mb-6">
                    Manage the entire platform. Approve vendors, oversee bookings,
                    and ensure smooth operations of the wedding planning system.
                  </p>
                  <Link to="/admin/login" className="block mt-auto">
                    <button className="w-full bg-wedding-navy hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-colors">
                      Admin Access
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Java Backend Banner */}
      <div className="bg-wedding-navy text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wedding-gold">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="font-medium text-white">Our wedding services are now fully powered by a Java backend!</p>
            </div>
            <Link to="/user/vendors">
              <button className="bg-wedding-gold hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium text-sm transition-all">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-wedding-navy text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0 max-w-sm">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-wedding-gold mr-2" />
                <span className="text-2xl font-display font-bold">Wedding Vendor Liaison</span>
              </div>
              <p className="text-gray-300 mb-4">
                Making wedding planning easier by connecting couples with the perfect vendors for their special day.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-lg font-medium mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/user" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/user/vendors" className="text-gray-300 hover:text-white transition-colors">Find Vendors</Link></li>
                  <li><Link to="/user/bookings" className="text-gray-300 hover:text-white transition-colors">My Bookings</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-medium mb-4 text-white">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="/user/help-center" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/user/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link to="/user/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Wedding Vendor Liaison. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

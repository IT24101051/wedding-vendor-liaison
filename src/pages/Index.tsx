
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col bg-wedding-light">
      {/* Hero Section */}
      <header className="py-16 bg-gradient-to-r from-wedding-blush to-white">
        <div className="wedding-container text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-wedding-navy mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Wedding Vendor Liaison
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your comprehensive platform for planning the perfect wedding with the best vendors
          </motion.p>
        </div>
      </header>

      {/* Interface Selection */}
      <motion.section 
        className="flex-grow py-16 wedding-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-wedding-navy">Choose Your Interface</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Interface Card */}
          <motion.div variants={itemVariants}>
            <Card 
              className={`h-full cursor-pointer transition-all ${
                activeCard === 'user' ? 'ring-4 ring-wedding-gold' : 'hover:shadow-xl'
              }`}
              onClick={() => setActiveCard('user')}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-4 text-wedding-navy">For Couples</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Find and book the perfect vendors for your special day. Browse services, read reviews, and manage your wedding planning in one place.
                </p>
                <Link to="/user/login" className="mt-auto">
                  <Button className="w-full bg-wedding-blush text-wedding-navy hover:bg-wedding-blush/90">
                    Enter as Couple
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vendor Interface Card */}
          <motion.div variants={itemVariants}>
            <Card 
              className={`h-full cursor-pointer transition-all ${
                activeCard === 'vendor' ? 'ring-4 ring-wedding-gold' : 'hover:shadow-xl'
              }`}
              onClick={() => setActiveCard('vendor')}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-4 text-wedding-navy">For Vendors</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Showcase your services to engaged couples. Manage your business profile, service offerings, and bookings efficiently.
                </p>
                <div className="flex flex-col space-y-3 mt-auto">
                  <Link to="/vendor/login">
                    <Button className="w-full bg-wedding-gold text-white hover:bg-wedding-gold/90">
                      Login as Vendor
                    </Button>
                  </Link>
                  <Link to="/vendor/register">
                    <Button variant="outline" className="w-full border-wedding-gold text-wedding-navy">
                      Register as Vendor
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Admin Interface Card */}
          <motion.div variants={itemVariants}>
            <Card 
              className={`h-full cursor-pointer transition-all ${
                activeCard === 'admin' ? 'ring-4 ring-wedding-gold' : 'hover:shadow-xl'
              }`}
              onClick={() => setActiveCard('admin')}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-4 text-wedding-navy">For Administrators</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Manage the entire platform. Approve vendors, oversee bookings, and ensure smooth operations of the wedding planning system.
                </p>
                <Link to="/admin/login" className="mt-auto">
                  <Button className="w-full bg-wedding-navy text-white hover:bg-wedding-navy/90">
                    Admin Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 bg-wedding-navy text-white">
        <div className="wedding-container text-center">
          <p>© 2023 Wedding Vendor Liaison. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

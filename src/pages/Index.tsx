
import { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Blue Strap/Banner */}
      <div className="bg-primary py-3 text-white text-center shadow">
        <div className="container">
          <p className="fw-medium mb-0">Our wedding services are now fully powered by a Java backend!</p>
        </div>
      </div>
      
      {/* Hero Section */}
      <header className="py-5 bg-gradient">
        <div className="container text-center">
          <motion.h1 
            className="display-4 fw-bold text-dark mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Wedding Vendor Liaison
          </motion.h1>
          <motion.p 
            className="fs-4 text-secondary mb-4 mx-auto"
            style={{ maxWidth: "800px" }}
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
        className="flex-grow-1 py-5 container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="fs-1 fw-bold text-center mb-5 text-dark">Choose Your Interface</h2>
        
        <div className="row g-4">
          {/* User Interface Card */}
          <motion.div className="col-md-4" variants={itemVariants}>
            <div 
              className={`card h-100 ${
                activeCard === 'user' ? 'border-primary border-3' : ''
              }`}
              onClick={() => setActiveCard('user')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body d-flex flex-column p-4">
                <h3 className="fs-4 fw-semibold mb-3 text-dark">For Couples</h3>
                <p className="text-secondary mb-4 flex-grow-1">
                  Find and book the perfect vendors for your special day. Browse services, read reviews, and manage your wedding planning in one place.
                </p>
                <Link to="/user/login" className="mt-auto">
                  <button className="btn btn-primary w-100">
                    Enter as Couple
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Vendor Interface Card */}
          <motion.div className="col-md-4" variants={itemVariants}>
            <div 
              className={`card h-100 ${
                activeCard === 'vendor' ? 'border-primary border-3' : ''
              }`}
              onClick={() => setActiveCard('vendor')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body d-flex flex-column p-4">
                <h3 className="fs-4 fw-semibold mb-3 text-dark">For Vendors</h3>
                <p className="text-secondary mb-4 flex-grow-1">
                  Showcase your services to engaged couples. Manage your business profile, service offerings, and bookings efficiently.
                </p>
                <div className="d-flex flex-column gap-2 mt-auto">
                  <Link to="/vendor/login" className="w-100">
                    <button className="btn btn-warning text-white w-100">
                      Login as Vendor
                    </button>
                  </Link>
                  <Link to="/vendor/register" className="w-100">
                    <button className="btn btn-outline-primary w-100">
                      Register as Vendor
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Admin Interface Card */}
          <motion.div className="col-md-4" variants={itemVariants}>
            <div 
              className={`card h-100 ${
                activeCard === 'admin' ? 'border-primary border-3' : ''
              }`}
              onClick={() => setActiveCard('admin')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body d-flex flex-column p-4">
                <h3 className="fs-4 fw-semibold mb-3 text-dark">For Administrators</h3>
                <p className="text-secondary mb-4 flex-grow-1">
                  Manage the entire platform. Approve vendors, oversee bookings, and ensure smooth operations of the wedding planning system.
                </p>
                <Link to="/admin/login" className="mt-auto">
                  <button className="btn btn-primary w-100">
                    Admin Access
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-4 bg-primary text-white">
        <div className="container text-center">
          <p className="mb-0">© 2023 Wedding Vendor Liaison. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

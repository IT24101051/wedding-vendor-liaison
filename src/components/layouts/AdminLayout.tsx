
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-wedding-navy shadow-md">
        <div className="wedding-container py-4">
          <div className="flex justify-between items-center">
            {/* Logo and brand */}
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-wedding-gold" />
              <span className="text-2xl font-display font-semibold text-white">Admin Dashboard</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/admin/dashboard" 
                className={`text-gray-300 hover:text-white transition-colors ${
                  isActive('/admin/dashboard') ? 'font-semibold text-white' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/vendors" 
                className={`text-gray-300 hover:text-white transition-colors ${
                  isActive('/admin/vendors') ? 'font-semibold text-white' : ''
                }`}
              >
                Vendors
              </Link>
              <Link 
                to="/admin/bookings" 
                className={`text-gray-300 hover:text-white transition-colors ${
                  isActive('/admin/bookings') ? 'font-semibold text-white' : ''
                }`}
              >
                Bookings
              </Link>
              <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-wedding-navy/80"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/admin/dashboard" 
                  className={`text-gray-300 hover:text-white transition-colors ${
                    isActive('/admin/dashboard') ? 'font-semibold text-white' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/admin/vendors" 
                  className={`text-gray-300 hover:text-white transition-colors ${
                    isActive('/admin/vendors') ? 'font-semibold text-white' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vendors
                </Link>
                <Link 
                  to="/admin/bookings" 
                  className={`text-gray-300 hover:text-white transition-colors ${
                    isActive('/admin/bookings') ? 'font-semibold text-white' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
                <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90 w-full">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="wedding-container">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-wedding-navy text-white py-4 border-t border-gray-700">
        <div className="wedding-container text-center">
          <p>© 2023 Wedding Vendor Liaison Admin Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

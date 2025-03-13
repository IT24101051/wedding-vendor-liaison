
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Store,
  LayoutDashboard,
  User,
  ListPlus,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Check if user is authenticated as vendor
  useEffect(() => {
    if (!isAuthenticated('vendor')) {
      navigate('/vendor/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    console.log("Logging out vendor...");
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of your vendor account"
    });
    // Navigate after logout
    navigate('/vendor/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wedding-navy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-wedding-light">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="wedding-container py-4">
          <div className="flex justify-between items-center">
            {/* Logo and brand */}
            <Link to="/vendor/dashboard" className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-wedding-gold" />
              <span className="text-2xl font-display font-semibold text-wedding-navy">Vendor Portal</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/vendor/dashboard" 
                className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                  isActive('/vendor/dashboard') ? 'font-semibold text-wedding-navy' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/vendor/profile" 
                className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                  isActive('/vendor/profile') ? 'font-semibold text-wedding-navy' : ''
                }`}
              >
                Profile
              </Link>
              <Link 
                to="/vendor/services" 
                className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                  isActive('/vendor/services') ? 'font-semibold text-wedding-navy' : ''
                }`}
              >
                Services
              </Link>
              <Link 
                to="/vendor/bookings" 
                className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                  isActive('/vendor/bookings') ? 'font-semibold text-wedding-navy' : ''
                }`}
              >
                Bookings
              </Link>
              <Button 
                onClick={handleLogout}
                className="bg-wedding-gold text-white hover:bg-wedding-gold/90"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                  to="/vendor/dashboard" 
                  className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                    isActive('/vendor/dashboard') ? 'font-semibold text-wedding-navy' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/vendor/profile" 
                  className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                    isActive('/vendor/profile') ? 'font-semibold text-wedding-navy' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/vendor/services" 
                  className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                    isActive('/vendor/services') ? 'font-semibold text-wedding-navy' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/vendor/bookings" 
                  className={`text-gray-600 hover:text-wedding-navy transition-colors ${
                    isActive('/vendor/bookings') ? 'font-semibold text-wedding-navy' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
                <Button 
                  onClick={handleLogout}
                  className="bg-wedding-gold text-white hover:bg-wedding-gold/90 w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-wedding-navy text-white py-6">
        <div className="wedding-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2023 Wedding Vendor Liaison. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

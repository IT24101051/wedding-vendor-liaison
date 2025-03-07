
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newNotifications, setNewNotifications] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated('admin')) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Simulate real-time updates
  useEffect(() => {
    const randomNotifications = [
      "New vendor registered: Jane's Catering Service",
      "Price change alert: Premier Venues increased rates by 5%",
      "New booking request: Wedding ceremony on June 15, 2023",
      "Support ticket opened: Payment issue with booking #1234",
      "System alert: Backup completed successfully"
    ];

    // Initial notifications
    setNotifications(randomNotifications.slice(0, 3));

    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomNotifications.length);
      const newNotification = randomNotifications[randomIndex];
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNewNotifications(prev => prev + 1);
      
      toast({
        title: "New Update",
        description: newNotification,
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [toast]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleClearNotifications = () => {
    setNewNotifications(0);
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
              <div className="relative" onClick={handleClearNotifications}>
                <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                {newNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {newNotifications}
                  </Badge>
                )}
              </div>
              <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90" onClick={handleLogout}>
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
                <div className="flex items-center space-x-2" onClick={handleClearNotifications}>
                  <Bell className="h-5 w-5 text-gray-300" />
                  <span className="text-gray-300">Notifications</span>
                  {newNotifications > 0 && (
                    <Badge className="bg-red-500">{newNotifications}</Badge>
                  )}
                </div>
                <Button className="bg-wedding-gold text-white hover:bg-wedding-gold/90 w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* User welcome and notifications */}
      {user && (
        <div className="bg-gray-100 border-b">
          <div className="wedding-container py-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-lg font-medium">Welcome, {user.name}</h2>
                <p className="text-sm text-gray-600">Access level: Administrator</p>
              </div>
              
              {notifications.length > 0 && (
                <div className="mt-3 md:mt-0 text-sm max-w-md">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-wedding-gold mr-2" />
                    <span className="font-medium">Latest update:</span>
                  </div>
                  <p className="text-gray-600 truncate">{notifications[0]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
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

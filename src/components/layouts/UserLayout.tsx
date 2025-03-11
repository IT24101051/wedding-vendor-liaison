
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Home, ChevronRight, LogOut, Package, MessageSquare, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import NotificationCenter from "@/components/notifications/NotificationCenter";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  // Menu items for easy navigation
  const menuItems = [
    { name: "Home", path: "/user", icon: <Home className="h-5 w-5 mr-2" /> },
    { name: "Vendors", path: "/user/vendors", icon: <Package className="h-5 w-5 mr-2" /> },
    { name: "My Bookings", path: "/user/bookings", icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: "Messages", path: "#", icon: <MessageSquare className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-wedding-light flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/user" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-wedding-gold" />
              <span className="text-2xl font-display font-bold text-wedding-navy">Wedding Vendor Liaison</span>
            </Link>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated('user') ? (
                <>
                  <NotificationCenter />
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 hidden md:inline">Hello, {user?.name}</span>
                    <Button 
                      variant="ghost" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Logout</span>
                    </Button>
                  </div>
                </>
              ) : (
                <Link to="/user/login">
                  <Button className="bg-wedding-navy">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-4">
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-gray-100 ${
                      location.pathname === item.path ? "text-wedding-navy font-medium" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Page Title / Breadcrumbs */}
      {location.pathname !== "/user" && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/user" className="hover:text-wedding-navy">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-wedding-navy font-medium">
                {location.pathname.split("/")[2]?.charAt(0).toUpperCase() + location.pathname.split("/")[2]?.slice(1) || "Page"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-wedding-navy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-wedding-gold" />
                <span className="text-xl font-display font-bold">Wedding Vendor Liaison</span>
              </div>
              <p className="text-gray-300 max-w-md">
                Making wedding planning easier by connecting couples with the perfect vendors for their special day.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/user" className="text-gray-300 hover:text-white">Home</Link></li>
                  <li><Link to="/user/vendors" className="text-gray-300 hover:text-white">Find Vendors</Link></li>
                  <li><Link to="/user/bookings" className="text-gray-300 hover:text-white">My Bookings</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Vendor Types</h3>
                <ul className="space-y-2">
                  <li><Link to="/user/vendors?category=photography" className="text-gray-300 hover:text-white">Photography</Link></li>
                  <li><Link to="/user/vendors?category=venue" className="text-gray-300 hover:text-white">Venues</Link></li>
                  <li><Link to="/user/vendors?category=catering" className="text-gray-300 hover:text-white">Catering</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="/user/help-center" className="text-gray-300 hover:text-white">Help Center</Link></li>
                  <li><Link to="/user/contact-us" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                  <li><Link to="/user/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
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

export default UserLayout;


import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorFooter } from "@/components/vendor/VendorFooter";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
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

  const handleLogout = () => {
    console.log("Logging out vendor...");
    // First execute logout to clear authentication state
    logout();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of your vendor account"
    });
    
    // Make sure navigation happens after state updates
    setTimeout(() => {
      navigate('/vendor/login');
    }, 100);
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
      <VendorHeader onLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      <VendorFooter />
    </div>
  );
}

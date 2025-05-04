
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, Menu, X, LogOut } from "lucide-react";
import { VendorNavItems } from "./VendorNavItems";
import { useAuth } from "@/contexts/AuthContext";

type VendorHeaderProps = {
  onLogout: () => void;
};

export const VendorHeader = ({ onLogout }: VendorHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
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
            <VendorNavItems />
            <Button 
              onClick={onLogout}
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
              <VendorNavItems onItemClick={closeMobileMenu} />
              <Button 
                onClick={() => {
                  closeMobileMenu();
                  onLogout();
                }}
                className="bg-wedding-gold text-white hover:bg-wedding-gold/90 w-full"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

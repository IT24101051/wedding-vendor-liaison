
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

type VendorNavItemProps = {
  to: string;
  label: string;
  onClick?: () => void;
};

export const VendorNavItem = ({ to, label, onClick }: VendorNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`text-gray-600 hover:text-wedding-navy transition-colors ${
        isActive ? 'font-semibold text-wedding-navy' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export const VendorNavItems = ({ 
  onItemClick 
}: { 
  onItemClick?: () => void 
}) => {
  return (
    <>
      <VendorNavItem to="/vendor/dashboard" label="Dashboard" onClick={onItemClick} />
      <VendorNavItem to="/vendor/profile" label="Profile" onClick={onItemClick} />
      <VendorNavItem to="/vendor/services" label="Services" onClick={onItemClick} />
      <VendorNavItem to="/vendor/bookings" label="Bookings" onClick={onItemClick} />
    </>
  );
};

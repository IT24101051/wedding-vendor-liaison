
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserType } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredType?: UserType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredType 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wedding-navy"></div>
    </div>;
  }

  // If not authenticated or wrong user type, redirect to login
  if (!isAuthenticated(requiredType)) {
    // Redirect to the appropriate login page based on the required type
    let loginPath = "/user/login";
    if (requiredType === "vendor") {
      loginPath = "/vendor/login";
    } else if (requiredType === "admin") {
      loginPath = "/admin/login";
    }
    
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // If authenticated with the correct type, render the children
  return <>{children}</>;
};

export default ProtectedRoute;

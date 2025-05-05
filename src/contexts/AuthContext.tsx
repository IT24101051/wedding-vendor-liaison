
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BookingProvider } from './BookingContext';
import JavaBackendService from '@/services/JavaBackendService';

// Define user types
export type UserType = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  register: (userData: { email: string, password: string, name: string, type: UserType }) => Promise<boolean>;
  isAuthenticated: (requiredType?: UserType) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const { authenticated, user: authUser } = await JavaBackendService.checkAuthStatus();
        if (authenticated && authUser) {
          // Convert Java backend role to frontend type
          setUser({
            id: authUser.id,
            name: authUser.name,
            email: authUser.email,
            type: authUser.role as UserType
          });
        }
      } catch (e) {
        console.error("Error checking auth status:", e);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setLoading(true);
    
    try {
      const { success, user: loggedInUser } = await JavaBackendService.login(email, password, userType);
      
      setLoading(false);
      
      if (success && loggedInUser) {
        // Convert Java backend role to frontend type
        setUser({
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          type: loggedInUser.role as UserType
        });
        return true;
      }
      
      return false;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  // Registration function
  const register = async (userData: { email: string, password: string, name: string, type: UserType }): Promise<boolean> => {
    setLoading(true);
    
    try {
      const { success, user: registeredUser } = await JavaBackendService.register({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.type
      });
      
      setLoading(false);
      
      if (success && registeredUser) {
        // Convert Java backend role to frontend type
        setUser({
          id: registeredUser.id,
          name: registeredUser.name,
          email: registeredUser.email,
          type: registeredUser.role as UserType
        });
        return true;
      }
      
      return false;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { success } = await JavaBackendService.logout();
      if (success) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "There was a problem logging out. Please try again.",
      });
    }
  };

  // Check authentication status
  const isAuthenticated = (requiredType?: UserType) => {
    if (!user) return false;
    if (requiredType) return user.type === requiredType;
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated }}>
      <BookingProvider>
        {children}
      </BookingProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

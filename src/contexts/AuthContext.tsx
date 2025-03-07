
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  isAuthenticated: (requiredType?: UserType) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = {
  user: { id: 'user1', name: 'Demo Client', email: 'client@example.com', password: 'password', type: 'user' as UserType },
  vendor: { id: 'vendor1', name: 'Elegant Moments Photography', email: 'vendor@example.com', password: 'password', type: 'vendor' as UserType },
  admin: { id: 'admin1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', type: 'admin' as UserType }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('wedding_app_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('wedding_app_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockUser;
        
        switch (userType) {
          case 'user':
            if (email === MOCK_USERS.user.email && password === MOCK_USERS.user.password) {
              mockUser = { ...MOCK_USERS.user };
              delete (mockUser as any).password;
            }
            break;
          case 'vendor':
            if (email === MOCK_USERS.vendor.email && password === MOCK_USERS.vendor.password) {
              mockUser = { ...MOCK_USERS.vendor };
              delete (mockUser as any).password;
            }
            break;
          case 'admin':
            if (email === MOCK_USERS.admin.email && password === MOCK_USERS.admin.password) {
              mockUser = { ...MOCK_USERS.admin };
              delete (mockUser as any).password;
            }
            break;
        }

        setLoading(false);
        
        if (mockUser) {
          setUser(mockUser);
          localStorage.setItem('wedding_app_user', JSON.stringify(mockUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${mockUser.name}!`,
          });
          resolve(true);
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password",
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wedding_app_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Check authentication status
  const isAuthenticated = (requiredType?: UserType) => {
    if (!user) return false;
    if (requiredType) return user.type === requiredType;
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
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

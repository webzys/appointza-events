
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'basic' | 'verified' | 'premium';
  isAadhaarVerified: boolean;
  subscriptionTier: string;
  subscriptionStatus: string;
  subscriptionEnd: string;
}

interface AuthContextType {
  user: User | null;
  login: (credential: string, password?: string, otp?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users data
const demoUsers: Record<string, User> = {
  'john@example.com': {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    type: 'basic',
    isAadhaarVerified: false,
    subscriptionTier: 'Basic',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  },
  '+919876543210': {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    type: 'basic',
    isAadhaarVerified: false,
    subscriptionTier: 'Basic',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  },
  'priya.verified@example.com': {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.verified@example.com',
    phone: '+91 9876543211',
    type: 'verified',
    isAadhaarVerified: true,
    subscriptionTier: 'Standard',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  },
  '+919876543211': {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.verified@example.com',
    phone: '+91 9876543211',
    type: 'verified',
    isAadhaarVerified: true,
    subscriptionTier: 'Standard',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  },
  'rajesh.premium@example.com': {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.premium@example.com',
    phone: '+91 9876543212',
    type: 'premium',
    isAadhaarVerified: true,
    subscriptionTier: 'Premium',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  },
  '+919876543212': {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.premium@example.com',
    phone: '+91 9876543212',
    type: 'premium',
    isAadhaarVerified: true,
    subscriptionTier: 'Premium',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-12-31'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credential: string, password?: string, otp?: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = demoUsers[credential];
    if (foundUser) {
      // For demo purposes, accept any password for email or correct OTP for phone
      const isEmailLogin = credential.includes('@');
      const isValidLogin = isEmailLogin || otp === '123456';
      
      if (isValidLogin) {
        setUser(foundUser);
        localStorage.setItem('authUser', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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

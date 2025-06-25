
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isAadhaarVerified: boolean;
  subscriptionTier: 'Basic' | 'Premium' | 'None';
  subscriptionStatus: 'active' | 'inactive';
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email?: string; phone?: string; otp?: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    isAadhaarVerified: false,
    subscriptionTier: 'Basic',
    subscriptionStatus: 'active'
  },
  {
    id: "user2", 
    name: "Priya Verified",
    email: "priya.verified@example.com",
    phone: "+91 9876543211",
    isAadhaarVerified: true,
    subscriptionTier: 'Basic',
    subscriptionStatus: 'active'
  },
  {
    id: "user3",
    name: "Rajesh Premium",
    email: "rajesh.premium@example.com",
    phone: "+91 9876543212",
    isAadhaarVerified: true,
    subscriptionTier: 'Premium',
    subscriptionStatus: 'active'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: { email?: string; phone?: string; otp?: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser: User | undefined;
    
    if (credentials.email) {
      // Email login
      foundUser = demoUsers.find(u => u.email === credentials.email);
    } else if (credentials.phone && credentials.otp === '123456') {
      // Mobile OTP login (demo OTP is always 123456)
      foundUser = demoUsers.find(u => u.phone === credentials.phone);
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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

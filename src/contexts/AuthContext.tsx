
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define user roles
export type UserRole = 'superadmin' | 'admin' | 'warehouse' | 'dealer' | 'agent' | 'store';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Authentication context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Demo users for testing
const demoUsers = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@cddiller.com',
    password: 'superadmin123',
    role: 'superadmin' as UserRole,
    avatar: '/assets/avatars/superadmin.png',
  },
  {
    id: '2',
    name: 'Admin',
    email: 'admin@cddiller.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: '/assets/avatars/admin.png',
  },
  {
    id: '3',
    name: 'Warehouse Manager',
    email: 'warehouse@cddiller.com',
    password: 'warehouse123',
    role: 'warehouse' as UserRole,
    avatar: '/assets/avatars/warehouse.png',
  },
  {
    id: '4',
    name: 'Dealer',
    email: 'dealer@cddiller.com',
    password: 'dealer123',
    role: 'dealer' as UserRole,
    avatar: '/assets/avatars/dealer.png',
  },
  {
    id: '5',
    name: 'Agent',
    email: 'agent@cddiller.com',
    password: 'agent123',
    role: 'agent' as UserRole,
    avatar: '/assets/avatars/agent.png',
  },
  {
    id: '6',
    name: 'Store',
    email: 'store@cddiller.com',
    password: 'store123',
    role: 'store' as UserRole,
    avatar: '/assets/avatars/store.png',
  },
];

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = demoUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (matchedUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast({
          title: 'Login successful',
          description: `Welcome back, ${userWithoutPassword.name}!`,
        });
        return true;
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

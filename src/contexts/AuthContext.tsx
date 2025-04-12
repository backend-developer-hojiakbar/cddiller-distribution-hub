
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase, User } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

// Define user roles
export type UserRole = 'superadmin' | 'admin' | 'warehouse' | 'dealer' | 'agent' | 'store';

// Authentication context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
  session: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Supabase auth
  useEffect(() => {
    setIsLoading(true);
    
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Current session:', session);
      setSession(session);
      
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    }).catch(error => {
      console.error('Error getting session:', error);
      setIsLoading(false);
    });

    // Set up auth change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        setSession(newSession);
        
        if (newSession) {
          await fetchUserProfile(newSession.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch user profile data from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      if (data) {
        console.log('User profile data:', data);
        setUser(data as User);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }
      
      console.log('Login successful:', data);
      if (data.user) {
        toast({
          title: 'Login successful',
          description: `Welcome back!`,
        });
        return true;
      }
      
      return false;
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

  const logout = async () => {
    try {
      console.log('Logging out');
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Define user roles
export type UserRole = 'superadmin' | 'admin' | 'warehouse' | 'dealer' | 'agent' | 'store';

// User profile type that matches our expected database structure
export type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  avatar_url?: string | null;
  phone?: string | null;
  address?: string | null;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
};

// Authentication context type
interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  createSuperadmin: (email: string, password: string, name: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
  session: null,
  createSuperadmin: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      // Mock user profile for now since we don't have DB setup
      const mockProfile: UserProfile = {
        id: userId,
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(mockProfile);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setIsLoading(false);
    }
  };

  // Initialize Supabase auth
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        setSession(newSession);
        
        if (newSession) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(() => {
            fetchUserProfile(newSession.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
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
    
    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
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
        // Mock profile check for now
        const mockProfile = {
          id: data.user.id,
          name: 'Demo User',
          email: data.user.email,
          role: 'admin' as UserRole,
          status: 'active' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Check if user is inactive
        if (mockProfile.status === 'inactive') {
          toast({
            title: 'Account inactive',
            description: 'Your account has been deactivated. Please contact an administrator.',
            variant: 'destructive',
          });
          await supabase.auth.signOut();
          return false;
        }
        
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

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Attempting signup for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          title: 'Signup failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }
      
      console.log('Signup successful:', data);
      if (data.user) {
        // Manually create profile in case trigger doesn't work
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id,
                name, 
                email,
                role,
                status: 'pending',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ]);
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
        } catch (profileError) {
          console.error('Error creating profile:', profileError);
        }
        
        toast({
          title: 'Signup successful',
          description: 'Your account has been created successfully. An administrator will review your account.',
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup failed',
        description: 'An error occurred during signup. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createSuperadmin = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Creating superadmin account:', email);
      
      // First check if the user already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .eq('role', 'superadmin');
        
      if (checkError) {
        console.error('Error checking for existing superadmin:', checkError);
      } else if (existingUsers && existingUsers.length > 0) {
        toast({
          title: 'Superadmin already exists',
          description: 'A superadmin with this email already exists. Please log in instead.',
        });
        return false;
      }
      
      // Step 1: Create the user through Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'superadmin',
          },
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        console.error('Superadmin creation error:', error);
        toast({
          title: 'Superadmin creation failed',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }
      
      console.log('Superadmin auth created successfully:', data);
      if (data.user) {
        // Step 2: Manually create the profile entry to ensure it exists
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id,
                name, 
                email,
                role: 'superadmin',
                status: 'active',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ]);
            
          if (profileError) {
            console.error('Error creating superadmin profile:', profileError);
            toast({
              title: 'Superadmin profile creation failed',
              description: profileError.message,
              variant: 'destructive',
            });
            return false;
          }
        } catch (profileError) {
          console.error('Error creating superadmin profile:', profileError);
          toast({
            title: 'Superadmin profile creation failed',
            description: 'An error occurred during profile creation.',
            variant: 'destructive',
          });
          return false;
        }
        
        toast({
          title: 'Superadmin created',
          description: 'Superadmin account has been created successfully. You can now log in.',
          duration: 5000,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Superadmin creation error:', error);
      toast({
        title: 'Superadmin creation failed',
        description: 'An error occurred during superadmin creation. Please try again.',
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
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
        session,
        createSuperadmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

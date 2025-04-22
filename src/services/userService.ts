
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '@/contexts/AuthContext';
import { User } from '@/lib/supabase';

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Fetch a single user by ID
export async function fetchUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return null;
  }
}

// Create a new user (used by admins to create users)
export async function createUser(user: Partial<User>): Promise<User> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([user])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update a user
export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
}

// Register a new dealer (creates both auth user and dealer profile)
export async function registerDealer(email: string, password: string, name: string, region: string, phone: string): Promise<boolean> {
  try {
    // 1. Create auth user with dealer role
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'dealer',
        },
      }
    });

    if (authError) {
      console.error('Error registering dealer auth:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error('Failed to create dealer account');
    }

    // 2. Create the dealer entry in dealers table
    const { error: dealerError } = await supabase
      .from('dealers')
      .insert([
        {
          id: authData.user.id,
          region,
          phone,
          status: 'pending',
          stores_count: 0,
          created_at: new Date().toISOString()
        }
      ]);

    if (dealerError) {
      console.error('Error creating dealer profile:', dealerError);
      throw dealerError;
    }

    return true;
  } catch (error) {
    console.error('Error registering dealer:', error);
    return false;
  }
}

// Activate or deactivate a user
export async function updateUserStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating user status:`, error);
    return false;
  }
}

// Fetch users by role
export async function fetchUsersByRole(role: UserRole): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching ${role} users:`, error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error(`Error fetching ${role} users:`, error);
    return [];
  }
}

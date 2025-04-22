
import { supabase } from '@/integrations/supabase/client';
import { Store } from '@/lib/supabase';

// Fetch all stores
export async function fetchStores(): Promise<Store[]> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
}

// Fetch stores by dealer ID
export async function fetchStoresByDealer(dealerId: string): Promise<Store[]> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('dealer_id', dealerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching stores for dealer ${dealerId}:`, error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error(`Error fetching stores for dealer ${dealerId}:`, error);
    return [];
  }
}

// Fetch a single store by ID
export async function fetchStoreById(id: number): Promise<Store | null> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching store with id ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching store with id ${id}:`, error);
    return null;
  }
}

// Create a new store
export async function createStore(store: Omit<Store, 'id' | 'created_at' | 'dealer_name'>): Promise<Store> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .insert([store])
      .select()
      .single();

    if (error) {
      console.error('Error creating store:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
}

// Update a store
export async function updateStore(id: number, updates: Partial<Store>): Promise<Store> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating store with id ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error updating store with id ${id}:`, error);
    throw error;
  }
}

// Delete a store
export async function deleteStore(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting store with id ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error deleting store with id ${id}:`, error);
    throw error;
  }
}

// Update store status
export async function updateStoreStatus(id: number, status: 'active' | 'inactive' | 'pending'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('stores')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating store status:`, error);
    return false;
  }
}

// Create store user account
export async function createStoreUser(
  email: string, 
  password: string, 
  name: string, 
  storeId: number
): Promise<boolean> {
  try {
    // 1. Get store info to link
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('id', storeId)
      .single();
      
    if (storeError) {
      console.error(`Error getting store info for id ${storeId}:`, storeError);
      throw storeError;
    }
    
    // 2. Create auth user with store role
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'store',
        }
      }
    });

    if (error) {
      console.error('Error creating store user auth:', error);
      throw error;
    }

    if (!data.user) {
      throw new Error('Failed to create store user account');
    }

    // 3. Create/update profile entry
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id,
          name, 
          email,
          role: 'store',
          status: 'active',
          address: storeData.address,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      console.error('Error creating store user profile:', profileError);
      // Continue anyway as the profile might have been created by the trigger
    }

    return true;
  } catch (error) {
    console.error('Error creating store user:', error);
    throw error;
  }
}


import { supabase, Store } from '@/lib/supabase';

// Fetch all stores
export async function fetchStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      id,
      name,
      address,
      dealer_id,
      status,
      orders_count,
      created_at,
      dealers(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }

  return data || [];
}

// Fetch a single store by ID
export async function fetchStoreById(id: number): Promise<Store | null> {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      id,
      name,
      address,
      dealer_id,
      status,
      orders_count,
      created_at,
      dealers(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching store with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Create a new store
export async function createStore(store: Omit<Store, 'id' | 'created_at'>): Promise<Store> {
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
}

// Update a store
export async function updateStore(id: number, updates: Partial<Store>): Promise<Store> {
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
}

// Delete a store
export async function deleteStore(id: number): Promise<void> {
  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting store with id ${id}:`, error);
    throw error;
  }
}

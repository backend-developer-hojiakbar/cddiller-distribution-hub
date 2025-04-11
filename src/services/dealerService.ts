
import { supabase, Dealer } from '@/lib/supabase';

// Fetch all dealers
export async function fetchDealers(): Promise<Dealer[]> {
  const { data, error } = await supabase
    .from('dealers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching dealers:', error);
    throw error;
  }

  return data || [];
}

// Fetch a single dealer by ID
export async function fetchDealerById(id: string): Promise<Dealer | null> {
  const { data, error } = await supabase
    .from('dealers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching dealer with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Create a new dealer
export async function createDealer(dealer: Omit<Dealer, 'id' | 'created_at'>): Promise<Dealer> {
  const { data, error } = await supabase
    .from('dealers')
    .insert([dealer])
    .select()
    .single();

  if (error) {
    console.error('Error creating dealer:', error);
    throw error;
  }

  return data;
}

// Update a dealer
export async function updateDealer(id: string, updates: Partial<Dealer>): Promise<Dealer> {
  const { data, error } = await supabase
    .from('dealers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating dealer with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete a dealer
export async function deleteDealer(id: string): Promise<void> {
  const { error } = await supabase
    .from('dealers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting dealer with id ${id}:`, error);
    throw error;
  }
}

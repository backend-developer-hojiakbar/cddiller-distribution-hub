
import { supabase } from '@/lib/supabase';
import { Return } from '@/lib/supabase';

// Fetch all returns
export async function fetchReturns(): Promise<Return[]> {
  const { data, error } = await supabase
    .from('returns')
    .select(`
      *,
      orders:order_id(id),
      profiles:customer_id(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching returns:', error);
    throw error;
  }

  // Process the joined data to match our Return type
  return (data || []).map(item => {
    const { profiles, orders, ...returnData } = item;
    return {
      ...returnData,
      customer_name: profiles?.name,
      order_reference: orders ? `ORD-${orders.id}` : undefined
    } as Return;
  });
}

// Fetch a single return by ID
export async function fetchReturnById(id: number): Promise<Return | null> {
  const { data, error } = await supabase
    .from('returns')
    .select(`
      *,
      orders:order_id(id),
      profiles:customer_id(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching return with id ${id}:`, error);
    throw error;
  }

  if (data) {
    const { profiles, orders, ...returnData } = data;
    return {
      ...returnData,
      customer_name: profiles?.name,
      order_reference: orders ? `ORD-${orders.id}` : undefined
    } as Return;
  }

  return null;
}

// Create a new return
export async function createReturn(
  returnData: Omit<Return, 'id' | 'created_at' | 'updated_at' | 'customer_name' | 'order_reference'>
): Promise<Return> {
  const { data, error } = await supabase
    .from('returns')
    .insert([{
      ...returnData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating return:', error);
    throw error;
  }

  return data;
}

// Update a return
export async function updateReturn(id: number, updates: Partial<Return>): Promise<Return> {
  // Make sure we update the updated_at field
  const returnUpdates = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('returns')
    .update(returnUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating return with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete a return
export async function deleteReturn(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('returns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting return with id ${id}:`, error);
    throw error;
  }

  return true;
}

// Update return status
export async function updateReturnStatus(
  id: number, 
  status: 'pending' | 'approved' | 'rejected'
): Promise<Return> {
  const { data, error } = await supabase
    .from('returns')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating return status for id ${id}:`, error);
    throw error;
  }

  return data;
}

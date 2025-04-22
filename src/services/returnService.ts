
import { supabase } from '@/lib/supabase';
import { Return } from '@/lib/supabase';

// Fetch all returns
export async function fetchReturns(): Promise<Return[]> {
  // Use mock data for now until proper database setup
  const mockReturns: Return[] = [
    {
      id: 1,
      order_id: 1001,
      customer_id: 'user123',
      reason: 'Damaged product',
      items_count: 2,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      customer_name: 'John Doe',
      order_reference: 'ORD-1001'
    },
    {
      id: 2,
      order_id: 1002,
      customer_id: 'user456',
      reason: 'Wrong size',
      items_count: 1,
      status: 'approved',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      customer_name: 'Jane Smith',
      order_reference: 'ORD-1002'
    }
  ];
  
  return mockReturns;
}

// Fetch a single return by ID
export async function fetchReturnById(id: number): Promise<Return | null> {
  const returns = await fetchReturns();
  return returns.find(r => r.id === id) || null;
}

// Create a new return
export async function createReturn(
  returnData: Omit<Return, 'id' | 'created_at' | 'updated_at' | 'customer_name' | 'order_reference'>
): Promise<Return> {
  const returns = await fetchReturns();
  const newReturn: Return = {
    id: returns.length + 1,
    ...returnData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer_name: 'New Customer', // This would come from a lookup in a real implementation
    order_reference: `ORD-${returnData.order_id}`
  };
  
  return newReturn;
}

// Update a return
export async function updateReturn(id: number, updates: Partial<Return>): Promise<Return> {
  const returns = await fetchReturns();
  const returnIndex = returns.findIndex(r => r.id === id);
  
  if (returnIndex === -1) {
    throw new Error(`Return with id ${id} not found`);
  }
  
  const updatedReturn: Return = {
    ...returns[returnIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return updatedReturn;
}

// Delete a return
export async function deleteReturn(id: number): Promise<boolean> {
  // Mock implementation
  return true;
}

// Update return status
export async function updateReturnStatus(
  id: number, 
  status: 'pending' | 'approved' | 'rejected'
): Promise<Return> {
  return updateReturn(id, { status });
}

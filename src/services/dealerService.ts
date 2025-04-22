
import { supabase } from '@/lib/supabase';
import { User, Dealer } from '@/lib/supabase';

// Fetch all dealers
export async function fetchDealers(): Promise<Dealer[]> {
  try {
    // Mock data for now until database setup
    const mockDealers: Dealer[] = [
      {
        id: 'dealer123',
        name: 'East Region Dealer',
        email: 'east@dealer.com',
        region: 'East',
        phone: '+998901234567',
        status: 'active',
        stores_count: 3,
        created_at: new Date().toISOString()
      },
      {
        id: 'dealer456',
        name: 'West Region Dealer',
        email: 'west@dealer.com',
        region: 'West',
        phone: '+998987654321',
        status: 'active',
        stores_count: 2,
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    return mockDealers;
  } catch (error) {
    console.error('Error in fetchDealers:', error);
    throw error;
  }
}

// Fetch a single dealer by ID
export async function fetchDealerById(id: string): Promise<Dealer | null> {
  try {
    const dealers = await fetchDealers();
    return dealers.find(d => d.id === id) || null;
  } catch (error) {
    console.error('Error in fetchDealerById:', error);
    throw error;
  }
}

// Create a new dealer
export async function createDealer(
  email: string, 
  password: string, 
  name: string, 
  region: string, 
  phone: string
): Promise<boolean> {
  try {
    // Mock implementation
    console.log('Creating dealer:', { email, name, region, phone });
    return true;
  } catch (error) {
    console.error('Error creating dealer:', error);
    throw error;
  }
}

// Update a dealer
export async function updateDealer(id: string, updates: Partial<Dealer>): Promise<Dealer> {
  try {
    const dealer = await fetchDealerById(id);
    
    if (!dealer) {
      throw new Error(`Dealer with id ${id} not found`);
    }
    
    const updatedDealer: Dealer = {
      ...dealer,
      ...updates
    };
    
    return updatedDealer;
  } catch (error) {
    console.error('Error in updateDealer:', error);
    throw error;
  }
}

// Delete a dealer
export async function deleteDealer(id: string): Promise<void> {
  try {
    // Mock implementation
    console.log('Deleting dealer with id:', id);
  } catch (error) {
    console.error('Error in deleteDealer:', error);
    throw error;
  }
}

// Update dealer status
export async function updateDealerStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<boolean> {
  try {
    await updateDealer(id, { status });
    return true;
  } catch (error) {
    console.error(`Error in updateDealerStatus:`, error);
    return false;
  }
}

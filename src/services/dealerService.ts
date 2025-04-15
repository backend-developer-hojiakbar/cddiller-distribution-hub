
import { supabase } from '@/lib/supabase';
import { User, Dealer } from '@/lib/supabase';

// Fetch all dealers
export async function fetchDealers(): Promise<Dealer[]> {
  try {
    // Fetch dealers from the dealers table
    const { data: dealersData, error: dealersError } = await supabase
      .from('dealers')
      .select('*')
      .order('created_at', { ascending: false });

    if (dealersError) {
      console.error('Error fetching dealers:', dealersError);
      throw dealersError;
    }

    // Fetch profiles to get names and emails
    const dealerIds = dealersData.map(dealer => dealer.id);
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', dealerIds);

    if (profilesError) {
      console.error('Error fetching dealer profiles:', profilesError);
      throw profilesError;
    }

    // Combine the data
    return dealersData.map(dealer => {
      const profile = profilesData.find(p => p.id === dealer.id);
      return {
        ...dealer,
        name: profile?.name || 'Unnamed Dealer',
        email: profile?.email || '',
      } as Dealer;
    });
  } catch (error) {
    console.error('Error in fetchDealers:', error);
    throw error;
  }
}

// Fetch a single dealer by ID
export async function fetchDealerById(id: string): Promise<Dealer | null> {
  try {
    // Fetch dealer data
    const { data: dealer, error: dealerError } = await supabase
      .from('dealers')
      .select('*')
      .eq('id', id)
      .single();

    if (dealerError) {
      console.error(`Error fetching dealer with id ${id}:`, dealerError);
      throw dealerError;
    }

    // Fetch profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profileError) {
      console.error(`Error fetching dealer profile with id ${id}:`, profileError);
      throw profileError;
    }

    if (dealer && profile) {
      return {
        ...dealer,
        name: profile.name || 'Unnamed Dealer',
        email: profile.email || '',
      } as Dealer;
    }

    return null;
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
    // 1. Create auth user with dealer role
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'dealer',
        },
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      console.error('Error creating dealer auth:', error);
      throw error;
    }

    if (!data.user) {
      throw new Error('Failed to create dealer account');
    }

    // 2. Ensure profile entry exists (might be created by trigger)
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([
        { 
          id: data.user.id,
          name, 
          email,
          role: 'dealer',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      console.error('Error creating dealer profile:', profileError);
      // Continue anyway as the profile might have been created by the trigger
    }

    // 3. Create the dealer entry
    const { error: dealerError } = await supabase
      .from('dealers')
      .insert([
        {
          id: data.user.id,
          region,
          phone,
          status: 'pending',
          stores_count: 0,
          created_at: new Date().toISOString()
        }
      ]);

    if (dealerError) {
      console.error('Error creating dealer record:', dealerError);
      throw dealerError;
    }

    return true;
  } catch (error) {
    console.error('Error creating dealer:', error);
    throw error;
  }
}

// Update a dealer
export async function updateDealer(id: string, updates: Partial<Dealer>): Promise<Dealer> {
  try {
    // Updates for the dealer table
    const dealerUpdates: any = {};
    if (updates.region) dealerUpdates.region = updates.region;
    if (updates.phone) dealerUpdates.phone = updates.phone;
    if (updates.status) dealerUpdates.status = updates.status;

    // Updates for the profile
    const profileUpdates: any = {};
    if (updates.name) profileUpdates.name = updates.name;
    
    // Start transaction
    if (Object.keys(dealerUpdates).length > 0) {
      const { error: dealerError } = await supabase
        .from('dealers')
        .update(dealerUpdates)
        .eq('id', id);

      if (dealerError) {
        console.error(`Error updating dealer with id ${id}:`, dealerError);
        throw dealerError;
      }
    }
    
    // Update profile if needed
    if (Object.keys(profileUpdates).length > 0) {
      profileUpdates.updated_at = new Date().toISOString();
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', id);
        
      if (profileError) {
        console.error(`Error updating dealer profile with id ${id}:`, profileError);
        throw profileError;
      }
    }

    // Fetch the updated dealer
    return await fetchDealerById(id) as Dealer;
  } catch (error) {
    console.error('Error in updateDealer:', error);
    throw error;
  }
}

// Delete a dealer
export async function deleteDealer(id: string): Promise<void> {
  try {
    // Delete the dealer record first
    const { error: dealerError } = await supabase
      .from('dealers')
      .delete()
      .eq('id', id);

    if (dealerError) {
      console.error(`Error deleting dealer with id ${id}:`, dealerError);
      throw dealerError;
    }

    // Then delete the auth user (this will cascade to profiles)
    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      console.error(`Error deleting dealer auth with id ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteDealer:', error);
    throw error;
  }
}

// Update dealer status
export async function updateDealerStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<boolean> {
  try {
    // Update dealer status
    const { error } = await supabase
      .from('dealers')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error(`Error updating dealer status:`, error);
      throw error;
    }
    
    // Also update the status in profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id);
      
    if (profileError) {
      console.error(`Error updating dealer profile status:`, profileError);
      // Continue anyway as the dealer status is updated
    }
    
    return true;
  } catch (error) {
    console.error(`Error in updateDealerStatus:`, error);
    return false;
  }
}

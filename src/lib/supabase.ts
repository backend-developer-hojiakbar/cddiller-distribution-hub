
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from the environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client with fallback for development
export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co', 
  supabaseAnonKey || 'your-anon-key'
);

// Show warning if credentials are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anonymous Key is missing. Please make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Database types - representing our tables
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'warehouse' | 'dealer' | 'agent' | 'store';
  avatar_url?: string;
  created_at: string;
};

export type Store = {
  id: number;
  name: string;
  address: string;
  dealer_id: string;
  status: 'active' | 'inactive' | 'pending';
  orders_count: number;
  created_at: string;
  dealer_name?: string; // Add this field to store dealer name
};

export type Dealer = {
  id: string;
  name: string;
  region: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  stores_count: number;
  created_at: string;
};

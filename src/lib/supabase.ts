
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from the environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

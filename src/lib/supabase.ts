
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase credentials
const supabaseUrl = 'https://flpimjforqtcqzwmrmcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscGltamZvcnF0Y3F6d21ybWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzA2ODAsImV4cCI6MjA2MDAwNjY4MH0.E_1NGhn1N_8JLD7oM2UGoNviyQuAyMiVc6eO5V7yKEQ';

// Create a Supabase client with the provided credentials
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

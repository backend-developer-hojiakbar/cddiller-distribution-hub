
import { supabase } from '@/lib/supabase';
import { Invoice } from '@/lib/supabase';

// Fetch all invoices
export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      orders:order_id(id),
      profiles:customer_id(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }

  // Process the joined data to match our Invoice type
  return (data || []).map(item => {
    const { profiles, orders, ...invoice } = item;
    return {
      ...invoice,
      customer_name: profiles?.name,
      order_reference: orders ? `ORD-${orders.id}` : undefined
    } as Invoice;
  });
}

// Fetch a single invoice by ID
export async function fetchInvoiceById(id: number): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      orders:order_id(id),
      profiles:customer_id(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching invoice with id ${id}:`, error);
    throw error;
  }

  if (data) {
    const { profiles, orders, ...invoice } = data;
    return {
      ...invoice,
      customer_name: profiles?.name,
      order_reference: orders ? `ORD-${orders.id}` : undefined
    } as Invoice;
  }

  return null;
}

// Create a new invoice
export async function createInvoice(
  invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'customer_name' | 'order_reference'>
): Promise<Invoice> {
  const { data, error } = await supabase
    .from('invoices')
    .insert([{
      ...invoice,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }

  return data;
}

// Update an invoice
export async function updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice> {
  // Make sure we update the updated_at field
  const invoiceUpdates = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('invoices')
    .update(invoiceUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating invoice with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete an invoice
export async function deleteInvoice(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting invoice with id ${id}:`, error);
    throw error;
  }

  return true;
}

// Update invoice status
export async function updateInvoiceStatus(
  id: number, 
  status: 'pending' | 'paid' | 'overdue'
): Promise<Invoice> {
  const { data, error } = await supabase
    .from('invoices')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating invoice status for id ${id}:`, error);
    throw error;
  }

  return data;
}

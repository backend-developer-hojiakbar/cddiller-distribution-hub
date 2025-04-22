
import { supabase } from '@/lib/supabase';
import { Invoice } from '@/lib/supabase';

// Fetch all invoices
export async function fetchInvoices(): Promise<Invoice[]> {
  // Use mock data for now until proper database setup
  const mockInvoices: Invoice[] = [
    {
      id: 1,
      order_id: 1001,
      customer_id: 'user123',
      total: 15000,
      due_date: new Date(Date.now() + 86400000 * 7).toISOString(),
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
      total: 8500,
      due_date: new Date(Date.now() + 86400000 * 5).toISOString(),
      status: 'paid',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      customer_name: 'Jane Smith',
      order_reference: 'ORD-1002'
    }
  ];
  
  return mockInvoices;
}

// Fetch a single invoice by ID
export async function fetchInvoiceById(id: number): Promise<Invoice | null> {
  const invoices = await fetchInvoices();
  return invoices.find(i => i.id === id) || null;
}

// Create a new invoice
export async function createInvoice(
  invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'customer_name' | 'order_reference'>
): Promise<Invoice> {
  const invoices = await fetchInvoices();
  const newInvoice: Invoice = {
    id: invoices.length + 1,
    ...invoice,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer_name: 'New Customer', // This would come from a lookup in a real implementation
    order_reference: `ORD-${invoice.order_id}`
  };
  
  return newInvoice;
}

// Update an invoice
export async function updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice> {
  const invoices = await fetchInvoices();
  const invoiceIndex = invoices.findIndex(i => i.id === id);
  
  if (invoiceIndex === -1) {
    throw new Error(`Invoice with id ${id} not found`);
  }
  
  const updatedInvoice: Invoice = {
    ...invoices[invoiceIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return updatedInvoice;
}

// Delete an invoice
export async function deleteInvoice(id: number): Promise<boolean> {
  // Mock implementation
  return true;
}

// Update invoice status
export async function updateInvoiceStatus(
  id: number, 
  status: 'pending' | 'paid' | 'overdue'
): Promise<Invoice> {
  return updateInvoice(id, { status });
}

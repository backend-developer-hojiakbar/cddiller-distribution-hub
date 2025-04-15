
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/supabase';

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

// Fetch a single product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Create a new product
export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
}

// Update a product
export async function updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
  // Make sure we update the updated_at field
  const updatedProduct = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('products')
    .update(updatedProduct)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete a product
export async function deleteProduct(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }

  return true;
}

// Update product stock
export async function updateProductStock(id: number, stockChange: number): Promise<Product> {
  // First get the current stock
  const { data: product, error: getError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', id)
    .single();

  if (getError) {
    console.error(`Error getting product stock for id ${id}:`, getError);
    throw getError;
  }

  const newStock = (product.stock || 0) + stockChange;
  
  // Then update it
  const { data, error } = await supabase
    .from('products')
    .update({ 
      stock: newStock,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product stock for id ${id}:`, error);
    throw error;
  }

  return data;
}

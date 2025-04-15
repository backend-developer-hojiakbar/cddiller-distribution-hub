
import { supabase } from '@/lib/supabase';
import { Order, OrderItem } from '@/lib/supabase';

// Fetch all orders
export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      stores:store_id(name),
      profiles:customer_id(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  // Process the joined data to match our Order type
  return (data || []).map(item => {
    const { stores, profiles, ...order } = item;
    return {
      ...order,
      store_name: stores?.name,
      customer_name: profiles?.name
    } as Order;
  });
}

// Fetch orders by store ID
export async function fetchOrdersByStore(storeId: number): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles:customer_id(name)
    `)
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching orders for store ${storeId}:`, error);
    throw error;
  }

  return (data || []).map(item => {
    const { profiles, ...order } = item;
    return {
      ...order,
      customer_name: profiles?.name
    } as Order;
  });
}

// Fetch a single order by ID
export async function fetchOrderById(id: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      stores:store_id(name),
      profiles:customer_id(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }

  if (data) {
    const { stores, profiles, ...order } = data;
    return {
      ...order,
      store_name: stores?.name,
      customer_name: profiles?.name
    } as Order;
  }

  return null;
}

// Fetch order items
export async function fetchOrderItems(orderId: number): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      products:product_id(name)
    `)
    .eq('order_id', orderId);

  if (error) {
    console.error(`Error fetching items for order ${orderId}:`, error);
    throw error;
  }

  return (data || []).map(item => {
    const { products, ...orderItem } = item;
    return {
      ...orderItem,
      product_name: products?.name
    } as OrderItem;
  });
}

// Create a new order
export async function createOrder(
  order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'store_name' | 'customer_name'>,
  items: Omit<OrderItem, 'id' | 'created_at' | 'order_id' | 'product_name'>[]
): Promise<Order> {
  // Start a transaction
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      ...order,
      items_count: items.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }

  // Insert order items
  if (items.length > 0) {
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    // Update product stock
    for (const item of items) {
      await supabase
        .from('products')
        .update({ 
          stock: supabase.rpc('decrement', { x: item.quantity }),
          updated_at: new Date().toISOString()
        })
        .eq('id', item.product_id);
    }
  }

  return orderData;
}

// Update an order
export async function updateOrder(
  id: number, 
  updates: Partial<Order>
): Promise<Order> {
  // Make sure we update the updated_at field
  const orderUpdates = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('orders')
    .update(orderUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete an order
export async function deleteOrder(id: number): Promise<boolean> {
  // First get the order items to update stock
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id);

  if (itemsError) {
    console.error(`Error fetching items for order ${id}:`, itemsError);
    throw itemsError;
  }

  // Delete the order (will cascade to order_items due to foreign key)
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }

  // Restore product stock
  for (const item of items || []) {
    await supabase
      .from('products')
      .update({ 
        stock: supabase.rpc('increment', { x: item.quantity }),
        updated_at: new Date().toISOString()
      })
      .eq('id', item.product_id);
  }

  return true;
}

// Update order status
export async function updateOrderStatus(
  id: number, 
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating order status for id ${id}:`, error);
    throw error;
  }

  return data;
}

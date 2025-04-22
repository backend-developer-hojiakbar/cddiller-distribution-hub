
import { supabase } from '@/lib/supabase';
import { Order, OrderItem } from '@/lib/supabase';

// Fetch all orders
export async function fetchOrders(): Promise<Order[]> {
  try {
    // Use mock data for now until proper database setup
    const mockOrders: Order[] = [
      {
        id: 1,
        customer_id: 'user123',
        store_id: 1,
        total: 150000,
        status: 'pending',
        items_count: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        store_name: 'Main Store',
        customer_name: 'John Doe'
      },
      {
        id: 2,
        customer_id: 'user456',
        store_id: 2,
        total: 85000,
        status: 'delivered',
        items_count: 2,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        store_name: 'Branch Store',
        customer_name: 'Jane Smith'
      }
    ];
    
    return mockOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Fetch orders by store ID
export async function fetchOrdersByStore(storeId: number): Promise<Order[]> {
  try {
    const orders = await fetchOrders();
    return orders.filter(order => order.store_id === storeId);
  } catch (error) {
    console.error(`Error fetching orders for store ${storeId}:`, error);
    throw error;
  }
}

// Fetch a single order by ID
export async function fetchOrderById(id: number): Promise<Order | null> {
  try {
    const orders = await fetchOrders();
    return orders.find(order => order.id === id) || null;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
}

// Fetch order items
export async function fetchOrderItems(orderId: number): Promise<OrderItem[]> {
  try {
    // Mock data for order items
    const mockItems: OrderItem[] = [
      {
        id: 1,
        order_id: 1,
        product_id: 101,
        quantity: 2,
        price: 75000,
        created_at: new Date().toISOString(),
        product_name: 'Product A'
      },
      {
        id: 2,
        order_id: 1,
        product_id: 102,
        quantity: 1,
        price: 75000,
        created_at: new Date().toISOString(),
        product_name: 'Product B'
      }
    ];
    
    return mockItems.filter(item => item.order_id === orderId);
  } catch (error) {
    console.error(`Error fetching items for order ${orderId}:`, error);
    throw error;
  }
}

// Create a new order
export async function createOrder(
  order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'store_name' | 'customer_name'>,
  items: Omit<OrderItem, 'id' | 'created_at' | 'order_id' | 'product_name'>[]
): Promise<Order> {
  try {
    // Mock implementation
    const orders = await fetchOrders();
    const newOrder: Order = {
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      ...order,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      store_name: 'New Store', // This would come from a lookup in a real implementation
      customer_name: 'New Customer' // This would come from a lookup in a real implementation
    };
    
    console.log('Creating order:', newOrder);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Update an order
export async function updateOrder(
  id: number, 
  updates: Partial<Order>
): Promise<Order> {
  try {
    const order = await fetchOrderById(id);
    
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    
    const updatedOrder: Order = {
      ...order,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    console.log('Updating order:', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
}

// Delete an order
export async function deleteOrder(id: number): Promise<boolean> {
  try {
    // Mock implementation
    console.log('Deleting order with id:', id);
    return true;
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  id: number, 
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
): Promise<Order> {
  try {
    return updateOrder(id, { status });
  } catch (error) {
    console.error(`Error updating order status for id ${id}:`, error);
    throw error;
  }
}

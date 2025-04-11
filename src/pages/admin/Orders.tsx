
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Package, FileText } from 'lucide-react';

const OrdersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for orders
  const orders = [
    { id: 'ORD-2023-001', customer: 'Chorsu Bozori', date: '12/04/2023', items: 5, total: '14,500,000', status: 'delivered' },
    { id: 'ORD-2023-002', customer: 'Malika Bozori', date: '15/04/2023', items: 3, total: '8,700,000', status: 'processing' },
    { id: 'ORD-2023-003', customer: 'Samarqand Darvoza', date: '18/04/2023', items: 7, total: '21,300,000', status: 'shipped' },
    { id: 'ORD-2023-004', customer: 'Chilonzor Savdo Markazi', date: '20/04/2023', items: 2, total: '5,800,000', status: 'pending' },
    { id: 'ORD-2023-005', customer: 'Parkent Savdo Uyi', date: '22/04/2023', items: 4, total: '12,100,000', status: 'cancelled' },
  ];
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.date.includes(searchQuery)
  );
  
  return (
    <PageLayout 
      title="Buyurtmalar"
      description="Buyurtmalarni boshqarish"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Qidirish..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yangi buyurtma
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Mahsulotlar</TableHead>
                <TableHead>Narxi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total} so'm</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'success' : 
                        order.status === 'processing' || order.status === 'shipped' ? 'outline' :
                        order.status === 'pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {order.status === 'delivered' ? 'Yetkazildi' : 
                       order.status === 'processing' ? 'Jarayonda' :
                       order.status === 'shipped' ? 'Jo\'natildi' :
                       order.status === 'pending' ? 'Kutilmoqda' : 'Bekor qilindi'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default OrdersPage;

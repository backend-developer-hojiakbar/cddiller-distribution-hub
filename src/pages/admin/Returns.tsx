
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, CheckCircle, XCircle } from 'lucide-react';

const ReturnsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for returns
  const returns = [
    { id: 'RTN-2023-001', order: 'ORD-2023-001', customer: 'Chorsu Bozori', date: '15/04/2023', items: 2, reason: 'Nosoz mahsulot', status: 'approved' },
    { id: 'RTN-2023-002', order: 'ORD-2023-002', customer: 'Malika Bozori', date: '18/04/2023', items: 1, reason: 'Noto\'g\'ri mahsulot', status: 'pending' },
    { id: 'RTN-2023-003', order: 'ORD-2023-003', customer: 'Samarqand Darvoza', date: '21/04/2023', items: 3, reason: 'Shikastlangan', status: 'approved' },
    { id: 'RTN-2023-004', order: 'ORD-2023-004', customer: 'Chilonzor Savdo Markazi', date: '23/04/2023', items: 1, reason: 'Mijozning xohishi', status: 'rejected' },
    { id: 'RTN-2023-005', order: 'ORD-2023-005', customer: 'Parkent Savdo Uyi', date: '25/04/2023', items: 2, reason: 'Sifati yomon', status: 'processing' },
  ];
  
  const filteredReturns = returns.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );
  
  return (
    <PageLayout 
      title="Qaytarishlar"
      description="Mahsulot qaytarishlarini boshqarish"
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
          Yangi qaytaish
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Buyurtma</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Mahsulotlar</TableHead>
                <TableHead>Sabab</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-medium">{item.customer}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.items}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.status === 'approved' ? 'success' : 
                        item.status === 'rejected' ? 'destructive' :
                        item.status === 'processing' ? 'secondary' : 'outline'
                      }
                    >
                      {item.status === 'approved' ? 'Tasdiqlangan' : 
                       item.status === 'rejected' ? 'Rad etilgan' :
                       item.status === 'processing' ? 'Jarayonda' : 'Kutilmoqda'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-green-500">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <XCircle className="h-4 w-4" />
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

export default ReturnsPage;

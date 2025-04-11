
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Download, Upload } from 'lucide-react';

const WarehousePage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for warehouse items
  const items = [
    { id: 'P001', name: 'OLED Televizor 55"', category: 'Televizorlar', stock: 24, price: '4,500,000', status: 'in_stock' },
    { id: 'P002', name: 'Muzlatgich Artel HD 345', category: 'Muzlatgichlar', stock: 15, price: '3,200,000', status: 'in_stock' },
    { id: 'P003', name: 'Kir yuvish mashinasi LG', category: 'Kir yuvish', stock: 8, price: '2,800,000', status: 'in_stock' },
    { id: 'P004', name: 'Konditsioner Samsung', category: 'Konditsionerlar', stock: 0, price: '3,700,000', status: 'out_of_stock' },
    { id: 'P005', name: 'Gaz plita Artel', category: 'Oshxona jihozlari', stock: 3, price: '1,900,000', status: 'low_stock' },
  ];
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout 
      title="Ombor"
      description="Ombor ma'lumotlarini boshqarish"
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
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yangi mahsulot
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nomi</TableHead>
                <TableHead>Kategoriya</TableHead>
                <TableHead>Miqdori</TableHead>
                <TableHead>Narxi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.price} so'm</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.status === 'in_stock' ? 'success' : 
                        item.status === 'out_of_stock' ? 'destructive' : 'warning'
                      }
                    >
                      {item.status === 'in_stock' ? 'Mavjud' : 
                       item.status === 'out_of_stock' ? 'Mavjud emas' : 'Kam qoldi'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
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

export default WarehousePage;

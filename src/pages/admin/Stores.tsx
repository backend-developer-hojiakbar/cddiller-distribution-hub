
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash, Eye } from 'lucide-react';

const StoresPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for stores
  const stores = [
    { id: 1, name: 'Chilonzor Savdo Markazi', address: 'Chilonzor tumani, 19-kvartal', dealer: 'Alisher Toshmatov', status: 'active', orders: 156 },
    { id: 2, name: 'Malika Bozori', address: "Qatortol ko'chasi, 60A", dealer: 'Dilshod Karimov', status: 'active', orders: 98 },
    { id: 3, name: 'Samarqand Darvoza', address: "Karimov ko'chasi, 45", dealer: 'Nodira Azimova', status: 'inactive', orders: 23 },
    { id: 4, name: 'Chorsu Bozori', address: 'Eski shahar, Chorsu maydoni', dealer: 'Jahongir Raimov', status: 'active', orders: 217 },
    { id: 5, name: 'Parkent Savdo Uyi', address: "Parkent tumani, Markaziy ko'cha 12", dealer: 'Sevara Kamalova', status: 'pending', orders: 42 },
  ];
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.dealer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout 
      title="Do'konlar"
      description="Do'konlar ro'yxatini boshqarish"
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
          Yangi do'kon
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nomi</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Diller</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.id}</TableCell>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.dealer}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        store.status === 'active' ? 'success' : 
                        store.status === 'inactive' ? 'destructive' : 'outline'
                      }
                    >
                      {store.status === 'active' ? 'Faol' : 
                       store.status === 'inactive' ? 'Faol emas' : 'Kutilmoqda'}
                    </Badge>
                  </TableCell>
                  <TableCell>{store.orders}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
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

export default StoresPage;

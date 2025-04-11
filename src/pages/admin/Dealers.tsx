
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash, Eye } from 'lucide-react';

const DealersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for dealers
  const dealers = [
    { id: 1, name: 'Alisher Toshmatov', region: 'Toshkent', phone: '+998 90 123 45 67', status: 'active', stores: 12 },
    { id: 2, name: 'Dilshod Karimov', region: 'Samarqand', phone: '+998 99 765 43 21', status: 'active', stores: 8 },
    { id: 3, name: 'Nodira Azimova', region: 'Buxoro', phone: '+998 91 234 56 78', status: 'inactive', stores: 5 },
    { id: 4, name: 'Jahongir Raimov', region: 'Andijon', phone: '+998 93 876 54 32', status: 'active', stores: 10 },
    { id: 5, name: 'Sevara Kamalova', region: 'Fargʻona', phone: '+998 94 567 89 01', status: 'pending', stores: 3 },
  ];
  
  const filteredDealers = dealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.phone.includes(searchQuery)
  );
  
  return (
    <PageLayout 
      title="Dillerlar"
      description="Dillerlar ro'yxatini boshqarish"
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
          Yangi diller
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ism Familiya</TableHead>
                <TableHead>Viloyat</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Do'konlar</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDealers.map((dealer) => (
                <TableRow key={dealer.id}>
                  <TableCell>{dealer.id}</TableCell>
                  <TableCell className="font-medium">{dealer.name}</TableCell>
                  <TableCell>{dealer.region}</TableCell>
                  <TableCell>{dealer.phone}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        dealer.status === 'active' ? 'success' : 
                        dealer.status === 'inactive' ? 'destructive' : 'outline'
                      }
                    >
                      {dealer.status === 'active' ? 'Faol' : 
                       dealer.status === 'inactive' ? 'Faol emas' : 'Kutilmoqda'}
                    </Badge>
                  </TableCell>
                  <TableCell>{dealer.stores}</TableCell>
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

export default DealersPage;

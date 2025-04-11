
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash, Eye, Loader2 } from 'lucide-react';
import { fetchDealers } from '@/services/dealerService';
import { toast } from '@/components/ui/use-toast';

const DealersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch dealers using react-query
  const { data: dealers, isLoading, isError } = useQuery({
    queryKey: ['dealers'],
    queryFn: fetchDealers,
    onError: (error) => {
      toast({
        title: 'Error fetching dealers',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  });
  
  // If there's an error or the data is still loading, show that accordingly
  if (isError) {
    return (
      <PageLayout 
        title="Dillerlar"
        description="Dillerlar ro'yxatini boshqarish"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium">Ma'lumotlarni yuklashda xatolik yuz berdi</h3>
            <p className="mt-2 text-muted-foreground">Iltimos, keyinroq qayta urinib ko'ring</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Filter dealers based on search query
  const filteredDealers = dealers?.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.phone.includes(searchQuery)
  ) || [];
  
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
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                {filteredDealers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      <p className="py-6 text-muted-foreground">Hech qanday diller topilmadi</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell>{dealer.id.substring(0, 8)}</TableCell>
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
                      <TableCell>{dealer.stores_count}</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DealersPage;

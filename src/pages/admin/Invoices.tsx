
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye, Printer, FileText } from 'lucide-react';

const InvoicesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for invoices
  const invoices = [
    { id: 'INV-2023-001', order: 'ORD-2023-001', customer: 'Chorsu Bozori', date: '12/04/2023', dueDate: '26/04/2023', total: '14,500,000', status: 'paid' },
    { id: 'INV-2023-002', order: 'ORD-2023-002', customer: 'Malika Bozori', date: '15/04/2023', dueDate: '29/04/2023', total: '8,700,000', status: 'pending' },
    { id: 'INV-2023-003', order: 'ORD-2023-003', customer: 'Samarqand Darvoza', date: '18/04/2023', dueDate: '02/05/2023', total: '21,300,000', status: 'partial' },
    { id: 'INV-2023-004', order: 'ORD-2023-004', customer: 'Chilonzor Savdo Markazi', date: '20/04/2023', dueDate: '04/05/2023', total: '5,800,000', status: 'overdue' },
    { id: 'INV-2023-005', order: 'ORD-2023-005', customer: 'Parkent Savdo Uyi', date: '22/04/2023', dueDate: '06/05/2023', total: '12,100,000', status: 'cancelled' },
  ];
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.date.includes(searchQuery) ||
    invoice.dueDate.includes(searchQuery)
  );
  
  return (
    <PageLayout 
      title="Hisob-fakturalar"
      description="Hisob-fakturalarni boshqarish"
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
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Yangi hisob-faktura
          </Button>
        </div>
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
                <TableHead>To'lov muddati</TableHead>
                <TableHead>Narxi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.order}</TableCell>
                  <TableCell className="font-medium">{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.total} so'm</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        invoice.status === 'paid' ? 'success' : 
                        invoice.status === 'pending' ? 'outline' :
                        invoice.status === 'partial' ? 'secondary' :
                        invoice.status === 'overdue' ? 'destructive' : 'outline'
                      }
                    >
                      {invoice.status === 'paid' ? 'To\'langan' : 
                       invoice.status === 'pending' ? 'Kutilmoqda' :
                       invoice.status === 'partial' ? 'Qisman to\'langan' :
                       invoice.status === 'overdue' ? 'Muddati o\'tgan' : 'Bekor qilindi'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
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

export default InvoicesPage;

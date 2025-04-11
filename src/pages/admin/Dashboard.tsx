
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Users, 
  Store, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Truck,
  RotateCcw,
  Clock,
  ArrowRight,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PageHeader from '@/components/PageHeader';
import StatsCard from '@/components/StatsCard';

// Mock data for the charts
const salesData = [
  { name: 'Jan', sales: 3200 },
  { name: 'Feb', sales: 3800 },
  { name: 'Mar', sales: 4300 },
  { name: 'Apr', sales: 3900 },
  { name: 'May', sales: 4500 },
  { name: 'Jun', sales: 4900 },
  { name: 'Jul', sales: 4700 },
  { name: 'Aug', sales: 5100 },
  { name: 'Sep', sales: 5400 },
  { name: 'Oct', sales: 5800 },
  { name: 'Nov', sales: 5500 },
  { name: 'Dec', sales: 6200 },
];

const topProductsData = [
  { name: 'Cola 1L', sales: 1245, color: '#0088FE' },
  { name: 'Water 500ml', sales: 987, color: '#00C49F' },
  { name: 'Orange Juice 1L', sales: 865, color: '#FFBB28' },
  { name: 'Lemon Soda 330ml', sales: 765, color: '#FF8042' },
  { name: 'Energy Drink 250ml', sales: 612, color: '#8884d8' },
];

const topDealersData = [
  { name: 'East City Distributors', sales: 3245, percentage: 25 },
  { name: 'Central Beverages', sales: 2875, percentage: 22 },
  { name: 'North Traders', sales: 2456, percentage: 19 },
  { name: 'South Market Partners', sales: 1987, percentage: 15 },
  { name: 'West District Sales', sales: 1540, percentage: 12 },
];

// Recent orders data
const recentOrders = [
  {
    id: 'ORD-2025-001',
    dealer: 'East City Distributors',
    products: 12,
    amount: 1245000,
    status: 'delivered',
    date: '2025-04-10',
  },
  {
    id: 'ORD-2025-002',
    dealer: 'Central Beverages',
    products: 8,
    amount: 987000,
    status: 'in-transit',
    date: '2025-04-11',
  },
  {
    id: 'ORD-2025-003',
    dealer: 'North Traders',
    products: 15,
    amount: 1568000,
    status: 'processing',
    date: '2025-04-11',
  },
  {
    id: 'ORD-2025-004',
    dealer: 'South Market Partners',
    products: 6,
    amount: 645000,
    status: 'delivered',
    date: '2025-04-09',
  },
  {
    id: 'ORD-2025-005',
    dealer: 'West District Sales',
    products: 10,
    amount: 1120000,
    status: 'delivered',
    date: '2025-04-08',
  },
];

// Recent returns data
const recentReturns = [
  {
    id: 'RET-2025-001',
    dealer: 'East City Distributors',
    products: 3,
    amount: 245000,
    reason: 'expired',
    date: '2025-04-10',
  },
  {
    id: 'RET-2025-002',
    dealer: 'Central Beverages',
    products: 2,
    amount: 187000,
    reason: 'damaged',
    date: '2025-04-09',
  },
  {
    id: 'RET-2025-003',
    dealer: 'North Traders',
    products: 5,
    amount: 368000,
    reason: 'unsold',
    date: '2025-04-08',
  },
  {
    id: 'RET-2025-004',
    dealer: 'South Market Partners',
    products: 1,
    amount: 95000,
    reason: 'damaged',
    date: '2025-04-07',
  },
  {
    id: 'RET-2025-005',
    dealer: 'West District Sales',
    products: 4,
    amount: 320000,
    reason: 'expired',
    date: '2025-04-06',
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const [activeProducts, setActiveProducts] = useState(0);
  const [activeDealers, setActiveDealers] = useState(0);
  const [activeStores, setActiveStores] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveProducts(128);
      setActiveDealers(12);
      setActiveStores(64);
      setTotalSales(52500000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t('dashboard')} 
        description={t('admin_dashboard_description')}
      >
        <Button onClick={() => navigate('/admin/reports')}>{t('view_reports')}</Button>
      </PageHeader>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('total_products')}
          value={activeProducts}
          icon={<Package size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('active_dealers')}
          value={activeDealers}
          icon={<Users size={24} />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title={t('active_stores')}
          value={activeStores}
          icon={<Store size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('total_sales')}
          value={formatCurrency(totalSales)}
          icon={<DollarSign size={24} />}
          trend={{ value: 14, isPositive: true }}
        />
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('sales_overview')}</CardTitle>
          <CardDescription>
            {t('sales_overview_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value * 10000), t('sales')]} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>{t('top_products')}</CardTitle>
            <CardDescription>
              {t('top_products_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topProductsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [value, t('sales')]} />
                  <Bar dataKey="sales" barSize={20}>
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/admin/products')}>
              {t('view_all_products')}
            </Button>
          </CardFooter>
        </Card>

        {/* Top Dealers */}
        <Card>
          <CardHeader>
            <CardTitle>{t('top_dealers')}</CardTitle>
            <CardDescription>
              {t('top_dealers_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topDealersData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {topDealersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${props.payload.percentage}% (${formatCurrency(props.payload.sales * 1000)})`,
                    props.payload.name
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/admin/dealers')}>
              {t('view_all_dealers')}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>{t('recent_orders')}</span>
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>{t('recent_returns')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('recent_orders')}</CardTitle>
              <CardDescription>
                {t('recent_orders_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('order_id')}</TableHead>
                    <TableHead>{t('dealer')}</TableHead>
                    <TableHead>{t('products')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead>{t('date')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.dealer}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{formatCurrency(order.amount)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : order.status === 'in-transit'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {order.status === 'delivered' ? t('delivered') : 
                           order.status === 'in-transit' ? t('in_transit') : 
                           t('processing')}
                        </span>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/orders')}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/admin/orders')}
              >
                {t('view_all_orders')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="returns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('recent_returns')}</CardTitle>
              <CardDescription>
                {t('recent_returns_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('return_id')}</TableHead>
                    <TableHead>{t('dealer')}</TableHead>
                    <TableHead>{t('products')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>{t('reason')}</TableHead>
                    <TableHead>{t('date')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReturns.map((return_) => (
                    <TableRow key={return_.id}>
                      <TableCell className="font-medium">{return_.id}</TableCell>
                      <TableCell>{return_.dealer}</TableCell>
                      <TableCell>{return_.products}</TableCell>
                      <TableCell>{formatCurrency(return_.amount)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          return_.reason === 'expired' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                            : return_.reason === 'damaged'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {return_.reason === 'expired' ? t('expired') : 
                           return_.reason === 'damaged' ? t('damaged') : 
                           t('unsold')}
                        </span>
                      </TableCell>
                      <TableCell>{return_.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/returns')}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/admin/returns')}
              >
                {t('view_all_returns')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quick_actions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => navigate('/admin/products')}
            >
              <Package className="h-6 w-6" />
              <span>{t('add_product')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => navigate('/admin/dealers')}
            >
              <Users className="h-6 w-6" />
              <span>{t('add_dealer')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => navigate('/admin/stores')}
            >
              <Store className="h-6 w-6" />
              <span>{t('add_store')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => navigate('/admin/reports')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>{t('generate_report')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

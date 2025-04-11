
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Calendar,
  FileText,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Users,
  Store
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  PieChart as RechartsChart,
  Pie,
  Legend,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PageHeader from '@/components/PageHeader';
import DataTable, { ColumnDef } from '@/components/DataTable';

// Mock data for charts and tables
const revenueData = [
  { month: 'Jan', revenue: 5000000 },
  { month: 'Feb', revenue: 6200000 },
  { month: 'Mar', revenue: 7800000 },
  { month: 'Apr', revenue: 6500000 },
  { month: 'May', revenue: 8900000 },
  { month: 'Jun', revenue: 9200000 },
  { month: 'Jul', revenue: 8700000 },
  { month: 'Aug', revenue: 9800000 },
  { month: 'Sep', revenue: 10500000 },
  { month: 'Oct', revenue: 11200000 },
  { month: 'Nov', revenue: 10800000 },
  { month: 'Dec', revenue: 12500000 },
];

const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 162 },
  { month: 'Apr', users: 178 },
  { month: 'May', users: 195 },
  { month: 'Jun', users: 210 },
  { month: 'Jul', users: 230 },
  { month: 'Aug', users: 245 },
  { month: 'Sep', users: 260 },
  { month: 'Oct', users: 285 },
  { month: 'Nov', users: 300 },
  { month: 'Dec', users: 320 },
];

const subscriptionData = [
  { name: 'Start', value: 35, color: '#0088FE' },
  { name: 'Pro', value: 45, color: '#00C49F' },
  { name: 'Enterprise', value: 20, color: '#FFBB28' },
];

const conversionData = [
  { month: 'Jan', conversion: 68 },
  { month: 'Feb', conversion: 72 },
  { month: 'Mar', conversion: 65 },
  { month: 'Apr', conversion: 70 },
  { month: 'May', conversion: 75 },
  { month: 'Jun', conversion: 78 },
  { month: 'Jul', conversion: 82 },
  { month: 'Aug', conversion: 79 },
  { month: 'Sep', conversion: 83 },
  { month: 'Oct', conversion: 85 },
  { month: 'Nov', conversion: 88 },
  { month: 'Dec', conversion: 90 },
];

// Payment report data
const paymentReportData = [
  {
    id: '1',
    invoice: 'INV-2025-001',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    amount: 500000,
    date: '2025-04-01',
    status: 'succeeded',
    method: 'card',
  },
  {
    id: '2',
    invoice: 'INV-2025-002',
    company: 'GoodFood Inc',
    subscription: 'Start',
    amount: 200000,
    date: '2025-04-03',
    status: 'succeeded',
    method: 'bank',
  },
  {
    id: '3',
    invoice: 'INV-2025-003',
    company: 'TechDistribution',
    subscription: 'Enterprise',
    amount: 2000000,
    date: '2025-04-05',
    status: 'pending',
    method: 'bank',
  },
  {
    id: '4',
    invoice: 'INV-2025-004',
    company: 'ClothesWholesale',
    subscription: 'Pro',
    amount: 500000,
    date: '2025-04-08',
    status: 'failed',
    method: 'card',
  },
  {
    id: '5',
    invoice: 'INV-2025-005',
    company: 'Grocery Plus',
    subscription: 'Start',
    amount: 200000,
    date: '2025-04-10',
    status: 'succeeded',
    method: 'cash',
  },
];

// User report data
const userReportData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@cddiller.com',
    role: 'admin',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    joinDate: '2025-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@cddiller.com',
    role: 'warehouse',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    joinDate: '2025-01-16',
    status: 'active',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@cddiller.com',
    role: 'dealer',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    joinDate: '2025-01-17',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@cddiller.com',
    role: 'agent',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    joinDate: '2025-01-18',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael@cddiller.com',
    role: 'store',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    joinDate: '2025-01-19',
    status: 'active',
  },
];

// Columns for the reports tables
const paymentReportColumns: ColumnDef[] = [
  {
    title: 'Invoice',
    field: 'invoice',
    sortable: true,
  },
  {
    title: 'Company',
    field: 'company',
    sortable: true,
  },
  {
    title: 'Subscription',
    field: 'subscription',
    sortable: true,
  },
  {
    title: 'Amount',
    field: 'amount',
    render: (value, row) => formatCurrency(value),
    sortable: true,
  },
  {
    title: 'Date',
    field: 'date',
    sortable: true,
  },
  {
    title: 'Status',
    field: 'status',
    render: (value) => {
      let statusComponent;
      
      if (value === 'succeeded') {
        statusComponent = (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Succeeded</span>
          </div>
        );
      } else if (value === 'pending') {
        statusComponent = (
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <RefreshCw className="h-4 w-4 mr-1" />
            <span>Pending</span>
          </div>
        );
      } else {
        statusComponent = (
          <div className="flex items-center text-red-600 dark:text-red-400">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Failed</span>
          </div>
        );
      }
      
      return statusComponent;
    },
    sortable: true,
  },
];

const userReportColumns: ColumnDef[] = [
  {
    title: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    title: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    title: 'Role',
    field: 'role',
    render: (value) => {
      const icon = value === 'admin' ? (
        <Users className="h-4 w-4 mr-1" />
      ) : value === 'warehouse' ? (
        <Store className="h-4 w-4 mr-1" />
      ) : (
        <Users className="h-4 w-4 mr-1" />
      );
      
      return (
        <div className="flex items-center">
          {icon}
          <span>{value}</span>
        </div>
      );
    },
    sortable: true,
  },
  {
    title: 'Company',
    field: 'company',
    sortable: true,
  },
  {
    title: 'Subscription',
    field: 'subscription',
    sortable: true,
  },
  {
    title: 'Join Date',
    field: 'joinDate',
    sortable: true,
  },
  {
    title: 'Status',
    field: 'status',
    render: (value) => {
      let statusComponent;
      
      if (value === 'active') {
        statusComponent = (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Active</span>
          </div>
        );
      } else {
        statusComponent = (
          <div className="flex items-center text-red-600 dark:text-red-400">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Inactive</span>
          </div>
        );
      }
      
      return statusComponent;
    },
    sortable: true,
  },
];

// Helper function to format currency (since we're outside a React component)
const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount).replace('UZS', '') + " so'm";
};

const SuperAdminReports = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatCurrency: currencyFormat } = useCurrency();
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 11, 31),
  });
  
  const handleExportPdf = () => {
    console.log('Export PDF');
  };
  
  const handleExportExcel = () => {
    console.log('Export Excel');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t('reports')} 
        description={t('reports_description')}
      >
        <Button onClick={handleExportPdf}>
          <Download className="mr-2 h-4 w-4" />
          {t('export_report')}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('date_range')}</CardTitle>
          </CardHeader>
          <CardContent>
            <DateRangePicker
              date={dateRange}
              onChange={setDateRange}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('report_options')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('report_type')}</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t('select_report_type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all_data')}</SelectItem>
                  <SelectItem value="revenue">{t('revenue_only')}</SelectItem>
                  <SelectItem value="users">{t('users_only')}</SelectItem>
                  <SelectItem value="subscriptions">{t('subscriptions_only')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('data_grouping')}</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder={t('select_grouping')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{t('daily')}</SelectItem>
                  <SelectItem value="weekly">{t('weekly')}</SelectItem>
                  <SelectItem value="monthly">{t('monthly')}</SelectItem>
                  <SelectItem value="quarterly">{t('quarterly')}</SelectItem>
                  <SelectItem value="yearly">{t('yearly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2 flex gap-2">
              <Button className="flex-1">{t('generate_report')}</Button>
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                {t('export')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>{t('overview')}</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>{t('revenue')}</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{t('users')}</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>{t('subscriptions')}</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('revenue_trend')}</CardTitle>
                <CardDescription>
                  {t('revenue_trend_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => {
                          return value / 1000000 + 'M';
                        }}
                      />
                      <Tooltip 
                        formatter={(value: any) => [currencyFormat(value), t('revenue')]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-sm">
                  <span>{t('total')}: {currencyFormat(97600000)}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('user_growth')}</CardTitle>
                <CardDescription>
                  {t('user_growth_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userGrowthData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-sm">
                  <span>{t('growth_rate')}: 9.2% {t('monthly')}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('subscription_distribution')}</CardTitle>
                <CardDescription>
                  {t('subscription_distribution_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-sm">
                  <span>{t('total_subscriptions')}: 172</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('trial_conversion_rate')}</CardTitle>
                <CardDescription>
                  {t('trial_conversion_rate_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={conversionData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, t('conversion_rate')]} />
                      <Line
                        type="monotone"
                        dataKey="conversion"
                        stroke="#ff7300"
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-sm">
                  <span>{t('average_conversion')}: 78.3%</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('key_metrics')}</CardTitle>
              <CardDescription>
                {t('key_metrics_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('total_revenue')}</div>
                  <div className="text-2xl font-bold">{currencyFormat(97600000)}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+14.2% {t('vs_last_period')}</div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('active_users')}</div>
                  <div className="text-2xl font-bold">320</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+12.8% {t('vs_last_period')}</div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('subscription_renewal_rate')}</div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+3.5% {t('vs_last_period')}</div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('average_revenue_per_user')}</div>
                  <div className="text-2xl font-bold">{currencyFormat(567000)}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+7.2% {t('vs_last_period')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('payment_report')}</CardTitle>
              <CardDescription>
                {t('payment_report_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={paymentReportColumns}
                data={paymentReportData}
                onExportPdf={handleExportPdf}
                onExportExcel={handleExportExcel}
                searchable
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('revenue_by_subscription_type')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Start', value: 35 * 200000 },
                        { name: 'Pro', value: 45 * 500000 },
                        { name: 'Enterprise', value: 20 * 2000000 },
                      ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => {
                          return value / 1000000 + 'M';
                        }}
                      />
                      <Tooltip 
                        formatter={(value: any) => [currencyFormat(value), t('revenue')]}
                      />
                      <Bar dataKey="value" fill="#8884d8">
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('revenue_by_payment_method')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsChart>
                      <Pie
                        data={[
                          { name: 'Card', value: 55, color: '#0088FE' },
                          { name: 'Bank Transfer', value: 35, color: '#00C49F' },
                          { name: 'Cash', value: 10, color: '#FFBB28' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Card', value: 55, color: '#0088FE' },
                          { name: 'Bank Transfer', value: 35, color: '#00C49F' },
                          { name: 'Cash', value: 10, color: '#FFBB28' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('revenue_metrics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('monthly_recurring_revenue')}</div>
                  <div className="text-2xl font-bold">{currencyFormat(8133333)}</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    14.2% {t('vs_last_month')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('annual_recurring_revenue')}</div>
                  <div className="text-2xl font-bold">{currencyFormat(97600000)}</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    12.8% {t('vs_last_year')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('revenue_churn_rate')}</div>
                  <div className="text-2xl font-bold">3.2%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    0.7% {t('vs_last_month')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('user_report')}</CardTitle>
              <CardDescription>
                {t('user_report_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={userReportColumns}
                data={userReportData}
                onExportPdf={handleExportPdf}
                onExportExcel={handleExportExcel}
                searchable
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('users_by_role')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsChart>
                      <Pie
                        data={[
                          { name: 'Admin', value: 15, color: '#0088FE' },
                          { name: 'Warehouse', value: 20, color: '#00C49F' },
                          { name: 'Dealer', value: 25, color: '#FFBB28' },
                          { name: 'Agent', value: 15, color: '#FF8042' },
                          { name: 'Store', value: 25, color: '#8884d8' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Admin', value: 15, color: '#0088FE' },
                          { name: 'Warehouse', value: 20, color: '#00C49F' },
                          { name: 'Dealer', value: 25, color: '#FFBB28' },
                          { name: 'Agent', value: 15, color: '#FF8042' },
                          { name: 'Store', value: 25, color: '#8884d8' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('user_activity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Daily Active', value: 230 },
                        { name: 'Weekly Active', value: 280 },
                        { name: 'Monthly Active', value: 320 },
                      ]}
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
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('user_metrics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('user_retention_rate')}</div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    3.5% {t('vs_last_period')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('user_churn_rate')}</div>
                  <div className="text-2xl font-bold">8%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2.1% {t('vs_last_period')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('average_onboarding_time')}</div>
                  <div className="text-2xl font-bold">3.2 {t('days')}</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    0.7 {t('days')} {t('vs_last_period')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('subscription_distribution')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('subscription_growth')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={[
                        { month: 'Jan', start: 25, pro: 30, enterprise: 12 },
                        { month: 'Feb', start: 27, pro: 32, enterprise: 13 },
                        { month: 'Mar', start: 28, pro: 35, enterprise: 14 },
                        { month: 'Apr', start: 30, pro: 37, enterprise: 15 },
                        { month: 'May', start: 31, pro: 39, enterprise: 16 },
                        { month: 'Jun', start: 32, pro: 41, enterprise: 17 },
                        { month: 'Jul', start: 33, pro: 42, enterprise: 18 },
                        { month: 'Aug', start: 34, pro: 43, enterprise: 19 },
                        { month: 'Sep', start: 35, pro: 44, enterprise: 19 },
                        { month: 'Oct', start: 35, pro: 45, enterprise: 20 },
                        { month: 'Nov', start: 35, pro: 45, enterprise: 20 },
                        { month: 'Dec', start: 35, pro: 45, enterprise: 20 },
                      ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="start"
                        name="Start"
                        stroke="#0088FE"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pro"
                        name="Pro"
                        stroke="#00C49F"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="enterprise"
                        name="Enterprise"
                        stroke="#FFBB28"
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('subscription_metrics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('average_subscription_length')}</div>
                  <div className="text-2xl font-bold">9.5 {t('months')}</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    1.2 {t('months')} {t('vs_last_period')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('trial_conversion_rate')}</div>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    5.3% {t('vs_last_period')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('upgrade_rate')}</div>
                  <div className="text-2xl font-bold">22%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    3.1% {t('vs_last_period')}
                  </div>
                </div>
                
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">{t('renewal_rate')}</div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="flex text-xs text-green-600 dark:text-green-400 items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2.5% {t('vs_last_period')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('popular_subscription_features')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>API Access</span>
                  <div className="w-3/4 bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="w-12 text-right">85%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Custom Branding</span>
                  <div className="w-3/4 bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="w-12 text-right">75%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Advanced Reporting</span>
                  <div className="w-3/4 bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="w-12 text-right">68%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Priority Support</span>
                  <div className="w-3/4 bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <span className="w-12 text-right">62%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Dedicated Account Manager</span>
                  <div className="w-3/4 bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="w-12 text-right">45%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminReports;

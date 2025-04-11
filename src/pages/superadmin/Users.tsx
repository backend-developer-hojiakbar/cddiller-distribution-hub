
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  UserPlus, 
  ShieldCheck, 
  Store, 
  Package,
  Database,
  UserCog,
  Users,
  Search,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Phone,
  MapPin
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { UserRole } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import DataTable, { ColumnDef } from '@/components/DataTable';
import StatsCard from '@/components/StatsCard';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  subscription?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  avatar?: string;
  phone?: string;
  address?: string;
};

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'admin@cddiller.com',
    role: 'admin',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    status: 'active',
    createdAt: '2025-01-15',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4567',
    address: 'Tashkent, Uzbekistan',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'warehouse@cddiller.com',
    role: 'warehouse',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    status: 'active',
    createdAt: '2025-01-16',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4568',
    address: 'Tashkent, Uzbekistan',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'dealer@cddiller.com',
    role: 'dealer',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    status: 'active',
    createdAt: '2025-01-17',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4569',
    address: 'Samarkand, Uzbekistan',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'agent@cddiller.com',
    role: 'agent',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    status: 'inactive',
    createdAt: '2025-01-18',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4570',
    address: 'Bukhara, Uzbekistan',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'store@cddiller.com',
    role: 'store',
    company: 'SoftDrinks LLC',
    subscription: 'Pro',
    status: 'active',
    createdAt: '2025-01-19',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4571',
    address: 'Nukus, Uzbekistan',
  },
  {
    id: '6',
    name: 'Alex Martinez',
    email: 'admin2@cddiller.com',
    role: 'admin',
    company: 'GoodFood Inc',
    subscription: 'Start',
    status: 'pending',
    createdAt: '2025-02-20',
    avatar: '/placeholder.svg',
    phone: '+998 90 123 4572',
    address: 'Andijan, Uzbekistan',
  },
];

const UsersPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Stats counts
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;

  // Role counts for stats
  const adminCount = users.filter(u => u.role === 'admin').length;
  const warehouseCount = users.filter(u => u.role === 'warehouse').length;
  const dealerCount = users.filter(u => u.role === 'dealer').length;
  const agentCount = users.filter(u => u.role === 'agent').length;
  const storeCount = users.filter(u => u.role === 'store').length;

  // Get role icon
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'superadmin':
        return <ShieldCheck className="h-4 w-4 mr-1" />;
      case 'admin':
        return <UserCog className="h-4 w-4 mr-1" />;
      case 'warehouse':
        return <Database className="h-4 w-4 mr-1" />;
      case 'dealer':
        return <Users className="h-4 w-4 mr-1" />;
      case 'agent':
        return <UserCog className="h-4 w-4 mr-1" />;
      case 'store':
        return <Store className="h-4 w-4 mr-1" />;
      default:
        return <UserCog className="h-4 w-4 mr-1" />;
    }
  };

  // Columns for the users table
  const columns: ColumnDef[] = [
    {
      title: t('name'),
      field: 'name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} alt={value} />
            <AvatarFallback>{value.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      title: t('role'),
      field: 'role',
      render: (value) => (
        <div className="flex items-center">
          {getRoleIcon(value as UserRole)}
          <span>{t(value)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      title: t('company'),
      field: 'company',
      sortable: true,
    },
    {
      title: t('subscription'),
      field: 'subscription',
      sortable: true,
    },
    {
      title: t('created_at'),
      field: 'createdAt',
      sortable: true,
    },
    {
      title: t('status'),
      field: 'status',
      render: (value) => {
        let badgeVariant:
          | 'default'
          | 'secondary'
          | 'destructive'
          | 'outline'
          | null = null;
        
        if (value === 'active') {
          badgeVariant = 'default';
        } else if (value === 'inactive') {
          badgeVariant = 'destructive';
        } else if (value === 'pending') {
          badgeVariant = 'secondary';
        }
        
        return (
          <Badge variant={badgeVariant}>{t(value)}</Badge>
        );
      },
      sortable: true,
    },
    {
      title: t('actions'),
      field: 'actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(row);
              setIsViewDialogOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === 'pending' && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                console.log('Approve user', row);
              }}
            >
              <UserCheck className="h-4 w-4" />
            </Button>
          )}
          {row.status === 'active' && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                console.log('Deactivate user', row);
              }}
            >
              <UserX className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleAddUser = () => {
    setIsAddDialogOpen(true);
  };

  const handleExportPdf = () => {
    console.log('Export PDF');
  };

  const handleExportExcel = () => {
    console.log('Export Excel');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t('users')} 
        description={t('users_description')}
      >
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('add_user')}
        </Button>
      </PageHeader>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('total_users')}
          value={totalUsers}
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('active_users')}
          value={activeUsers}
          icon={<UserCheck size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('pending_users')}
          value={pendingUsers}
          icon={<UserPlus size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title={t('inactive_users')}
          value={inactiveUsers}
          icon={<UserX size={24} />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Role Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <UserCog className="h-8 w-8 mb-2 text-blue-500" />
            <h3 className="font-semibold">{t('admins')}</h3>
            <p className="text-2xl font-bold">{adminCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Database className="h-8 w-8 mb-2 text-green-500" />
            <h3 className="font-semibold">{t('warehouse')}</h3>
            <p className="text-2xl font-bold">{warehouseCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 mb-2 text-purple-500" />
            <h3 className="font-semibold">{t('dealers')}</h3>
            <p className="text-2xl font-bold">{dealerCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <UserCog className="h-8 w-8 mb-2 text-orange-500" />
            <h3 className="font-semibold">{t('agents')}</h3>
            <p className="text-2xl font-bold">{agentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Store className="h-8 w-8 mb-2 text-red-500" />
            <h3 className="font-semibold">{t('stores')}</h3>
            <p className="text-2xl font-bold">{storeCount}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t('all_users')}</TabsTrigger>
          <TabsTrigger value="admin">{t('admins')}</TabsTrigger>
          <TabsTrigger value="warehouse">{t('warehouse')}</TabsTrigger>
          <TabsTrigger value="dealer">{t('dealers')}</TabsTrigger>
          <TabsTrigger value="agent">{t('agents')}</TabsTrigger>
          <TabsTrigger value="store">{t('stores')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={columns}
            data={users}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('all_users')}
            searchable
          />
        </TabsContent>
        
        <TabsContent value="admin" className="space-y-4">
          <DataTable
            columns={columns}
            data={users.filter(u => u.role === 'admin')}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('admins')}
            searchable
          />
        </TabsContent>
        
        <TabsContent value="warehouse" className="space-y-4">
          <DataTable
            columns={columns}
            data={users.filter(u => u.role === 'warehouse')}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('warehouse_managers')}
            searchable
          />
        </TabsContent>
        
        <TabsContent value="dealer" className="space-y-4">
          <DataTable
            columns={columns}
            data={users.filter(u => u.role === 'dealer')}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('dealers')}
            searchable
          />
        </TabsContent>
        
        <TabsContent value="agent" className="space-y-4">
          <DataTable
            columns={columns}
            data={users.filter(u => u.role === 'agent')}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('agents')}
            searchable
          />
        </TabsContent>
        
        <TabsContent value="store" className="space-y-4">
          <DataTable
            columns={columns}
            data={users.filter(u => u.role === 'store')}
            onAdd={handleAddUser}
            onRowClick={handleViewUser}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
            title={t('stores')}
            searchable
          />
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('user_details')}</DialogTitle>
            <DialogDescription>
              {t('user_details_description')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="text-2xl">
                    {selectedUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(selectedUser.role)}
                    <span className="font-medium">{t(selectedUser.role)}</span>
                  </div>
                  <Badge variant={
                    selectedUser.status === 'active' 
                      ? 'default' 
                      : selectedUser.status === 'inactive' 
                      ? 'destructive' 
                      : 'secondary'
                  }>
                    {t(selectedUser.status)}
                  </Badge>
                  
                  {selectedUser.company && (
                    <p className="text-sm">
                      {t('company')}: {selectedUser.company}
                    </p>
                  )}
                  
                  {selectedUser.subscription && (
                    <p className="text-sm">
                      {t('subscription')}: {selectedUser.subscription}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUser.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUser.phone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUser.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{t('joined')}: {selectedUser.createdAt}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 mt-4">
            {selectedUser && selectedUser.status === 'pending' && (
              <Button 
                onClick={() => {
                  console.log('Approve user', selectedUser);
                  setIsViewDialogOpen(false);
                }}
                className="flex items-center"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                {t('approve_user')}
              </Button>
            )}
            
            {selectedUser && selectedUser.status === 'active' && (
              <Button 
                variant="destructive"
                onClick={() => {
                  console.log('Deactivate user', selectedUser);
                  setIsViewDialogOpen(false);
                }}
                className="flex items-center"
              >
                <UserX className="h-4 w-4 mr-2" />
                {t('deactivate_user')}
              </Button>
            )}
            
            {selectedUser && selectedUser.status === 'inactive' && (
              <Button 
                onClick={() => {
                  console.log('Activate user', selectedUser);
                  setIsViewDialogOpen(false);
                }}
                className="flex items-center"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                {t('activate_user')}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Edit user', selectedUser);
                setIsViewDialogOpen(false);
              }}
            >
              {t('edit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('add_user')}</DialogTitle>
            <DialogDescription>
              {t('add_user_description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" placeholder={t('enter_name')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" type="email" placeholder={t('enter_email')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">{t('role')}</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder={t('select_role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t('admin')}</SelectItem>
                    <SelectItem value="warehouse">{t('warehouse')}</SelectItem>
                    <SelectItem value="dealer">{t('dealer')}</SelectItem>
                    <SelectItem value="agent">{t('agent')}</SelectItem>
                    <SelectItem value="store">{t('store')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">{t('company')}</Label>
                <Select>
                  <SelectTrigger id="company">
                    <SelectValue placeholder={t('select_company')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="softdrinks">SoftDrinks LLC</SelectItem>
                    <SelectItem value="goodfood">GoodFood Inc</SelectItem>
                    <SelectItem value="techdistribution">TechDistribution</SelectItem>
                    <SelectItem value="add_new">{t('add_new_company')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input id="phone" placeholder={t('enter_phone')} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input id="address" placeholder={t('enter_address')} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" type="password" placeholder={t('enter_password')} />
              <p className="text-xs text-muted-foreground">{t('password_requirements')}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={() => {
              console.log('Add new user');
              setIsAddDialogOpen(false);
            }}>
              {t('add_user')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;

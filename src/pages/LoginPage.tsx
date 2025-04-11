
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // If already authenticated, redirect to their dashboard
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        // We'll be redirected by the useEffect above
      }
    } finally {
      setLoading(false);
    }
  };

  const languageOptions: { label: string; value: Language; flag: string }[] = [
    { label: "O'zbekcha (lotin)", value: 'uz_latin', flag: '🇺🇿' },
    { label: "Ўзбекча (кирилл)", value: 'uz_cyrillic', flag: '🇺🇿' },
    { label: "Русский", value: 'ru', flag: '🇷🇺' },
    { label: "English", value: 'en', flag: '🇬🇧' },
  ];

  const currencyOptions: { label: string; value: Currency }[] = [
    { label: "UZS (so'm)", value: 'UZS' },
    { label: "USD ($)", value: 'USD' },
    { label: "EUR (€)", value: 'EUR' },
    { label: "RUB (₽)", value: 'RUB' },
  ];

  // Demo credentials
  const demoCredentials = [
    { role: 'superadmin', email: 'superadmin@cddiller.com', password: 'superadmin123' },
    { role: 'admin', email: 'admin@cddiller.com', password: 'admin123' },
    { role: 'warehouse', email: 'warehouse@cddiller.com', password: 'warehouse123' },
    { role: 'dealer', email: 'dealer@cddiller.com', password: 'dealer123' },
    { role: 'agent', email: 'agent@cddiller.com', password: 'agent123' },
    { role: 'store', email: 'store@cddiller.com', password: 'store123' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  <span className="mr-2">{option.flag}</span>
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            {currencyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px]">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary">CDDiller</h1>
          <p className="text-muted-foreground">
            {t('login_description')}
          </p>
        </div>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>{t('login')}</CardTitle>
            <CardDescription>
              {t('enter_credentials')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@cddiller.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t('logging_in') : t('login')}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mb-4">{t('demo_accounts')}</div>
            <Tabs defaultValue="superadmin" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="superadmin">Superadmin</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              <TabsContent value="superadmin" className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('email')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    superadmin@cddiller.com
                  </code>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('password')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    superadmin123
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmail('superadmin@cddiller.com');
                    setPassword('superadmin123');
                  }}
                  className="w-full"
                >
                  {t('autofill')}
                </Button>
              </TabsContent>
              <TabsContent value="admin" className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('email')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    admin@cddiller.com
                  </code>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('password')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    admin123
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmail('admin@cddiller.com');
                    setPassword('admin123');
                  }}
                  className="w-full"
                >
                  {t('autofill')}
                </Button>
              </TabsContent>
              <TabsContent value="other" className="space-y-4">
                <Select onValueChange={(value) => {
                  const selected = demoCredentials.find(cred => cred.role === value);
                  if (selected) {
                    setEmail(selected.email);
                    setPassword(selected.password);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="dealer">Dealer</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="store">Store</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('email')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {email || 'example@cddiller.com'}
                  </code>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{t('password')}:</div>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {password || '******'}
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const warehouse = demoCredentials.find(cred => cred.role === 'warehouse');
                    if (warehouse) {
                      setEmail(warehouse.email);
                      setPassword(warehouse.password);
                    }
                  }}
                  className="w-full"
                >
                  {t('autofill')}
                </Button>
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

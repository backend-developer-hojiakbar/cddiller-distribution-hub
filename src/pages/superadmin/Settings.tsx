
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save,
  Languages,
  PencilLine,
  CreditCard,
  Bell,
  User,
  Shield,
  Mail,
  Globe,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';

const SuperAdminSettings = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const { user } = useAuth();
  
  // Currency settings
  const [currencies, setCurrencies] = useState([
    {
      code: 'UZS',
      name: 'Uzbekistan Som',
      symbol: 'so\'m',
      rate: 1,
      active: true,
    },
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      rate: 12700,
      active: true,
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      rate: 13500,
      active: true,
    },
    {
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
      rate: 140,
      active: true,
    },
  ]);
  
  // Language settings
  const [languages, setLanguages] = useState([
    {
      code: 'uz_latin',
      name: 'O\'zbekcha (lotin)',
      active: true,
    },
    {
      code: 'uz_cyrillic',
      name: 'Ўзбекча (кирилл)',
      active: true,
    },
    {
      code: 'ru',
      name: 'Русский',
      active: true,
    },
    {
      code: 'en',
      name: 'English',
      active: true,
    },
  ]);
  
  // Platform settings
  const [platformSettings, setPlatformSettings] = useState({
    name: 'CDDiller',
    description: 'Distribution Management Platform',
    logo: '/placeholder.svg',
    supportEmail: 'support@cddiller.com',
    allowRegistration: true,
    requireAdminApproval: true,
    demoMode: false,
    maintenanceMode: false,
  });
  
  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    provider: 'smtp',
    host: 'smtp.example.com',
    port: '587',
    username: 'noreply@cddiller.com',
    password: '**********',
    fromEmail: 'noreply@cddiller.com',
    fromName: 'CDDiller Platform',
    enableNotifications: true,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    requireStrongPasswords: true,
    passwordMinLength: 8,
    enable2FA: true,
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    enableAuditLog: true,
    lockoutDuration: 15, // minutes
  });
  
  // Currency rate update function
  const handleCurrencyRateUpdate = (code: string, newRate: number) => {
    setCurrencies(currencies.map(c => 
      c.code === code ? { ...c, rate: newRate } : c
    ));
  };
  
  // Currency toggle function
  const handleCurrencyToggle = (code: string) => {
    setCurrencies(currencies.map(c => 
      c.code === code ? { ...c, active: !c.active } : c
    ));
  };
  
  // Language toggle function
  const handleLanguageToggle = (code: string) => {
    setLanguages(languages.map(l => 
      l.code === code ? { ...l, active: !l.active } : l
    ));
  };
  
  // Save settings
  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // This would normally send an API request to save the settings
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t('settings')} 
        description={t('settings_description')}
      >
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          {t('save_settings')}
        </Button>
      </PageHeader>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('profile')}</span>
          </TabsTrigger>
          <TabsTrigger value="currency" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t('currency')}</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t('language')}</span>
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('platform')}</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">{t('email')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t('security')}</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile_settings')}</CardTitle>
              <CardDescription>
                {t('profile_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')}</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="flex items-center">
                      <PencilLine className="mr-2 h-4 w-4" />
                      {t('change_avatar')}
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t('remove_avatar')}
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('change_password')}</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">{t('current_password')}</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div></div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t('new_password')}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Button className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  {t('update_password')}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('notification_preferences')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">{t('email_notifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('email_notifications_description')}
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">{t('browser_notifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('browser_notifications_description')}
                      </p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-notifications">{t('login_notifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('login_notifications_description')}
                      </p>
                    </div>
                    <Switch id="login-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_profile')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Currency Tab */}
        <TabsContent value="currency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('currency_settings')}</CardTitle>
              <CardDescription>
                {t('currency_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-currency">{t('default_currency')}</Label>
                    <Select defaultValue="UZS">
                      <SelectTrigger id="default-currency">
                        <SelectValue placeholder={t('select_default_currency')} />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate-provider">{t('exchange_rate_provider')}</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger id="rate-provider">
                        <SelectValue placeholder={t('select_provider')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">{t('manual_input')}</SelectItem>
                        <SelectItem value="api">{t('central_bank_api')}</SelectItem>
                        <SelectItem value="open_exchange">{t('open_exchange_rates')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button variant="outline" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t('add_new_currency')}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('active_currencies')}</h3>
                
                <div className="space-y-4">
                  {currencies.map(currency => (
                    <div key={currency.code} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-sm text-muted-foreground ml-2">({currency.name})</span>
                        </div>
                        
                        {currency.code !== 'UZS' && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="space-y-1">
                              <Label htmlFor={`rate-${currency.code}`} className="text-xs">
                                {t('exchange_rate')} (1 {currency.code} = X UZS)
                              </Label>
                              <Input
                                id={`rate-${currency.code}`}
                                type="number"
                                value={currency.rate}
                                onChange={(e) => handleCurrencyRateUpdate(currency.code, parseFloat(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor={`symbol-${currency.code}`} className="text-xs">
                                {t('symbol')}
                              </Label>
                              <Input
                                id={`symbol-${currency.code}`}
                                value={currency.symbol}
                                readOnly
                                className="h-8"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4 flex items-center space-x-2">
                        {currency.code === 'UZS' ? (
                          <span className="text-xs text-muted-foreground">
                            {t('base_currency')}
                          </span>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" className="h-8">
                              {t('edit')}
                            </Button>
                            <Switch
                              checked={currency.active}
                              onCheckedChange={() => handleCurrencyToggle(currency.code)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t('advanced_settings')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-update">{t('auto_update_rates')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('auto_update_rates_description')}
                      </p>
                    </div>
                    <Switch id="auto-update" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="update-frequency">{t('update_frequency')}</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="update-frequency">
                        <SelectValue placeholder={t('select_frequency')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{t('hourly')}</SelectItem>
                        <SelectItem value="daily">{t('daily')}</SelectItem>
                        <SelectItem value="weekly">{t('weekly')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_currency_settings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Language Tab */}
        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('language_settings')}</CardTitle>
              <CardDescription>
                {t('language_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">{t('default_language')}</Label>
                    <Select defaultValue="uz_latin">
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder={t('select_default_language')} />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button variant="outline" className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  {t('add_new_language')}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('active_languages')}</h3>
                
                <div className="space-y-4">
                  {languages.map(language => (
                    <div key={language.code} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <span className="font-medium">{language.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({language.code})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          {t('translations')}
                        </Button>
                        <Switch
                          checked={language.active}
                          onCheckedChange={() => handleLanguageToggle(language.code)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('translation_import_export')}</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="import-language">{t('import_translations')}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select className="col-span-2">
                        <SelectTrigger id="import-language">
                          <SelectValue placeholder={t('select_language')} />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map(language => (
                            <SelectItem key={language.code} value={language.code}>
                              {language.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline">{t('import')}</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="export-language">{t('export_translations')}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select className="col-span-2">
                        <SelectTrigger id="export-language">
                          <SelectValue placeholder={t('select_language')} />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map(language => (
                            <SelectItem key={language.code} value={language.code}>
                              {language.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline">{t('export')}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_language_settings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Platform Tab */}
        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('platform_settings')}</CardTitle>
              <CardDescription>
                {t('platform_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">{t('platform_name')}</Label>
                    <Input 
                      id="platform-name" 
                      value={platformSettings.name}
                      onChange={(e) => setPlatformSettings({...platformSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="support-email">{t('support_email')}</Label>
                    <Input 
                      id="support-email" 
                      type="email"
                      value={platformSettings.supportEmail}
                      onChange={(e) => setPlatformSettings({...platformSettings, supportEmail: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform-description">{t('platform_description')}</Label>
                  <Textarea 
                    id="platform-description"
                    value={platformSettings.description}
                    onChange={(e) => setPlatformSettings({...platformSettings, description: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-background">
                      <img src={platformSettings.logo} alt="Logo" className="max-h-full max-w-full" />
                    </div>
                    <Button variant="outline" size="sm">
                      {t('change_logo')}
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>{t('registration_settings')}</Label>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-registration">{t('allow_public_registration')}</Label>
                            <p className="text-sm text-muted-foreground">
                              {t('allow_public_registration_description')}
                            </p>
                          </div>
                          <Switch 
                            id="allow-registration"
                            checked={platformSettings.allowRegistration}
                            onCheckedChange={(checked) => setPlatformSettings({...platformSettings, allowRegistration: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="require-approval">{t('require_admin_approval')}</Label>
                            <p className="text-sm text-muted-foreground">
                              {t('require_admin_approval_description')}
                            </p>
                          </div>
                          <Switch 
                            id="require-approval"
                            checked={platformSettings.requireAdminApproval}
                            onCheckedChange={(checked) => setPlatformSettings({...platformSettings, requireAdminApproval: checked})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('system_settings')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="demo-mode">{t('demo_mode')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('demo_mode_description')}
                      </p>
                    </div>
                    <Switch 
                      id="demo-mode"
                      checked={platformSettings.demoMode}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, demoMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">{t('maintenance_mode')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('maintenance_mode_description')}
                      </p>
                    </div>
                    <Switch 
                      id="maintenance-mode"
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, maintenanceMode: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_platform_settings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('email_settings')}</CardTitle>
              <CardDescription>
                {t('email_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email-provider">{t('email_provider')}</Label>
                    <Select 
                      value={emailSettings.provider}
                      onValueChange={(value) => setEmailSettings({...emailSettings, provider: value})}
                    >
                      <SelectTrigger id="email-provider">
                        <SelectValue placeholder={t('select_provider')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smtp">{t('smtp')}</SelectItem>
                        <SelectItem value="sendgrid">{t('sendgrid')}</SelectItem>
                        <SelectItem value="mailchimp">{t('mailchimp')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {emailSettings.provider === 'smtp' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-host">{t('smtp_host')}</Label>
                        <Input 
                          id="smtp-host" 
                          value={emailSettings.host}
                          onChange={(e) => setEmailSettings({...emailSettings, host: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">{t('smtp_port')}</Label>
                        <Input 
                          id="smtp-port" 
                          type="number"
                          value={emailSettings.port}
                          onChange={(e) => setEmailSettings({...emailSettings, port: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-username">{t('smtp_username')}</Label>
                        <Input 
                          id="smtp-username" 
                          value={emailSettings.username}
                          onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-password">{t('smtp_password')}</Label>
                        <Input 
                          id="smtp-password" 
                          type="password" 
                          value={emailSettings.password}
                          onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      {t('test_connection')}
                    </Button>
                  </div>
                )}
                
                {emailSettings.provider !== 'smtp' && (
                  <div className="space-y-2">
                    <Label htmlFor="api-key">{t('api_key')}</Label>
                    <Input id="api-key" type="password" />
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('sender_information')}</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from-email">{t('from_email')}</Label>
                    <Input 
                      id="from-email" 
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="from-name">{t('from_name')}</Label>
                    <Input 
                      id="from-name"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('notification_templates')}</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="select-template">{t('select_template')}</Label>
                  <Select>
                    <SelectTrigger id="select-template">
                      <SelectValue placeholder={t('select_template')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">{t('welcome_email')}</SelectItem>
                      <SelectItem value="password-reset">{t('password_reset')}</SelectItem>
                      <SelectItem value="invoice">{t('invoice_email')}</SelectItem>
                      <SelectItem value="payment-success">{t('payment_success')}</SelectItem>
                      <SelectItem value="payment-failed">{t('payment_failed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-notifications">{t('enable_email_notifications')}</Label>
                    <Switch 
                      id="enable-notifications"
                      checked={emailSettings.enableNotifications}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableNotifications: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_email_settings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('security_settings')}</CardTitle>
              <CardDescription>
                {t('security_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('password_policy')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="strong-passwords">{t('require_strong_passwords')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('require_strong_passwords_description')}
                      </p>
                    </div>
                    <Switch 
                      id="strong-passwords"
                      checked={securitySettings.requireStrongPasswords}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireStrongPasswords: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-length">{t('minimum_password_length')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="password-length" 
                        type="number" 
                        min="6" 
                        max="30"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value) || 8})}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t('characters')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('two_factor_authentication')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-2fa">{t('enable_2fa')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('enable_2fa_description')}
                      </p>
                    </div>
                    <Switch 
                      id="enable-2fa"
                      checked={securitySettings.enable2FA}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enable2FA: checked})}
                    />
                  </div>
                  
                  {securitySettings.enable2FA && (
                    <div className="space-y-2">
                      <Label htmlFor="2fa-method">{t('2fa_method')}</Label>
                      <Select defaultValue="sms">
                        <SelectTrigger id="2fa-method">
                          <SelectValue placeholder={t('select_2fa_method')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">{t('sms')}</SelectItem>
                          <SelectItem value="email">{t('email')}</SelectItem>
                          <SelectItem value="authenticator">{t('authenticator_app')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('session_settings')}</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">{t('session_timeout')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="session-timeout" 
                        type="number" 
                        min="5" 
                        max="1440"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value) || 30})}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t('minutes')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">{t('max_login_attempts')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="max-login-attempts" 
                        type="number" 
                        min="1" 
                        max="10"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value) || 5})}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t('attempts')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">{t('lockout_duration')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="lockout-duration" 
                        type="number" 
                        min="5" 
                        max="1440"
                        value={securitySettings.lockoutDuration}
                        onChange={(e) => setSecuritySettings({...securitySettings, lockoutDuration: parseInt(e.target.value) || 15})}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t('minutes')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('audit_logging')}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-audit-log">{t('enable_audit_log')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('enable_audit_log_description')}
                    </p>
                  </div>
                  <Switch 
                    id="enable-audit-log"
                    checked={securitySettings.enableAuditLog}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableAuditLog: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                {t('save_security_settings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;

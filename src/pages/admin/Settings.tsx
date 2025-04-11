
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SettingsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="settings"
      description="configure_your_account_settings_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('settings_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default SettingsPage;

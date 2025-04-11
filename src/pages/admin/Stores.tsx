
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const StoresPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="stores"
      description="manage_your_stores_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('stores_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default StoresPage;

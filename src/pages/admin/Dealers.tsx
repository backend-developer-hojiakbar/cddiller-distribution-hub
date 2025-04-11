
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DealersPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="dealers"
      description="manage_your_dealers_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('dealers_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DealersPage;

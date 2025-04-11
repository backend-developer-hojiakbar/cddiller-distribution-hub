
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DealerReturns = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="returns"
      description="manage_dealer_returns_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('dealer_returns_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DealerReturns;


import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ReturnsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="returns"
      description="manage_product_returns_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('returns_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ReturnsPage;

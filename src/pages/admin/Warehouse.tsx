
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const WarehousePage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="warehouse"
      description="manage_your_warehouse_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('warehouse_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default WarehousePage;

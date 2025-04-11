
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const OrdersPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="orders"
      description="manage_your_orders_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('orders_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default OrdersPage;

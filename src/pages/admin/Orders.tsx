
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const OrdersPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Buyurtmalar"
      description="Buyurtmalarni boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Barcha buyurtmalar ro'yxati va ularning holati bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default OrdersPage;

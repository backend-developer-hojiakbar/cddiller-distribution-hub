
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const WarehousePage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Ombor"
      description="Ombor ma'lumotlarini boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Ombor ma'lumotlari va inventarizatsiya bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default WarehousePage;


import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const TrashPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Axlat"
      description="O'chirilgan elementlarni boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>O'chirilgan mahsulotlar, buyurtmalar va boshqa ma'lumotlar bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default TrashPage;


import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ReturnsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Qaytarishlar"
      description="Mahsulot qaytarishlarini boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Qaytarilgan mahsulotlar ro'yxati va ma'lumotlari bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ReturnsPage;

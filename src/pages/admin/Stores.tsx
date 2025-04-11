
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const StoresPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Do'konlar"
      description="Do'konlar ro'yxatini boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Do'konlar ro'yxati va ma'lumotlari bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default StoresPage;

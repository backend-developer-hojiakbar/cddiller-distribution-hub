
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DealersPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Dillerlar"
      description="Dillerlar ro'yxatini boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Dillerlar ro'yxati va ma'lumotlari bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DealersPage;


import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const InvoicesPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Hisob-fakturalar"
      description="Hisob-fakturalarni boshqarish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Barcha hisob-fakturalar ro'yxati va to'lov ma'lumotlari bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default InvoicesPage;

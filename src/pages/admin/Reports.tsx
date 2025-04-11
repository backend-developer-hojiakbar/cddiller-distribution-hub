
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ReportsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Hisobotlar"
      description="Biznes hisobotlarini ko'rish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Biznes hisobotlari, savdo statistikasi va tahlillar bu yerda ko'rsatiladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ReportsPage;


import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ReportsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="reports"
      description="view_your_business_reports_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('reports_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ReportsPage;

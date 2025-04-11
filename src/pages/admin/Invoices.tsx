
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const InvoicesPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="invoices"
      description="manage_your_invoices_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('invoices_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default InvoicesPage;

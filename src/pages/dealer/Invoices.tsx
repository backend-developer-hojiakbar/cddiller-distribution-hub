
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DealerInvoices = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="invoices"
      description="manage_dealer_invoices_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('dealer_invoices_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DealerInvoices;

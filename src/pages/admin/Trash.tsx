
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const TrashPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="trash"
      description="manage_deleted_items_description"
    >
      <Card>
        <CardContent className="pt-6">
          <p>{t('trash_page_content')}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default TrashPage;

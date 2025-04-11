
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SettingsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout 
      title="Sozlamalar"
      description="Tizim sozlamalarini o'zgartirish"
    >
      <Card>
        <CardContent className="pt-6">
          <p>Tizim sozlamalari, profil ma'lumotlari va boshqa konfiguratsiyalar bu yerda boshqariladi.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default SettingsPage;

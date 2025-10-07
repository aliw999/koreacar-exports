import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Upload, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface OnboardingStatus {
  business_registration_uploaded: boolean;
  business_license_uploaded: boolean;
  tax_certificate_uploaded: boolean;
  dealer_license_uploaded: boolean;
  bank_account_uploaded: boolean;
  corporate_seal_uploaded: boolean;
  representative_id_uploaded: boolean;
  bank_account_number: string | null;
  is_completed: boolean;
}

export function OnboardingProgress() {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnboardingStatus();
  }, []);

  const fetchOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('dealer_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setStatus(data);
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-3/4"></div>
            <div className="h-2 bg-amber-200 dark:bg-amber-800 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!status || status.is_completed) {
    return null;
  }

  // Calculate progress
  const totalSteps = 8; // 7 documents + bank details
  const completedSteps = [
    status.business_registration_uploaded,
    status.business_license_uploaded,
    status.tax_certificate_uploaded,
    status.dealer_license_uploaded,
    status.bank_account_uploaded,
    status.corporate_seal_uploaded,
    status.representative_id_uploaded,
    !!status.bank_account_number,
  ].filter(Boolean).length;

  const progressPercent = (completedSteps / totalSteps) * 100;

  const missingDocuments = [];
  if (!status.business_registration_uploaded) missingDocuments.push('Свидетельство о регистрации');
  if (!status.business_license_uploaded) missingDocuments.push('Бизнес-лицензия');
  if (!status.tax_certificate_uploaded) missingDocuments.push('Налоговый сертификат');
  if (!status.dealer_license_uploaded) missingDocuments.push('Дилерская лицензия');
  if (!status.corporate_seal_uploaded) missingDocuments.push('Корпоративная печать');
  if (!status.representative_id_uploaded) missingDocuments.push('Удостоверение представителя');
  if (!status.bank_account_uploaded) missingDocuments.push('Банковские реквизиты (скан)');
  if (!status.bank_account_number) missingDocuments.push('Банковские реквизиты (данные)');

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">
                Завершите настройку аккаунта
              </CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-300">
                Для начала работы необходимо загрузить все документы
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white dark:bg-amber-950 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300">
            {completedSteps} из {totalSteps}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-amber-700 dark:text-amber-300">
            <span>Прогресс загрузки документов</span>
            <span className="font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </div>

        {missingDocuments.length > 0 && (
          <div className="bg-white/50 dark:bg-amber-950/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-900 dark:text-amber-100">
              <FileText className="h-4 w-4" />
              Необходимо загрузить:
            </div>
            <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
              {missingDocuments.slice(0, 3).map((doc, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {doc}
                </li>
              ))}
              {missingDocuments.length > 3 && (
                <li className="text-xs italic">
                  и еще {missingDocuments.length - 3} документов...
                </li>
              )}
            </ul>
          </div>
        )}

        <Link to="/dashboard/documents">
          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
            <Upload className="mr-2 h-4 w-4" />
            Загрузить документы
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
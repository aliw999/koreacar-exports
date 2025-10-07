import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, CheckCircle, AlertCircle, Download, Trash2, Eye } from 'lucide-react';

interface DocumentField {
  id: string;
  label: string;
  dbField: keyof OnboardingStatus;
  description: string;
  required: boolean;
}

interface OnboardingStatus {
  business_registration_uploaded: boolean;
  business_license_uploaded: boolean;
  tax_certificate_uploaded: boolean;
  dealer_license_uploaded: boolean;
  bank_account_uploaded: boolean;
  corporate_seal_uploaded: boolean;
  representative_id_uploaded: boolean;
  bank_account_number: string | null;
  bank_name: string | null;
  account_holder_name: string | null;
  is_completed: boolean;
}

const Documents = () => {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState({
    bank_account_number: '',
    bank_name: '',
    account_holder_name: '',
  });
  const { toast } = useToast();

  const documentFields: DocumentField[] = [
    {
      id: 'business_registration',
      label: 'Свидетельство о регистрации бизнеса',
      dbField: 'business_registration_uploaded',
      description: '사업자등록증 - Business Registration Certificate',
      required: true,
    },
    {
      id: 'business_license',
      label: 'Бизнес-лицензия',
      dbField: 'business_license_uploaded',
      description: '사업허가증 - Business License',
      required: true,
    },
    {
      id: 'tax_certificate',
      label: 'Налоговый сертификат',
      dbField: 'tax_certificate_uploaded',
      description: '납세증명서 - Tax Certificate',
      required: true,
    },
    {
      id: 'dealer_license',
      label: 'Дилерская лицензия',
      dbField: 'dealer_license_uploaded',
      description: '자동차매매업 허가증 - Motor Vehicle Dealer License',
      required: true,
    },
    {
      id: 'corporate_seal',
      label: 'Корпоративная печать',
      dbField: 'corporate_seal_uploaded',
      description: '법인인감증명서 - Corporate Seal Certificate',
      required: true,
    },
    {
      id: 'representative_id',
      label: 'Удостоверение личности представителя',
      dbField: 'representative_id_uploaded',
      description: '대표자 신분증 - Representative ID',
      required: true,
    },
    {
      id: 'bank_account',
      label: 'Скан банковских реквизитов',
      dbField: 'bank_account_uploaded',
      description: '통장 사본 - Bank Account Copy',
      required: true,
    },
  ];

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
      setBankDetails({
        bank_account_number: data.bank_account_number || '',
        bank_name: data.bank_name || '',
        account_holder_name: data.account_holder_name || '',
      });
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить статус документов',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (documentId: string, file: File, dbField: keyof OnboardingStatus) => {
    setUploading(documentId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${documentId}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('dealer-documents')
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Update database status
      const { error: updateError } = await supabase
        .from('dealer_onboarding')
        .update({ [dbField]: true })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchOnboardingStatus();

      toast({
        title: 'Успешно',
        description: 'Документ загружен',
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось загрузить файл',
        variant: 'destructive',
      });
    } finally {
      setUploading(null);
    }
  };

  const handleBankDetailsSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('dealer_onboarding')
        .update({
          bank_account_number: bankDetails.bank_account_number,
          bank_name: bankDetails.bank_name,
          account_holder_name: bankDetails.account_holder_name,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchOnboardingStatus();

      toast({
        title: 'Успешно',
        description: 'Банковские реквизиты сохранены',
      });
    } catch (error: any) {
      console.error('Error saving bank details:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось сохранить реквизиты',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Загрузка...</h1>
      </div>
    );
  }

  const totalDocs = documentFields.length + 1; // +1 for bank details
  const completedDocs = documentFields.filter(doc => status?.[doc.dbField]).length + 
    (status?.bank_account_number ? 1 : 0);
  const progressPercent = (completedDocs / totalDocs) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Документы дилера</h1>
        <p className="text-muted-foreground">
          Загрузите все необходимые документы для активации аккаунта
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card-gradient border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Общий прогресс</CardTitle>
            <Badge variant={status?.is_completed ? 'default' : 'secondary'}>
              {completedDocs} из {totalDocs}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={progressPercent} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {status?.is_completed 
                ? 'Все документы загружены! Ваш аккаунт активен.' 
                : `Осталось загрузить: ${totalDocs - completedDocs} документов`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Cards */}
      <div className="grid gap-4">
        {documentFields.map((doc) => (
          <Card key={doc.id} className="bg-card-gradient border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{doc.label}</CardTitle>
                    {doc.required && (
                      <Badge variant="destructive" className="text-xs">Обязательно</Badge>
                    )}
                    {status?.[doc.dbField] && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <CardDescription className="mt-1">{doc.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Label
                    htmlFor={`file-${doc.id}`}
                    className="flex-1"
                  >
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        uploading === doc.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {uploading === doc.id ? (
                        <div className="space-y-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                          <p className="text-sm text-muted-foreground">Загрузка...</p>
                        </div>
                      ) : status?.[doc.dbField] ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                          <p className="text-sm font-medium text-green-600">Документ загружен</p>
                          <p className="text-xs text-muted-foreground">
                            Нажмите для замены
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-sm font-medium">
                            Нажмите для загрузки файла
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, PNG (макс. 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <Input
                      id={`file-${doc.id}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            toast({
                              title: 'Ошибка',
                              description: 'Размер файла не должен превышать 10MB',
                              variant: 'destructive',
                            });
                            return;
                          }
                          handleFileUpload(doc.id, file, doc.dbField);
                        }
                      }}
                      disabled={uploading === doc.id}
                    />
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bank Details */}
      <Card className="bg-card-gradient border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Банковские реквизиты</CardTitle>
            <Badge variant="destructive" className="text-xs">Обязательно</Badge>
            {status?.bank_account_number && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <CardDescription>
            계좌 정보 - Информация о банковском счете для получения платежей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank_name">Название банка</Label>
              <Input
                id="bank_name"
                placeholder="예: 국민은행, 우리은행"
                value={bankDetails.bank_name}
                onChange={(e) => setBankDetails({ ...bankDetails, bank_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account_holder">Имя владельца счета</Label>
              <Input
                id="account_holder"
                placeholder="Как указано в банковских документах"
                value={bankDetails.account_holder_name}
                onChange={(e) => setBankDetails({ ...bankDetails, account_holder_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account_number">Номер счета</Label>
              <Input
                id="account_number"
                placeholder="Номер банковского счета"
                value={bankDetails.bank_account_number}
                onChange={(e) => setBankDetails({ ...bankDetails, bank_account_number: e.target.value })}
              />
            </div>
          </div>
          <Button
            onClick={handleBankDetailsSubmit}
            disabled={!bankDetails.bank_account_number || !bankDetails.bank_name || !bankDetails.account_holder_name}
            className="w-full"
          >
            Сохранить реквизиты
          </Button>
        </CardContent>
      </Card>

      {status?.is_completed && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Верификация завершена!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Ваш аккаунт полностью активирован. Теперь вы можете использовать все функции платформы.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documents;
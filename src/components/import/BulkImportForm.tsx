import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Download, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BulkImportFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function BulkImportForm({ onSuccess, onCancel }: BulkImportFormProps) {
  const [url, setUrl] = useState('');
  const [onlyActive, setOnlyActive] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    const pattern = /^https?:\/\/www\.encar\.com\/dc\/dc_carsearchlist\.do\?method=sellcar/;
    return pattern.test(url);
  };

  const handleImport = async () => {
    setError('');

    if (!validateUrl(url)) {
      setError('Некорректная ссылка на профиль продавца. Формат: https://www.encar.com/dc/dc_carsearchlist.do?method=sellcar...');
      return;
    }

    setIsImporting(true);
    setProgress(10);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/encar-import`;

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Необходима авторизация');
      }

      setProgress(30);
      setTotalItems(2);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'bulk',
          url: url.trim(),
        }),
      });

      setProgress(70);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Ошибка импорта');
      }

      setProgress(100);
      setCurrentItem(result.imported);

      toast({
        title: 'Импорт завершен',
        description: `Успешно импортировано: ${result.imported} объявлений. Ошибок: ${result.failed}`,
      });

      if (result.errors && result.errors.length > 0) {
        toast({
          title: 'Предупреждение',
          description: `Некоторые объявления не удалось импортировать (${result.failed})`,
          variant: 'destructive',
        });
      }

      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при импорте');
      setProgress(0);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="seller-url">Ссылка на профиль продавца *</Label>
        <Input
          id="seller-url"
          placeholder="https://www.encar.com/dc/dc_carsearchlist.do?method=sellcar..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isImporting}
        />
        <p className="text-xs text-muted-foreground">
          Вставьте ссылку на страницу со списком объявлений продавца
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="only-active"
          checked={onlyActive}
          onCheckedChange={(checked) => setOnlyActive(checked as boolean)}
          disabled={isImporting}
        />
        <Label
          htmlFor="only-active"
          className="text-sm font-normal cursor-pointer"
        >
          Импортировать только активные объявления
        </Label>
      </div>

      {isImporting && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            {totalItems > 0
              ? `Обработка объявления ${currentItem} из ${totalItems}...`
              : 'Анализ ссылки...'
            }
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} disabled={isImporting}>
          Отмена
        </Button>
        <Button onClick={handleImport} disabled={isImporting || !url}>
          <Download className="mr-2 h-4 w-4" />
          {isImporting ? 'Импорт...' : 'Импортировать'}
        </Button>
      </div>
    </div>
  );
}

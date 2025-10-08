import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Download, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SingleImportFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function SingleImportForm({ onSuccess, onCancel }: SingleImportFormProps) {
  const [url, setUrl] = useState('');
  const [autoPublish, setAutoPublish] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    const pattern = /^https?:\/\/fem\.encar\.com\/cars\/detail\/\d+/;
    return pattern.test(url);
  };

  const handleImport = async () => {
    setError('');

    if (!validateUrl(url)) {
      setError('Некорректная ссылка на объявление Encar. Формат: https://fem.encar.com/cars/detail/{id}');
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

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'single',
          url: url.trim(),
          autoPublish,
        }),
      });

      setProgress(70);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Ошибка импорта');
      }

      setProgress(100);

      toast({
        title: 'Импорт завершен',
        description: `Успешно импортировано объявлений: ${result.imported}`,
      });

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
        <Label htmlFor="encar-url">Ссылка на объявление Encar *</Label>
        <Input
          id="encar-url"
          placeholder="https://fem.encar.com/cars/detail/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isImporting}
        />
        <p className="text-xs text-muted-foreground">
          Вставьте ссылку на страницу объявления с Encar
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="auto-publish"
          checked={autoPublish}
          onCheckedChange={(checked) => setAutoPublish(checked as boolean)}
          disabled={isImporting}
        />
        <Label
          htmlFor="auto-publish"
          className="text-sm font-normal cursor-pointer"
        >
          Автоматически опубликовать после импорта
        </Label>
      </div>

      {isImporting && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Импорт объявления... {progress}%
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

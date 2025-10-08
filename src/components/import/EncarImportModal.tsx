import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Car, Package, ArrowLeft } from 'lucide-react';
import { SingleImportForm } from './SingleImportForm';
import { BulkImportForm } from './BulkImportForm';

interface EncarImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

type ImportStep = 'select' | 'single' | 'bulk';

export function EncarImportModal({ open, onOpenChange, onImportComplete }: EncarImportModalProps) {
  const [step, setStep] = useState<ImportStep>('select');

  const handleClose = () => {
    setStep('select');
    onOpenChange(false);
  };

  const handleImportSuccess = () => {
    handleClose();
    onImportComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle>Импорт объявлений с Encar</DialogTitle>
              <DialogDescription>
                Выберите способ импорта автомобильных объявлений
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Button
                variant="outline"
                className="w-full h-auto py-6 flex flex-col items-start gap-2 hover:bg-primary/5 hover:border-primary"
                onClick={() => setStep('single')}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base">Добавить 1 объявление</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Импортировать конкретное объявление по ссылке
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-auto py-6 flex flex-col items-start gap-2 hover:bg-primary/5 hover:border-primary"
                onClick={() => setStep('bulk')}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base">Перенести все мои объявления</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Импортировать все активные объявления продавца
                    </div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleClose}>
                Отмена
              </Button>
            </div>
          </>
        )}

        {step === 'single' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('select')}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle>Импорт одного объявления</DialogTitle>
                  <DialogDescription>
                    Введите ссылку на объявление Encar
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <SingleImportForm onSuccess={handleImportSuccess} onCancel={() => setStep('select')} />
          </>
        )}

        {step === 'bulk' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('select')}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle>Импорт всех объявлений</DialogTitle>
                  <DialogDescription>
                    Введите ссылку на профиль продавца Encar
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <BulkImportForm onSuccess={handleImportSuccess} onCancel={() => setStep('select')} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

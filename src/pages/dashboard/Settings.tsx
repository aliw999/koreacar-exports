import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, MapPin, Phone, Mail, Building, Save, Upload } from 'lucide-react';
import InputMask from 'react-input-mask';
const Settings = () => {
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground">
            Управление аккаунтом и предпочтениями
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Профиль компании
              </CardTitle>
              <CardDescription>
                Основная информация о вашей компании
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Логотип компании</Label>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Загрузить
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Название компании</Label>
                  <Input id="companyName" placeholder="ООО 'Автодилер'" defaultValue="NetCars B2B" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Контактное лицо</Label>
                  <Input id="contactPerson" placeholder="Иван Иванов" defaultValue="Александр Петров" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" defaultValue="alex@netcars.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <InputMask mask="999-9999-9999" defaultValue="010-1234-5678">
                    {(inputProps: any) => (
                      <Input {...inputProps} id="phone" placeholder="010-0000-0000" />
                    )}
                  </InputMask>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Textarea id="address" placeholder="Полный адрес компании..." defaultValue="г. Москва, ул. Автомобильная, д. 123, офис 456" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание компании</Label>
                <Textarea id="description" placeholder="Краткое описание вашего бизнеса..." defaultValue="Официальный дилер автомобилей с 15-летним опытом работы." />
              </div>

              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Уведомления
              </CardTitle>
              <CardDescription>
                Настройка уведомлений и оповещений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления на почту
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать SMS о важных событиях
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Новые запросы</Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о новых запросах клиентов
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Изменение статуса заказов</Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления об изменениях в заказах
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                
              </div>
            </CardContent>
          </Card>

          {/* Financial Settings */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Финансовые настройки
              </CardTitle>
              <CardDescription>
                Настройки валюты, платежей и уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                

                <div className="flex items-center justify-between py-4 border-t">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email уведомления о платежах
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      Получать уведомления о новых платежах и просрочках
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-4 border-t">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <SettingsIcon className="h-4 w-4" />
                      Автоматические напоминания покупателям
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      Отправлять напоминания за 3 дня до срока оплаты
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Банковские реквизиты для платежей</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Название банка</Label>
                      <Input id="bank-name" placeholder="Например: Hana Bank" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Номер счета</Label>
                      <Input id="account-number" placeholder="123-456-789012" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="swift">SWIFT код</Label>
                      <Input id="swift" placeholder="HNBNKRSE" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="beneficiary">Получатель</Label>
                      <Input id="beneficiary" placeholder="Ваше имя/компания" />
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить реквизиты
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Info and Actions */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Статус аккаунта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Подтвержден
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Безопасность</span>
                <Badge variant="secondary">Высокий</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Business Info */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Бизнес информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Адрес</p>
                  <p className="text-xs text-muted-foreground">
                    г. Москва, ул. Автомобильная, д. 123
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Телефон</p>
                  <p className="text-xs text-muted-foreground">
                    010-1234-5678
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">
                    alex@netcars.ru
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Платежные данные
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Управление подпиской
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Settings;
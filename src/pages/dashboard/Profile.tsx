import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleUser as UserCircle, Mail, Phone, MapPin, Calendar, Shield, Save, Upload, Lock } from 'lucide-react';
import InputMask from 'react-input-mask';

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Профиль</h1>
          <p className="text-muted-foreground">
            Управление личными данными
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Личная информация
              </CardTitle>
              <CardDescription>
                Обновите свои личные данные
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    АП
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label>Фото профиля</Label>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Загрузить фото
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" placeholder="Александр" defaultValue="Александр" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" placeholder="Петров" defaultValue="Петров" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="alex@example.com" defaultValue="alex.petrov@netcars.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <InputMask mask="999-9999-9999" defaultValue="010-5678-1234">
                    {(inputProps: any) => (
                      <Input {...inputProps} id="phone" placeholder="010-0000-0000" />
                    )}
                  </InputMask>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Должность</Label>
                <Input id="position" placeholder="Менеджер по продажам" defaultValue="Менеджер по продажам" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  placeholder="Расскажите о себе..."
                  defaultValue="Опытный менеджер по продажам автомобилей с 10-летним опытом работы."
                  rows={4}
                />
              </div>

              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Безопасность
              </CardTitle>
              <CardDescription>
                Управление паролем и безопасностью аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input id="currentPassword" type="password" placeholder="Введите текущий пароль" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input id="newPassword" type="password" placeholder="Введите новый пароль" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <Input id="confirmPassword" type="password" placeholder="Повторите новый пароль" />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Изменить пароль
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Двухфакторная аутентификация</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Добавьте дополнительный уровень защиты к вашему аккаунту
                </p>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Настроить 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Статус профиля
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Верификация</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Подтвержден
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Подтвержден
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Телефон</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Подтвержден
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">2FA</span>
                <Badge variant="outline">Не настроен</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Информация об аккаунте
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Дата регистрации</p>
                <p className="text-xs text-muted-foreground">15 января 2023</p>
              </div>
              <div>
                <p className="text-sm font-medium">Последний вход</p>
                <p className="text-xs text-muted-foreground">Сегодня в 14:32</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID пользователя</p>
                <p className="text-xs text-muted-foreground font-mono">USR-2023-00147</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">
                    alex.petrov@netcars.ru
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Телефон</p>
                  <p className="text-xs text-muted-foreground">
                    010-5678-1234
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Город</p>
                  <p className="text-xs text-muted-foreground">
                    Москва, Россия
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

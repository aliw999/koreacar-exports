import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, ShoppingCart, TrendingUp, Users, Plus, Eye, MessageSquare, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, ChartBar as BarChart3, Info, X, ArrowRight, Package, FileText, CreditCard, Settings as SettingsIcon } from 'lucide-react';
import { OnboardingProgress } from '@/components/dashboard/OnboardingProgress';
const Overview = () => {
  const [showSystemNotification, setShowSystemNotification] = useState(true);
  
  // Mock data - in real app this would come from API
  const stats = {
    activeListings: 23,
    totalViews: 1247,
    newInquiries: 8,
    completedDeals: 15
  };
  return <div className="space-y-6">
      {/* Onboarding Progress */}
      <OnboardingProgress />

      {/* System Notification */}
      {showSystemNotification && (
        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">
            Системное уведомление
          </AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2">
                  С 1 ноября вступают в силу новые правила размещения фотографий. 
                  Пожалуйста, ознакомьтесь с обновленными требованиями.
                </p>
                <Button variant="outline" size="sm" className="mt-2 border-blue-300 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-900">
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSystemNotification(false)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Обзор</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в кабинет дилера
          </p>
        </div>
        <Button className="bg-hero-gradient hover:shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Новое объявление
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активные объявления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.activeListings}</div>
                <p className="text-xs text-muted-foreground">+2 за неделю</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего просмотров
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% за месяц</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Новые запросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.newInquiries}</div>
                <p className="text-xs text-muted-foreground">За последние 7 дней</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Завершенные сделки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.completedDeals}</div>
                <p className="text-xs text-muted-foreground">За этот месяц</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotional Banners */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
          {/* Banner 1 - Premium */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0 overflow-hidden relative min-w-[600px] flex-shrink-0 snap-start">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 text-white">
                  <Badge className="bg-white/20 text-white border-0 mb-3">
                    Специальное предложение
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Продвигайте свои объявления эффективнее
                  </h3>
                  <p className="text-blue-100 mb-4 max-w-2xl">
                    Получите 50% скидку на премиум размещение в первый месяц.
                    Увеличьте видимость ваших автомобилей в поиске.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Активировать предложение
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner 2 - Training */}
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-800 border-0 overflow-hidden relative min-w-[600px] flex-shrink-0 snap-start">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 text-white">
                  <Badge className="bg-white/20 text-white border-0 mb-3">
                    Новое обучение
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Бесплатный вебинар по увеличению продаж
                  </h3>
                  <p className="text-emerald-100 mb-4 max-w-2xl">
                    Присоединяйтесь к онлайн-вебинару 15 ноября в 14:00.
                    Узнайте секреты успешных дилеров.
                  </p>
                  <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                    Зарегистрироваться
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Tabs */}
      <Card className="bg-card-gradient border-border/50">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>Управляйте своим бизнесом эффективно</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="listings">Объявления</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="finance">Финансы</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Новое объявление</div>
                    <div className="text-xs text-muted-foreground">Добавить автомобиль</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Мои объявления</div>
                    <div className="text-xs text-muted-foreground">Управление каталогом</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Продвижение</div>
                    <div className="text-xs text-muted-foreground">Повысить видимость</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Новые заказы</div>
                    <div className="text-xs text-muted-foreground">8 требуют внимания</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Сообщения</div>
                    <div className="text-xs text-muted-foreground">3 непрочитанных</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Завершить сделку</div>
                    <div className="text-xs text-muted-foreground">Оформить продажу</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="finance" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Баланс и выплаты</div>
                    <div className="text-xs text-muted-foreground">Просмотр финансов</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Отчёты</div>
                    <div className="text-xs text-muted-foreground">Скачать документы</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Аналитика</div>
                    <div className="text-xs text-muted-foreground">Детальная статистика</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Настройки профиля</div>
                    <div className="text-xs text-muted-foreground">Редактировать данные</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Сотрудники</div>
                    <div className="text-xs text-muted-foreground">Управление командой</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Уведомления</div>
                    <div className="text-xs text-muted-foreground">Настроить оповещения</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
};
export default Overview;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Plus,
  Bell,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalRevenue: 2450000,
    monthlyGrowth: 12.5,
    totalSales: 156,
    activeBuyers: 48,
  };

  const quickActions = [
    {
      title: 'Добавить автомобиль',
      description: 'Создать новое объявление',
      icon: <Car className="h-6 w-6" />,
      color: 'bg-blue-500',
      action: 'create-listing'
    },
    {
      title: 'Просмотреть заказы',
      description: 'Управление заказами',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'bg-green-500',
      action: 'view-orders'
    },
    {
      title: 'Сообщения',
      description: 'Чат с покупателями',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'bg-purple-500',
      action: 'messages'
    },
    {
      title: 'Аналитика',
      description: 'Отчеты и статистика',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-orange-500',
      action: 'analytics'
    },
  ];

  const notifications = [
    {
      type: 'success',
      title: 'Новый заказ',
      message: 'Hyundai Sonata 2023 - заказ от покупателя из Казахстана',
      time: '15 мин назад',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      type: 'info', 
      title: 'Запрос информации',
      message: 'Потенциальный покупатель запросил дополнительные фото Genesis G90',
      time: '1 час назад',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      type: 'warning',
      title: 'Требуется действие',
      message: 'Обновите документы для Kia Sportage до завтрашнего дня',
      time: '3 часа назад',
      icon: <AlertCircle className="h-5 w-5" />
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-hero-gradient rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Добро пожаловать в Net Cars!
            </h1>
            <p className="text-white/90 text-lg">
              Управляйте своим автомобильным бизнесом эффективно
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <div className="text-2xl font-bold">₽{stats.totalRevenue.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Общая выручка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Общая выручка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{stats.monthlyGrowth}% за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Car className="h-4 w-4" />
              Продажи за месяц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">Автомобилей продано</p>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Активные покупатели
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBuyers}</div>
            <p className="text-xs text-muted-foreground">В этом месяце</p>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Средн. время сделки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 дней</div>
            <p className="text-xs text-muted-foreground">От запроса до продажи</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Быстрые действия
            </CardTitle>
            <CardDescription>
              Основные операции для управления бизнесом
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex flex-col items-center p-4 rounded-lg border border-border/30 hover:border-primary/50 hover:bg-muted/30 transition-all duration-300">
                    <div className={`p-3 rounded-full ${action.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-sm text-center mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center">
                      {action.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Последние уведомления
            </CardTitle>
            <CardDescription>
              Важные события и обновления
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className={`p-1 rounded ${
                    notification.type === 'success' ? 'text-green-600' :
                    notification.type === 'warning' ? 'text-orange-600' : 
                    'text-blue-600'
                  }`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
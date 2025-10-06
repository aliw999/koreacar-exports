import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Plus,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

const Overview = () => {
  // Mock data - in real app this would come from API
  const stats = {
    activeListings: 23,
    totalViews: 1247,
    newInquiries: 8,
    completedDeals: 15,
  };

  const recentActivity = [
    {
      type: 'inquiry',
      message: 'Новый запрос на Hyundai Sonata 2023',
      time: '2 часа назад',
      icon: <MessageSquare className="h-4 w-4" />,
      color: 'text-blue-500'
    },
    {
      type: 'view',
      message: 'Просмотр объявления Kia Sportage',
      time: '4 часа назад',
      icon: <Eye className="h-4 w-4" />,
      color: 'text-green-500'
    },
    {
      type: 'completion',
      message: 'Сделка по Genesis G90 завершена',
      time: '1 день назад',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-emerald-500'
    },
    {
      type: 'alert',
      message: 'Требуется обновление документов',
      time: '2 дня назад',
      icon: <AlertCircle className="h-4 w-4" />,
      color: 'text-orange-500'
    },
  ];

  const topListings = [
    {
      id: 1,
      make: 'Hyundai',
      model: 'Sonata',
      year: 2023,
      price: 35000,
      views: 156,
      inquiries: 12,
      status: 'active'
    },
    {
      id: 2,
      make: 'Kia',
      model: 'Sportage',
      year: 2023,
      price: 32000,
      views: 134,
      inquiries: 8,
      status: 'active'
    },
    {
      id: 3,
      make: 'Genesis',
      model: 'G90',
      year: 2023,
      price: 65000,
      views: 98,
      inquiries: 15,
      status: 'sold'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Обзор</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в ваш B2B кабинет дилера
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Последняя активность
              </CardTitle>
              <CardDescription>
                Обзор последних событий по вашим объявлениям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className={`p-1 rounded ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Listings */}
        <div>
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Топ объявлений
              </CardTitle>
              <CardDescription>
                Самые популярные автомобили
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topListings.map((listing, index) => (
                  <div key={listing.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                    <div className="flex-shrink-0 text-sm font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {listing.make} {listing.model} {listing.year}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₩{listing.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          👁 {listing.views}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          💬 {listing.inquiries}
                        </span>
                        <Badge 
                          variant={listing.status === 'sold' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {listing.status === 'sold' ? 'Продано' : 'Активно'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-hero-gradient text-white">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription className="text-white/80">
            Управляйте своим бизнесом более эффективно
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="secondary" className="h-auto p-4 flex-col gap-2">
              <Car className="h-6 w-6" />
              <span className="text-sm">Создать объявление</span>
            </Button>
            <Button variant="secondary" className="h-auto p-4 flex-col gap-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Просмотреть заказы</span>
            </Button>
            <Button variant="secondary" className="h-auto p-4 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Связаться с покупателями</span>
            </Button>
            <Button variant="secondary" className="h-auto p-4 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Посмотреть аналитику</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
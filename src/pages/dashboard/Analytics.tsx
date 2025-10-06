import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  ShoppingCart,
  DollarSign,
  Calendar
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    {
      title: "Общая выручка",
      value: "₩156M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "По сравнению с прошлым месяцем"
    },
    {
      title: "Всего просмотров",
      value: "12,847",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      description: "Просмотры объявлений за месяц"
    },
    {
      title: "Конверсия в заказы",
      value: "4.2%",
      change: "-0.8%",
      trend: "down",
      icon: ShoppingCart,
      description: "Процент заказов от просмотров"
    },
    {
      title: "Средняя цена сделки",
      value: "₩42M",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Средняя стоимость проданного авто"
    }
  ];

  const monthlyData = [
    { month: "Янв", views: 2400, inquiries: 120, sales: 8 },
    { month: "Фев", views: 2800, inquiries: 140, sales: 12 },
    { month: "Мар", views: 3200, inquiries: 180, sales: 15 },
    { month: "Апр", views: 2900, inquiries: 160, sales: 10 },
    { month: "Май", views: 3800, inquiries: 220, sales: 18 },
    { month: "Июн", views: 4200, inquiries: 250, sales: 22 }
  ];

  const topPerformingVehicles = [
    { make: "Hyundai", model: "Sonata", views: 1250, inquiries: 85, sales: 5 },
    { make: "Kia", model: "Sportage", views: 980, inquiries: 62, sales: 4 },
    { make: "Genesis", model: "G90", views: 720, inquiries: 45, sales: 3 },
    { make: "Hyundai", model: "Tucson", views: 650, inquiries: 38, sales: 2 },
    { make: "Kia", model: "Sorento", views: 520, inquiries: 28, sales: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Аналитика</h1>
          <p className="text-muted-foreground">
            Детальная статистика и отчеты по вашим продажам
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Выбрать период
          </Button>
          <Button size="sm">
            Экспорт отчета
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {stat.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Месячная динамика
            </CardTitle>
            <CardDescription>
              Просмотры, запросы и продажи за последние 6 месяцев
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="font-medium">{data.month}</div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Eye className="h-3 w-3" />
                      {data.views}
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <MessageSquare className="h-3 w-3" />
                      {data.inquiries}
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <ShoppingCart className="h-3 w-3" />
                      {data.sales}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Vehicles */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Топ автомобилей
            </CardTitle>
            <CardDescription>
              Самые популярные модели по просмотрам и продажам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingVehicles.map((vehicle, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Рейтинг #{index + 1}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{vehicle.views}</div>
                      <div className="text-xs text-muted-foreground">Просмотры</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-orange-600">{vehicle.inquiries}</div>
                      <div className="text-xs text-muted-foreground">Запросы</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{vehicle.sales}</div>
                      <div className="text-xs text-muted-foreground">Продажи</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Конверсия по этапам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Просмотры объявлений</span>
                <span className="font-medium">12,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Запросы на детали</span>
                <span className="font-medium text-orange-600">825 (6.4%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Заказы</span>
                <span className="font-medium text-green-600">62 (0.48%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Завершенные продажи</span>
                <span className="font-medium text-blue-600">54 (0.42%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Источники трафика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Прямые заходы</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Поисковые системы</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Социальные сети</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Партнёрские сайты</span>
                <span className="font-medium">8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Время отклика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Среднее время ответа</span>
                <span className="font-medium text-green-600">2.3 часа</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Отвечено в течение часа</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Отвечено в тот же день</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Пропущенные запросы</span>
                <span className="font-medium text-red-600">2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
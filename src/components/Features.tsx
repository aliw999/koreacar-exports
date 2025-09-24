import { Card, CardContent } from '@/components/ui/card';
import { 
  Car, 
  Ship, 
  Shield, 
  BarChart3,
  Edit3,
  Globe2,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Car className="h-8 w-8" />,
      title: "Управление объявлениями",
      description: "Создавайте детальные объявления с фото 360°, техническими характеристиками и документами",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Международная логистика",
      description: "Калькулятор доставки, работа с портами, таможенное оформление",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Безопасные платежи",
      description: "Эскроу-сервис, множественные способы оплаты, защита от мошенничества",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Аналитика продаж",
      description: "Отслеживание просмотров, конверсии, ROI и статистики по регионам",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Все возможности для успешного экспорта
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Наша платформа предоставляет полный набор инструментов для 
            профессиональной торговли корейскими автомобилями
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-large transition-all duration-300 border-border/50 hover:border-primary/30 bg-card-gradient"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div className="mt-20 bg-hero-gradient rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Безлимитные объявления
              </h3>
              <p className="text-white/90 text-lg mb-6">
                В отличие от других платформ, мы не ограничиваем количество ваших 
                объявлений. Размещайте столько автомобилей, сколько хотите продать.
              </p>
              <div className="flex items-center text-white/80">
                <Edit3 className="h-5 w-5 mr-2" />
                <span>Никаких пакетных ограничений</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Globe2 className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-white/80">Стран экспорта</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <DollarSign className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-white/80">Объявлений</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">Поддержка</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <BarChart3 className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">Real-time</div>
                <div className="text-sm text-white/80">Аналитика</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
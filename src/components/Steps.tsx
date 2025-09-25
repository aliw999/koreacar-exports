import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPlus, CheckCircle, Car, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Steps = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const steps = [{
    id: 1,
    icon: <UserPlus className="h-8 w-8" />,
    title: "Зарегистрируйтесь на платформе",
    description: "Создайте аккаунт продавца и получите доступ к платформе.",
    tooltip: "Быстрая регистрация за 2 минуты. Подтвердите email и начинайте работу с автомобилями.",
    gradient: "from-blue-500 to-blue-600"
  }, {
    id: 2,
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Пройдите онбординг",
    description: "Подтвердите свой профиль и ознакомьтесь с правилами работы.",
    tooltip: "Верификация документов и обучение работе с платформой. Наша поддержка поможет на каждом этапе.",
    gradient: "from-emerald-500 to-emerald-600"
  }, {
    id: 3,
    icon: <Car className="h-8 w-8" />,
    title: "Выставите автомобили",
    description: "Добавьте свои автомобили с фото и описанием для публикации.",
    tooltip: "Загрузите фото 360°, укажите характеристики и цену. Мы поможем создать привлекательные объявления.",
    gradient: "from-purple-500 to-purple-600"
  }, {
    id: 4,
    icon: <Globe className="h-8 w-8" />,
    title: "Ждите продаж",
    description: "Получайте заказы и завершайте сделки с покупателями по всему миру.",
    tooltip: "Автоматические уведомления о заказах, помощь с логистикой и безопасными платежами через эскроу.",
    gradient: "from-orange-500 to-orange-600"
  }];
  return <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Начните продавать за 4 простых шага
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Путь к международным продажам автомобилей 
            максимально прост и прозрачен
          </p>
        </div>

        {/* Steps */}
        <TooltipProvider>
          <div className="relative">
            {/* Desktop Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 transform -translate-y-1/2 z-0" />
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => <div key={step.id} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-large hover:-translate-y-2 bg-card border-border/50 hover:border-primary/30" onMouseEnter={() => setHoveredStep(step.id)} onMouseLeave={() => setHoveredStep(null)}>
                        <CardContent className="p-6 text-center relative">
                          {/* Step Number */}
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300 shadow-medium">
                            {step.id}
                          </div>
                          
                          {/* Icon */}
                          <div className={`w-16 h-16 mx-auto mb-4 mt-4 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                            {step.icon}
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-3 text-sm" side="top">
                      {step.tooltip}
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Arrow for Desktop */}
                  {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className={`w-8 h-8 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center transition-all duration-300 ${hoveredStep === step.id || hoveredStep === step.id + 1 ? 'border-primary bg-primary text-primary-foreground scale-110' : ''}`}>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>
        </TooltipProvider>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-hero-gradient rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Готовы увеличить продажи автомобилей?
              </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">Присоединитесь к успешным дилерам, которые уже зарабатывают на международном рынке автомобилей</p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth/register')} className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              Стать продавцом бесплатно
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Steps;
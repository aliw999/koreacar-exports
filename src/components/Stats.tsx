import { useEffect, useState } from 'react';
import { TrendingUp, Users, CheckCircle, Globe } from 'lucide-react';
interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}
const AnimatedStat = ({
  icon,
  value,
  label,
  delay
}: StatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState('0');
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate the number if it's numeric
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue) {
        const target = parseInt(numericValue);
        const suffix = value.replace(numericValue, '');
        let current = 0;
        const increment = target / 30; // 30 frames for smooth animation

        const animate = () => {
          current += increment;
          if (current < target) {
            setCurrentValue(Math.floor(current) + suffix);
            requestAnimationFrame(animate);
          } else {
            setCurrentValue(value);
          }
        };
        animate();
      } else {
        setCurrentValue(value);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return;
};
const Stats = () => {
  const stats = [{
    icon: <TrendingUp className="h-8 w-8" />,
    value: "2,500+",
    label: "Проданных автомобилей"
  }, {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "85%",
    label: "Успешных сделок"
  }, {
    icon: <Users className="h-8 w-8" />,
    value: "24/7",
    label: "Поддержка клиентов"
  }, {
    icon: <Globe className="h-8 w-8" />,
    value: "12",
    label: "Стран назначения"
  }];
  return <section className="bg-background py-[38px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => <AnimatedStat key={index} icon={stat.icon} value={stat.value} label={stat.label} delay={index * 200} />)}
        </div>

        {/* Success Stories Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">АК</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">Автокомпания "Корея"</div>
                <div className="text-sm text-muted-foreground">Москва, Россия</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "За 6 месяцев работы с платформой увеличили продажи на 340%. 
              Особенно ценим качество покупателей и скорость сделок."
            </p>
          </div>

          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">КА</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">KazAuto Trade</div>
                <div className="text-sm text-muted-foreground">Алматы, Казахстан</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "Интуитивно понятная система управления заказами и отличная 
              поддержка логистики. Рекомендуем всем коллегам."
            </p>
          </div>

          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">УА</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">UkrAuto Export</div>
                <div className="text-sm text-muted-foreground">Киев, Украина</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "Безопасные платежи через эскроу и прозрачность всех процессов - 
              это именно то, что нужно для международной торговли."
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Stats;
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Globe, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-korean-cars.jpg';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
              >
                🚗 Лидер экспорта корейских автомобилей
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Продавайте</span> автомобили 
                <br />
                по всему миру
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Профессиональная платформа для экспорта автомобилей из Южной Кореи 
                в страны СНГ и не только. Увеличьте продажи с нашей B2B системой.
              </p>
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-hero-gradient hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
                onClick={() => navigate('/auth/register')}
              >
                Начать продавать бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5"
                onClick={() => {
                  // Scroll to features section or show demo modal
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Смотреть демо
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Нам доверяют ведущие дилеры:
              </p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-lg font-bold">HYUNDAI</div>
                <div className="text-lg font-bold">KIA</div>
                <div className="text-lg font-bold">GENESIS</div>
                <div className="text-lg font-bold">DAEWOO</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-first">
            <div className="relative rounded-2xl overflow-hidden shadow-large">
              <img
                src={heroImage}
                alt="Корейские автомобили готовые к экспорту в порту"
                className="w-full h-[600px] object-cover"
              />
              {/* Floating Stats */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-medium border border-border/50">
                <div className="text-2xl font-bold text-primary">2,500+</div>
                <div className="text-sm text-muted-foreground">Продано авто</div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-medium border border-border/50">
                <div className="text-2xl font-bold text-success">85%</div>
                <div className="text-sm text-muted-foreground">Успешных сделок</div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Footer = () => {
  const footerLinks = {
    company: [{
      name: 'О компании',
      href: '#'
    }, {
      name: 'Наша команда',
      href: '#'
    }, {
      name: 'Карьера',
      href: '#'
    }, {
      name: 'Новости',
      href: '#'
    }],
    services: [{
      name: 'Для дилеров',
      href: '#'
    }, {
      name: 'Для экспортеров',
      href: '#'
    }, {
      name: 'Логистика',
      href: '#'
    }, {
      name: 'Финансы',
      href: '#'
    }],
    support: [{
      name: 'Центр помощи',
      href: '#'
    }, {
      name: 'Инструкции',
      href: '#'
    }, {
      name: 'API документация',
      href: '#'
    }, {
      name: 'Статус системы',
      href: '#'
    }],
    legal: [{
      name: 'Условия использования',
      href: '#'
    }, {
      name: 'Политика конфиденциальности',
      href: '#'
    }, {
      name: 'Соглашение об обработке данных',
      href: '#'
    }, {
      name: 'Правила платформы',
      href: '#'
    }]
  };
  const socialLinks = [{
    name: 'Facebook',
    icon: <Facebook className="h-5 w-5" />,
    href: '#'
  }, {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5" />,
    href: '#'
  }, {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    href: '#'
  }, {
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    href: '#'
  }];
  return <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-hero-gradient rounded-lg shadow-glow">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">
                  Net Cars
                </span>
              </div>
              <p className="text-background/70 mb-6 leading-relaxed">
                Ведущая B2B платформа для экспорта автомобилей. 
                Помогаем дилерам успешно продавать по всему миру с 2019 года.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-background/70">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>support@netcars.export</span>
                </div>
                <div className="flex items-center text-background/70">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+82 2 1234 5678</span>
                </div>
                <div className="flex items-center text-background/70">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2">
                {footerLinks.company.map(link => <li key={link.name}>
                    <a href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2">
                {footerLinks.services.map(link => <li key={link.name}>
                    <a href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2">
                {footerLinks.support.map(link => <li key={link.name}>
                    <a href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Правовая информация</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map(link => <li key={link.name}>
                    <a href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        

        {/* Bottom Footer */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-background/70 text-sm">
              © 2024 Net Cars. Все права защищены.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-background/70 text-sm mr-4">Мы в соцсетях:</span>
              {socialLinks.map(social => <a key={social.name} href={social.href} className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors" aria-label={social.name}>
                  {social.icon}
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
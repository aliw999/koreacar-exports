import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Car, 
  ShoppingCart, 
  CreditCard, 
  Settings,
  MessageSquare,
  TrendingUp,
  Shield,
  FileText,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "getting-started",
    title: "Начало работы",
    icon: BookOpen,
    color: "bg-blue-500",
    articlesCount: 12,
    description: "Основные шаги для запуска продаж"
  },
  {
    id: "products",
    title: "Управление объявлениями",
    icon: Car,
    color: "bg-green-500",
    articlesCount: 18,
    description: "Создание и редактирование карточек авто"
  },
  {
    id: "orders",
    title: "Заказы и покупатели",
    icon: ShoppingCart,
    color: "bg-orange-500",
    articlesCount: 15,
    description: "Обработка заказов и общение с клиентами"
  },
  {
    id: "finance",
    title: "Финансы и выплаты",
    icon: CreditCard,
    color: "bg-purple-500",
    articlesCount: 10,
    description: "Комиссии, выплаты и отчётность"
  },
  {
    id: "marketing",
    title: "Продвижение",
    icon: TrendingUp,
    color: "bg-pink-500",
    articlesCount: 8,
    description: "Реклама и увеличение продаж"
  },
  {
    id: "security",
    title: "Безопасность",
    icon: Shield,
    color: "bg-red-500",
    articlesCount: 6,
    description: "Защита аккаунта и данных"
  }
];

const popularArticles = [
  {
    id: 1,
    title: "Как создать первое объявление",
    category: "Начало работы",
    views: 15420,
    helpful: 1243
  },
  {
    id: 2,
    title: "Правила размещения фотографий автомобилей",
    category: "Управление объявлениями",
    views: 12890,
    helpful: 987
  },
  {
    id: 3,
    title: "Как правильно заполнить характеристики автомобиля",
    category: "Управление объявлениями",
    views: 11250,
    helpful: 856
  },
  {
    id: 4,
    title: "Обработка заказов: пошаговая инструкция",
    category: "Заказы и покупатели",
    views: 9870,
    helpful: 743
  },
  {
    id: 5,
    title: "Как работает система выплат",
    category: "Финансы и выплаты",
    views: 8960,
    helpful: 654
  },
  {
    id: 6,
    title: "Ответы на частые вопросы покупателей",
    category: "Заказы и покупатели",
    views: 7830,
    helpful: 521
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Центр помощи</h1>
        <p className="text-muted-foreground">
          Инструкции и руководства для дилеров
        </p>
      </div>

      {/* Search */}
      <Card className="bg-card-gradient border-border/50">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Найти статью или инструкцию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Популярные запросы:</span>
            <Button variant="secondary" size="sm" className="h-7">
              создание объявления
            </Button>
            <Button variant="secondary" size="sm" className="h-7">
              выплаты
            </Button>
            <Button variant="secondary" size="sm" className="h-7">
              фотографии
            </Button>
            <Button variant="secondary" size="sm" className="h-7">
              комиссия
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Категории</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="bg-card-gradient border-border/50 hover:shadow-medium transition-all cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`${category.color} p-3 rounded-lg text-white`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.articlesCount} статей
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-4 group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                  Смотреть статьи
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Популярные статьи</h2>
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {popularArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium group-hover:text-primary transition-colors mb-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {article.category}
                        </span>
                        <span>👁 {article.views.toLocaleString()} просмотров</span>
                        <span>👍 {article.helpful} нашли полезным</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Нужна помощь?
            </CardTitle>
            <CardDescription>
              Свяжитесь с нашей службой поддержки
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Написать в поддержку
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Документы
            </CardTitle>
            <CardDescription>
              Договоры, правила и политики
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Скачать документы
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
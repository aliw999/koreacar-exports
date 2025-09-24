import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Car, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Products = () => {
  const products = [
    {
      id: 1,
      make: 'Hyundai',
      model: 'Sonata',
      year: 2023,
      price: 35000,
      views: 156,
      inquiries: 12,
      status: 'active',
      created: '2024-01-15',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      make: 'Kia',
      model: 'Sportage',
      year: 2023,
      price: 32000,
      views: 134,
      inquiries: 8,
      status: 'active',
      created: '2024-01-10',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      make: 'Genesis',
      model: 'G90',
      year: 2023,
      price: 65000,
      views: 98,
      inquiries: 15,
      status: 'sold',
      created: '2024-01-05',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      make: 'Hyundai',
      model: 'Tucson',
      year: 2024,
      price: 38000,
      views: 89,
      inquiries: 6,
      status: 'inactive',
      created: '2024-01-20',
      image: '/api/placeholder/300/200'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Активно</Badge>;
      case 'sold':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Продано</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Неактивно</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Мои объявления</h1>
          <p className="text-muted-foreground">
            Управление вашими автомобильными объявлениями
          </p>
        </div>
        <Button className="bg-hero-gradient hover:shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Добавить автомобиль
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card-gradient border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск по марке, модели или году..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
            <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              <div className="absolute top-3 right-3">
                {getStatusBadge(product.status)}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-lg">
                  {product.make} {product.model}
                </h3>
                <p className="text-white/90 text-sm">{product.year} год</p>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-2xl font-bold text-primary">
                  ${product.price.toLocaleString()}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Просмотреть
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {product.views} просмотров
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {product.inquiries} запросов
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="mr-1 h-3 w-3" />
                  Изменить
                </Button>
                <Button size="sm" className="flex-1">
                  <Eye className="mr-1 h-3 w-3" />
                  Детали
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {products.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Всего объявлений
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Активных
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {products.filter(p => p.status === 'sold').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Продано
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {products.reduce((sum, p) => sum + p.views, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Всего просмотров
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
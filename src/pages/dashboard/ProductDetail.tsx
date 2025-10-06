import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Car, 
  ArrowLeft,
  Edit,
  Save,
  Upload,
  Eye,
  MessageSquare,
  Calendar,
  DollarSign,
  Settings,
  Camera,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - в реальном приложении это будет загружаться по ID
  const product = {
    id: parseInt(id || '1'),
    make: 'Hyundai',
    model: 'Sonata',
    year: 2023,
    price: 35000,
    views: 156,
    inquiries: 12,
    status: 'active',
    created: '2024-01-15',
    description: 'Автомобиль в отличном состоянии, один владелец, полная сервисная история. Все ТО проходились в официальном дилерском центре. Комплектация Premium с кожаным салоном.',
    features: [
      'Кожаный салон',
      'Панорамная крыша',
      'Система безопасности',
      'Навигационная система',
      'Камера заднего вида',
      'Парковочные датчики'
    ],
    specifications: {
      engine: '2.5L Turbo',
      transmission: 'Автомат 8-ступ',
      drivetrain: 'Передний',
      fuelType: 'Бензин',
      mileage: 25000,
      color: 'Черный металлик',
      vin: 'KMHL14JA5MA123456'
    },
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]
  };

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
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/products')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к объявлениям
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {product.make} {product.model} {product.year}
            </h1>
            <p className="text-muted-foreground">
              ID объявления: {product.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(product.status)}
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Сохранить
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{product.views}</div>
            </div>
            <div className="text-sm text-muted-foreground">Просмотров</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{product.inquiries}</div>
            </div>
            <div className="text-sm text-muted-foreground">Запросов</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div className="text-lg font-bold text-purple-600">
                {Math.floor((new Date().getTime() - new Date(product.created).getTime()) / (1000 * 3600 * 24))} дней
              </div>
            </div>
            <div className="text-sm text-muted-foreground">На рынке</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Фотографии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {/* Thumbnails column */}
                <div className="flex flex-col gap-2 w-20">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-muted rounded-lg relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Car className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 aspect-video bg-muted rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="h-24 w-24 text-muted-foreground" />
                  </div>
                  {isEditing && (
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                </div>
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Добавить фотографии
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Описание
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Описание автомобиля</Label>
                    <Textarea 
                      id="description"
                      defaultValue={product.description}
                      rows={6}
                      placeholder="Подробное описание автомобиля..."
                    />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle>Особенности и опции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full mt-4">
                  Редактировать опции
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price and Status */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Цена и статус
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Цена (₩)</Label>
                    <Input 
                      id="price"
                      type="number"
                      defaultValue={product.price}
                      placeholder="Укажите цену"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Активное объявление</Label>
                    <Switch defaultChecked={product.status === 'active'} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-primary">
                    ₩{product.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Статус: {getStatusBadge(product.status)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Характеристики
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label>Двигатель</Label>
                    <Input defaultValue={product.specifications.engine} />
                  </div>
                  <div>
                    <Label>Коробка передач</Label>
                    <Input defaultValue={product.specifications.transmission} />
                  </div>
                  <div>
                    <Label>Привод</Label>
                    <Input defaultValue={product.specifications.drivetrain} />
                  </div>
                  <div>
                    <Label>Пробег (км)</Label>
                    <Input type="number" defaultValue={product.specifications.mileage} />
                  </div>
                  <div>
                    <Label>Цвет</Label>
                    <Input defaultValue={product.specifications.color} />
                  </div>
                  <div>
                    <Label>VIN</Label>
                    <Input defaultValue={product.specifications.vin} />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Двигатель:</span>
                    <span className="font-medium">{product.specifications.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">КПП:</span>
                    <span className="font-medium">{product.specifications.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Привод:</span>
                    <span className="font-medium">{product.specifications.drivetrain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Топливо:</span>
                    <span className="font-medium">{product.specifications.fuelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Пробег:</span>
                    <span className="font-medium">{product.specifications.mileage.toLocaleString()} км</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Цвет:</span>
                    <span className="font-medium">{product.specifications.color}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">VIN:</span>
                    <span className="font-mono">{product.specifications.vin}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card-gradient border-border/50">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Посмотреть аналитику
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ответить на запросы
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Предварительный просмотр
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
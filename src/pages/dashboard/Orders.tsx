import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart,
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';

const Orders = () => {
  const orders = [
    {
      id: "ORD-001",
      customerName: "Александр Иванов",
      customerPhone: "+7 (999) 123-45-67",
      customerEmail: "alex@example.com",
      vehicleMake: "Hyundai",
      vehicleModel: "Sonata",
      vehicleYear: 2023,
      price: 35000,
      status: "confirmed",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-25",
      paymentStatus: "paid",
      location: "Москва"
    },
    {
      id: "ORD-002",
      customerName: "Мария Петрова",
      customerPhone: "+7 (999) 987-65-43",
      customerEmail: "maria@example.com",
      vehicleMake: "Kia",
      vehicleModel: "Sportage",
      vehicleYear: 2023,
      price: 32000,
      status: "pending",
      orderDate: "2024-01-19",
      deliveryDate: "2024-01-26",
      paymentStatus: "pending",
      location: "Санкт-Петербург"
    },
    {
      id: "ORD-003",
      customerName: "Дмитрий Сидоров",
      customerPhone: "+7 (999) 555-44-33",
      customerEmail: "dmitry@example.com",
      vehicleMake: "Genesis",
      vehicleModel: "G90",
      vehicleYear: 2023,
      price: 65000,
      status: "completed",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      paymentStatus: "paid",
      location: "Новосибирск"
    },
    {
      id: "ORD-004",
      customerName: "Елена Козлова",
      customerPhone: "+7 (999) 777-88-99",
      customerEmail: "elena@example.com",
      vehicleMake: "Hyundai",
      vehicleModel: "Tucson",
      vehicleYear: 2024,
      price: 38000,
      status: "cancelled",
      orderDate: "2024-01-10",
      deliveryDate: null,
      paymentStatus: "refunded",
      location: "Екатеринбург"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">В обработке</Badge>;
      case 'confirmed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Подтвержден</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Завершен</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Отменен</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Оплачено</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Ожидает оплаты</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Возврат</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Заказы</h1>
          <p className="text-muted-foreground">
            Управление заказами и сделками
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {orders.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Всего заказов
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">
              В обработке
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Завершенных
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.price, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Выручка
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card-gradient border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск по номеру заказа, клиенту или автомобилю..." 
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

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">Заказ {order.id}</h3>
                        {getStatusBadge(order.status)}
                        {getPaymentBadge(order.paymentStatus)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.vehicleMake} {order.vehicleModel} {order.vehicleYear}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        ${order.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{order.location}</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Заказ: {order.orderDate}</span>
                    </div>
                    {order.deliveryDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Доставка: {order.deliveryDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:ml-4">
                  <Button size="sm" variant="outline">
                    Детали заказа
                  </Button>
                  <Button size="sm">
                    Связаться с клиентом
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Package,
  Eye,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
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

      {/* Orders Table */}
      <Card className="bg-card-gradient border-border/50">
        <CardHeader>
          <CardTitle>Список заказов</CardTitle>
          <CardDescription>
            Управление заказами и отслеживание статусов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заказ</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Автомобиль</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Оплата</TableHead>
                  <TableHead>Дата заказа</TableHead>
                  <TableHead>Доставка</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead className="w-[100px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow 
                    key={order.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <div>
                          <div className="font-medium">{order.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{order.vehicleMake} {order.vehicleModel}</div>
                        <div className="text-sm text-muted-foreground">{order.vehicleYear} год</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-primary">
                        ${order.price.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      {getPaymentBadge(order.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{order.orderDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.deliveryDate || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{order.location}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Изменить статус
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Скачать документы
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Отменить заказ
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
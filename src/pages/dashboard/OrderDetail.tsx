import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Printer, Download, CheckCircle, Clock, User, Mail, Phone, Globe, MessageSquare, FileText, Car, DollarSign, Ship, Calendar, MapPin, AlertCircle, Bell, Paperclip, Send } from 'lucide-react';
const OrderDetail = () => {
  const {
    id
  } = useParams();

  // Mock data - в реальном приложении будет загружаться по API
  const order = {
    id: "KR-2025-0342",
    status: "awaiting_confirmation",
    statusText: "Ожидание подтверждения от вас",
    createdAt: "22.09.2025, 14:30 KST",
    car: {
      make: "Hyundai",
      model: "Sonata 2024",
      vin: "KMHL14JA5PA123456",
      price: "₩ 35,000,000",
      priceUSD: "$26,250",
      mileage: "15,450 км",
      color: "Белый жемчуг",
      image: "/placeholder.svg"
    },
    customer: {
      name: "ABC Auto Trading Ltd.",
      email: "manager@abcauto.kz",
      phone: "+7 727 123 4567",
      location: "Almaty, Kazakhstan",
      history: "3 покупки, все успешные"
    },
    timeline: [{
      step: 1,
      title: "Бронирование оплачено",
      completed: true,
      date: "22.09.2025, 14:30"
    }, {
      step: 2,
      title: "Проверка автомобиля",
      completed: true,
      date: "23.09.2025, 09:15"
    }, {
      step: 3,
      title: "Ожидание подтверждения от вас",
      completed: false,
      current: true
    }, {
      step: 4,
      title: "Формирование договора",
      completed: false
    }, {
      step: 5,
      title: "Подписание договора",
      completed: false
    }, {
      step: 6,
      title: "Формирование счета",
      completed: false
    }, {
      step: 7,
      title: "Оплата",
      completed: false
    }, {
      step: 8,
      title: "Подготовка к экспорту",
      completed: false
    }, {
      step: 9,
      title: "Осуществляется доставка",
      completed: false
    }, {
      step: 10,
      title: "Выдан",
      completed: false
    }],
    finances: {
      carPrice: "₩ 35,000,000",
      additionalServices: "₩ 500,000",
      delivery: "₩ 1,200,000",
      total: "₩ 36,700,000",
      prepayment: "₩ 7,340,000",
      remaining: "₩ 29,360,000"
    },
    logistics: {
      from: "Порт Пусан, Южная Корея",
      to: "Алматы, Казахстан",
      method: "Автовоз через Хоргос",
      duration: "14-18 рабочих дней"
    },
    messages: [{
      date: "23.09",
      sender: "customer",
      text: "Когда будет готов авто?"
    }, {
      date: "23.09",
      sender: "dealer",
      text: "Подготовим в течение 3 дней"
    }, {
      date: "22.09",
      sender: "customer",
      text: "Оплатил бронирование"
    }],
    documents: [{
      name: "Договор купли-продажи",
      type: "pdf",
      available: true
    }, {
      name: "Счет на оплату",
      type: "pdf",
      available: true
    }, {
      name: "Инвойс",
      type: "pdf",
      available: true
    }, {
      name: "Техпаспорт автомобиля",
      type: "pdf",
      available: true
    }, {
      name: "Экспортная декларация",
      type: "pdf",
      available: false
    }]
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "awaiting_confirmation":
        return "default";
      case "confirmed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
  return <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к заказам
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Заказ №{order.id}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant={getStatusColor(order.status)} className="text-sm">
                  {order.statusText}
                </Badge>
                <span className="text-muted-foreground">{order.createdAt}</span>
              </div>
              <p className="text-muted-foreground mt-1">
                Покупатель: {order.customer.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Печать
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт PDF
              </Button>
            </div>
          </div>

          {/* Car Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Информация об автомобиле</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <Car className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {order.car.make} {order.car.model}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">VIN:</span>
                      <span className="ml-2 font-mono">{order.car.vin}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Цена:</span>
                      <span className="ml-2 font-semibold">{order.car.price} ({order.car.priceUSD})</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Пробег:</span>
                      <span className="ml-2">{order.car.mileage}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Цвет:</span>
                      <span className="ml-2">{order.car.color}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Посмотреть все фото</Button>
                    <Button variant="outline" size="sm">История авто</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Прогресс заказа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((item, index) => <div key={item.step} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500' : item.current ? 'bg-yellow-500' : 'bg-muted'}`}>
                      {item.completed ? <CheckCircle className="h-4 w-4 text-white" /> : item.current ? <Clock className="h-4 w-4 text-white" /> : <span className="text-xs text-muted-foreground">{item.step}</span>}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${item.current ? 'text-yellow-600' : ''}`}>
                        {item.step}. {item.title}
                      </div>
                      {item.date && <div className="text-sm text-muted-foreground">{item.date}</div>}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Информация о покупателе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>История: {order.customer.history}</span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Позвонить
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Профиль
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Финансы по заказу
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Стоимость авто:</span>
                  <span className="font-medium">{order.finances.carPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доп. услуги:</span>
                  <span className="font-medium">{order.finances.additionalServices}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span className="font-medium">{order.finances.delivery}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого:</span>
                  <span>{order.finances.total}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Предоплата (20%):</span>
                  <span className="font-medium text-green-600">
                    {order.finances.prepayment} 
                    <CheckCircle className="inline h-4 w-4 ml-1" />
                    получена
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Остаток:</span>
                  <span className="font-medium text-yellow-600">
                    {order.finances.remaining}
                    <Clock className="inline h-4 w-4 ml-1" />
                    ожидание
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Доставка и логистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Откуда:</span>
                  <span className="font-medium">{order.logistics.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Куда:</span>
                  <span className="font-medium">{order.logistics.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Способ:</span>
                  <span className="font-medium">{order.logistics.method}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Срок:</span>
                  <span className="font-medium">{order.logistics.duration}</span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Отследить маршрут
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Документы на экспорт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Переписка с покупателем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {order.messages.map((message, index) => <div key={index} className={`flex ${message.sender === 'dealer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'dealer' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <div className="text-sm">
                        <span className="font-medium">[{message.date}] </span>
                        {message.sender === 'customer' ? order.customer.name.split(' ')[0] : 'Вы'}: {message.text}
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="flex gap-2">
                <Textarea placeholder="Написать сообщение..." className="flex-1" rows={2} />
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Документы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.documents.map((doc, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.name}</span>
                    </div>
                    <Button variant={doc.available ? "outline" : "secondary"} size="sm" disabled={!doc.available}>
                      {doc.available ? <>
                          <Download className="h-4 w-4 mr-2" />
                          Скачать PDF
                        </> : "Создать"}
                    </Button>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-full lg:w-80">
          <div className="sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bell className="h-4 w-4" />
                  Требуется действие
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-yellow-800 mb-3">
                    Покупатель оплатил бронирование и ждет вашего подтверждения наличия автомобиля.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Подтвердить наличие
                    </Button>
                    <Button variant="destructive" size="sm" className="w-full">
                      Отменить (авто продан)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Запросить время
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Позвонить
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Создать счет
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Car className="h-4 w-4 mr-2" />
                    Обновить статус
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Отменить заказ
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Дедлайны
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      <div>Подтвердить до:</div>
                      <div className="font-medium text-yellow-600">25.09, 18:00</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Аналитика
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      <div>Время в статусе:</div>
                      <div className="font-medium">2 дня 4 часа</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default OrderDetail;
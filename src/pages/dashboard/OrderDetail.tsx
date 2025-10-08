import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Printer, Download, CheckCircle, Clock, User, Mail, Phone, Globe, MessageSquare, FileText, Car, DollarSign, Ship, Calendar, MapPin, AlertCircle, Bell, Paperclip, Send } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadOrderData();
    }
  }, [id]);

  const loadOrderData = async () => {
    try {
      // Load order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', id)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('order_messages')
        .select('*')
        .eq('order_id', orderData.id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);
    } catch (error) {
      console.error('Error loading order:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные заказа",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !order) return;

    try {
      const { error } = await supabase
        .from('order_messages')
        .insert({
          order_id: order.id,
          sender_type: 'dealer',
          message_text: newMessage
        });

      if (error) throw error;

      setNewMessage('');
      loadOrderData();
      
      toast({
        title: "Сообщение отправлено",
        description: "Ваше сообщение успешно доставлено"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Заказ не найден</h2>
          <Button onClick={() => navigate('/dashboard/orders')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к заказам
          </Button>
        </div>
      </div>
    );
  }

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
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/orders')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к заказам
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Заказ №{order.order_number}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant={getStatusColor(order.status)} className="text-sm">
                  {order.status_text}
                </Badge>
                <span className="text-muted-foreground">
                  {new Date(order.created_at).toLocaleString('ru-RU')}
                </span>
              </div>
              <p className="text-muted-foreground mt-1">
                Покупатель: {order.customer_name}
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
                    {order.vehicle_make} {order.vehicle_model} {order.vehicle_year}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {order.vehicle_vin && (
                      <div>
                        <span className="text-muted-foreground">VIN:</span>
                        <span className="ml-2 font-mono">{order.vehicle_vin}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Цена:</span>
                      <span className="ml-2 font-semibold">₩ {order.vehicle_price.toLocaleString()}</span>
                    </div>
                    {order.vehicle_mileage && (
                      <div>
                        <span className="text-muted-foreground">Пробег:</span>
                        <span className="ml-2">{order.vehicle_mileage}</span>
                      </div>
                    )}
                    {order.vehicle_color && (
                      <div>
                        <span className="text-muted-foreground">Цвет:</span>
                        <span className="ml-2">{order.vehicle_color}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Посмотреть все фото</Button>
                    <Button variant="outline" size="sm">История авто</Button>
                  </div>
                </div>
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
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer_phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer_location}</span>
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
                  <span className="font-medium">₩ {order.vehicle_price.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого:</span>
                  <span>₩ {order.total_price.toLocaleString()}</span>
                </div>
                <Separator />
                {order.prepayment && (
                  <div className="flex justify-between">
                    <span>Предоплата:</span>
                    <span className="font-medium text-green-600">
                      ₩ {order.prepayment.toLocaleString()}
                      <CheckCircle className="inline h-4 w-4 ml-1" />
                    </span>
                  </div>
                )}
                {order.remaining_payment && (
                  <div className="flex justify-between">
                    <span>Остаток:</span>
                    <span className="font-medium text-yellow-600">
                      ₩ {order.remaining_payment.toLocaleString()}
                      <Clock className="inline h-4 w-4 ml-1" />
                    </span>
                  </div>
                )}
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
                {order.delivery_from && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Откуда:</span>
                    <span className="font-medium">{order.delivery_from}</span>
                  </div>
                )}
                {order.delivery_to && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Куда:</span>
                    <span className="font-medium">{order.delivery_to}</span>
                  </div>
                )}
                {order.delivery_method && (
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Способ:</span>
                    <span className="font-medium">{order.delivery_method}</span>
                  </div>
                )}
                {order.estimated_delivery && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Срок:</span>
                    <span className="font-medium">{order.estimated_delivery}</span>
                  </div>
                )}
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
              <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-4 bg-muted/20 rounded-lg">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-2" />
                    <p>Нет сообщений по этому заказу</p>
                    <p className="text-sm">Начните переписку первым</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender_type === 'dealer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_type === 'dealer' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background border'
                      }`}>
                        <div className="text-sm">
                          <span className="font-medium">
                            {message.sender_type === 'customer' ? order.customer_name.split(' ')[0] : 'Вы'}:
                          </span>
                          {' '}{message.message_text}
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {formatDate(message.created_at)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Написать сообщение по этому заказу..." 
                  className="flex-1" 
                  rows={2}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
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
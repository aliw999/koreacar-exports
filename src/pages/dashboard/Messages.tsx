import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Car,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  status: string;
  status_text: string;
  total_price: number;
  created_at: string;
  lastMessage?: {
    message_text: string;
    created_at: string;
    sender_type: string;
  };
  unreadCount: number;
}

const Messages = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      loadMessages(selectedOrder.id);
    }
  }, [selectedOrder]);

  const loadOrders = async () => {
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Load last message for each order
      const ordersWithMessages = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: lastMsg } = await supabase
            .from('order_messages')
            .select('*')
            .eq('order_id', order.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...order,
            lastMessage: lastMsg,
            unreadCount: 0 // TODO: implement unread count
          };
        })
      );

      setOrders(ordersWithMessages);
      if (ordersWithMessages.length > 0 && !selectedOrder) {
        setSelectedOrder(ordersWithMessages[0]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список заказов",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_messages')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedOrder) return;

    try {
      const { error } = await supabase
        .from('order_messages')
        .insert({
          order_id: selectedOrder.id,
          sender_type: 'dealer',
          message_text: newMessage
        });

      if (error) throw error;

      setNewMessage('');
      loadMessages(selectedOrder.id);
      loadOrders(); // Refresh order list to update last message
      
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
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
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

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Сообщения</h1>
            <p className="text-muted-foreground">
              Общение с покупателями по заказам
            </p>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет сообщений</h3>
              <p className="text-muted-foreground text-center mb-4">
                Сообщения появляются только после создания заказа.<br />
                Все переписки ведутся в контексте конкретного заказа.
              </p>
              <Button onClick={() => navigate('/dashboard/orders')}>
                Перейти к заказам
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Сообщения по заказам</h1>
          <p className="text-muted-foreground">
            Все переписки ведутся на уровне заказов. Выберите заказ для просмотра переписки.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активные переписки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.lastMessage).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Требуют ответа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.lastMessage?.sender_type === 'customer').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders/Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Заказы с переписками</CardTitle>
              <CardDescription>Выберите заказ для просмотра переписки</CardDescription>
              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по имени или номеру заказа..."
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`flex items-start gap-3 p-4 hover:bg-accent cursor-pointer border-b transition-colors ${
                      selectedOrder?.id === order.id ? 'bg-accent' : ''
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback>
                        <Car className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold truncate">{order.customer_name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {order.lastMessage ? formatDate(order.lastMessage.created_at) : formatDate(order.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {order.status_text}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {order.order_number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground truncate">
                          {order.vehicle_make} {order.vehicle_model} {order.vehicle_year}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          ₩ {order.total_price.toLocaleString()}
                        </p>
                      </div>
                      {order.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          <span className="font-medium">
                            {order.lastMessage.sender_type === 'dealer' ? 'Вы: ' : 'Покупатель: '}
                          </span>
                          {order.lastMessage.message_text}
                        </p>
                      )}
                      {!order.lastMessage && (
                        <p className="text-xs text-muted-foreground italic mt-1">
                          Нет сообщений
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/orders/${order.order_number}`);
                      }}
                    >
                      <Package className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedOrder ? (
              <>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <Car className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle>{selectedOrder.customer_name}</CardTitle>
                      <CardDescription>
                        {selectedOrder.vehicle_make} {selectedOrder.vehicle_model} {selectedOrder.vehicle_year}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Package className="h-3 w-3" />
                          {selectedOrder.order_number}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(selectedOrder.created_at).toLocaleDateString('ru-RU')}
                        </div>
                        <Badge variant={getStatusColor(selectedOrder.status)}>
                          {selectedOrder.status_text}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/dashboard/orders/${selectedOrder.order_number}`)}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Открыть заказ
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 h-[400px] overflow-y-auto p-4 bg-muted/20 rounded-lg">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
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
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender_type === 'dealer'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background border'
                            }`}
                          >
                            <p className="text-sm">{message.message_text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs opacity-70">
                                {formatDate(message.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Написать сообщение по заказу..."
                      className="flex-1 min-h-[60px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Отправить
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex flex-col items-center justify-center h-[600px]">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Выберите заказ</h3>
                <p className="text-muted-foreground text-center">
                  Выберите заказ из списка слева<br />
                  чтобы просмотреть переписку
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;

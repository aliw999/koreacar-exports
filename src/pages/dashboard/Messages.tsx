import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare,
  Search,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  User
} from 'lucide-react';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      customerName: "Александр Иванов",
      customerAvatar: "AI",
      vehicleInterest: "Hyundai Sonata 2023",
      lastMessage: "Когда можем встретиться для осмотра?",
      timestamp: "10:30",
      unreadCount: 2,
      status: "online"
    },
    {
      id: 2,
      customerName: "Мария Петрова",
      customerAvatar: "МП",
      vehicleInterest: "Kia Sportage 2023",
      lastMessage: "Спасибо за информацию. Подумаю.",
      timestamp: "Вчера",
      unreadCount: 0,
      status: "offline"
    },
    {
      id: 3,
      customerName: "Дмитрий Сидоров",
      customerAvatar: "ДС",
      vehicleInterest: "Genesis G90 2023",
      lastMessage: "Готов к сделке. Когда подписываем?",
      timestamp: "2 дня назад",
      unreadCount: 1,
      status: "online"
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "customer",
      message: "Добрый день! Интересует Hyundai Sonata 2023 года.",
      timestamp: "09:15",
      status: "delivered"
    },
    {
      id: 2,
      sender: "seller",
      message: "Здравствуйте! Да, автомобиль в наличии. Могу ответить на все ваши вопросы.",
      timestamp: "09:18",
      status: "read"
    },
    {
      id: 3,
      sender: "customer",
      message: "Какой реальный пробег? И были ли аварии?",
      timestamp: "09:45",
      status: "delivered"
    },
    {
      id: 4,
      sender: "seller",
      message: "Пробег 45,000 км, полностью оригинальный. ДТП не было, есть все документы.",
      timestamp: "09:47",
      status: "read"
    },
    {
      id: 5,
      sender: "customer",
      message: "Когда можем встретиться для осмотра?",
      timestamp: "10:30",
      status: "delivered"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Сообщения</h1>
          <p className="text-muted-foreground">
            Общение с покупателями и клиентами
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Все разговоры
          </Button>
          <Button>Новое сообщение</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Разговоры</CardTitle>
              <Badge variant="secondary">{conversations.filter(c => c.unreadCount > 0).length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Поиск разговоров..." 
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className="p-4 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {conversation.customerAvatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{conversation.customerName}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.vehicleInterest}</p>
                      <p className="text-sm text-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          <Card className="bg-card-gradient border-border/50 h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    АИ
                  </div>
                  <div>
                    <h3 className="font-semibold">Александр Иванов</h3>
                    <p className="text-sm text-muted-foreground">Онлайн • Hyundai Sonata 2023</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.sender === 'seller' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  } rounded-lg px-4 py-2`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                      {msg.sender === 'seller' && (
                        <CheckCircle2 className={`h-3 w-3 ${
                          msg.status === 'read' ? 'text-green-300' : 'opacity-70'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex items-end gap-3">
                <Textarea 
                  placeholder="Введите сообщение..." 
                  className="flex-1 min-h-[40px] max-h-32 resize-none"
                />
                <Button size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {conversations.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Активных разговоров
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {conversations.filter(c => c.unreadCount > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">
              Непрочитанных
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              2.3 ч
            </div>
            <div className="text-sm text-muted-foreground">
              Среднее время ответа
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              95%
            </div>
            <div className="text-sm text-muted-foreground">
              Ответы в тот же день
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
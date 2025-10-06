import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Info, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'order';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'order',
    title: 'Новый заказ',
    message: 'Получен новый заказ #1247 на сумму 2 450 000 ₽',
    time: '5 минут назад',
    read: false,
  },
  {
    id: 2,
    type: 'success',
    title: 'Товар добавлен',
    message: 'Автомобиль Hyundai Tucson успешно добавлен в каталог',
    time: '1 час назад',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Требуется обновление',
    message: 'Обновите информацию о наличии товара Kia Sportage',
    time: '3 часа назад',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'Системное обновление',
    message: 'Система будет обновлена 15 октября в 02:00',
    time: '1 день назад',
    read: true,
  },
  {
    id: 5,
    type: 'order',
    title: 'Заказ отправлен',
    message: 'Заказ #1242 успешно отправлен клиенту',
    time: '2 дня назад',
    read: true,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const handleLogout = () => {
    console.log("Logout");
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'order':
        return <Package className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-muted p-2 rounded-md" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-foreground">
                    Net Cars
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Кабинет продавца
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                          variant="destructive"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold">Уведомления</h3>
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {unreadCount} новых
                        </Badge>
                      )}
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="divide-y">
                        {mockNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-muted/20' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-2 border-t">
                      <Button variant="ghost" className="w-full text-sm" size="sm">
                        Показать все уведомления
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">Профиль</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Профиль</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Уведомления</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
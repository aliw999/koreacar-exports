import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Car,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Settings,
  Home,
  Users,
  HelpCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Обзор",
    url: "/dashboard",
    icon: Home,
    description: "Главная страница кабинета"
  },
  {
    title: "Мои объявления",
    url: "/dashboard/products",
    icon: Car,
    description: "Управление автомобилями"
  },
  {
    title: "Заказы",
    url: "/dashboard/orders", 
    icon: ShoppingCart,
    description: "Управление заказами"
  },
  {
    title: "Аналитика",
    url: "/dashboard/analytics",
    icon: BarChart3,
    description: "Отчёты и статистика"
  },
];

const communicationItems = [
  {
    title: "Сообщения",
    url: "/dashboard/messages",
    icon: MessageSquare,
    description: "Чат с покупателями"
  },
];

const businessItems = [
  {
    title: "Сотрудники",
    url: "/dashboard/employees",
    icon: Users,
    description: "Управление сотрудниками"
  },
  {
    title: "Финансы",
    url: "/dashboard/financial",
    icon: CreditCard,
    description: "Выплаты и баланс"
  },
];

const systemItems = [
  {
    title: "Настройки",
    url: "/dashboard/settings",
    icon: Settings,
    description: "Настройки аккаунта"
  },
  {
    title: "Помощь",
    url: "/dashboard/help",
    icon: HelpCircle,
    description: "Справка и поддержка"
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const renderMenuItems = (items: typeof navigationItems) => (
    <SidebarMenu className="space-y-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActive(item.url)}>
            <NavLink to={item.url}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className="border-r">
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Основное</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(navigationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Communication */}
        <SidebarGroup>
          <SidebarGroupLabel>Коммуникации</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(communicationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business */}
        <SidebarGroup>
          <SidebarGroupLabel>Бизнес</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(businessItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel>Система</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(systemItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Car,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Settings,
  Home,
  Package,
  TrendingUp,
  Users,
  FileText,
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
  SidebarTrigger,
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
  {
    title: "Покупатели",
    url: "/dashboard/customers",
    icon: Users,
    description: "База покупателей"
  },
];

const businessItems = [
  {
    title: "Финансы",
    url: "/dashboard/financial",
    icon: CreditCard,
    description: "Выплаты и баланс"
  },
  {
    title: "Отчёты",
    url: "/dashboard/reports",
    icon: FileText,
    description: "Документы и отчёты"
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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-sidebar-accent text-sidebar-accent-foreground font-medium`;
    }
    return `${baseClass} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`;
  };

  const renderMenuItems = (items: typeof navigationItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink to={item.url} className={getNavClass(item.url)}>
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-sidebar-foreground/60 leading-tight">
                    {item.description}
                  </div>
                </div>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-72"}
      collapsible="icon"
    >
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-semibold mb-2">
            Основное
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(navigationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Communication */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-semibold mb-2">
            Коммуникации
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(communicationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-semibold mb-2">
            Бизнес
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(businessItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-semibold mb-2">
            Система
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(systemItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
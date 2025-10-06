import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DollarSign, TrendingUp, Clock, Calculator, Download, Send, FileText, AlertTriangle, CheckCircle, Settings as SettingsIcon, Mail, Calendar, CreditCard } from 'lucide-react';
const Financial = () => {
  const [currency, setCurrency] = useState('KRW');

  // KPI Data
  const kpiData = [{
    title: 'Продажи за месяц',
    valueKRW: '₩ 450,000,000',
    valueUSD: '$337,500',
    change: '+15%',
    trend: 'up',
    icon: DollarSign,
    description: 'к прошлому месяцу'
  }, {
    title: 'Активные сделки',
    valueKRW: '12 автомобилей',
    valueUSD: '$2,850,000',
    change: '+3',
    trend: 'up',
    icon: TrendingUp,
    description: 'в работе'
  }, {
    title: 'К получению',
    valueKRW: '₩ 180,000,000',
    valueUSD: '$135,000',
    change: '7 дней',
    trend: 'neutral',
    icon: Clock,
    description: 'среднее'
  }, {
    title: 'Средний чек',
    valueKRW: '₩ 37,500,000',
    valueUSD: '$28,125',
    change: '+8.5%',
    trend: 'up',
    icon: Calculator,
    description: 'за сделку'
  }];

  // Sales Data
  const salesData = [{
    date: '15.09.25',
    car: 'Hyundai Sonata 2023',
    buyer: 'ABC Motors',
    country: '🇰🇿',
    amountKRW: '₩ 35,000,000',
    amountUSD: '$26,250',
    status: 'paid'
  }, {
    date: '12.09.25',
    car: 'Kia Sportage 2024',
    buyer: 'DEF Auto',
    country: '🇺🇿',
    amountKRW: '₩ 42,000,000',
    amountUSD: '$31,500',
    status: 'pending'
  }, {
    date: '10.09.25',
    car: 'Genesis G90 2023',
    buyer: 'XYZ Trading',
    country: '🇰🇿',
    amountKRW: '₩ 65,000,000',
    amountUSD: '$48,750',
    status: 'paid'
  }, {
    date: '08.09.25',
    car: 'Hyundai Tucson 2024',
    buyer: 'AutoWorld',
    country: '🇺🇿',
    amountKRW: '₩ 38,000,000',
    amountUSD: '$28,500',
    status: 'overdue'
  }];

  // Pending Payments
  const pendingPayments = [{
    car: 'Hyundai Tucson 2024',
    buyer: 'ABC Motors',
    country: 'Kazakhstan',
    amountKRW: '₩ 38,000,000',
    amountUSD: '$28,500',
    dueDate: '28.09.2025',
    daysLeft: 3,
    status: 'pending'
  }, {
    car: 'Kia Sorento 2023',
    buyer: 'XYZ Trading',
    country: 'Uzbekistan',
    amountKRW: '₩ 45,000,000',
    amountUSD: '$33,750',
    dueDate: '20.09.2025',
    daysLeft: -5,
    status: 'overdue'
  }];

  // Commission Data
  const commissionData = [{
    period: 'Сентябрь 2025',
    turnover: '₩ 180,000,000',
    commission: '₩ 9,000,000',
    status: 'accrued',
    date: '05.10.2025'
  }, {
    period: 'Август 2025',
    turnover: '₩ 220,000,000',
    commission: '₩ 11,000,000',
    status: 'paid',
    date: '05.09.2025'
  }, {
    period: 'Июль 2025',
    turnover: '₩ 195,000,000',
    commission: '₩ 9,750,000',
    status: 'paid',
    date: '05.08.2025'
  }];

  // Top Countries Data
  const topCountries = [{
    name: 'Казахстан',
    sales: 45,
    percentage: 42
  }, {
    name: 'Узбекистан',
    sales: 32,
    percentage: 30
  }, {
    name: 'Кыргызстан',
    sales: 18,
    percentage: 17
  }, {
    name: 'Таджикистан',
    sales: 12,
    percentage: 11
  }];

  // Monthly Sales Data
  const monthlySales = [{
    month: 'Март',
    amount: 320
  }, {
    month: 'Апрель',
    amount: 280
  }, {
    month: 'Май',
    amount: 380
  }, {
    month: 'Июнь',
    amount: 420
  }, {
    month: 'Июль',
    amount: 390
  }, {
    month: 'Август',
    amount: 440
  }, {
    month: 'Сентябрь',
    amount: 450
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500">Оплачено</Badge>;
      case 'pending':
        return <Badge variant="outline">Ожидание</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Просрочка</Badge>;
      case 'accrued':
        return <Badge variant="secondary">Начислено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Финансы</h1>
          <p className="text-muted-foreground">
            Управление финансами и отчетность по продажам
          </p>
        </div>
        
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-medium transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {currency === 'KRW' ? kpi.valueKRW : kpi.valueUSD}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                  <span className={kpi.trend === 'up' ? "text-green-600" : "text-muted-foreground"}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {kpi.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Продажи по месяцам
            </CardTitle>
            <CardDescription>
              Динамика продаж за последние 7 месяцев (млн ₩)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlySales.map((data, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="font-medium">{data.month}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
                    width: `${data.amount / 500 * 100}%`
                  }} />
                    </div>
                    <span className="font-medium text-sm min-w-16">{data.amount}M</span>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries Chart */}
        <Card className="bg-card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Топ-5 стран покупателей
            </CardTitle>
            <CardDescription>
              Распределение продаж по странам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="font-medium">{country.name}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
                    width: `${country.percentage}%`
                  }} />
                    </div>
                    <span className="font-medium text-sm min-w-16">{country.sales} авто</span>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="pending">К получению</TabsTrigger>
          <TabsTrigger value="commissions">Комиссии</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
        </TabsList>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>История продаж</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="paid">Оплачено</SelectItem>
                      <SelectItem value="pending">Ожидание</SelectItem>
                      <SelectItem value="overdue">Просрочка</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Автомобиль</TableHead>
                    <TableHead>Покупатель</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((sale, index) => <TableRow key={index}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell className="font-medium">{sale.car}</TableCell>
                      <TableCell>
                        {sale.buyer} {sale.country}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{currency === 'KRW' ? sale.amountKRW : sale.amountUSD}</div>
                          <div className="text-xs text-muted-foreground">
                            {currency === 'KRW' ? sale.amountUSD : sale.amountKRW}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Payments Tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Ожидаемые платежи</CardTitle>
              <CardDescription>
                Счета к получению и просроченные платежи
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPayments.map((payment, index) => <Card key={index} className={`p-4 ${payment.status === 'overdue' ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20' : ''}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="font-semibold">{payment.car}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.buyer} ({payment.country})
                        </div>
                        <div className="text-lg font-bold">
                          {currency === 'KRW' ? payment.amountKRW : payment.amountUSD}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {payment.status === 'overdue' ? <AlertTriangle className="h-4 w-4 text-red-500" /> : <Clock className="h-4 w-4 text-orange-500" />}
                          {payment.status === 'overdue' ? <span className="text-red-600">Просрочка: {Math.abs(payment.daysLeft)} дней</span> : <span className="text-muted-foreground">
                              Срок оплаты: {payment.dueDate} (через {payment.daysLeft} дня)
                            </span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-40">
                        <Button size="sm" className="w-full">
                          <Send className="mr-2 h-4 w-4" />
                          {payment.status === 'overdue' ? 'Связаться с клиентом' : 'Отправить напоминание'}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Посмотреть инвойс
                        </Button>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commissions Tab */}
        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Комиссии платформы</CardTitle>
              <CardDescription>
                История начислений и списаний комиссий (5% с оборота)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Период</TableHead>
                    <TableHead>Оборот</TableHead>
                    <TableHead>Комиссия (5%)</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата списания</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionData.map((commission, index) => <TableRow key={index}>
                      <TableCell className="font-medium">{commission.period}</TableCell>
                      <TableCell>{commission.turnover}</TableCell>
                      <TableCell className="font-semibold">{commission.commission}</TableCell>
                      <TableCell>{getStatusBadge(commission.status)}</TableCell>
                      <TableCell>{commission.date}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Документы и отчеты</CardTitle>
              <CardDescription>
                Скачивание документов для бухгалтерии и налоговой
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-semibold">Инвойсы</div>
                      <div className="text-sm text-muted-foreground">По продажам</div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать PDF
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-semibold">Отчет о продажах</div>
                      <div className="text-sm text-muted-foreground">Месяц/квартал</div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать Excel
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="font-semibold">Справка о комиссиях</div>
                      <div className="text-sm text-muted-foreground">Платформа</div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать PDF
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-orange-600" />
                    <div>
                      <div className="font-semibold">Данные для налоговой</div>
                      <div className="text-sm text-muted-foreground">Экспорт</div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт Excel
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>;
};
export default Financial;
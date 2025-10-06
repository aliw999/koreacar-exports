import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Car, Eye, EyeOff, Mail, Lock } from 'lucide-react';
const loginSchema = z.object({
  email: z.string().email('Введите корректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  rememberMe: z.boolean().default(false)
});
type LoginForm = z.infer<typeof loginSchema>;
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Неверные данные",
            description: "Проверьте правильность email и пароля",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Ошибка входа",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно вошли в систему"
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Ошибка",
        description: "Произошла неожиданная ошибка. Попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-hero-gradient rounded-xl shadow-glow">
              <Car className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Net Cars
            </span>
          </div>
          <p className="text-muted-foreground">Вход в кабинет дилера</p>
        </div>

        <Card className="shadow-large border-border/50 bg-card-gradient">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Добро пожаловать!</CardTitle>
            <CardDescription>
              Войдите в свой аккаунт для продолжения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-sm font-medium">Email адрес</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input {...field} type="email" placeholder="dealer@example.com" className="pl-10 transition-smooth focus:ring-primary/20" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-sm font-medium">Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input {...field} type={showPassword ? 'text' : 'password'} placeholder="Введите пароль" className="pl-10 pr-10 transition-smooth focus:ring-primary/20" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <div className="flex items-center justify-between">
                  <FormField control={form.control} name="rememberMe" render={({
                  field
                }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Запомнить меня
                          </FormLabel>
                        </div>
                      </FormItem>} />

                  <Link to="/auth/forgot-password" className="text-sm text-primary hover:text-primary-hover transition-colors">
                    Забыли пароль?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-hero-gradient hover:shadow-glow transition-all duration-300" disabled={isLoading}>
                  {isLoading ? 'Входим...' : 'Войти в кабинет'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Нет аккаунта?{' '}
                  <Link to="/auth/register" className="text-primary hover:text-primary-hover transition-colors font-medium">
                    Зарегистрироваться
                  </Link>
                </div>
              </form>
            </Form>

            {/* Social Login (Optional) */}
            
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-xs text-muted-foreground">
          Входя в систему, вы соглашаетесь с{' '}
          <Link to="/terms" className="text-primary hover:text-primary-hover">
            Условиями использования
          </Link>{' '}
          и{' '}
          <Link to="/privacy" className="text-primary hover:text-primary-hover">
            Политикой конфиденциальности
          </Link>
        </div>
      </div>
    </div>;
};
export default Login;
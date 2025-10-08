-- Create orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  dealer_id uuid NOT NULL,
  
  -- Customer information
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_location text NOT NULL,
  
  -- Vehicle information
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year integer NOT NULL,
  vehicle_vin text,
  vehicle_price numeric NOT NULL,
  vehicle_mileage text,
  vehicle_color text,
  
  -- Order status
  status text NOT NULL DEFAULT 'pending',
  status_text text NOT NULL,
  
  -- Financial information
  total_price numeric NOT NULL,
  prepayment numeric,
  remaining_payment numeric,
  
  -- Logistics
  delivery_from text,
  delivery_to text,
  delivery_method text,
  estimated_delivery text,
  
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create order_messages table
CREATE TABLE public.order_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('dealer', 'customer')),
  message_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Dealers can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can insert their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = dealer_id);

CREATE POLICY "Dealers can update their own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = dealer_id);

-- RLS Policies for order_messages
CREATE POLICY "Dealers can view messages for their orders"
  ON public.order_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_messages.order_id 
      AND orders.dealer_id = auth.uid()
    )
  );

CREATE POLICY "Dealers can insert messages for their orders"
  ON public.order_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_messages.order_id 
      AND orders.dealer_id = auth.uid()
    )
  );

-- Add trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_orders_dealer_id ON public.orders(dealer_id);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_order_messages_order_id ON public.order_messages(order_id);
CREATE INDEX idx_order_messages_created_at ON public.order_messages(created_at);
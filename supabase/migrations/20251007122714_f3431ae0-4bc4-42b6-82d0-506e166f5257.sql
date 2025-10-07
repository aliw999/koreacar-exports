-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create storage bucket for dealer documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('dealer-documents', 'dealer-documents', false);

-- Create dealer onboarding status table
CREATE TABLE public.dealer_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  business_registration_uploaded BOOLEAN DEFAULT false,
  business_license_uploaded BOOLEAN DEFAULT false,
  tax_certificate_uploaded BOOLEAN DEFAULT false,
  dealer_license_uploaded BOOLEAN DEFAULT false,
  bank_account_uploaded BOOLEAN DEFAULT false,
  corporate_seal_uploaded BOOLEAN DEFAULT false,
  representative_id_uploaded BOOLEAN DEFAULT false,
  bank_account_number TEXT,
  bank_name TEXT,
  account_holder_name TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dealer_onboarding ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dealer_onboarding
CREATE POLICY "Users can view their own onboarding status"
ON public.dealer_onboarding
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding status"
ON public.dealer_onboarding
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding status"
ON public.dealer_onboarding
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Storage policies for dealer documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'dealer-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'dealer-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'dealer-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'dealer-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create trigger to update updated_at
CREATE TRIGGER update_dealer_onboarding_updated_at
BEFORE UPDATE ON public.dealer_onboarding
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-create onboarding record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_dealer_onboarding()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.dealer_onboarding (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger to create onboarding record on user signup
CREATE TRIGGER on_auth_user_created_onboarding
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_dealer_onboarding();
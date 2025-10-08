/*
  # Create Cars and Imports System
  
  1. New Tables
    - `car_listings`
      - Core car information (make, model, year, price, mileage, etc.)
      - Specifications matching Encar format
      - Images and media
      - Seller information
      - Status and timestamps
    
    - `import_jobs`
      - Track import operations from Encar
      - Store source URLs and import status
      - Link to created listings
    
    - `car_images`
      - Store multiple images per car
      - Order and type (main, gallery, etc.)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own listings
    - Add policies for import job tracking
*/

-- Car listings table
CREATE TABLE IF NOT EXISTS car_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information (from Encar)
  encar_id text UNIQUE,
  encar_url text,
  
  -- Vehicle Details
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price_krw bigint,
  price_usd numeric(10,2),
  
  -- Specifications (Encar format)
  mileage integer,
  fuel_type text,
  transmission text,
  displacement integer,
  engine_type text,
  drive_type text,
  body_type text,
  color_exterior text,
  color_interior text,
  seating_capacity integer,
  
  -- Identification
  vin text,
  chassis_number text,
  plate_number text,
  
  -- Condition
  accident_history text,
  ownership_changes integer DEFAULT 0,
  inspection_record jsonb,
  
  -- Location
  location_city text,
  location_region text,
  
  -- Description
  title text,
  description text,
  features text[],
  
  -- Seller Information
  seller_name text,
  seller_phone text,
  seller_type text,
  
  -- Status
  status text DEFAULT 'draft',
  published_at timestamptz,
  imported_at timestamptz,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_status CHECK (status IN ('draft', 'active', 'sold', 'inactive', 'pending'))
);

-- Car images table
CREATE TABLE IF NOT EXISTS car_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES car_listings(id) ON DELETE CASCADE NOT NULL,
  
  image_url text NOT NULL,
  thumbnail_url text,
  order_index integer DEFAULT 0,
  image_type text DEFAULT 'gallery',
  
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_image_type CHECK (image_type IN ('main', 'gallery', 'detail', 'document'))
);

-- Import jobs table
CREATE TABLE IF NOT EXISTS import_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Import Details
  import_type text NOT NULL,
  source_url text NOT NULL,
  
  -- Status
  status text DEFAULT 'pending',
  progress integer DEFAULT 0,
  total_items integer DEFAULT 0,
  processed_items integer DEFAULT 0,
  failed_items integer DEFAULT 0,
  
  -- Results
  imported_car_ids uuid[],
  error_log jsonb,
  
  -- Timestamps
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_import_type CHECK (import_type IN ('single', 'bulk')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled'))
);

-- Enable RLS
ALTER TABLE car_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_jobs ENABLE ROW LEVEL SECURITY;

-- Policies for car_listings
CREATE POLICY "Users can view own listings"
  ON car_listings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listings"
  ON car_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON car_listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON car_listings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for car_images
CREATE POLICY "Users can view images of own listings"
  ON car_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM car_listings
      WHERE car_listings.id = car_images.car_id
      AND car_listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert images for own listings"
  ON car_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM car_listings
      WHERE car_listings.id = car_images.car_id
      AND car_listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images of own listings"
  ON car_images FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM car_listings
      WHERE car_listings.id = car_images.car_id
      AND car_listings.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM car_listings
      WHERE car_listings.id = car_images.car_id
      AND car_listings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images of own listings"
  ON car_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM car_listings
      WHERE car_listings.id = car_images.car_id
      AND car_listings.user_id = auth.uid()
    )
  );

-- Policies for import_jobs
CREATE POLICY "Users can view own import jobs"
  ON import_jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create import jobs"
  ON import_jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own import jobs"
  ON import_jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_car_listings_user_id ON car_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_car_listings_status ON car_listings(status);
CREATE INDEX IF NOT EXISTS idx_car_listings_encar_id ON car_listings(encar_id);
CREATE INDEX IF NOT EXISTS idx_car_images_car_id ON car_images(car_id);
CREATE INDEX IF NOT EXISTS idx_import_jobs_user_id ON import_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_import_jobs_status ON import_jobs(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for car_listings
CREATE TRIGGER update_car_listings_updated_at
  BEFORE UPDATE ON car_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

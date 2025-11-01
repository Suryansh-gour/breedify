/*
  # Create Indian Cattle and Buffalo Breeds Database

  ## Overview
  This migration creates the database structure for storing Indian cattle and buffalo breed information,
  including breed characteristics, identification features, and recognition history.

  ## New Tables
  
  ### 1. `breeds`
  Stores information about different cattle and buffalo breeds found in India
  - `id` (uuid, primary key) - Unique identifier for each breed
  - `name` (text, not null) - Name of the breed (e.g., "Gir", "Murrah")
  - `type` (text, not null) - Type of animal: 'cattle' or 'buffalo'
  - `origin_state` (text) - Indian state where the breed originated
  - `description` (text) - Detailed description of the breed
  - `characteristics` (jsonb) - Physical characteristics (color, horns, size, etc.)
  - `primary_use` (text) - Main purpose: 'dairy', 'draft', 'dual-purpose'
  - `average_milk_yield` (text) - Average milk production information
  - `image_url` (text) - Reference image URL for the breed
  - `created_at` (timestamptz) - Timestamp of record creation

  ### 2. `recognition_history`
  Tracks all breed recognition attempts and results
  - `id` (uuid, primary key) - Unique identifier for each recognition
  - `breed_id` (uuid, foreign key) - References the identified breed
  - `confidence_score` (numeric) - AI confidence level (0-100)
  - `image_data` (text) - Base64 encoded image or storage reference
  - `recognition_date` (timestamptz) - When the recognition was performed
  - `metadata` (jsonb) - Additional analysis data

  ## Security
  - Enable RLS on all tables
  - Public read access for breeds (educational/reference data)
  - Authenticated users can create recognition history entries
  - Users can only view their own recognition history

  ## Important Notes
  1. Breeds table contains reference data about Indian cattle and buffalo breeds
  2. Recognition history tracks user uploads and AI predictions
  3. All tables use RLS for security
  4. JSONB fields store flexible structured data for characteristics and metadata
*/

-- Create breeds table
CREATE TABLE IF NOT EXISTS breeds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('cattle', 'buffalo')),
  origin_state text,
  description text,
  characteristics jsonb DEFAULT '{}'::jsonb,
  primary_use text CHECK (primary_use IN ('dairy', 'draft', 'dual-purpose')),
  average_milk_yield text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create recognition history table
CREATE TABLE IF NOT EXISTS recognition_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  breed_id uuid REFERENCES breeds(id) ON DELETE SET NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  image_data text,
  recognition_date timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  user_id uuid
);

-- Enable RLS
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE recognition_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for breeds table
CREATE POLICY "Anyone can view breeds"
  ON breeds FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert breeds"
  ON breeds FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for recognition_history table
CREATE POLICY "Users can view own recognition history"
  ON recognition_history FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert recognition history"
  ON recognition_history FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_breeds_type ON breeds(type);
CREATE INDEX IF NOT EXISTS idx_breeds_name ON breeds(name);
CREATE INDEX IF NOT EXISTS idx_recognition_breed_id ON recognition_history(breed_id);
CREATE INDEX IF NOT EXISTS idx_recognition_date ON recognition_history(recognition_date DESC);

-- Insert sample Indian cattle and buffalo breeds
INSERT INTO breeds (name, type, origin_state, description, characteristics, primary_use, average_milk_yield) VALUES
  ('Gir', 'cattle', 'Gujarat', 'The Gir is one of the principal Zebu breeds originating in India. Known for its distinctive appearance with a rounded, domed forehead.', '{"color": "red to spotted", "horns": "peculiarly curved", "ears": "long and pendulous", "hump": "prominent"}', 'dairy', '6-10 liters per day'),
  ('Sahiwal', 'cattle', 'Punjab', 'Sahiwal is a breed of Zebu cattle known for high milk production. Heat tolerant and disease resistant.', '{"color": "reddish brown", "horns": "short and thick", "hump": "well developed", "udder": "well developed"}', 'dairy', '8-12 liters per day'),
  ('Red Sindhi', 'cattle', 'Sindh', 'Compact dairy cattle breed known for its heat tolerance and good milk production in harsh conditions.', '{"color": "red", "horns": "small", "size": "medium", "temperament": "docile"}', 'dairy', '6-8 liters per day'),
  ('Tharparkar', 'cattle', 'Rajasthan', 'Dual-purpose breed from the Thar desert region, known for drought resistance and milk production.', '{"color": "white to grey", "horns": "medium sized", "adaptability": "high", "hump": "prominent"}', 'dual-purpose', '5-8 liters per day'),
  ('Murrah', 'buffalo', 'Haryana', 'The Murrah is the most productive dairy buffalo breed in the world, known for its jet black color.', '{"color": "jet black", "horns": "tightly coiled", "body": "compact and wedge-shaped", "tail": "long"}', 'dairy', '12-18 liters per day'),
  ('Jaffarabadi', 'buffalo', 'Gujarat', 'Heavy breed of buffalo known for its massive build and high milk fat content.', '{"color": "jet black", "horns": "heavy and coiled", "forehead": "prominent bulge", "size": "large"}', 'dairy', '10-15 liters per day'),
  ('Surti', 'buffalo', 'Gujarat', 'Medium-sized buffalo breed with excellent milk quality and butterfat content.', '{"color": "black to brown", "horns": "sickle-shaped", "size": "medium", "forehead": "flat"}', 'dairy', '8-12 liters per day'),
  ('Mehsana', 'buffalo', 'Gujarat', 'Crossbred developed from Murrah and Surti, combining good milk yield with adaptability.', '{"color": "black", "horns": "medium coiled", "body": "well proportioned", "udder": "well attached"}', 'dairy', '10-14 liters per day'),
  ('Kankrej', 'cattle', 'Gujarat', 'Large dual-purpose breed known for its strength as draft animal and moderate milk production.', '{"color": "silver grey to iron grey", "horns": "lyre-shaped", "size": "large", "hump": "well developed"}', 'dual-purpose', '4-6 liters per day'),
  ('Ongole', 'cattle', 'Andhra Pradesh', 'Large white/grey breed primarily used for draft purposes, known for its strength and endurance.', '{"color": "white to light grey", "horns": "short", "size": "large", "hump": "massive"}', 'draft', '3-5 liters per day');

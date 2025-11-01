import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Breed {
  id: string;
  name: string;
  type: 'cattle' | 'buffalo';
  origin_state: string | null;
  description: string | null;
  characteristics: Record<string, string>;
  primary_use: 'dairy' | 'draft' | 'dual-purpose' | null;
  average_milk_yield: string | null;
  image_url: string | null;
  created_at: string;
}

export interface RecognitionHistory {
  id: string;
  breed_id: string | null;
  confidence_score: number | null;
  image_data: string | null;
  recognition_date: string;
  metadata: Record<string, any>;
  user_id: string | null;
}

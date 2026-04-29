
-- Create news table for admin-managed news
CREATE TABLE IF NOT EXISTS public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT,
  image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  view_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0
);

-- Add RLS policies for news
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published news
CREATE POLICY "Anyone can view published news" 
  ON public.news 
  FOR SELECT 
  USING (is_published = true);

-- Only authenticated users (admins) can manage news
CREATE POLICY "Authenticated users can manage news" 
  ON public.news 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Update job_applications table to include more detailed information
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Chennai, Tamil Nadu',
ADD COLUMN IF NOT EXISTS job_description TEXT,
ADD COLUMN IF NOT EXISTS requirements TEXT[],
ADD COLUMN IF NOT EXISTS experience_required TEXT,
ADD COLUMN IF NOT EXISTS salary_range TEXT,
ADD COLUMN IF NOT EXISTS job_type TEXT,
ADD COLUMN IF NOT EXISTS deadline DATE,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create job_postings table for admin-managed job listings
CREATE TABLE IF NOT EXISTS public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT DEFAULT 'Chennai, Tamil Nadu',
  job_type TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  responsibilities TEXT[],
  benefits TEXT[],
  salary_range TEXT,
  deadline DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  application_count INTEGER DEFAULT 0
);

-- Add RLS policies for job_postings
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active job postings
CREATE POLICY "Anyone can view active job postings" 
  ON public.job_postings 
  FOR SELECT 
  USING (is_active = true);

-- Only authenticated users (admins) can manage job postings
CREATE POLICY "Authenticated users can manage job postings" 
  ON public.job_postings 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at for news
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update updated_at for job_postings
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

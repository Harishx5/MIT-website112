-- Create internship postings table
CREATE TABLE public.internship_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT DEFAULT 'Chennai, Tamil Nadu',
  duration TEXT NOT NULL,
  stipend_range TEXT,
  experience_level TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[],
  learning_outcomes TEXT[],
  is_active BOOLEAN DEFAULT true,
  deadline DATE,
  application_count INTEGER DEFAULT 0,
  vacancy_count INTEGER DEFAULT 1
);

-- Create internship applications table
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  internship_posting_id UUID REFERENCES public.internship_postings(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  applied_position TEXT NOT NULL,
  college_name TEXT,
  degree TEXT,
  year_of_study TEXT,
  cgpa TEXT,
  skills TEXT[],
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  availability_start DATE,
  availability_end DATE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'shortlisted', 'rejected')),
  admin_notes TEXT
);

-- Enable RLS on both tables
ALTER TABLE public.internship_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for internship postings
CREATE POLICY "Anyone can view active internship postings" 
ON public.internship_postings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage internship postings" 
ON public.internship_postings 
FOR ALL 
USING (auth.role() = 'authenticated');

-- RLS policies for internship applications
CREATE POLICY "Anyone can submit internship applications" 
ON public.internship_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage internship applications" 
ON public.internship_applications 
FOR ALL 
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com', 'Harishkanna068@gmail.com']));

-- Create function to update internship posting application count
CREATE OR REPLACE FUNCTION public.update_internship_posting_application_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  posting_id UUID;
BEGIN
  -- Handle different trigger operations
  IF TG_OP = 'DELETE' THEN
    posting_id := OLD.internship_posting_id;
  ELSE
    posting_id := NEW.internship_posting_id;
  END IF;
  
  -- Update application count for the internship posting
  IF posting_id IS NOT NULL THEN
    UPDATE public.internship_postings 
    SET application_count = (
      SELECT COUNT(*) 
      FROM public.internship_applications 
      WHERE internship_posting_id = posting_id
    )
    WHERE id = posting_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for updating internship application counts
CREATE TRIGGER update_internship_application_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.internship_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_internship_posting_application_count();

-- Create trigger for updating timestamps
CREATE TRIGGER update_internship_postings_updated_at
  BEFORE UPDATE ON public.internship_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_internship_applications_updated_at
  BEFORE UPDATE ON public.internship_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create admin notification trigger for internship applications
CREATE TRIGGER create_internship_application_notification
  AFTER INSERT ON public.internship_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.create_admin_notification();
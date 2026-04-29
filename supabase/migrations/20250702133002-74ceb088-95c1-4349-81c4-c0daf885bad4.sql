
-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  applied_position TEXT NOT NULL,
  role_type TEXT NOT NULL CHECK (role_type IN ('Full-time', 'Intern', 'Other')),
  custom_role TEXT,
  experience_level TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'shortlisted', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to submit applications
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

-- Policy for admins to manage applications
CREATE POLICY "Admins can manage job applications" 
ON public.job_applications 
FOR ALL 
USING (auth.email() = 'gowthamj0055@gmail.com');

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', false);

-- Storage policies for resume uploads
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Admins can view all resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-applications' AND auth.email() = 'gowthamj0055@gmail.com');

-- Update trigger for job applications
CREATE OR REPLACE FUNCTION public.update_job_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_job_applications_updated_at();

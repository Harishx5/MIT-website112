-- First, let's add a job_posting_id field to job_applications for proper linking
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS job_posting_id UUID REFERENCES public.job_postings(id);

-- Create function to update job posting application count
CREATE OR REPLACE FUNCTION public.update_job_posting_application_count()
RETURNS TRIGGER AS $$
DECLARE
  posting_id UUID;
BEGIN
  -- Handle different trigger operations
  IF TG_OP = 'DELETE' THEN
    posting_id := OLD.job_posting_id;
  ELSE
    posting_id := NEW.job_posting_id;
  END IF;
  
  -- Update application count for the job posting
  IF posting_id IS NOT NULL THEN
    UPDATE public.job_postings 
    SET application_count = (
      SELECT COUNT(*) 
      FROM public.job_applications 
      WHERE job_posting_id = posting_id
    )
    WHERE id = posting_id;
  END IF;
  
  -- Also try to match by job title if no direct posting_id
  IF posting_id IS NULL AND TG_OP != 'DELETE' THEN
    UPDATE public.job_postings 
    SET application_count = (
      SELECT COUNT(*) 
      FROM public.job_applications 
      WHERE applied_position = job_postings.title
    )
    WHERE title = NEW.applied_position;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for job applications
CREATE TRIGGER update_application_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_job_posting_application_count();

-- Update existing application counts by matching job titles
UPDATE public.job_postings 
SET application_count = (
  SELECT COUNT(*) 
  FROM public.job_applications 
  WHERE applied_position = job_postings.title
);
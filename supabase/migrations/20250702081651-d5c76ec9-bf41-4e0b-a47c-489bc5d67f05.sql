
-- Fix the contact_submissions status constraint to allow 'finished' and 'unfinished' values
ALTER TABLE public.contact_submissions 
DROP CONSTRAINT IF EXISTS contact_submissions_status_check;

ALTER TABLE public.contact_submissions 
ADD CONSTRAINT contact_submissions_status_check 
CHECK (status = ANY (ARRAY['new'::text, 'finished'::text, 'unfinished'::text]));

-- Fix the project_inquiries status constraint to allow 'finished' and 'unfinished' values  
ALTER TABLE public.project_inquiries 
DROP CONSTRAINT IF EXISTS project_inquiries_status_check;

ALTER TABLE public.project_inquiries 
ADD CONSTRAINT project_inquiries_status_check 
CHECK (status = ANY (ARRAY['new'::text, 'finished'::text, 'unfinished'::text]));

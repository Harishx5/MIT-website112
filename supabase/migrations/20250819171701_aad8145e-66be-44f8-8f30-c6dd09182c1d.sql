-- Add github_url field to job_applications table
ALTER TABLE public.job_applications 
ADD COLUMN github_url text;
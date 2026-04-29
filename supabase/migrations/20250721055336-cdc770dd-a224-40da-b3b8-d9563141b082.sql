
-- Add project_overview column to case_studies table
ALTER TABLE public.case_studies 
ADD COLUMN project_overview text;

-- Update existing records to use challenge_description as project_overview if it exists
UPDATE public.case_studies 
SET project_overview = challenge_description 
WHERE challenge_description IS NOT NULL AND project_overview IS NULL;

-- First, let's see what the current check constraint looks like
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'public.services'::regclass 
AND contype = 'c';

-- Remove the existing check constraint that's too restrictive
ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_category_check;

-- Add a more flexible constraint that allows NULL values and any non-empty string
ALTER TABLE public.services ADD CONSTRAINT services_category_check 
CHECK (category IS NULL OR length(trim(category)) > 0);
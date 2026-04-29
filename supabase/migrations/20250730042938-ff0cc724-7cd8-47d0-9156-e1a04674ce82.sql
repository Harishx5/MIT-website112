-- Add priority column to support_inquiries table
ALTER TABLE public.support_inquiries 
ADD COLUMN priority text NOT NULL DEFAULT 'medium';

-- Add a check constraint to ensure valid priority values
ALTER TABLE public.support_inquiries 
ADD CONSTRAINT check_priority_values 
CHECK (priority IN ('low', 'medium', 'high'));
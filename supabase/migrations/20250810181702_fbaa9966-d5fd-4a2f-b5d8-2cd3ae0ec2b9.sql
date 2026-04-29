-- Drop existing RLS policies on services table
DROP POLICY IF EXISTS "Active services are viewable by everyone" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

-- Create comprehensive RLS policies for services
CREATE POLICY "Public can view active services" 
ON public.services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all services" 
ON public.services 
FOR SELECT 
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Admins can insert services" 
ON public.services 
FOR INSERT 
WITH CHECK (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Admins can update services" 
ON public.services 
FOR UPDATE 
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Admins can delete services" 
ON public.services 
FOR DELETE 
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

-- Ensure RLS is enabled on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
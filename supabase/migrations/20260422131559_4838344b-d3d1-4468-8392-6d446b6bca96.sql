
-- 1. intern_certificates
CREATE TABLE IF NOT EXISTS public.intern_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_code text UNIQUE NOT NULL,
  intern_name text NOT NULL,
  email text,
  phone text,
  college text,
  degree text,
  internship_program text NOT NULL,
  project_title text,
  project_description text,
  technologies text[] DEFAULT '{}',
  mentor text,
  start_date date,
  end_date date,
  duration text,
  performance_grade text,
  certificate_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.intern_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active certificates are viewable by everyone"
  ON public.intern_certificates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage intern certificates"
  ON public.intern_certificates FOR ALL
  TO authenticated
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text, 'info@marzelet.info'::text]))
  WITH CHECK (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text, 'info@marzelet.info'::text]));

CREATE TRIGGER update_intern_certificates_updated_at
  BEFORE UPDATE ON public.intern_certificates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. trusted_companies
CREATE TABLE IF NOT EXISTS public.trusted_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trusted_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active companies are viewable by everyone"
  ON public.trusted_companies FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage trusted companies"
  ON public.trusted_companies FOR ALL
  TO authenticated
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text, 'info@marzelet.info'::text]))
  WITH CHECK (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text, 'info@marzelet.info'::text]));

CREATE TRIGGER update_trusted_companies_updated_at
  BEFORE UPDATE ON public.trusted_companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. extend trusted_partners
ALTER TABLE public.trusted_partners
  ADD COLUMN IF NOT EXISTS hero_image_url text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS employees text,
  ADD COLUMN IF NOT EXISTS founded text;

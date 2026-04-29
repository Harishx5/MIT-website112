ALTER TABLE public.trusted_partners
  ADD COLUMN IF NOT EXISTS hero_image_urls text[] NOT NULL DEFAULT '{}'::text[];
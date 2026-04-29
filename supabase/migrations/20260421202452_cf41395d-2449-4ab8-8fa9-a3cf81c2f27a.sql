ALTER TABLE public.trusted_partners
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS partner_since text,
  ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS achievements text;
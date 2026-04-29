-- Remove duplicates keeping the earliest created row per name
DELETE FROM public.trusted_companies a
USING public.trusted_companies b
WHERE a.ctid < b.ctid
  AND lower(a.name) = lower(b.name);

-- Enforce uniqueness on company name (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS trusted_companies_name_unique_idx
  ON public.trusted_companies (lower(name));
-- Remove duplicate trigger
DROP TRIGGER IF EXISTS ensure_unique_slug_trigger ON public.services;

-- Check if ensure_services_unique_slug trigger exists and drop if needed to recreate
DROP TRIGGER IF EXISTS ensure_services_unique_slug ON public.services;

-- Recreate the trigger with proper naming
CREATE TRIGGER ensure_services_unique_slug 
BEFORE INSERT OR UPDATE ON public.services 
FOR EACH ROW EXECUTE FUNCTION ensure_unique_slug();
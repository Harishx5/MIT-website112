-- Fix the ensure_unique_slug function to properly handle services table
CREATE OR REPLACE FUNCTION public.ensure_unique_slug()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 1;
  table_check_query text;
BEGIN
  -- Generate base slug from title or name depending on the table
  IF TG_TABLE_NAME = 'services' THEN
    base_slug := generate_slug(NEW.name);
  ELSE
    base_slug := generate_slug(NEW.title);
  END IF;
  
  final_slug := base_slug;
  
  -- Check if we're updating the same record
  IF TG_OP = 'UPDATE' AND OLD.id = NEW.id THEN
    -- If title/name hasn't changed, keep the existing slug
    IF (TG_TABLE_NAME = 'services' AND OLD.name = NEW.name) OR 
       (TG_TABLE_NAME != 'services' AND OLD.title = NEW.title) THEN
      NEW.slug := OLD.slug;
      RETURN NEW;
    END IF;
  END IF;
  
  -- Ensure slug is unique within the same table only
  IF TG_TABLE_NAME = 'services' THEN
    WHILE EXISTS (
      SELECT 1 FROM public.services 
      WHERE slug = final_slug 
      AND (TG_OP = 'INSERT' OR id != NEW.id)
    ) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
  ELSIF TG_TABLE_NAME = 'blogs' THEN
    WHILE EXISTS (
      SELECT 1 FROM public.blogs 
      WHERE slug = final_slug 
      AND (TG_OP = 'INSERT' OR id != NEW.id)
    ) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
  END IF;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$function$;

-- Create trigger for services if it doesn't exist
DROP TRIGGER IF EXISTS ensure_unique_slug_trigger ON public.services;
CREATE TRIGGER ensure_unique_slug_trigger
    BEFORE INSERT OR UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.ensure_unique_slug();
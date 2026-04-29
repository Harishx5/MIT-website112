-- Create service-images bucket if it doesn't exist
DO $$
BEGIN
  -- Create service-images bucket if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'service-images') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('service-images', 'service-images', true);
  END IF;
END $$;
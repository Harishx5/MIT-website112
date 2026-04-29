-- Check if service-images bucket exists and create it if needed
DO $$
BEGIN
  -- Create service-images bucket if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'service-images') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('service-images', 'service-images', true);
  END IF;
END $$;

-- Create RLS policies for service-images bucket
-- Allow public to view service images
INSERT INTO storage.policies (name, bucket_id, operation, roles, expression)
VALUES (
  'Service images are publicly accessible',
  'service-images',
  'SELECT',
  '{}',
  'true'
) ON CONFLICT (name, bucket_id) DO NOTHING;

-- Allow admins to upload service images
INSERT INTO storage.policies (name, bucket_id, operation, roles, expression)
VALUES (
  'Admins can upload service images',
  'service-images',
  'INSERT',
  '{}',
  'auth.email() = ANY (ARRAY[''gowthamj0055@gmail.com'', ''marzeletinfotechnology@gmail.com''])'
) ON CONFLICT (name, bucket_id) DO NOTHING;

-- Allow admins to update service images
INSERT INTO storage.policies (name, bucket_id, operation, roles, expression)
VALUES (
  'Admins can update service images',
  'service-images',
  'UPDATE',
  '{}',
  'auth.email() = ANY (ARRAY[''gowthamj0055@gmail.com'', ''marzeletinfotechnology@gmail.com''])'
) ON CONFLICT (name, bucket_id) DO NOTHING;

-- Allow admins to delete service images
INSERT INTO storage.policies (name, bucket_id, operation, roles, expression)
VALUES (
  'Admins can delete service images',
  'service-images',
  'DELETE',
  '{}',
  'auth.email() = ANY (ARRAY[''gowthamj0055@gmail.com'', ''marzeletinfotechnology@gmail.com''])'
) ON CONFLICT (name, bucket_id) DO NOTHING;
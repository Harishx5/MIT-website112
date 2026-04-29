-- Create service-images bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for service images
CREATE POLICY "Service images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'service-images' 
  AND auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com')
);

CREATE POLICY "Admins can update service images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'service-images' 
  AND auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com')
);

CREATE POLICY "Admins can delete service images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'service-images' 
  AND auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com')
);
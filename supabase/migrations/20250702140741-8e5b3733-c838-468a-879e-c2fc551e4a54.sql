
-- Make the job-applications storage bucket public for easier access
UPDATE storage.buckets 
SET public = true 
WHERE id = 'job-applications';

-- Create policy for public access to resumes (read-only)
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-applications');

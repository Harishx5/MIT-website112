
-- Remove the existing check constraint that's causing the issue
ALTER TABLE job_postings DROP CONSTRAINT IF EXISTS job_postings_job_type_check;

-- Add a more flexible check constraint for job_type
ALTER TABLE job_postings ADD CONSTRAINT job_postings_job_type_check 
CHECK (job_type IN ('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid', 'On-site'));

-- Also add check constraint for experience_level to prevent similar issues
ALTER TABLE job_postings DROP CONSTRAINT IF EXISTS job_postings_experience_level_check;
ALTER TABLE job_postings ADD CONSTRAINT job_postings_experience_level_check 
CHECK (experience_level IN ('Entry Level', 'Mid Level', 'Senior Level', 'Executive', 'Intern', 'Associate', 'Lead'));

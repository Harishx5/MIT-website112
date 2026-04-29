
-- Add vacancy_count column to job_postings table
ALTER TABLE job_postings 
ADD COLUMN vacancy_count INTEGER DEFAULT 1;

-- Add comment to describe the column
COMMENT ON COLUMN job_postings.vacancy_count IS 'Number of positions available for this job posting';

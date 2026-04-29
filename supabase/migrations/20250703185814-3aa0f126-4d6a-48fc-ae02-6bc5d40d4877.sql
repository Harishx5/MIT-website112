
-- Fix the job_postings table by making requirements column nullable
ALTER TABLE job_postings ALTER COLUMN requirements DROP NOT NULL;
ALTER TABLE job_postings ALTER COLUMN requirements SET DEFAULT '{}';

-- Add application_limit column to job_postings table
ALTER TABLE job_postings ADD COLUMN application_limit INTEGER;

-- Add multiple_choice_questions column to job_postings table
ALTER TABLE job_postings ADD COLUMN multiple_choice_questions JSONB DEFAULT '[]';

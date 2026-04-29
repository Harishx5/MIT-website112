
-- Create a function to automatically remove breaking news status after 24 hours
CREATE OR REPLACE FUNCTION remove_expired_breaking_news()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.news 
  SET is_breaking = false 
  WHERE is_breaking = true 
    AND created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Schedule the function to run every hour using pg_cron
SELECT cron.schedule(
  'remove-expired-breaking-news',
  '0 * * * *', -- Run every hour at minute 0
  $$
  SELECT remove_expired_breaking_news();
  $$
);

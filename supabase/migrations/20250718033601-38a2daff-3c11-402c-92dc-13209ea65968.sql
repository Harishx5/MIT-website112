
-- Add is_breaking column to news table for 24-hour breaking news feature
ALTER TABLE public.news ADD COLUMN is_breaking boolean DEFAULT false;

-- Add created_at column to news table if it doesn't exist (for breaking news expiry)
-- This column already exists, so we'll skip this

-- Create function to automatically remove breaking news status after 24 hours
CREATE OR REPLACE FUNCTION public.remove_expired_breaking_news()
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

-- Create trigger function for profile updates tracking
CREATE OR REPLACE FUNCTION public.track_profile_updates()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only log if there are actual changes
  IF OLD IS DISTINCT FROM NEW THEN
    INSERT INTO public.user_activity_logs (
      user_id, 
      activity_type, 
      description, 
      metadata
    )
    VALUES (
      NEW.id,
      'profile_update',
      'User updated their profile',
      json_build_object(
        'updated_fields', 
        json_build_object(
          'first_name', NEW.first_name,
          'last_name', NEW.last_name,
          'username', NEW.username
        )
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON public.profiles;
CREATE TRIGGER on_profile_update
  AFTER UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.track_profile_updates();

-- Create cron job to automatically remove expired breaking news (runs every hour)
SELECT cron.schedule(
  'remove-expired-breaking-news',
  '0 * * * *', -- every hour at minute 0
  $$
  SELECT public.remove_expired_breaking_news();
  $$
);

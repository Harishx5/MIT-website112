
-- Backfill missing user profiles from auth.users to profiles table
-- This will sync all existing auth users with the profiles table
INSERT INTO public.profiles (id, email, username, first_name, last_name)
SELECT 
  au.id,
  au.email,
  au.raw_user_meta_data ->> 'username' as username,
  au.raw_user_meta_data ->> 'first_name' as first_name,
  au.raw_user_meta_data ->> 'last_name' as last_name
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Enable realtime for profiles table to support real-time updates
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.profiles;

-- Enable realtime for user_sessions table
ALTER TABLE public.user_sessions REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.user_sessions;

-- Enable realtime for user_activity_logs table
ALTER TABLE public.user_activity_logs REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.user_activity_logs;

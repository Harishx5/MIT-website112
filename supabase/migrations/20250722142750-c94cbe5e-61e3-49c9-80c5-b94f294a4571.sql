
-- Create a function that allows admins to view all auth users
-- This uses security definer to bypass RLS for admin users
CREATE OR REPLACE FUNCTION public.get_all_auth_users()
RETURNS TABLE (
  id uuid,
  email text,
  email_confirmed_at timestamptz,
  last_sign_in_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  raw_user_meta_data jsonb,
  user_metadata jsonb
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com')) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.email_confirmed_at,
    u.last_sign_in_at,
    u.created_at,
    u.updated_at,
    u.raw_user_meta_data,
    u.user_metadata
  FROM auth.users u
  ORDER BY u.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_all_auth_users() TO authenticated;

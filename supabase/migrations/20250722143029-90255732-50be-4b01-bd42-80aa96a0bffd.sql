
-- Update the function to only select existing columns from auth.users
CREATE OR REPLACE FUNCTION public.get_all_auth_users()
RETURNS TABLE (
  id uuid,
  email text,
  email_confirmed_at timestamptz,
  last_sign_in_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  raw_user_meta_data jsonb
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
    u.raw_user_meta_data
  FROM auth.users u
  ORDER BY u.created_at DESC;
END;
$$;

DO $$
DECLARE
  r RECORD;
  new_admins TEXT := 'ARRAY[''gowthamj0055@gmail.com''::text, ''marzeletinfotechnology@gmail.com''::text, ''Harishkanna068@gmail.com''::text, ''info@marzelet.info''::text]';
  new_qual TEXT;
  new_check TEXT;
  pol_cmd TEXT;
  exec_sql TEXT;
BEGIN
  FOR r IN
    SELECT p.schemaname, p.tablename, p.policyname, p.cmd AS pcmd, p.qual, p.with_check, p.roles, p.permissive
    FROM pg_policies p
    WHERE p.schemaname = 'public'
      AND (p.qual LIKE '%gowthamj0055@gmail.com%' OR p.with_check LIKE '%gowthamj0055@gmail.com%')
  LOOP
    new_qual := r.qual;
    new_check := r.with_check;
    IF new_qual IS NOT NULL THEN
      new_qual := regexp_replace(new_qual, 'ARRAY\[''gowthamj0055@gmail\.com''::text, ''marzeletinfotechnology@gmail\.com''::text, ''Harishkanna068@gmail\.com''::text\]', new_admins, 'g');
    END IF;
    IF new_check IS NOT NULL THEN
      new_check := regexp_replace(new_check, 'ARRAY\[''gowthamj0055@gmail\.com''::text, ''marzeletinfotechnology@gmail\.com''::text, ''Harishkanna068@gmail\.com''::text\]', new_admins, 'g');
    END IF;

    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);

    pol_cmd := r.pcmd;
    exec_sql := format('CREATE POLICY %I ON %I.%I AS %s FOR %s TO %s',
      r.policyname, r.schemaname, r.tablename,
      CASE WHEN r.permissive = 'PERMISSIVE' THEN 'PERMISSIVE' ELSE 'RESTRICTIVE' END,
      pol_cmd,
      array_to_string(r.roles, ', '));
    IF new_qual IS NOT NULL THEN
      exec_sql := exec_sql || format(' USING (%s)', new_qual);
    END IF;
    IF new_check IS NOT NULL THEN
      exec_sql := exec_sql || format(' WITH CHECK (%s)', new_check);
    END IF;
    EXECUTE exec_sql;
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.get_all_users_with_activity()
 RETURNS TABLE(id uuid, email text, email_confirmed_at timestamp with time zone, last_sign_in_at timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, raw_user_meta_data jsonb, phone text, confirmation_token text, email_confirmed boolean, invited_at timestamp with time zone, confirmation_sent_at timestamp with time zone, recovery_token text, recovery_sent_at timestamp with time zone, email_change_token_new text, email_change text, email_change_sent_at timestamp with time zone, raw_app_meta_data jsonb, is_super_admin boolean, role text, total_sessions bigint, active_sessions bigint, total_activities bigint, last_activity timestamp with time zone)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'auth', 'extensions'
AS $function$
BEGIN
  IF NOT (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com', 'Harishkanna068@gmail.com', 'info@marzelet.info')) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required. Current user: %', auth.email();
  END IF;
  RETURN QUERY
  SELECT u.id, u.email::text, u.email_confirmed_at, u.last_sign_in_at, u.created_at, u.updated_at, u.raw_user_meta_data, u.phone::text, u.confirmation_token::text,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END, u.invited_at, u.confirmation_sent_at, u.recovery_token::text, u.recovery_sent_at, u.email_change_token_new::text, u.email_change::text, u.email_change_sent_at, u.raw_app_meta_data,
    COALESCE((u.raw_app_meta_data ->> 'is_super_admin')::boolean, false), COALESCE(u.raw_app_meta_data ->> 'role', 'user')::text,
    COALESCE(sd.total_sessions, 0)::bigint, COALESCE(sd.active_sessions, 0)::bigint, COALESCE(ad.total_activities, 0)::bigint,
    GREATEST(COALESCE(sd.session_last_activity, '1970-01-01'::timestamptz), COALESCE(ad.activity_last_activity, '1970-01-01'::timestamptz))
  FROM auth.users u
  LEFT JOIN (SELECT user_id, COUNT(*) as total_sessions, COUNT(*) FILTER (WHERE is_active = true) as active_sessions, MAX(last_activity) as session_last_activity FROM public.user_sessions GROUP BY user_id) sd ON u.id = sd.user_id
  LEFT JOIN (SELECT user_id, COUNT(*) as total_activities, MAX(created_at) as activity_last_activity FROM public.user_activity_logs GROUP BY user_id) ad ON u.id = ad.user_id
  ORDER BY u.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_all_auth_users()
 RETURNS TABLE(id uuid, email text, email_confirmed_at timestamp with time zone, last_sign_in_at timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, raw_user_meta_data jsonb, phone text, confirmation_token text, email_confirmed boolean, invited_at timestamp with time zone, confirmation_sent_at timestamp with time zone, recovery_token text, recovery_sent_at timestamp with time zone, email_change_token_new text, email_change text, email_change_sent_at timestamp with time zone, raw_app_meta_data jsonb, is_super_admin boolean, role text)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'auth', 'extensions'
AS $function$
BEGIN
  IF NOT (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com', 'Harishkanna068@gmail.com', 'info@marzelet.info')) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required. Current user: %', auth.email();
  END IF;
  RETURN QUERY
  SELECT u.id, u.email::text, u.email_confirmed_at, u.last_sign_in_at, u.created_at, u.updated_at, u.raw_user_meta_data, u.phone::text, u.confirmation_token::text,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END, u.invited_at, u.confirmation_sent_at, u.recovery_token::text, u.recovery_sent_at, u.email_change_token_new::text, u.email_change::text, u.email_change_sent_at, u.raw_app_meta_data,
    COALESCE((u.raw_app_meta_data ->> 'is_super_admin')::boolean, false), COALESCE(u.raw_app_meta_data ->> 'role', 'user')::text
  FROM auth.users u ORDER BY u.created_at DESC;
END;
$function$;
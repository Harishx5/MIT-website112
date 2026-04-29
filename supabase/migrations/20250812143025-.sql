-- Update all RLS policies to include new admin email
-- This updates all existing admin policies to include Harishkanna068@gmail.com

-- Update testimonials policies
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update email_templates policies
DROP POLICY IF EXISTS "Admins can manage email templates" ON public.email_templates;
CREATE POLICY "Admins can manage email templates" ON public.email_templates
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update faqs policies
DROP POLICY IF EXISTS "Admins can manage FAQs" ON public.faqs;
CREATE POLICY "Admins can manage FAQs" ON public.faqs
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update services policies
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;
DROP POLICY IF EXISTS "Admins can view all services" ON public.services;

CREATE POLICY "Admins can delete services" ON public.services
FOR DELETE TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can insert services" ON public.services
FOR INSERT TO authenticated
WITH CHECK (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can update services" ON public.services
FOR UPDATE TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all services" ON public.services
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update support_ticket_replies policies
DROP POLICY IF EXISTS "Admins can manage all ticket replies" ON public.support_ticket_replies;
CREATE POLICY "Admins can manage all ticket replies" ON public.support_ticket_replies
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update contact_submissions policies
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can manage contact submissions" ON public.contact_submissions
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update admin_portfolio_projects policies
DROP POLICY IF EXISTS "Admins can manage admin portfolio projects" ON public.admin_portfolio_projects;
CREATE POLICY "Admins can manage admin portfolio projects" ON public.admin_portfolio_projects
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update support_inquiries policies
DROP POLICY IF EXISTS "Admins can manage support inquiries" ON public.support_inquiries;
CREATE POLICY "Admins can manage support inquiries" ON public.support_inquiries
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update case_studies policies
DROP POLICY IF EXISTS "Admins can manage case studies" ON public.case_studies;
CREATE POLICY "Admins can manage case studies" ON public.case_studies
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update reviews policies
DROP POLICY IF EXISTS "Admins can delete any review" ON public.reviews;
CREATE POLICY "Admins can delete any review" ON public.reviews
FOR DELETE TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update portfolio_projects policies
DROP POLICY IF EXISTS "Admins can manage portfolio projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can view all portfolio projects" ON public.portfolio_projects;

CREATE POLICY "Admins can manage portfolio projects" ON public.portfolio_projects
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all portfolio projects" ON public.portfolio_projects
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update portfolio_categories policies
DROP POLICY IF EXISTS "Admins can manage portfolio categories" ON public.portfolio_categories;
CREATE POLICY "Admins can manage portfolio categories" ON public.portfolio_categories
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update user_activity_logs policies
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.user_activity_logs;
CREATE POLICY "Admins can view all activity logs" ON public.user_activity_logs
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update job_applications policies
DROP POLICY IF EXISTS "Admins can manage job applications" ON public.job_applications;
CREATE POLICY "Admins can manage job applications" ON public.job_applications
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update analytics_events policies
DROP POLICY IF EXISTS "Admins can view analytics events" ON public.analytics_events;
CREATE POLICY "Admins can view analytics events" ON public.analytics_events
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update newsletter_subscriptions policies
DROP POLICY IF EXISTS "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Admins can view all newsletter subscriptions" ON public.newsletter_subscriptions;

CREATE POLICY "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all newsletter subscriptions" ON public.newsletter_subscriptions
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update blogs policies
DROP POLICY IF EXISTS "Admins can manage blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;

CREATE POLICY "Admins can manage blogs" ON public.blogs
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all blogs" ON public.blogs
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update blog_comments policies
DROP POLICY IF EXISTS "Admins can manage all comments" ON public.blog_comments;
CREATE POLICY "Admins can manage all comments" ON public.blog_comments
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update team_members policies
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;
CREATE POLICY "Admins can manage team members" ON public.team_members
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update news_views policies
DROP POLICY IF EXISTS "Admins can view all news views" ON public.news_views;
CREATE POLICY "Admins can view all news views" ON public.news_views
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update user_sessions policies
DROP POLICY IF EXISTS "Admins can view all sessions" ON public.user_sessions;
CREATE POLICY "Admins can view all sessions" ON public.user_sessions
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update admin_notifications policies
DROP POLICY IF EXISTS "Admins can delete notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can view notifications" ON public.admin_notifications;

CREATE POLICY "Admins can delete notifications" ON public.admin_notifications
FOR DELETE TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can update notifications" ON public.admin_notifications
FOR UPDATE TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view notifications" ON public.admin_notifications
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update project_inquiries policies
DROP POLICY IF EXISTS "Admins can manage project inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "Admins can view all project inquiries" ON public.project_inquiries;

CREATE POLICY "Admins can manage project inquiries" ON public.project_inquiries
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

CREATE POLICY "Admins can view all project inquiries" ON public.project_inquiries
FOR SELECT TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update trusted_partners policies
DROP POLICY IF EXISTS "Admins can manage trusted partners" ON public.trusted_partners;
CREATE POLICY "Admins can manage trusted partners" ON public.trusted_partners
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update news_comments policies
DROP POLICY IF EXISTS "Admins can manage all comments" ON public.news_comments;
CREATE POLICY "Admins can manage all comments" ON public.news_comments
FOR ALL TO authenticated
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text, 'Harishkanna068@gmail.com'::text]));

-- Update database functions to include new admin email
CREATE OR REPLACE FUNCTION public.get_all_users_with_activity()
 RETURNS TABLE(id uuid, email text, email_confirmed_at timestamp with time zone, last_sign_in_at timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, raw_user_meta_data jsonb, phone text, confirmation_token text, email_confirmed boolean, invited_at timestamp with time zone, confirmation_sent_at timestamp with time zone, recovery_token text, recovery_sent_at timestamp with time zone, email_change_token_new text, email_change text, email_change_sent_at timestamp with time zone, raw_app_meta_data jsonb, is_super_admin boolean, role text, total_sessions bigint, active_sessions bigint, total_activities bigint, last_activity timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth', 'extensions'
AS $function$
BEGIN
  -- Only allow specific admin emails to call this function
  IF NOT (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com', 'Harishkanna068@gmail.com')) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required. Current user: %', auth.email();
  END IF;
  
  -- Return all user data with session and activity summaries
  RETURN QUERY
  SELECT 
    u.id,
    u.email::text,
    u.email_confirmed_at,
    u.last_sign_in_at,
    u.created_at,
    u.updated_at,
    u.raw_user_meta_data,
    u.phone::text,
    u.confirmation_token::text,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END as email_confirmed,
    u.invited_at,
    u.confirmation_sent_at,
    u.recovery_token::text,
    u.recovery_sent_at,
    u.email_change_token_new::text,
    u.email_change::text,
    u.email_change_sent_at,
    u.raw_app_meta_data,
    COALESCE((u.raw_app_meta_data ->> 'is_super_admin')::boolean, false) as is_super_admin,
    COALESCE(u.raw_app_meta_data ->> 'role', 'user')::text as role,
    COALESCE(session_data.total_sessions, 0)::bigint as total_sessions,
    COALESCE(session_data.active_sessions, 0)::bigint as active_sessions,
    COALESCE(activity_data.total_activities, 0)::bigint as total_activities,
    GREATEST(
      COALESCE(session_data.session_last_activity, '1970-01-01'::timestamptz), 
      COALESCE(activity_data.activity_last_activity, '1970-01-01'::timestamptz)
    ) as last_activity
  FROM auth.users u
  LEFT JOIN (
    SELECT 
      user_id,
      COUNT(*) as total_sessions,
      COUNT(*) FILTER (WHERE is_active = true) as active_sessions,
      MAX(last_activity) as session_last_activity
    FROM public.user_sessions
    GROUP BY user_id
  ) session_data ON u.id = session_data.user_id
  LEFT JOIN (
    SELECT 
      user_id,
      COUNT(*) as total_activities,
      MAX(created_at) as activity_last_activity
    FROM public.user_activity_logs
    GROUP BY user_id
  ) activity_data ON u.id = activity_data.user_id
  ORDER BY u.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_all_auth_users()
 RETURNS TABLE(id uuid, email text, email_confirmed_at timestamp with time zone, last_sign_in_at timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, raw_user_meta_data jsonb, phone text, confirmation_token text, email_confirmed boolean, invited_at timestamp with time zone, confirmation_sent_at timestamp with time zone, recovery_token text, recovery_sent_at timestamp with time zone, email_change_token_new text, email_change text, email_change_sent_at timestamp with time zone, raw_app_meta_data jsonb, is_super_admin boolean, role text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth', 'extensions'
AS $function$
BEGIN
  -- Only allow specific admin emails to call this function
  IF NOT (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com', 'Harishkanna068@gmail.com')) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required. Current user: %', auth.email();
  END IF;
  
  -- Return all user data from auth.users with proper type casting
  RETURN QUERY
  SELECT 
    u.id,
    u.email::text,
    u.email_confirmed_at,
    u.last_sign_in_at,
    u.created_at,
    u.updated_at,
    u.raw_user_meta_data,
    u.phone::text,
    u.confirmation_token::text,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END as email_confirmed,
    u.invited_at,
    u.confirmation_sent_at,
    u.recovery_token::text,
    u.recovery_sent_at,
    u.email_change_token_new::text,
    u.email_change::text,
    u.email_change_sent_at,
    u.raw_app_meta_data,
    COALESCE((u.raw_app_meta_data ->> 'is_super_admin')::boolean, false) as is_super_admin,
    COALESCE(u.raw_app_meta_data ->> 'role', 'user')::text as role
  FROM auth.users u
  ORDER BY u.created_at DESC;
END;
$function$;
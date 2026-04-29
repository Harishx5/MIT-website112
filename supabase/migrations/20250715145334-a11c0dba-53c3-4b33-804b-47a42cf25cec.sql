-- Update all RLS policies to include the new admin email
-- This will allow both gowthamj0055@gmail.com and marzeletinfotechnology@gmail.com to access admin features

-- Update admin_notifications policies
DROP POLICY IF EXISTS "Admins can delete notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can view notifications" ON public.admin_notifications;

CREATE POLICY "Admins can delete notifications" ON public.admin_notifications
FOR DELETE USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can update notifications" ON public.admin_notifications
FOR UPDATE USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view notifications" ON public.admin_notifications
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update admin_portfolio_projects policies
DROP POLICY IF EXISTS "Admins can manage admin portfolio projects" ON public.admin_portfolio_projects;

CREATE POLICY "Admins can manage admin portfolio projects" ON public.admin_portfolio_projects
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update analytics_events policies
DROP POLICY IF EXISTS "Admins can view analytics events" ON public.analytics_events;

CREATE POLICY "Admins can view analytics events" ON public.analytics_events
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update blog_comments policies
DROP POLICY IF EXISTS "Admins can manage all comments" ON public.blog_comments;

CREATE POLICY "Admins can manage all comments" ON public.blog_comments
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update blogs policies
DROP POLICY IF EXISTS "Admins can manage blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;

CREATE POLICY "Admins can manage blogs" ON public.blogs
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view all blogs" ON public.blogs
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update contact_submissions policies
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can manage contact submissions" ON public.contact_submissions
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update email_templates policies
DROP POLICY IF EXISTS "Admins can manage email templates" ON public.email_templates;

CREATE POLICY "Admins can manage email templates" ON public.email_templates
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update faqs policies
DROP POLICY IF EXISTS "Admins can manage FAQs" ON public.faqs;

CREATE POLICY "Admins can manage FAQs" ON public.faqs
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update job_applications policies
DROP POLICY IF EXISTS "Admins can manage job applications" ON public.job_applications;

CREATE POLICY "Admins can manage job applications" ON public.job_applications
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update newsletter_subscriptions policies
DROP POLICY IF EXISTS "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Admins can view all newsletter subscriptions" ON public.newsletter_subscriptions;

CREATE POLICY "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view all newsletter subscriptions" ON public.newsletter_subscriptions
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update portfolio_categories policies
DROP POLICY IF EXISTS "Admins can manage portfolio categories" ON public.portfolio_categories;

CREATE POLICY "Admins can manage portfolio categories" ON public.portfolio_categories
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update portfolio_projects policies
DROP POLICY IF EXISTS "Admins can manage all portfolio projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can manage portfolio projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can view all portfolio projects" ON public.portfolio_projects;

CREATE POLICY "Admins can manage portfolio projects" ON public.portfolio_projects
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view all portfolio projects" ON public.portfolio_projects
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update project_inquiries policies
DROP POLICY IF EXISTS "Admins can manage project inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "Admins can view all project inquiries" ON public.project_inquiries;

CREATE POLICY "Admins can manage project inquiries" ON public.project_inquiries
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

CREATE POLICY "Admins can view all project inquiries" ON public.project_inquiries
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update reviews policies
DROP POLICY IF EXISTS "Admins can delete any review" ON public.reviews;

CREATE POLICY "Admins can delete any review" ON public.reviews
FOR DELETE USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update services policies
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

CREATE POLICY "Admins can manage services" ON public.services
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update team_members policies
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;

CREATE POLICY "Admins can manage team members" ON public.team_members
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update testimonials policies
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
FOR ALL USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));

-- Update user_activity_logs policies
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.user_activity_logs;

CREATE POLICY "Admins can view all activity logs" ON public.user_activity_logs
FOR SELECT USING (auth.email() IN ('gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com'));
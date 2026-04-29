
-- Fix the RLS policy for admin_notifications to allow system inserts
DROP POLICY IF EXISTS "Admins can manage notifications" ON public.admin_notifications;

-- Create separate policies for different operations
CREATE POLICY "Admins can view notifications" 
  ON public.admin_notifications 
  FOR SELECT 
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can update notifications" 
  ON public.admin_notifications 
  FOR UPDATE 
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can delete notifications" 
  ON public.admin_notifications 
  FOR DELETE 
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Allow system to insert notifications (bypasses RLS for triggers)
CREATE POLICY "System can insert notifications" 
  ON public.admin_notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Create triggers for admin notifications
DROP TRIGGER IF EXISTS trigger_contact_submission_notification ON public.contact_submissions;
DROP TRIGGER IF EXISTS trigger_project_inquiry_notification ON public.project_inquiries;
DROP TRIGGER IF EXISTS trigger_job_application_notification ON public.job_applications;
DROP TRIGGER IF EXISTS trigger_review_notification ON public.reviews;

-- Create triggers that call the admin notification function
CREATE TRIGGER trigger_contact_submission_notification
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.create_admin_notification();

CREATE TRIGGER trigger_project_inquiry_notification
  AFTER INSERT ON public.project_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.create_admin_notification();

CREATE TRIGGER trigger_job_application_notification
  AFTER INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.create_admin_notification();

CREATE TRIGGER trigger_review_notification
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.create_admin_notification();

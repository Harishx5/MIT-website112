-- Create support ticket replies table for admin-user conversations
CREATE TABLE public.support_ticket_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_inquiries(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('admin', 'user')),
  sender_id UUID REFERENCES auth.users(id),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_ticket_replies ENABLE ROW LEVEL SECURITY;

-- Create policies for support ticket replies
CREATE POLICY "Admins can manage all ticket replies" 
ON public.support_ticket_replies 
FOR ALL 
USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com'::text, 'marzeletinfotechnology@gmail.com'::text]));

CREATE POLICY "Users can view replies to their tickets" 
ON public.support_ticket_replies 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.support_inquiries si 
    WHERE si.id = ticket_id 
    AND si.email = auth.email()
  )
);

CREATE POLICY "Users can reply to their own tickets" 
ON public.support_ticket_replies 
FOR INSERT 
WITH CHECK (
  sender_type = 'user' 
  AND sender_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.support_inquiries si 
    WHERE si.id = ticket_id 
    AND si.email = auth.email()
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_support_ticket_replies_updated_at
BEFORE UPDATE ON public.support_ticket_replies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create notification trigger for new replies
CREATE OR REPLACE FUNCTION public.create_ticket_reply_notification()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Create notification for admin replies to users
  IF NEW.sender_type = 'admin' THEN
    INSERT INTO public.admin_notifications (type, title, message, reference_id)
    VALUES (
      'ticket_reply',
      'Ticket Reply Sent',
      'Reply sent to ticket by ' || NEW.sender_name,
      NEW.ticket_id
    );
  -- Create notification for user replies to admins  
  ELSIF NEW.sender_type = 'user' THEN
    INSERT INTO public.admin_notifications (type, title, message, reference_id)
    VALUES (
      'ticket_reply',
      'New Ticket Reply',
      'User replied to support ticket: ' || NEW.sender_name,
      NEW.ticket_id
    );
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_ticket_reply_notification
AFTER INSERT ON public.support_ticket_replies
FOR EACH ROW
EXECUTE FUNCTION public.create_ticket_reply_notification();
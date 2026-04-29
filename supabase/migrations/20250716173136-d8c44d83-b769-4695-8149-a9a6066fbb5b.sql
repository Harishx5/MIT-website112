
-- Create trusted_partners table for managing partner logos
CREATE TABLE public.trusted_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_sessions table for real-time user tracking
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  device_fingerprint TEXT,
  ip_address INET,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create news_views table for enhanced view tracking
CREATE TABLE public.news_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID REFERENCES public.news(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_fingerprint TEXT,
  ip_address INET,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(news_id, user_id),
  UNIQUE(news_id, device_fingerprint)
);

-- Create news_comments table for news commenting
CREATE TABLE public.news_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID REFERENCES public.news(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT,
  author_email TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  parent_id UUID REFERENCES public.news_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage bucket for partner logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-logos', 'partner-logos', true);

-- Enable RLS on all new tables
ALTER TABLE public.trusted_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for trusted_partners
CREATE POLICY "Active partners are viewable by everyone" 
  ON public.trusted_partners FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage trusted partners" 
  ON public.trusted_partners FOR ALL 
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

-- RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.user_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
  ON public.user_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
  ON public.user_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions" 
  ON public.user_sessions FOR SELECT 
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Anyone can insert sessions for tracking" 
  ON public.user_sessions FOR INSERT 
  WITH CHECK (true);

-- RLS policies for news_views
CREATE POLICY "Anyone can insert news views" 
  ON public.news_views FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own news views" 
  ON public.news_views FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all news views" 
  ON public.news_views FOR SELECT 
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

-- RLS policies for news_comments
CREATE POLICY "Approved comments are viewable by everyone" 
  ON public.news_comments FOR SELECT 
  USING (is_approved = true);

CREATE POLICY "Users can view their own comments" 
  ON public.news_comments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert comments" 
  ON public.news_comments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own comments" 
  ON public.news_comments FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments" 
  ON public.news_comments FOR ALL 
  USING (auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

-- Storage policies for partner logos
CREATE POLICY "Anyone can view partner logos" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'partner-logos');

CREATE POLICY "Admins can upload partner logos" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'partner-logos' AND auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Admins can update partner logos" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'partner-logos' AND auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

CREATE POLICY "Admins can delete partner logos" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'partner-logos' AND auth.email() = ANY (ARRAY['gowthamj0055@gmail.com', 'marzeletinfotechnology@gmail.com']));

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_trusted_partners_updated_at 
  BEFORE UPDATE ON public.trusted_partners 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_comments_updated_at 
  BEFORE UPDATE ON public.news_comments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add notification triggers for new comments
CREATE OR REPLACE FUNCTION create_news_comment_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, message, reference_id)
  VALUES (
    'news_comment',
    'New News Comment',
    'New comment on news article by ' || COALESCE(NEW.author_name, 'Anonymous'),
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_comment_notification_trigger
  AFTER INSERT ON public.news_comments
  FOR EACH ROW EXECUTE FUNCTION create_news_comment_notification();

-- Enable realtime for new tables
ALTER TABLE public.trusted_partners REPLICA IDENTITY FULL;
ALTER TABLE public.user_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.news_views REPLICA IDENTITY FULL;
ALTER TABLE public.news_comments REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.trusted_partners;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_views;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_comments;

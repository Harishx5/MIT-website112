
-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- Create storage policy for portfolio images bucket
CREATE POLICY "Anyone can view portfolio images" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can update portfolio images" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio-images' AND auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can delete portfolio images" ON storage.objects
FOR DELETE USING (bucket_id = 'portfolio-images' AND auth.email() = 'gowthamj0055@gmail.com');

-- Insert existing default portfolio projects into admin_portfolio_projects table
INSERT INTO admin_portfolio_projects (
  id, title, category, description, image, technologies, client, duration, team, completion_date, 
  challenge, solution, features, results, created_by
) VALUES 
(
  'invexai',
  'InvexAI',
  'AI/Machine Learning',
  'Advanced AI-powered investment platform with real-time market analysis, portfolio optimization, and risk assessment capabilities.',
  '/lovable-uploads/46337a20-9a57-4c40-a655-e6ddb30af4cb.png',
  ARRAY['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
  'FinTech Solutions Inc.',
  '8 months',
  '12 developers',
  '2024-03-15',
  'Creating a sophisticated AI-driven investment platform that could process vast amounts of market data in real-time while providing actionable insights for investment decisions.',
  'Developed a comprehensive platform using machine learning algorithms for market prediction, real-time data processing pipelines, and an intuitive dashboard for portfolio management.',
  ARRAY['Real-time market data analysis', 'AI-powered recommendations', 'Risk assessment tools', 'Portfolio optimization'],
  '[{"metric": "Processing Speed", "value": "99.9%", "description": "Faster data processing"}, {"metric": "User Adoption", "value": "250%", "description": "Increase in active users"}]'::jsonb,
  NULL
),
(
  'smart-tracking',
  'Tracking System',
  'IoT/Tracking',
  'Real-time asset tracking solution with IoT sensors, mobile app integration, and comprehensive analytics dashboard.',
  'photo-1487058792275-0ad4aaf24ca7',
  ARRAY['IoT', 'React Native', 'Node.js', 'MongoDB', 'MQTT'],
  'Logistics Corp',
  '6 months',
  '8 developers',
  '2024-01-20',
  'Building a scalable IoT solution for asset tracking',
  'Implemented comprehensive IoT ecosystem with edge computing',
  ARRAY['Real-time tracking', 'Mobile integration', 'Analytics dashboard'],
  '[{"metric": "Asset Visibility", "value": "100%", "description": "Complete tracking coverage"}]'::jsonb,
  NULL
),
(
  'hr-erp',
  'HR ERP System',
  'Enterprise Software',
  'Comprehensive human resources management system with payroll, attendance, performance tracking, and employee self-service portal.',
  'photo-1519389950473-47ba0277781c',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Redis'],
  'Enterprise Solutions Ltd.',
  '10 months',
  '15 developers',
  '2023-12-10',
  'Creating a comprehensive HR management solution for large enterprises',
  'Developed modular ERP system with scalable architecture',
  ARRAY['Payroll management', 'Attendance tracking', 'Performance reviews', 'Self-service portal'],
  '[{"metric": "Efficiency", "value": "85%", "description": "Improvement in HR processes"}]'::jsonb,
  NULL
),
(
  'event-booking',
  'Event Booking Management System',
  'Web Application',
  'Modern event booking and management platform with calendar integration, payment processing, and real-time notifications.',
  'photo-1460925895917-afdab827c52f',
  ARRAY['Next.js', 'Stripe', 'Calendar API', 'WebSocket', 'PostgreSQL'],
  'EventTech Solutions',
  '5 months',
  '6 developers',
  '2024-02-28',
  'Building a modern event management platform with real-time features',
  'Created responsive platform with integrated payment and notification systems',
  ARRAY['Calendar integration', 'Payment processing', 'Real-time notifications', 'Event management'],
  '[{"metric": "Bookings", "value": "300%", "description": "Increase in event bookings"}]'::jsonb,
  NULL
),
(
  'sap-enterprise',
  'SAP Enterprise Integration',
  'Enterprise ERP',
  'Custom SAP integration solution with modern web interface, API connectivity, and real-time data synchronization.',
  'photo-1487058792275-0ad4aaf24ca7',
  ARRAY['Angular', 'SAP API', 'Spring Boot', 'Oracle', 'Kubernetes'],
  'Manufacturing Giant Inc.',
  '12 months',
  '20 developers',
  '2023-11-15',
  'Integrating legacy SAP systems with modern web technologies',
  'Built comprehensive integration layer with real-time synchronization',
  ARRAY['SAP integration', 'Modern web interface', 'API connectivity', 'Real-time sync'],
  '[{"metric": "Data Sync", "value": "99.8%", "description": "Synchronization accuracy"}]'::jsonb,
  NULL
);

-- First, let's populate the services table with existing services data
INSERT INTO public.services (
  name, slug, short_description, long_description, 
  features, technologies, price_range, delivery_time, 
  category, is_active, is_featured, starting_price, display_order
) VALUES 
  (
    'Web Design & Development', 
    'web-development',
    'Transform your digital presence with cutting-edge websites that captivate and convert visitors into loyal customers.',
    'Create stunning, responsive websites that not only look amazing but also drive real business results. Our web development services combine cutting-edge design with powerful functionality to deliver websites that engage your audience and convert visitors into customers.',
    ARRAY['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom CMS', 'E-commerce Integration', 'Analytics Integration'],
    ARRAY['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'],
    'Starting from ₹25,000',
    '2-4 weeks',
    'Development',
    true,
    true,
    25000,
    1
  ),
  (
    'Mobile App Development', 
    'mobile-development',
    'Create powerful mobile applications that engage users and drive business growth across iOS and Android platforms.',
    'Build native and cross-platform mobile applications that provide exceptional user experiences. From concept to app store deployment, we handle every aspect of mobile app development to bring your ideas to life.',
    ARRAY['Native & Cross-Platform', 'App Store Optimization', 'Push Notifications', 'Analytics Integration', 'Offline Support', 'Real-time Features'],
    ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'iOS SDK', 'Android SDK'],
    'Starting from ₹50,000',
    '4-8 weeks',
    'Development',
    true,
    true,
    50000,
    2
  ),
  (
    'Software Development', 
    'software-development',
    'Build robust, scalable software solutions tailored to your business needs with cutting-edge technologies.',
    'Develop custom software solutions that streamline your business processes and drive growth. Our team creates scalable, maintainable applications using the latest technologies and best practices.',
    ARRAY['Custom Solutions', 'Cloud Integration', 'API Development', 'Maintenance Support', 'Scalable Architecture', 'Security Features'],
    ARRAY['Python', 'Java', 'C#', '.NET', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    'Starting from ₹40,000',
    '6-12 weeks',
    'Development',
    true,
    false,
    40000,
    3
  ),
  (
    'Custom ERP/CRM Development', 
    'erp-crm',
    'Streamline your business operations with intelligent enterprise systems designed for your specific workflows.',
    'Transform your business operations with custom ERP and CRM solutions that integrate seamlessly with your existing processes. Improve efficiency, reduce costs, and gain valuable insights into your business performance.',
    ARRAY['Workflow Automation', 'Data Analytics', 'Multi-user Access', 'Cloud Deployment', 'Integration Capabilities', 'Custom Reporting'],
    ARRAY['SAP', 'Salesforce', 'Microsoft Dynamics', 'Oracle', 'Custom Development', 'API Integration'],
    'Starting from ₹75,000',
    '8-16 weeks',
    'Enterprise',
    true,
    false,
    75000,
    4
  ),
  (
    'IoT & Embedded Solutions', 
    'iot-embedded',
    'Connect and automate your devices with smart IoT solutions that bring intelligence to your operations.',
    'Harness the power of IoT to create smart, connected systems that optimize your operations. From sensor networks to complete IoT platforms, we build solutions that provide real-time insights and automation.',
    ARRAY['Device Integration', 'Real-time Monitoring', 'Data Collection', 'Remote Control', 'Edge Computing', 'Cloud Connectivity'],
    ARRAY['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'LoRaWAN', 'Zigbee', 'WiFi', 'Bluetooth'],
    'Starting from ₹35,000',
    '4-10 weeks',
    'Technology',
    true,
    false,
    35000,
    5
  ),
  (
    'UI/UX Design', 
    'ui-ux-design',
    'Create intuitive and engaging user experiences that delight your customers and drive business success.',
    'Design user interfaces that are not only beautiful but also intuitive and conversion-focused. Our design process combines user research, psychology, and best practices to create experiences that users love.',
    ARRAY['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Responsive Design'],
    ARRAY['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Photoshop', 'Illustrator'],
    'Starting from ₹30,000',
    '3-6 weeks',
    'Design',
    true,
    true,
    30000,
    6
  ),
  (
    'Data Analytics', 
    'data-analytics',
    'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
    'Unlock the power of your data with comprehensive analytics solutions. From data collection and processing to visualization and predictive modeling, we help you make data-driven decisions that drive growth.',
    ARRAY['Data Visualization', 'Predictive Analytics', 'Custom Dashboards', 'Reporting', 'Machine Learning', 'Big Data Processing'],
    ARRAY['Python', 'R', 'Tableau', 'Power BI', 'Apache Spark', 'TensorFlow', 'Pandas', 'SQL'],
    'Starting from ₹25,000',
    '4-8 weeks',
    'Analytics',
    true,
    false,
    25000,
    7
  ),
  (
    'IT Infrastructure', 
    'it-infrastructure',
    'Build and maintain robust IT infrastructure that supports your business growth and ensures security.',
    'Create reliable, secure, and scalable IT infrastructure that forms the backbone of your digital operations. From network setup to cloud migration, we ensure your technology foundation is rock-solid.',
    ARRAY['Network Setup', 'Cloud Migration', 'Security Implementation', '24/7 Support', 'Backup Solutions', 'Monitoring'],
    ARRAY['AWS', 'Azure', 'Google Cloud', 'VMware', 'Cisco', 'Microsoft Server', 'Linux', 'Docker'],
    'Starting from ₹20,000',
    '2-6 weeks',
    'Infrastructure',
    true,
    false,
    20000,
    8
  ),
  (
    'Business Consulting', 
    'business-consulting',
    'Get strategic guidance and expert advice to transform your business and achieve sustainable growth.',
    'Navigate complex business challenges with expert consulting services. Our experienced consultants help you optimize processes, implement digital transformation, and achieve your strategic objectives.',
    ARRAY['Strategy Planning', 'Process Optimization', 'Digital Transformation', 'Market Analysis', 'Performance Improvement', 'Change Management'],
    ARRAY['Lean Six Sigma', 'Agile Methodology', 'Business Intelligence', 'Project Management', 'Analytics Platforms'],
    'Starting from ₹15,000',
    '2-8 weeks',
    'Consulting',
    true,
    false,
    15000,
    9
  ),
  (
    'CCTV & Biometric Installation', 
    'cctv-biometric',
    'Protect your assets with state-of-the-art CCTV surveillance and biometric access control systems.',
    'Secure your premises with advanced surveillance and access control solutions. Our comprehensive security systems provide 24/7 monitoring, intelligent threat detection, and seamless access management.',
    ARRAY['HD Surveillance', 'Biometric Access Control', 'Remote Monitoring', 'Motion Detection', 'Night Vision', 'Mobile Alerts'],
    ARRAY['IP Cameras', 'NVR Systems', 'Hikvision', 'Dahua', 'Fingerprint Scanners', 'Facial Recognition'],
    'Starting from ₹25,000',
    '1-3 weeks',
    'Security',
    true,
    false,
    25000,
    10
  ),
  (
    'Digital Marketing', 
    'digital-marketing',
    'Boost your online presence with comprehensive digital marketing strategies that drive traffic and conversions.',
    'Dominate the digital landscape with strategic marketing campaigns that deliver real results. From social media to search engine optimization, we create integrated campaigns that grow your business.',
    ARRAY['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Content Strategy', 'Email Marketing', 'Analytics'],
    ARRAY['Google Ads', 'Facebook Ads', 'Instagram', 'LinkedIn', 'Google Analytics', 'SEMrush'],
    'Starting from ₹15,000',
    'Ongoing',
    'Marketing',
    true,
    true,
    15000,
    11
  ),
  (
    'Internship & Training Programs', 
    'internship-training',
    'Develop your technical skills with our comprehensive internship and training programs designed for career growth.',
    'Bridge the gap between education and industry with our hands-on training programs. Whether you''re a student or professional looking to upskill, our programs provide real-world experience and industry-relevant skills.',
    ARRAY['Hands-on Projects', 'Industry Mentorship', 'Certification', 'Job Placement Assistance', 'Flexible Schedules', 'Live Projects'],
    ARRAY['Full Stack Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'Digital Marketing', 'DevOps'],
    'Starting from ₹5,000',
    '1-6 months',
    'Education',
    true,
    false,
    5000,
    12
  );

-- Add unique constraint on slug if it doesn't exist
ALTER TABLE public.services 
ADD CONSTRAINT services_slug_unique UNIQUE (slug);

-- Create trigger to ensure slug uniqueness on insert/update
CREATE OR REPLACE FUNCTION public.ensure_unique_slug()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 1;
BEGIN
  -- Generate base slug from title
  base_slug := generate_slug(NEW.name);
  final_slug := base_slug;
  
  -- Check if we're updating the same record
  IF TG_OP = 'UPDATE' AND OLD.id = NEW.id THEN
    -- If name hasn't changed, keep the existing slug
    IF OLD.name = NEW.name THEN
      NEW.slug := OLD.slug;
      RETURN NEW;
    END IF;
  END IF;
  
  -- Ensure slug is unique
  WHILE EXISTS (
    SELECT 1 FROM public.services 
    WHERE slug = final_slug 
    AND (TG_OP = 'INSERT' OR id != NEW.id)
  ) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for slug generation
CREATE TRIGGER services_slug_trigger
  BEFORE INSERT OR UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.ensure_unique_slug();
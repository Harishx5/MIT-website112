-- Delete all existing services first
DELETE FROM services;

-- Insert the 12 services from the images with comprehensive content
INSERT INTO services (name, slug, short_description, long_description, icon, features, technologies, price_range, delivery_time, category, display_order, meta_title, meta_description) VALUES

-- First Image Services
('Web Design & Web Development', 'web-design-web-development', 'Transform your digital presence with cutting-edge websites that captivate and convert.', 'Create stunning, responsive websites that not only look amazing but also deliver exceptional user experiences. Our comprehensive web development services combine creative design with robust technical implementation to help your business stand out in the digital landscape. From concept to launch, we ensure your website drives engagement and conversions.', 'code', 
ARRAY['Responsive Design', 'Modern Frameworks', 'SEO Optimized', 'Fast Loading', 'Custom CMS', 'E-commerce Integration', 'Progressive Web Apps', 'Cross-browser Compatibility'], 
ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WordPress', 'Shopify', 'Figma', 'Adobe XD'], 
'$2,500 - $15,000', '4-12 weeks', 'web-development', 1, 'Professional Web Design & Development Services', 'Expert web design and development services to create stunning, responsive websites that drive business growth and conversions.'),

('Mobile App Development', 'mobile-app-development', 'Bring your ideas to life with powerful mobile apps that users love and can''t put down.', 'Transform your business with custom mobile applications that engage users and drive growth. Our expert team develops native and cross-platform mobile apps that deliver seamless performance across iOS and Android devices. From concept to app store deployment, we create mobile solutions that exceed user expectations.', 'smartphone', 
ARRAY['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization', 'Push Notifications', 'Offline Functionality', 'Real-time Features', 'API Integration'], 
ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS', 'REST APIs', 'GraphQL'], 
'$5,000 - $25,000', '8-16 weeks', 'mobile-development', 2, 'Custom Mobile App Development Services', 'Professional mobile app development for iOS and Android platforms with cutting-edge technology and user-centric design.'),

('Data Analytics', 'data-analytics', 'Unlock hidden insights and make data-driven decisions that skyrocket your business growth.', 'Harness the power of your data with our comprehensive analytics solutions. We help businesses transform raw data into actionable insights that drive strategic decision-making. Our data analytics services include data visualization, predictive modeling, and custom reporting solutions that reveal hidden opportunities for growth.', 'bar-chart', 
ARRAY['Business Intelligence', 'Data Visualization', 'Predictive Analytics', 'Reporting', 'Real-time Dashboards', 'Machine Learning', 'Data Mining', 'Statistical Analysis'], 
ARRAY['Python', 'R', 'Tableau', 'Power BI', 'SQL', 'MongoDB', 'Apache Spark', 'TensorFlow'], 
'$3,000 - $20,000', '6-12 weeks', 'data-analytics', 3, 'Advanced Data Analytics & Business Intelligence', 'Professional data analytics services to unlock insights and drive data-driven business decisions with advanced visualization and reporting.'),

('UI/UX Design', 'uiux-design', 'Create magical user experiences that turn visitors into loyal customers and brand advocates.', 'Design exceptional user experiences that captivate and convert. Our UI/UX design services focus on creating intuitive, beautiful interfaces that users love to interact with. We combine user research, prototyping, and visual design to deliver products that not only look great but also provide seamless user journeys.', 'palette', 
ARRAY['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Information Architecture', 'Interaction Design', 'Visual Design'], 
ARRAY['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Miro', 'Adobe Creative Suite'], 
'$2,000 - $12,000', '4-10 weeks', 'ui-ux-design', 4, 'Professional UI/UX Design Services', 'Expert UI/UX design services creating intuitive user experiences and beautiful interfaces that drive engagement and conversions.'),

('Software Development', 'software-development', 'Build robust, scalable software solutions that power your business to new heights.', 'Develop custom software solutions tailored to your unique business requirements. Our software development team creates scalable, secure, and efficient applications that streamline operations and drive innovation. From enterprise software to SaaS platforms, we deliver solutions that grow with your business.', 'monitor', 
ARRAY['Desktop Applications', 'Enterprise Software', 'API Development', 'System Integration', 'Cloud Solutions', 'Microservices', 'DevOps', 'Quality Assurance'], 
ARRAY['Java', 'C#', '.NET', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure'], 
'$8,000 - $50,000', '12-24 weeks', 'software-development', 5, 'Custom Software Development Solutions', 'Professional software development services creating robust, scalable applications tailored to your business needs and requirements.'),

('IT Infrastructure Services', 'it-infrastructure-services', 'Build bulletproof IT foundations that keep your business running smoothly 24/7.', 'Establish and maintain robust IT infrastructure that supports your business operations around the clock. Our comprehensive infrastructure services include network setup, server management, cloud migration, and 24/7 support to ensure your systems are always running at peak performance.', 'server', 
ARRAY['Network Setup', 'Server Management', 'Cloud Migration', '24/7 Support', 'Security Implementation', 'Backup Solutions', 'Disaster Recovery', 'Performance Monitoring'], 
ARRAY['AWS', 'Microsoft Azure', 'Google Cloud', 'VMware', 'Cisco', 'Linux', 'Windows Server', 'Docker'], 
'$5,000 - $30,000', '6-16 weeks', 'it-infrastructure', 6, 'Comprehensive IT Infrastructure Services', 'Professional IT infrastructure services providing robust network solutions, cloud migration, and 24/7 support for business continuity.'),

-- Second Image Services
('Business Consulting', 'business-consulting', 'Strategic insights and proven methodologies to accelerate your business transformation.', 'Accelerate your business growth with strategic consulting services that deliver measurable results. Our experienced consultants provide insights, methodologies, and solutions to help you overcome challenges, optimize operations, and achieve sustainable growth in today''s competitive landscape.', 'headphones', 
ARRAY['Strategy Planning', 'Process Optimization', 'Digital Transformation', 'Growth Consulting', 'Market Analysis', 'Competitive Intelligence', 'Change Management', 'Performance Improvement'], 
ARRAY['Business Analysis', 'Project Management', 'Lean Six Sigma', 'Agile Methodologies', 'Data Analysis Tools', 'CRM Systems'], 
'$3,000 - $25,000', '8-20 weeks', 'business-consulting', 7, 'Strategic Business Consulting Services', 'Expert business consulting services providing strategic insights and proven methodologies to accelerate growth and transformation.'),

('Cybersecurity', 'cybersecurity', 'Shield your digital assets with fortress-level security that hackers fear to challenge.', 'Protect your business from cyber threats with comprehensive security solutions. Our cybersecurity experts implement multi-layered protection strategies to safeguard your data, systems, and reputation. From vulnerability assessments to incident response, we ensure your digital assets remain secure.', 'shield', 
ARRAY['Security Audits', 'Threat Detection', 'Compliance', '24/7 Monitoring', 'Penetration Testing', 'Security Training', 'Incident Response', 'Risk Assessment'], 
ARRAY['Firewalls', 'SIEM Tools', 'Antivirus Solutions', 'VPN', 'Multi-factor Authentication', 'Encryption Tools'], 
'$4,000 - $20,000', '6-12 weeks', 'cybersecurity', 8, 'Advanced Cybersecurity Solutions', 'Comprehensive cybersecurity services protecting your business with advanced threat detection, monitoring, and incident response.'),

('Custom ERP/CRM Development', 'custom-erp-crm-development', 'Streamline operations with intelligent systems that work exactly how your business thinks.', 'Transform your business operations with custom ERP and CRM solutions designed specifically for your workflow. Our systems integrate seamlessly with your processes, automating tasks, improving efficiency, and providing real-time insights that drive better business decisions.', 'settings', 
ARRAY['Business Process Automation', 'Customer Management', 'Inventory Control', 'Reporting', 'Integration Capabilities', 'Workflow Optimization', 'Data Management', 'User Training'], 
ARRAY['Salesforce', 'Microsoft Dynamics', 'Oracle', 'SAP', 'Custom Development', 'API Integration'], 
'$10,000 - $75,000', '16-32 weeks', 'custom-erp-crm', 9, 'Custom ERP & CRM Development Solutions', 'Professional ERP and CRM development services creating intelligent business systems that streamline operations and drive growth.'),

('IoT & Embedded Solutions', 'iot-embedded-solutions', 'Connect everything and create smart ecosystems that revolutionize how you work.', 'Build intelligent connected systems that transform how your business operates. Our IoT and embedded solutions connect devices, collect data, and provide insights that enable smarter decision-making and improved efficiency across your operations.', 'zap', 
ARRAY['Smart Devices', 'Sensor Integration', 'Real-time Monitoring', 'Automation', 'Data Collection', 'Remote Control', 'Predictive Maintenance', 'Energy Management'], 
ARRAY['Arduino', 'Raspberry Pi', 'ESP32', 'LoRaWAN', 'WiFi', 'Bluetooth', 'MQTT', 'Cloud Platforms'], 
'$5,000 - $35,000', '10-20 weeks', 'iot-embedded', 10, 'IoT & Embedded Systems Development', 'Advanced IoT and embedded solutions creating smart connected systems that revolutionize business operations and efficiency.'),

('Internship & Skill Training', 'internship-skill-training', 'Shape the future tech leaders with hands-on training that bridges academia and industry.', 'Develop the next generation of tech talent with comprehensive training programs that combine theoretical knowledge with practical experience. Our internship and skill training programs prepare students and professionals for successful careers in technology.', 'graduation-cap', 
ARRAY['Technical Training', 'Industry Mentorship', 'Real Projects', 'Career Guidance', 'Certification Programs', 'Soft Skills Development', 'Portfolio Building', 'Job Placement Assistance'], 
ARRAY['Programming Languages', 'Web Technologies', 'Mobile Development', 'Data Science', 'Cloud Computing', 'DevOps'], 
'$1,000 - $5,000', '12-24 weeks', 'internship-training', 11, 'Professional Internship & Skill Training Programs', 'Comprehensive training programs bridging academia and industry with hands-on experience and career development support.'),

('CCTV & Biometric Installation', 'cctv-biometric-installation', 'Secure your premises with cutting-edge surveillance that never blinks or sleeps.', 'Protect your business with state-of-the-art surveillance and security systems. Our CCTV and biometric installation services provide comprehensive security solutions that monitor, record, and control access to your premises 24/7, ensuring peace of mind and asset protection.', 'camera', 
ARRAY['CCTV Setup', 'Biometric Systems', 'Access Control', 'Maintenance', 'Remote Monitoring', 'Motion Detection', 'Night Vision', 'Cloud Storage'], 
ARRAY['IP Cameras', 'DVR/NVR Systems', 'Biometric Scanners', 'Access Control Systems', 'Mobile Apps'], 
'$2,000 - $15,000', '2-8 weeks', 'cctv-biometric', 12, 'Professional CCTV & Biometric Security Solutions', 'Advanced security installation services providing comprehensive surveillance and biometric access control for complete premises protection.');
-- Update display orders to be properly sequenced
-- UI/UX Design should be first (display_order: 1)
-- Set the rest in a logical order

UPDATE services 
SET display_order = CASE 
  WHEN name = 'UI/UX Design' THEN 1
  WHEN name = 'Web Development' THEN 2
  WHEN name = 'Mobile App Development' THEN 3
  WHEN name = 'Digital Marketing' THEN 4
  WHEN name = 'Custom Software Development' THEN 5
  WHEN name = 'Data Analytics' THEN 6
  WHEN name = 'Business Consulting' THEN 7
  WHEN name = 'Cloud Infrastructure' THEN 8
  WHEN name = 'SEO & Branding' THEN 9
  WHEN name = 'Email Marketing' THEN 10
  WHEN name = 'IoT & Embedded Systems' THEN 11
  WHEN name = 'CCTV & Biometric Systems' THEN 12
  ELSE display_order
END
WHERE name IN (
  'UI/UX Design', 'Web Development', 'Mobile App Development', 'Digital Marketing',
  'Custom Software Development', 'Data Analytics', 'Business Consulting', 
  'Cloud Infrastructure', 'SEO & Branding', 'Email Marketing', 
  'IoT & Embedded Systems', 'CCTV & Biometric Systems'
);
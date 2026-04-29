
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { GraduationCap } from 'lucide-react';

const InternshipTraining = () => {
  const serviceData = {
    title: 'Internship & Skill Training',
    subtitle: 'Professional Development & Career Growth',
    description: 'Comprehensive training programs and internship opportunities designed to bridge the gap between academic learning and industry requirements. Our hands-on approach ensures students and professionals gain practical skills in cutting-edge technologies.',
    icon: GraduationCap,
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-600',
    stats: [
      { number: '500+', label: 'Students Trained' },
      { number: '95%', label: 'Placement Rate' },
      { number: '50+', label: 'Industry Partners' },
      { number: '6', label: 'Months Program' }
    ],
    offerings: [
      {
        title: 'Full-Stack Development',
        description: 'Complete web development training covering frontend and backend technologies.'
      },
      {
        title: 'Mobile App Development',
        description: 'Hands-on training in React Native, Flutter, and native mobile development.'
      },
      {
        title: 'Data Science & AI',
        description: 'Machine learning, data analysis, and artificial intelligence fundamentals.'
      }
    ],
    technologies: [
      'React', 'Node.js', 'Python', 'Java', 'Flutter', 'React Native',
      'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'Agile'
    ],
    benefits: [
      {
        title: 'Industry Mentorship',
        description: 'Learn from experienced professionals working in top tech companies.'
      },
      {
        title: 'Real Project Experience',
        description: 'Work on actual client projects to build your portfolio and gain experience.'
      },
      {
        title: 'Career Placement Support',
        description: 'Job placement assistance with our network of hiring partners.'
      },
      {
        title: 'Certification & Recognition',
        description: 'Industry-recognized certificates to boost your career prospects.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Assessment & Enrollment',
        description: 'Skill assessment and program selection based on your career goals.'
      },
      {
        number: '2',
        title: 'Foundation Training',
        description: 'Core concepts and fundamentals in your chosen technology stack.'
      },
      {
        number: '3',
        title: 'Practical Projects',
        description: 'Hands-on projects and real-world application development.'
      },
      {
        number: '4',
        title: 'Internship & Placement',
        description: 'Industry internship and job placement assistance.'
      }
    ]
  };

  return (
    <Layout>
      <ServiceHero {...serviceData} />
      <ServiceStats stats={serviceData.stats} />
      <ServiceOfferings offerings={serviceData.offerings} />
      <ServiceTechnologies technologies={serviceData.technologies} />
      <ServiceBenefits benefits={serviceData.benefits} />
      <ServiceProcess process={serviceData.process} />
    </Layout>
  );
};

export default InternshipTraining;

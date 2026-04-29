
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Code } from 'lucide-react';

const WebDevelopment = () => {
  const serviceData = {
    title: 'Web Development',
    subtitle: 'Custom Digital Solutions',
    description: 'Create powerful, responsive websites and web applications that drive business growth. Our expert developers use cutting-edge technologies to build scalable solutions that deliver exceptional user experiences across all devices.',
    icon: Code,
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    bgColor: 'bg-blue-600',
    stats: [
      { number: '200+', label: 'Websites Created' },
      { number: '99.9%', label: 'Uptime Guarantee' },
      { number: '50%', label: 'Speed Improvement' },
      { number: '100%', label: 'Mobile Responsive' }
    ],
    offerings: [
      {
        title: 'Custom Website Development',
        description: 'Tailor-made websites built from scratch to match your unique business requirements and brand identity.'
      },
      {
        title: 'E-commerce Solutions',
        description: 'Powerful online stores with secure payment gateways, inventory management, and seamless shopping experiences.'
      },
      {
        title: 'Web Application Development',
        description: 'Complex web applications with advanced functionality, user authentication, and database integration.'
      }
    ],
    technologies: [
      'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'PHP',
      'Laravel', 'Django', 'MongoDB', 'PostgreSQL', 'AWS', 'Vercel'
    ],
    benefits: [
      {
        title: 'Responsive Design',
        description: 'Websites that look and work perfectly on all devices and screen sizes.'
      },
      {
        title: 'SEO Optimized',
        description: 'Built-in SEO best practices to help your website rank higher in search results.'
      },
      {
        title: 'Fast Loading',
        description: 'Optimized performance ensuring your website loads quickly for better user experience.'
      },
      {
        title: 'Secure & Reliable',
        description: 'Robust security measures and reliable hosting for peace of mind.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Discovery & Planning',
        description: 'Understanding your business goals and planning the perfect web solution.'
      },
      {
        number: '2',
        title: 'Design & Prototyping',
        description: 'Creating wireframes and prototypes to visualize your website before development.'
      },
      {
        number: '3',
        title: 'Development & Testing',
        description: 'Building your website with clean code and thorough testing for quality assurance.'
      },
      {
        number: '4',
        title: 'Launch & Support',
        description: 'Deploying your website and providing ongoing maintenance and support.'
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

export default WebDevelopment;


import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Headphones } from 'lucide-react';

const BusinessConsulting = () => {
  const serviceData = {
    title: 'Business Consulting',
    subtitle: 'Strategic Business Transformation',
    description: 'Strategic insights and proven methodologies to accelerate your business transformation. Our expert consultants help you optimize processes, implement digital solutions, and achieve sustainable growth.',
    icon: Headphones,
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    bgColor: 'bg-purple-600',
    stats: [
      { number: '200+', label: 'Businesses Transformed' },
      { number: '45%', label: 'Average Growth Increase' },
      { number: '98%', label: 'Client Satisfaction' },
      { number: '15+', label: 'Years Experience' }
    ],
    offerings: [
      {
        title: 'Strategic Planning',
        description: 'Comprehensive business strategy development and implementation roadmaps.'
      },
      {
        title: 'Process Optimization',
        description: 'Streamlining business processes for improved efficiency and productivity.'
      },
      {
        title: 'Digital Transformation',
        description: 'Guiding your digital transformation journey with cutting-edge technologies.'
      }
    ],
    technologies: [
      'Agile Methodology', 'Lean Six Sigma', 'SCRUM', 'Kanban', 'Business Intelligence', 'CRM',
      'Project Management Tools', 'Analytics Platforms', 'Automation Tools', 'Cloud Solutions'
    ],
    benefits: [
      {
        title: 'Expert Guidance',
        description: 'Access to experienced consultants with deep industry knowledge.'
      },
      {
        title: 'Customized Solutions',
        description: 'Tailored strategies that align with your specific business objectives.'
      },
      {
        title: 'Measurable Results',
        description: 'Data-driven approach with clear KPIs and measurable outcomes.'
      },
      {
        title: 'Long-term Partnership',
        description: 'Ongoing support and guidance throughout your transformation journey.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Business Assessment',
        description: 'Comprehensive analysis of your current business processes and challenges.'
      },
      {
        number: '2',
        title: 'Strategy Development',
        description: 'Creating customized strategies and implementation roadmaps.'
      },
      {
        number: '3',
        title: 'Implementation Support',
        description: 'Hands-on support during the implementation of recommended solutions.'
      },
      {
        number: '4',
        title: 'Performance Monitoring',
        description: 'Ongoing monitoring and optimization of implemented strategies.'
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

export default BusinessConsulting;

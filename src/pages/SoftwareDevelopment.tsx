
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Monitor } from 'lucide-react';

const SoftwareDevelopment = () => {
  const serviceData = {
    title: 'Software Development',
    subtitle: 'Custom Enterprise Solutions',
    description: 'Build robust, scalable software solutions that power your business to new heights. Our expert developers create desktop applications, enterprise software, and system integrations tailored to your specific requirements.',
    icon: Monitor,
    gradient: 'from-teal-400 via-teal-500 to-teal-600',
    bgColor: 'bg-teal-600',
    stats: [
      { number: '100+', label: 'Software Solutions' },
      { number: '99.8%', label: 'System Uptime' },
      { number: '50%', label: 'Efficiency Boost' },
      { number: '24/7', label: 'Support Available' }
    ],
    offerings: [
      {
        title: 'Desktop Applications',
        description: 'Native desktop applications with rich user interfaces and powerful functionality.'
      },
      {
        title: 'Enterprise Software',
        description: 'Large-scale enterprise solutions for complex business processes and workflows.'
      },
      {
        title: 'System Integration',
        description: 'Seamless integration between different systems and third-party applications.'
      }
    ],
    technologies: [
      'Java', 'C#', '.NET', 'Python', 'C++', 'Qt',
      'Electron', 'WPF', 'Spring Boot', 'Hibernate', 'REST APIs', 'SOAP'
    ],
    benefits: [
      {
        title: 'Scalable Architecture',
        description: 'Future-proof software architecture that grows with your business needs.'
      },
      {
        title: 'Cross-Platform Support',
        description: 'Applications that work seamlessly across different operating systems.'
      },
      {
        title: 'High Performance',
        description: 'Optimized code and efficient algorithms for maximum performance.'
      },
      {
        title: 'Security First',
        description: 'Built-in security measures to protect your data and business operations.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Requirements Analysis',
        description: 'Detailed analysis of your business requirements and technical specifications.'
      },
      {
        number: '2',
        title: 'Architecture Design',
        description: 'Creating robust software architecture and system design blueprints.'
      },
      {
        number: '3',
        title: 'Development & Testing',
        description: 'Agile development process with continuous testing and quality assurance.'
      },
      {
        number: '4',
        title: 'Deployment & Support',
        description: 'Smooth deployment and ongoing maintenance with technical support.'
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

export default SoftwareDevelopment;

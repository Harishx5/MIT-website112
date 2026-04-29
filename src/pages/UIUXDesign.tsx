
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Palette } from 'lucide-react';

const UIUXDesign = () => {
  const serviceData = {
    title: 'UI/UX Design',
    subtitle: 'User-Centered Design Solutions',
    description: 'Create exceptional user experiences with our comprehensive UI/UX design services. We combine creativity with data-driven insights to design interfaces that are both beautiful and functional.',
    icon: Palette,
    gradient: 'from-green-400 via-green-500 to-green-600',
    bgColor: 'bg-green-600',
    stats: [
      { number: '150+', label: 'Designs Created' },
      { number: '98%', label: 'Client Satisfaction' },
      { number: '40%', label: 'Conversion Increase' },
      { number: '25+', label: 'Awards Won' }
    ],
    offerings: [
      {
        title: 'User Experience Design',
        description: 'Research-driven UX design that focuses on user needs and business goals.'
      },
      {
        title: 'Interface Design',
        description: 'Modern, responsive UI designs that work seamlessly across all devices.'
      },
      {
        title: 'Design Systems',
        description: 'Comprehensive design systems and style guides for consistent branding.'
      }
    ],
    technologies: [
      'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer',
      'Adobe Creative Suite', 'Miro', 'Zeplin', 'Abstract', 'Maze', 'Hotjar'
    ],
    benefits: [
      {
        title: 'User Research',
        description: 'Deep understanding of your users through comprehensive research and testing.'
      },
      {
        title: 'Responsive Design',
        description: 'Designs that work perfectly on desktop, tablet, and mobile devices.'
      },
      {
        title: 'Accessibility Focus',
        description: 'Inclusive designs that ensure usability for all users and abilities.'
      },
      {
        title: 'Brand Consistency',
        description: 'Cohesive visual identity that strengthens your brand presence.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Research & Discovery',
        description: 'Understanding users, market, and business requirements through research.'
      },
      {
        number: '2',
        title: 'Wireframing & Prototyping',
        description: 'Creating low and high-fidelity prototypes to validate concepts.'
      },
      {
        number: '3',
        title: 'Visual Design',
        description: 'Crafting beautiful interfaces with attention to detail and usability.'
      },
      {
        number: '4',
        title: 'Testing & Iteration',
        description: 'User testing and design refinement for optimal user experience.'
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

export default UIUXDesign;

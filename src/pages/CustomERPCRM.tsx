
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Settings } from 'lucide-react';
import SEO from '@/components/SEO';
import { createServiceSchema } from '@/utils/structuredData';

const CustomERPCRM = () => {
  const serviceData = {
    title: 'Custom ERP/CRM Development',
    subtitle: 'Tailored Business Management Systems',
    description: 'Streamline operations with intelligent systems that work exactly how your business thinks. Our custom ERP and CRM solutions automate processes, improve efficiency, and provide real-time insights.',
    icon: Settings,
    gradient: 'from-violet-400 via-violet-500 to-violet-600',
    bgColor: 'bg-violet-600',
    stats: [
      { number: '80+', label: 'ERP/CRM Systems Built' },
      { number: '60%', label: 'Process Efficiency Gain' },
      { number: '99.5%', label: 'System Reliability' },
      { number: '24/7', label: 'System Availability' }
    ],
    offerings: [
      {
        title: 'Enterprise Resource Planning',
        description: 'Comprehensive ERP solutions that integrate all your business processes seamlessly.'
      },
      {
        title: 'Customer Relationship Management',
        description: 'Advanced CRM systems to manage customer interactions and boost sales performance.'
      },
      {
        title: 'Business Process Automation',
        description: 'Automated workflows that eliminate manual tasks and reduce operational costs.'
      }
    ],
    technologies: [
      'Salesforce', 'Microsoft Dynamics', 'SAP', 'Oracle', 'Custom Development', 'API Integration',
      'Workflow Automation', 'Business Intelligence', 'Mobile Apps', 'Cloud Platforms'
    ],
    benefits: [
      {
        title: 'Integrated Operations',
        description: 'Unified platform that connects all departments and business functions.'
      },
      {
        title: 'Real-time Insights',
        description: 'Live dashboards and reports for informed decision-making.'
      },
      {
        title: 'Scalable Architecture',
        description: 'Systems that grow with your business and adapt to changing needs.'
      },
      {
        title: 'User-friendly Interface',
        description: 'Intuitive interfaces that require minimal training for your team.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Business Analysis',
        description: 'Deep dive into your business processes and system requirements.'
      },
      {
        number: '2',
        title: 'System Design',
        description: 'Custom system architecture design tailored to your workflow.'
      },
      {
        number: '3',
        title: 'Development & Integration',
        description: 'Building and integrating the system with your existing infrastructure.'
      },
      {
        number: '4',
        title: 'Training & Support',
        description: 'Comprehensive training and ongoing support for your team.'
      }
    ]
  };

  const erpServiceSchema = createServiceSchema({
    name: "Custom ERP/CRM Development",
    description: "Streamline your business with Marzelet's tailored ERP solutions. Boost productivity, manage operations, and scale efficiently with our smart enterprise tools.",
    category: "Enterprise Software Development",
    price: "Starting from ₹75,000"
  });

  return (
    <Layout>
      <SEO
        title="Custom ERP/CRM Development Services"
        description="Streamline your business with Marzelet's tailored ERP solutions. Boost productivity, manage operations, and scale efficiently with our smart enterprise tools."
        keywords="custom ERP development, CRM solutions, enterprise software, business automation, workflow management, ERP system"
        structuredData={erpServiceSchema}
      />
      <ServiceHero {...serviceData} />
      <ServiceStats stats={serviceData.stats} />
      <ServiceOfferings offerings={serviceData.offerings} />
      <ServiceTechnologies technologies={serviceData.technologies} />
      <ServiceBenefits benefits={serviceData.benefits} />
      <ServiceProcess process={serviceData.process} />
    </Layout>
  );
};

export default CustomERPCRM;


import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Server } from 'lucide-react';

const ITInfrastructure = () => {
  const serviceData = {
    title: 'IT Infrastructure Services',
    subtitle: 'Reliable Technology Foundation',
    description: 'Build bulletproof IT foundations that keep your business running smoothly 24/7. Our comprehensive infrastructure services ensure optimal performance, security, and scalability for your technology ecosystem.',
    icon: Server,
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    bgColor: 'bg-gray-600',
    stats: [
      { number: '99.9%', label: 'Network Uptime' },
      { number: '24/7', label: 'Support Coverage' },
      { number: '100+', label: 'Servers Managed' },
      { number: '< 4hr', label: 'Response Time' }
    ],
    offerings: [
      {
        title: 'Network Setup & Management',
        description: 'Complete network infrastructure design, implementation, and ongoing management.'
      },
      {
        title: 'Server Administration',
        description: 'Professional server setup, configuration, monitoring, and maintenance services.'
      },
      {
        title: 'Cloud Migration',
        description: 'Seamless migration to cloud platforms with minimal downtime and maximum efficiency.'
      }
    ],
    technologies: [
      'AWS', 'Microsoft Azure', 'Google Cloud', 'VMware', 'Docker', 'Kubernetes',
      'Linux', 'Windows Server', 'Cisco', 'Fortinet', 'Nagios', 'Zabbix'
    ],
    benefits: [
      {
        title: 'High Availability',
        description: 'Redundant systems and failover mechanisms ensure continuous operation.'
      },
      {
        title: 'Scalable Solutions',
        description: 'Infrastructure that grows with your business needs and requirements.'
      },
      {
        title: 'Proactive Monitoring',
        description: '24/7 monitoring and alerting to prevent issues before they occur.'
      },
      {
        title: 'Cost Optimization',
        description: 'Efficient resource utilization to minimize operational costs.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Infrastructure Assessment',
        description: 'Comprehensive evaluation of your current IT infrastructure and requirements.'
      },
      {
        number: '2',
        title: 'Design & Planning',
        description: 'Creating detailed infrastructure blueprints and implementation roadmaps.'
      },
      {
        number: '3',
        title: 'Implementation',
        description: 'Professional deployment of infrastructure components with minimal disruption.'
      },
      {
        number: '4',
        title: 'Monitoring & Support',
        description: 'Ongoing monitoring, maintenance, and technical support services.'
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

export default ITInfrastructure;


import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Mail } from 'lucide-react';

const EmailMarketing = () => {
  const serviceData = {
    title: 'Email Marketing Services',
    subtitle: 'Targeted Campaigns & Customer Engagement',
    description: 'Strategic email marketing campaigns that nurture leads, engage customers, and drive conversions. Our data-driven approach ensures maximum ROI through personalized messaging and automated workflows.',
    icon: Mail,
    gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-600',
    stats: [
      { number: '40%', label: 'Average Open Rate' },
      { number: '25%', label: 'Click-through Rate' },
      { number: '300%', label: 'ROI Improvement' },
      { number: '1M+', label: 'Emails Delivered' }
    ],
    offerings: [
      {
        title: 'Campaign Strategy & Design',
        description: 'Custom email templates and strategic campaign planning for maximum impact.'
      },
      {
        title: 'Marketing Automation',
        description: 'Automated email sequences for lead nurturing and customer retention.'
      },
      {
        title: 'Performance Analytics',
        description: 'Detailed reporting and insights to optimize campaign performance.'
      }
    ],
    technologies: [
      'Mailchimp', 'Constant Contact', 'SendGrid', 'AWeber', 'GetResponse', 'ConvertKit',
      'HubSpot', 'Klaviyo', 'Campaign Monitor', 'ActiveCampaign', 'Drip', 'Pardot'
    ],
    benefits: [
      {
        title: 'Personalized Messaging',
        description: 'Tailored content based on customer behavior and preferences.'
      },
      {
        title: 'Advanced Segmentation',
        description: 'Target specific customer groups with relevant messaging.'
      },
      {
        title: 'A/B Testing',
        description: 'Optimize subject lines, content, and send times for better results.'
      },
      {
        title: 'Compliance & Deliverability',
        description: 'Ensure high deliverability rates and compliance with email regulations.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Strategy Development',
        description: 'Understanding your audience and creating a comprehensive email strategy.'
      },
      {
        number: '2',
        title: 'List Building & Segmentation',
        description: 'Growing your subscriber base and organizing contacts effectively.'
      },
      {
        number: '3',
        title: 'Campaign Creation',
        description: 'Designing and writing compelling email campaigns that convert.'
      },
      {
        number: '4',
        title: 'Analysis & Optimization',
        description: 'Monitoring performance and continuously improving results.'
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

export default EmailMarketing;

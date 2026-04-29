
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Search } from 'lucide-react';

const DigitalMarketing = () => {
  const serviceData = {
    title: 'Digital Marketing',
    subtitle: 'Strategic Online Growth',
    description: 'Dominate the digital landscape and watch your brand become the talk of the internet. Our comprehensive digital marketing strategies drive traffic, engagement, and conversions across all digital channels.',
    icon: Search,
    gradient: 'from-orange-400 via-orange-500 to-orange-600',
    bgColor: 'bg-orange-600',
    stats: [
      { number: '300%', label: 'ROI Increase' },
      { number: '85%', label: 'Lead Generation' },
      { number: '200+', label: 'Campaigns Managed' },
      { number: '50M+', label: 'Impressions Generated' }
    ],
    offerings: [
      {
        title: 'Social Media Marketing',
        description: 'Strategic social media campaigns that build brand awareness and drive engagement.'
      },
      {
        title: 'PPC Advertising',
        description: 'Targeted pay-per-click campaigns that maximize ROI and drive qualified traffic.'
      },
      {
        title: 'Content Marketing',
        description: 'Compelling content strategies that attract, engage, and convert your target audience.'
      }
    ],
    technologies: [
      'Google Ads', 'Facebook Ads', 'Instagram', 'LinkedIn Ads', 'Twitter Ads', 'TikTok',
      'Google Analytics', 'SEMrush', 'Hootsuite', 'Buffer', 'Canva', 'Adobe Creative Suite'
    ],
    benefits: [
      {
        title: 'Targeted Audience Reach',
        description: 'Precise targeting to reach your ideal customers at the right time and place.'
      },
      {
        title: 'Data-Driven Insights',
        description: 'Comprehensive analytics and reporting to optimize campaign performance.'
      },
      {
        title: 'Multi-Channel Approach',
        description: 'Integrated marketing across all digital platforms for maximum impact.'
      },
      {
        title: 'Brand Building',
        description: 'Consistent brand messaging that builds trust and recognition.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Market Research',
        description: 'Understanding your target audience, competitors, and market opportunities.'
      },
      {
        number: '2',
        title: 'Strategy Development',
        description: 'Creating comprehensive digital marketing strategies aligned with business goals.'
      },
      {
        number: '3',
        title: 'Campaign Execution',
        description: 'Implementing multi-channel campaigns with creative content and targeting.'
      },
      {
        number: '4',
        title: 'Analytics & Optimization',
        description: 'Continuous monitoring and optimization for better performance and ROI.'
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

export default DigitalMarketing;

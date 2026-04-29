
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Search } from 'lucide-react';

const SEOBranding = () => {
  const serviceData = {
    title: 'SEO & Branding',
    subtitle: 'Digital Visibility & Brand Identity',
    description: 'Boost your visibility and create a brand identity that resonates with your audience. Our comprehensive SEO and branding services help you become the brand everyone searches for.',
    icon: Search,
    gradient: 'from-pink-400 via-pink-500 to-pink-600',
    bgColor: 'bg-pink-600',
    stats: [
      { number: '250%', label: 'Search Traffic Increase' },
      { number: '90%', label: 'Page 1 Rankings' },
      { number: '150+', label: 'Brands Created' },
      { number: '95%', label: 'Brand Recognition' }
    ],
    offerings: [
      {
        title: 'Search Engine Optimization',
        description: 'Comprehensive SEO strategies to improve your search rankings and organic traffic.'
      },
      {
        title: 'Brand Strategy & Identity',
        description: 'Complete brand development including strategy, identity, and visual design.'
      },
      {
        title: 'Content Strategy',
        description: 'Strategic content creation that aligns with your brand and drives engagement.'
      }
    ],
    technologies: [
      'Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog',
      'Adobe Creative Suite', 'Figma', 'Canva', 'WordPress', 'Yoast SEO', 'Schema Markup'
    ],
    benefits: [
      {
        title: 'Increased Visibility',
        description: 'Higher search rankings and improved online presence across all platforms.'
      },
      {
        title: 'Brand Recognition',
        description: 'Strong brand identity that creates lasting impressions and trust.'
      },
      {
        title: 'Organic Traffic Growth',
        description: 'Sustainable traffic growth through effective SEO strategies.'
      },
      {
        title: 'Competitive Advantage',
        description: 'Stand out from competitors with unique branding and strong SEO presence.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Brand & SEO Audit',
        description: 'Comprehensive analysis of your current brand position and SEO performance.'
      },
      {
        number: '2',
        title: 'Strategy Development',
        description: 'Creating integrated branding and SEO strategies for maximum impact.'
      },
      {
        number: '3',
        title: 'Implementation',
        description: 'Executing brand identity design and SEO optimization techniques.'
      },
      {
        number: '4',
        title: 'Monitoring & Optimization',
        description: 'Continuous monitoring and refinement for sustained growth.'
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

export default SEOBranding;

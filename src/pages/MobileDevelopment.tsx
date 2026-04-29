
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Smartphone } from 'lucide-react';

const MobileDevelopment = () => {
  const serviceData = {
    title: 'Mobile App Development',
    subtitle: 'Native and Cross-Platform Solutions',
    description: 'Create powerful mobile applications that engage users and drive business growth. Our expert developers use cutting-edge technologies to build native and cross-platform apps that deliver exceptional user experiences.',
    icon: Smartphone,
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    bgColor: 'bg-purple-600',
    stats: [
      { number: '150+', label: 'Apps Created' },
      { number: '4.8/5', label: 'App Store Rating' },
      { number: '99.9%', label: 'Uptime Guarantee' },
      { number: '100%', label: 'Responsive Design' }
    ],
    offerings: [
      {
        title: 'Native iOS & Android Development',
        description: 'Platform-specific apps built with Swift, Kotlin, and Java for optimal performance and user experience.'
      },
      {
        title: 'Cross-Platform Development',
        description: 'Cost-effective solutions using React Native, Flutter, and Xamarin for multiple platforms.'
      },
      {
        title: 'App Store Optimization',
        description: 'Complete app store submission, optimization, and maintenance for maximum visibility and downloads.'
      }
    ],
    technologies: [
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Xamarin',
      'Firebase', 'MongoDB', 'AWS', 'Google Play Console', 'App Store Connect', 'Redux'
    ],
    benefits: [
      {
        title: 'Cross-Platform Compatibility',
        description: 'Apps that work seamlessly across iOS and Android platforms with shared codebase.'
      },
      {
        title: 'Offline Functionality',
        description: 'Smart caching and offline capabilities to ensure your app works without internet.'
      },
      {
        title: 'Push Notifications',
        description: 'Engaging push notification systems to keep users connected and active.'
      },
      {
        title: 'App Analytics',
        description: 'Comprehensive analytics and crash reporting for continuous improvement.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Strategy & Planning',
        description: 'Understanding your app requirements, target audience, and platform strategy.'
      },
      {
        number: '2',
        title: 'Design & Prototyping',
        description: 'Creating intuitive UI/UX designs and interactive prototypes for validation.'
      },
      {
        number: '3',
        title: 'Development & Testing',
        description: 'Building your app with robust testing on real devices and platforms.'
      },
      {
        number: '4',
        title: 'Launch & Support',
        description: 'App store submission, launch support, and ongoing maintenance.'
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

export default MobileDevelopment;

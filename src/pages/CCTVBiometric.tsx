
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Camera } from 'lucide-react';

const CCTVBiometric = () => {
  const serviceData = {
    title: 'CCTV & Biometric Installation',
    subtitle: 'Advanced Security Solutions',
    description: 'Protect your assets with state-of-the-art CCTV surveillance and biometric access control systems. Our comprehensive security solutions provide 24/7 monitoring, advanced threat detection, and seamless access management for complete peace of mind.',
    icon: Camera,
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    bgColor: 'bg-slate-600',
    stats: [
      { number: '1000+', label: 'Cameras Installed' },
      { number: '24/7', label: 'Monitoring Support' },
      { number: '99.9%', label: 'System Uptime' },
      { number: '50+', label: 'Locations Secured' }
    ],
    offerings: [
      {
        title: 'CCTV Surveillance Systems',
        description: 'High-definition camera installations with remote monitoring, night vision, and intelligent motion detection.'
      },
      {
        title: 'Biometric Access Control',
        description: 'Fingerprint, facial recognition, and iris scanning systems for secure facility access management.'
      },
      {
        title: 'Integrated Security Solutions',
        description: 'Complete security ecosystems combining CCTV, access control, and alarm systems for maximum protection.'
      }
    ],
    technologies: [
      'IP Cameras', 'NVR Systems', 'Hikvision', 'Dahua', 'Axis Communications', 'Bosch',
      'Fingerprint Scanners', 'Facial Recognition', 'RFID Systems', 'Cloud Storage', 'Mobile Apps', 'AI Analytics'
    ],
    benefits: [
      {
        title: '24/7 Surveillance',
        description: 'Round-the-clock monitoring and recording for continuous security coverage.'
      },
      {
        title: 'Remote Access',
        description: 'Monitor your premises from anywhere using mobile apps and web interfaces.'
      },
      {
        title: 'Advanced Analytics',
        description: 'AI-powered analytics for intelligent threat detection and behavior analysis.'
      },
      {
        title: 'Scalable Solutions',
        description: 'Systems that can grow with your business needs and security requirements.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Security Assessment',
        description: 'Comprehensive evaluation of your premises to identify security vulnerabilities and requirements.'
      },
      {
        number: '2',
        title: 'System Design',
        description: 'Custom security system design tailored to your specific needs and budget.'
      },
      {
        number: '3',
        title: 'Professional Installation',
        description: 'Expert installation of cameras, access control systems, and monitoring equipment.'
      },
      {
        number: '4',
        title: 'Training & Support',
        description: 'Comprehensive training and ongoing technical support for optimal system performance.'
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

export default CCTVBiometric;

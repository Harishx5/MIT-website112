
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { Zap } from 'lucide-react';

const IoTEmbedded = () => {
  const serviceData = {
    title: 'IoT & Embedded Solutions',
    subtitle: 'Smart Connected Devices',
    description: 'Connect everything and create smart ecosystems that revolutionize how you work. Our IoT and embedded solutions enable real-time monitoring, automation, and intelligent decision-making.',
    icon: Zap,
    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-600',
    stats: [
      { number: '500+', label: 'Connected Devices' },
      { number: '99.8%', label: 'Device Uptime' },
      { number: '50+', label: 'IoT Projects' },
      { number: '24/7', label: 'Real-time Monitoring' }
    ],
    offerings: [
      {
        title: 'Smart Device Development',
        description: 'Custom IoT devices with sensors, connectivity, and intelligent data processing.'
      },
      {
        title: 'Sensor Integration',
        description: 'Advanced sensor networks for environmental monitoring and data collection.'
      },
      {
        title: 'Automation Systems',
        description: 'Intelligent automation solutions that respond to real-time data and conditions.'
      }
    ],
    technologies: [
      'Arduino', 'Raspberry Pi', 'ESP32', 'LoRaWAN', 'WiFi', 'Bluetooth',
      'MQTT', 'CoAP', 'Edge Computing', 'Cloud Platforms', 'Machine Learning', 'AI'
    ],
    benefits: [
      {
        title: 'Real-time Monitoring',
        description: 'Continuous monitoring and data collection from connected devices.'
      },
      {
        title: 'Predictive Maintenance',
        description: 'AI-powered analytics to predict and prevent equipment failures.'
      },
      {
        title: 'Energy Efficiency',
        description: 'Smart energy management and optimization for cost savings.'
      },
      {
        title: 'Remote Control',
        description: 'Monitor and control devices from anywhere in the world.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Requirement Analysis',
        description: 'Understanding your IoT needs and defining system requirements.'
      },
      {
        number: '2',
        title: 'Hardware Design',
        description: 'Designing and prototyping custom IoT hardware solutions.'
      },
      {
        number: '3',
        title: 'Software Development',
        description: 'Developing firmware, mobile apps, and cloud platforms.'
      },
      {
        number: '4',
        title: 'Deployment & Monitoring',
        description: 'System deployment with ongoing monitoring and maintenance.'
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

export default IoTEmbedded;

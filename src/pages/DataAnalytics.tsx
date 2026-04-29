
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { BarChart3 } from 'lucide-react';

const DataAnalytics = () => {
  const serviceData = {
    title: 'Data Analytics',
    subtitle: 'Transform Data into Insights',
    description: 'Unlock the power of your data with advanced analytics solutions. We help businesses make data-driven decisions through comprehensive analysis, visualization, and predictive modeling that drives growth and operational efficiency.',
    icon: BarChart3,
    gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-600',
    stats: [
      { number: '500TB+', label: 'Data Processed' },
      { number: '95%', label: 'Accuracy Rate' },
      { number: '60%', label: 'Decision Speed' },
      { number: '40+', label: 'Analytics Models' }
    ],
    offerings: [
      {
        title: 'Business Intelligence',
        description: 'Comprehensive BI solutions that transform raw data into actionable business insights and strategic advantages.'
      },
      {
        title: 'Predictive Analytics',
        description: 'Advanced modeling and machine learning algorithms to forecast trends and predict future outcomes.'
      },
      {
        title: 'Data Visualization',
        description: 'Interactive dashboards and reports that make complex data easy to understand and act upon.'
      }
    ],
    technologies: [
      'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Apache Spark',
      'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'D3.js', 'Elasticsearch'
    ],
    benefits: [
      {
        title: 'Data-Driven Decisions',
        description: 'Make informed decisions based on concrete data insights rather than intuition alone.'
      },
      {
        title: 'Real-Time Analytics',
        description: 'Get instant insights with real-time data processing and live dashboard updates.'
      },
      {
        title: 'Predictive Modeling',
        description: 'Anticipate future trends and outcomes with advanced predictive analytics.'
      },
      {
        title: 'Cost Optimization',
        description: 'Identify cost-saving opportunities and optimize resource allocation through data analysis.'
      }
    ],
    process: [
      {
        number: '1',
        title: 'Data Assessment',
        description: 'Evaluating your current data infrastructure and identifying analytics opportunities.'
      },
      {
        number: '2',
        title: 'Data Collection & Cleaning',
        description: 'Gathering, organizing, and preparing your data for comprehensive analysis.'
      },
      {
        number: '3',
        title: 'Analysis & Modeling',
        description: 'Applying statistical models and machine learning algorithms to extract insights.'
      },
      {
        number: '4',
        title: 'Visualization & Reporting',
        description: 'Creating interactive dashboards and automated reports for ongoing insights.'
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

export default DataAnalytics;

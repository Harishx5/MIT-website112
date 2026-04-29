import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ServiceHero from '@/components/Services/ServiceHero';
import ServiceStats from '@/components/Services/ServiceStats';
import ServiceOfferings from '@/components/Services/ServiceOfferings';
import ServiceProcess from '@/components/Services/ServiceProcess';
import ServiceTechnologies from '@/components/Services/ServiceTechnologies';
import ServiceBenefits from '@/components/Services/ServiceBenefits';
import { supabase } from '@/integrations/supabase/client';
import { Code, Smartphone, Database, BarChart3, Server, Shield, Settings, Zap, Search, Palette, Monitor, Headphones, GraduationCap, Mail, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  icon: string | null;
  image: string | null;
  features: string[];
  technologies: string[];
  delivery_time: string | null;
  category: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching service:', error);
          toast.error('Failed to load service details');
          setNotFound(true);
          return;
        }

        if (!data) {
          setNotFound(true);
          return;
        }

        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const getIconComponent = (iconName: string | null): React.ComponentType<any> => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      'code': Code,
      'smartphone': Smartphone,
      'bar-chart': BarChart3,
      'palette': Palette,
      'monitor': Monitor,
      'search': Search,
      'server': Server,
      'headphones': Headphones,
      'shield': Shield,
      'settings': Settings,
      'zap': Zap,
      'graduation-cap': GraduationCap,
      'mail': Mail,
      'camera': Camera,
      'database': Database,
    };
    return icons[iconName || 'monitor'] || Monitor;
  };

  const getServiceGradient = (category: string | null) => {
    const gradients: { [key: string]: string } = {
      'web-design-web-development': 'from-service-web/80 via-service-web to-service-web',
      'web-development': 'from-service-web/80 via-service-web to-service-web',
      'mobile-app-development': 'from-service-mobile/80 via-service-mobile to-service-mobile',
      'mobile-development': 'from-service-mobile/80 via-service-mobile to-service-mobile',
      'uiux-design': 'from-service-design/80 via-service-design to-service-design',
      'ui-ux-design': 'from-service-design/80 via-service-design to-service-design',
      'software-development': 'from-service-software/80 via-service-software to-service-software',
      'data-analytics': 'from-service-analytics/80 via-service-analytics to-service-analytics',
      'it-infrastructure-services': 'from-service-infrastructure/80 via-service-infrastructure to-service-infrastructure',
      'it-infrastructure': 'from-service-infrastructure/80 via-service-infrastructure to-service-infrastructure',
      'business-consulting': 'from-service-consulting/80 via-service-consulting to-service-consulting',
      'cybersecurity': 'from-service-security/80 via-service-security to-service-security',
      'custom-erp-crm-development': 'from-service-automation/80 via-service-automation to-service-automation',
      'custom-erp-crm': 'from-service-automation/80 via-service-automation to-service-automation',
      'iot-embedded-solutions': 'from-service-iot/80 via-service-iot to-service-iot',
      'iot-embedded': 'from-service-iot/80 via-service-iot to-service-iot',
      'internship-skill-training': 'from-service-training/80 via-service-training to-service-training',
      'internship-training': 'from-service-training/80 via-service-training to-service-training',
      'cctv-biometric-installation': 'from-service-surveillance/80 via-service-surveillance to-service-surveillance',
      'cctv-biometric': 'from-service-surveillance/80 via-service-surveillance to-service-surveillance',
      'default': 'from-service-web/80 via-service-web to-service-web'
    };
    return gradients[category || 'default'] || gradients.default;
  };

  const getServiceBgColor = (category: string | null) => {
    const bgColors: { [key: string]: string } = {
      'web-design-web-development': 'bg-service-web',
      'web-development': 'bg-service-web',
      'mobile-app-development': 'bg-service-mobile', 
      'mobile-development': 'bg-service-mobile',
      'uiux-design': 'bg-service-design',
      'ui-ux-design': 'bg-service-design',
      'software-development': 'bg-service-software',
      'data-analytics': 'bg-service-analytics',
      'it-infrastructure-services': 'bg-service-infrastructure',
      'it-infrastructure': 'bg-service-infrastructure',
      'business-consulting': 'bg-service-consulting',
      'cybersecurity': 'bg-service-security',
      'custom-erp-crm-development': 'bg-service-automation',
      'custom-erp-crm': 'bg-service-automation',
      'iot-embedded-solutions': 'bg-service-iot',
      'iot-embedded': 'bg-service-iot',
      'internship-skill-training': 'bg-service-training',
      'internship-training': 'bg-service-training',
      'cctv-biometric-installation': 'bg-service-surveillance',
      'cctv-biometric': 'bg-service-surveillance',
      'default': 'bg-service-web'
    };
    return bgColors[category || 'default'] || bgColors.default;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading service details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !service) {
    return <Navigate to="/404" replace />;
  }

  // Build service data for components
  const serviceData = {
    title: service.name,
    subtitle: service.category ? `${service.category.charAt(0).toUpperCase()}${service.category.slice(1)} Solutions` : 'Professional Solutions',
    description: service.long_description || service.short_description,
    icon: getIconComponent(service.icon),
    gradient: getServiceGradient(service.category),
    bgColor: getServiceBgColor(service.category),
    stats: [
      { number: '150+', label: 'Projects Completed' },
      { number: '98%', label: 'Client Satisfaction' },
      { number: '24/7', label: 'Support Available' },
      { number: '100%', label: 'Quality Assured' }
    ],
    offerings: service.features.slice(0, 3).map((feature, index) => ({
      title: feature,
      description: `Professional ${feature.toLowerCase()} services tailored to your business needs.`
    })),
    technologies: service.technologies,
    benefits: service.features.slice(0, 4).map((feature, index) => ({
      title: feature,
      description: `Advanced ${feature.toLowerCase()} capabilities to enhance your business operations.`
    })),
    process: [
      {
        number: '1',
        title: 'Discovery & Planning',
        description: 'Understanding your requirements and creating a comprehensive project plan.'
      },
      {
        number: '2',
        title: 'Design & Development',
        description: 'Creating and building solutions with attention to detail and quality.'
      },
      {
        number: '3',
        title: 'Testing & Quality Assurance',
        description: 'Rigorous testing to ensure everything works perfectly before delivery.'
      },
      {
        number: '4',
        title: 'Launch & Support',
        description: 'Successful deployment with ongoing support and maintenance.'
      }
    ]
  };

  return (
    <Layout>
      <ServiceHero {...serviceData} />
      <ServiceStats stats={serviceData.stats} />
      <ServiceOfferings offerings={serviceData.offerings} bgColor={serviceData.bgColor} />
      <ServiceTechnologies technologies={serviceData.technologies} />
      <ServiceBenefits benefits={serviceData.benefits} bgColor={serviceData.bgColor} />
      <ServiceProcess process={serviceData.process} bgColor={serviceData.bgColor} />
    </Layout>
  );
};

export default ServiceDetail;
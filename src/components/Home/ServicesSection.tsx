
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowRight, Code, Smartphone, Database, BarChart3, Server, Shield, Settings, Zap, Search, Palette, Monitor, Headphones, GraduationCap, Mail, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  icon: string;
  image?: string;
  features: string[];
  is_active: boolean;
  display_order: number;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const servicesPerPage = 6;

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, name, slug, short_description, icon, image, features, is_active, display_order')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }

        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'code': <Code className="h-8 w-8 text-white" />,
      'smartphone': <Smartphone className="h-8 w-8 text-white" />,
      'bar-chart': <BarChart3 className="h-8 w-8 text-white" />,
      'palette': <Palette className="h-8 w-8 text-white" />,
      'monitor': <Monitor className="h-8 w-8 text-white" />,
      'search': <Search className="h-8 w-8 text-white" />,
      'server': <Server className="h-8 w-8 text-white" />,
      'headphones': <Headphones className="h-8 w-8 text-white" />,
      'shield': <Shield className="h-8 w-8 text-white" />,
      'settings': <Settings className="h-8 w-8 text-white" />,
      'zap': <Zap className="h-8 w-8 text-white" />,
      'graduation-cap': <GraduationCap className="h-8 w-8 text-white" />,
      'mail': <Mail className="h-8 w-8 text-white" />,
      'camera': <Camera className="h-8 w-8 text-white" />,
    };
    return icons[iconName] || <Monitor className="h-8 w-8 text-white" />;
  };

  // Generate catchy text and colors for services using semantic tokens
  const getServiceDisplayData = (service: Service) => {
    const serviceDisplayMap: { [key: string]: { catchyText: string; color: string } } = {
      'web-design-web-development': {
        catchyText: '🚀 Launch your digital empire with stunning websites!',
        color: 'bg-service-web'
      },
      'mobile-app-development': {
        catchyText: '📱 Turn your vision into the next big app sensation!',
        color: 'bg-service-mobile'
      },
      'data-analytics': {
        catchyText: '📊 Transform raw data into pure business gold!',
        color: 'bg-service-analytics'
      },
      'uiux-design': {
        catchyText: '🎨 Design experiences that leave users speechless!',
        color: 'bg-service-design'
      },
      'software-development': {
        catchyText: '💻 Engineer software that changes the game!',
        color: 'bg-service-software'
      },
      'it-infrastructure-services': {
        catchyText: '⚡ Power up with infrastructure that never fails!',
        color: 'bg-service-infrastructure'
      },
      'business-consulting': {
        catchyText: '🧠 Unlock your business potential with expert guidance!',
        color: 'bg-service-consulting'
      },
      'cybersecurity': {
        catchyText: '🛡️ Become unbreachable in the digital battlefield!',
        color: 'bg-service-security'
      },
      'custom-erp-crm-development': {
        catchyText: '⚙️ Automate success with systems built for you!',
        color: 'bg-service-automation'
      },
      'iot-embedded-solutions': {
        catchyText: '🌐 Make everything smart and connected!',
        color: 'bg-service-iot'
      },
      'internship-skill-training': {
        catchyText: '🎓 Launch careers that change the world!',
        color: 'bg-service-training'
      },
      'cctv-biometric-installation': {
        catchyText: '👁️ Watch over what matters most to you!',
        color: 'bg-service-surveillance'
      }
    };

    return serviceDisplayMap[service.slug] || {
      catchyText: '✨ Transform your business with our expertise!',
      color: 'bg-service-web'
    };
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex + servicesPerPage < services.length) {
      setCurrentIndex(currentIndex + servicesPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - servicesPerPage);
    }
  };

  const handleViewDetails = (serviceSlug: string) => {
    navigate(`/services/${serviceSlug}`);
  };

  if (loading) {
    return (
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`} id="services">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`} id="services">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-3`}>
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Our services are currently being updated. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentServices = services.slice(currentIndex, currentIndex + servicesPerPage);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + servicesPerPage < services.length;

  const ArrowNavigation = () => (
    <div className="flex justify-between items-center mb-6 px-4">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${
          theme === 'light' 
            ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' 
            : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'
        }`}
      >
        <ChevronLeft className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.ceil(services.length / servicesPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * servicesPerPage)}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / servicesPerPage) === index
                ? 'bg-primary'
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={!canGoNext}
        className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${
          theme === 'light' 
            ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' 
            : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'
        }`}
      >
        <ChevronRight className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
    </div>
  );

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`} id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-3`}>
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Comprehensive digital solutions tailored to transform your business and drive growth
          </p>
          <p className="text-base text-blue-600 font-semibold">
            ✨ Discover services that will revolutionize your business ✨
          </p>
        </div>

        <div className="relative">
          <ArrowNavigation />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentServices.map((service, index) => {
              const displayData = getServiceDisplayData(service);
              return (
                <Card key={service.id} className={`backdrop-blur border transition-all duration-300 group hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-card/50 border-border/50 hover:bg-card/70' 
                    : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70'
                }`}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${displayData.color} rounded-2xl flex items-center justify-center mb-3`}>
                      {service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="h-8 w-8 object-contain" 
                        />
                      ) : (
                        getIconComponent(service.icon)
                      )}
                    </div>
                    <CardTitle className={`text-lg mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{service.name}</CardTitle>
                    <CardDescription className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {service.short_description}
                    </CardDescription>
                    <div className="text-blue-600 font-semibold text-sm mt-2">
                      {displayData.catchyText}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-4">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className={`flex items-center text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                          <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-sm"
                      onClick={() => handleViewDetails(service.slug)}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <ArrowNavigation />
          
          <div className="text-center">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Use ← → arrow keys to navigate or click the arrows above/below
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

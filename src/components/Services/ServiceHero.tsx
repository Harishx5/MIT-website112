import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  bgColor: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  bgColor
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    // First navigate to home page, then scroll to section
    navigate('/', { replace: true });
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToServices = () => {
    navigate('/services');
  };

  const navigateToPortfolio = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio-section');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className={`relative py-20 overflow-hidden ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation Breadcrumb with proper spacing from header */}
        <div className="flex items-center gap-2 mb-8 mt-8 lg:mt-12">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className={`${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>
            <Home className="h-4 w-4 mr-1" />
            Home
          </Button>
          <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>/</span>
          <Button variant="ghost" size="sm" onClick={navigateToServices} className={`text-sm ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>
            Services
          </Button>
          <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>/</span>
          <span className="text-sm text-primary font-medium">{title}</span>
        </div>

        {/* Back to Services Link */}
        <div className="mb-6">
          <div 
            onClick={navigateToServices} 
            className={`flex items-center gap-2 cursor-pointer hover:text-primary transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center shadow-xl`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent leading-tight pb-2`}>
                  {title}
                </h1>
              </div>
            </div>
            
            <p className={`text-xl leading-relaxed mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className={`${bgColor} hover:opacity-90 text-white px-8 py-3 shadow-xl`} onClick={() => scrollToSection('contact-section')}>
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" onClick={navigateToPortfolio}>
                View Our Work
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className={`w-80 h-80 ${bgColor} rounded-full opacity-20 animate-pulse`} />
              <div className={`absolute inset-0 w-80 h-80 bg-gradient-to-r ${gradient} rounded-full opacity-30 animate-spin-slow`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 ${bgColor} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <Icon className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

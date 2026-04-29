import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Star, CheckCircle, Users, Award, Clock, TrendingUp, Trophy, Target, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { createServiceSchema } from '@/utils/structuredData';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'Web Design & Development',
      description: 'Transform your digital presence with cutting-edge websites that captivate and convert visitors into loyal customers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
      link: '/services/web-development',
      category: 'Development',
      price: 'Starting from ₹25,000',
      featured: true,
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom CMS'],
      benefits: ['Increase Online Presence', 'Better User Experience', 'Higher Conversion Rates', 'Mobile Optimized'],
      deliveryTime: '2-4 weeks',
      clientsServed: '150+',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Create powerful mobile applications that engage users and drive business growth across iOS and Android platforms.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80',
      link: '/services/mobile-development',
      category: 'Development',
      price: 'Starting from ₹50,000',
      featured: true,
      features: ['Native & Cross-Platform', 'App Store Optimization', 'Push Notifications', 'Analytics Integration'],
      benefits: ['Reach Mobile Users', 'Increase Engagement', 'Brand Recognition', 'Revenue Growth'],
      deliveryTime: '4-8 weeks',
      clientsServed: '80+',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Software Development',
      description: 'Build robust, scalable software solutions tailored to your business needs with cutting-edge technologies.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=500&q=80',
      link: '/services/software-development',
      category: 'Development',
      price: 'Starting from ₹40,000',
      featured: false,
      features: ['Custom Solutions', 'Cloud Integration', 'API Development', 'Maintenance Support'],
      benefits: ['Automate Processes', 'Reduce Costs', 'Improve Efficiency', 'Scalable Architecture'],
      deliveryTime: '6-12 weeks',
      clientsServed: '60+',
      rating: 4.9
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Boost your online presence with comprehensive digital marketing strategies that drive traffic and conversions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
      link: '/services/digital-marketing',
      category: 'Marketing',
      price: 'Starting from ₹15,000',
      featured: true,
      features: ['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Content Strategy'],
      benefits: ['Increase Visibility', 'Generate Leads', 'Brand Awareness', 'ROI Tracking'],
      deliveryTime: 'Ongoing',
      clientsServed: '200+',
      rating: 4.7
    },
    {
      id: 5,
      title: 'Custom ERP/CRM Development',
      description: 'Streamline your business operations with intelligent enterprise systems designed for your specific workflows.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80',
      link: '/services/erp-crm',
      category: 'Enterprise',
      price: 'Starting from ₹75,000',
      featured: false,
      features: ['Workflow Automation', 'Data Analytics', 'Multi-user Access', 'Cloud Deployment'],
      benefits: ['Centralized Data', 'Process Efficiency', 'Better Decision Making', 'Cost Reduction'],
      deliveryTime: '8-16 weeks',
      clientsServed: '35+',
      rating: 4.9
    },
    {
      id: 6,
      title: 'IoT & Embedded Solutions',
      description: 'Connect and automate your devices with smart IoT solutions that bring intelligence to your operations.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      link: '/services/iot-embedded',
      category: 'Technology',
      price: 'Starting from ₹35,000',
      featured: false,
      features: ['Device Integration', 'Real-time Monitoring', 'Data Collection', 'Remote Control'],
      benefits: ['Automation', 'Cost Savings', 'Real-time Insights', 'Predictive Maintenance'],
      deliveryTime: '4-10 weeks',
      clientsServed: '25+',
      rating: 4.8
    },
    {
      id: 7,
      title: 'SEO & Branding',
      description: 'Enhance your brand identity and search engine rankings with strategic SEO and branding solutions.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=500&q=80',
      link: '/services/seo-branding',
      category: 'Marketing',
      price: 'Starting from ₹20,000',
      featured: true,
      features: ['Brand Strategy', 'Logo Design', 'SEO Optimization', 'Content Marketing'],
      benefits: ['Brand Recognition', 'Search Visibility', 'Customer Trust', 'Market Positioning'],
      deliveryTime: '3-6 weeks',
      clientsServed: '120+',
      rating: 4.8
    },
    {
      id: 8,
      title: 'Email Marketing Services',
      description: 'Engage your audience with personalized email campaigns that drive conversions and build relationships.',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=500&q=80',
      link: '/services/email-marketing',
      category: 'Marketing',
      price: 'Starting from ₹10,000',
      featured: false,
      features: ['Campaign Design', 'Automation', 'A/B Testing', 'Analytics'],
      benefits: ['Higher ROI', 'Customer Retention', 'Lead Nurturing', 'Brand Loyalty'],
      deliveryTime: '1-2 weeks',
      clientsServed: '90+',
      rating: 4.7
    },
    {
      id: 9,
      title: 'UI/UX Design',
      description: 'Create intuitive and engaging user experiences that delight your customers and drive business success.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80',
      link: '/services/ui-ux-design',
      category: 'Design',
      price: 'Starting from ₹30,000',
      featured: true,
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      benefits: ['Better User Experience', 'Higher Conversions', 'Brand Consistency', 'User Satisfaction'],
      deliveryTime: '3-6 weeks',
      clientsServed: '70+',
      rating: 4.9
    },
    {
      id: 10,
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
      link: '/services/data-analytics',
      category: 'Analytics',
      price: 'Starting from ₹25,000',
      featured: false,
      features: ['Data Visualization', 'Predictive Analytics', 'Custom Dashboards', 'Reporting'],
      benefits: ['Data-Driven Decisions', 'Performance Insights', 'Cost Optimization', 'Growth Opportunities'],
      deliveryTime: '4-8 weeks',
      clientsServed: '45+',
      rating: 4.8
    },
    {
      id: 11,
      title: 'IT Infrastructure',
      description: 'Build and maintain robust IT infrastructure that supports your business growth and ensures security.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80',
      link: '/services/it-infrastructure',
      category: 'Infrastructure',
      price: 'Starting from ₹20,000',
      featured: false,
      features: ['Network Setup', 'Cloud Migration', 'Security Implementation', '24/7 Support'],
      benefits: ['Reliable Operations', 'Enhanced Security', 'Cost Efficiency', 'Scalable Solutions'],
      deliveryTime: '2-6 weeks',
      clientsServed: '55+',
      rating: 4.7
    },
    {
      id: 12,
      title: 'Business Consulting',
      description: 'Get strategic guidance and expert advice to transform your business and achieve sustainable growth.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80',
      link: '/services/business-consulting',
      category: 'Consulting',
      price: 'Starting from ₹15,000',
      featured: false,
      features: ['Strategy Planning', 'Process Optimization', 'Digital Transformation', 'Market Analysis'],
      benefits: ['Strategic Direction', 'Operational Excellence', 'Competitive Advantage', 'Growth Acceleration'],
      deliveryTime: '2-8 weeks',
      clientsServed: '40+',
      rating: 4.9
    }
  ];

  // Filter out removed services (SEO & Branding, Email Marketing, Digital Marketing)
  const activeServices = services.filter(service => 
    ![4, 7, 8].includes(service.id) // Exclude Digital Marketing (4), SEO & Branding (7), Email Marketing (8)
  );

  const filteredServices = activeServices.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(activeServices.map(service => service.category))];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": activeServices.map(service => createServiceSchema({
      name: service.title,
      description: service.description,
      category: service.category,
      price: service.price
    }))
  };

  return (
    <Layout>
      <SEO
        title="Comprehensive IT Services - USA, UK, Canada & UAE"
        description="Explore our full range of IT services including custom software development, ERP, cloud migration, IoT, mobile apps, and infrastructure consulting."
        keywords="IT services, software development, web development, mobile app development, ERP solutions, IoT services, UI/UX design, data analytics, business consulting"
        structuredData={servicesSchema}
        hreflang={[
          { hreflang: 'en-us', href: 'https://marzelet.info/services' },
          { hreflang: 'en-gb', href: 'https://marzelet.info/services' },
          { hreflang: 'en-ca', href: 'https://marzelet.info/services' },
          { hreflang: 'en-au', href: 'https://marzelet.info/services' },
          { hreflang: 'en-ae', href: 'https://marzelet.info/services' }
        ]}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Professional <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive digital solutions designed to transform your business and drive sustainable growth
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search services..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" 
              />
            </div>
          </div>
        </div>
      </section>


      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden bg-white dark:bg-gray-800"
                onClick={() => navigate(service.link)}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}
                
                {/* Service Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors mb-2">
                    {service.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  {/* Service Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{service.clientsServed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>Certified</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Benefits:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                          <TrendingUp className="h-3 w-3 text-blue-500 mr-1 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  
                  <Button 
                    className="w-full group-hover:bg-blue-700 transition-colors" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.link);
                    }}
                  >
                    Learn More & Get Quote
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or browse all our services.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore our comprehensive range of professional services
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-blue-600 hover:text-white transition-colors"
                onClick={() => setSearchTerm(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Marzelet?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that drive real results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">20+ Projects</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Successfully delivered across various industries</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Certified professionals with years of experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">98% projects delivered within agreed timelines</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Round-the-clock support for all our services</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

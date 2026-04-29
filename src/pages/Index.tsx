<<<<<<< HEAD
import React, { Suspense } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import MobileOptimizedSkeleton from '@/components/MobileOptimizedSkeleton';
import { useTheme } from '@/contexts/ThemeContext';
import { ServicesSection, AboutSection, PortfolioGrid, ClientReviews, TrustedPartners, FAQSection, BlogSection, ContactSection } from '@/components/LazyComponents';
import SEO from '@/components/SEO';
import { createOrganizationSchema, createLocalBusinessSchema, createWebsiteSchema } from '@/utils/structuredData';
import TestSupabaseConnection from '@/components/TestSupabaseConnection';

// Optimized loading components with reduced height for faster perceived loading
const SectionLoader = ({
  height = "h-16"
}: {
  height?: string;
}) => <div className="py-4">
    <MobileOptimizedSkeleton height={height} rows={2} />
  </div>;
const Index = () => {
  const {
    theme
  } = useTheme();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [createOrganizationSchema(), createLocalBusinessSchema(), createWebsiteSchema()]
  };
  return <Layout>
      <SEO title="Best Software Development Company in USA, UK, Canada & UAE" description="Marzelet Info Technology Pvt Ltd offers custom software, cloud and to help businesses grow with smart IT solutions. Contact us today!" keywords="software development company, custom software development, web development, mobile app development, ERP solutions, IT services USA, UK, Canada, UAE, Chennai" structuredData={structuredData} hreflang={[{
      hreflang: 'en-us',
      href: 'https://marzelet.info/'
    }, {
      hreflang: 'en-gb',
      href: 'https://marzelet.info/'
    }, {
      hreflang: 'en-ca',
      href: 'https://marzelet.info/'
    }, {
      hreflang: 'en-au',
      href: 'https://marzelet.info/'
    }, {
      hreflang: 'en-ae',
      href: 'https://marzelet.info/'
    }]} />
      {/* Hero Section - Critical, load immediately */}
      <section id="hero-section">
        <HeroSection />
      </section>
      
      {/* Supabase Connection Test */}
      
      
      {/* About Section - High priority */}
      <section id="about-section">
        <Suspense fallback={<SectionLoader height="h-20" />}>
          <AboutSection />
        </Suspense>
      </section>
      
      {/* Services Section - High priority */}
      <section id="services-section">
        <Suspense fallback={<SectionLoader height="h-24" />}>
          <ServicesSection />
        </Suspense>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio-section" className={`py-16 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Discover our latest projects showcasing cutting-edge technology solutions that 
              have transformed businesses across various industries.
            </p>
          </div>
        </div>
        <Suspense fallback={<SectionLoader height="h-32" />}>
          <PortfolioGrid />
        </Suspense>
      </section>
      
      {/* Client Reviews - Lower priority */}
      <Suspense fallback={<SectionLoader height="h-24" />}>
        <ClientReviews />
      </Suspense>
      
      {/* Trusted Partners - Lower priority */}
      <Suspense fallback={<SectionLoader height="h-16" />}>
        <TrustedPartners />
      </Suspense>
      
      {/* Blog Section - Lower priority */}
      <section id="blog-section">
        <Suspense fallback={<SectionLoader height="h-28" />}>
          <BlogSection />
        </Suspense>
      </section>
      
      {/* FAQ Section - Lower priority */}
      <Suspense fallback={<SectionLoader height="h-24" />}>
        <FAQSection />
      </Suspense>
      
      {/* Contact Section - Lower priority */}
      <section id="contact-section">
        <Suspense fallback={<SectionLoader height="h-32" />}>
          <ContactSection />
        </Suspense>
      </section>
    </Layout>;
};
export default Index;
=======
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1

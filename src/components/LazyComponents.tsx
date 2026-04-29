
import { lazy } from 'react';

// Optimize component imports with proper chunking
export const ServicesSection = lazy(() => 
  import('./Home/ServicesSection').then(module => ({
    default: module.default
  }))
);

export const AboutSection = lazy(() => 
  import('./Home/AboutSection').then(module => ({
    default: module.default
  }))
);

export const PortfolioGrid = lazy(() => 
  import('./Portfolio/PortfolioGrid').then(module => ({
    default: module.default
  }))
);

export const ClientReviews = lazy(() => 
  import('./Home/ClientReviews').then(module => ({
    default: module.default
  }))
);

export const TrustedPartners = lazy(() => 
  import('./Home/TrustedPartners').then(module => ({
    default: module.default
  }))
);

export const FAQSection = lazy(() => 
  import('./Home/FAQSection').then(module => ({
    default: module.default
  }))
);

export const BlogSection = lazy(() => 
  import('./Home/BlogSection').then(module => ({
    default: module.default
  }))
);

export const ContactSection = lazy(() => 
  import('./Home/ContactSection').then(module => ({
    default: module.default
  }))
);

export const CaseStudies = lazy(() => 
  import('../pages/CaseStudies').then(module => ({
    default: module.default
  }))
);

export const AdminCaseStudies = lazy(() => 
  import('./Admin/AdminCaseStudies').then(module => ({
    default: module.default
  }))
);


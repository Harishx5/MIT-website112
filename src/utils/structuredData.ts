export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marzelet Info Technology Pvt Ltd",
  "url": "https://marzelet.info",
  "logo": "https://marzelet.info/images/new-marzelet-logo.png",
  "description": "Leading IT company in Chennai providing custom software development, web development, mobile apps, ERP solutions, and digital transformation services globally",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chennai",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600001",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-96299-97391",
    "contactType": "customer service",
    "email": "info@marzelet.info",
    "availableLanguage": ["English", "Hindi", "Tamil"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/marzelet",
    "https://twitter.com/marzelet",
    "https://www.facebook.com/marzelet"
  ],
  "foundingDate": "2020",
  "knowsAbout": [
    "Software Development",
    "Web Development", 
    "Mobile App Development",
    "ERP Solutions",
    "CRM Development",
    "IoT Solutions",
    "UI/UX Design",
    "Data Analytics",
    "IT Infrastructure",
    "Business Consulting"
  ],
  "areaServed": [
    "India",
    "USA", 
    "UK",
    "Canada",
    "Australia", 
    "Germany",
    "UAE",
    "Singapore",
    "South Africa"
  ]
});

export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Marzelet Info Technology Pvt Ltd",
  "image": "https://marzelet.info/images/new-marzelet-logo.png",
  "url": "https://marzelet.info",
  "telephone": "+91-96299-97391",
  "email": "info@marzelet.info",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chennai",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu", 
    "postalCode": "600001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 13.0827,
    "longitude": 80.2707
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "₹₹₹"
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Marzelet Info Technology Pvt Ltd",
  "url": "https://marzelet.info",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://marzelet.info/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const createServiceSchema = (service: {
  name: string;
  description: string;
  category: string;
  price?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "category": service.category,
  "provider": {
    "@type": "Organization",
    "name": "Marzelet Info Technology Pvt Ltd",
    "url": "https://marzelet.info"
  },
  "areaServed": [
    "India", "USA", "UK", "Canada", "Australia", "Germany", "UAE", "Singapore", "South Africa"
  ],
  "offers": {
    "@type": "Offer",
    "price": service.price || "Contact for pricing",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
});
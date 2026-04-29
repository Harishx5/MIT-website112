import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getBaseUrl } from '@/utils/shareUtils';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  hreflang?: Array<{ hreflang: string; href: string }>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/images/new-marzelet-logo.png',
  structuredData,
  hreflang = []
}) => {
  const defaultTitle = 'Marzelet Info Technology Pvt Ltd';
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const baseUrl = getBaseUrl();
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Marzelet Info Technology - Leading software development company" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Marzelet Info Technology Pvt Ltd" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content="Marzelet Info Technology - Leading software development company" />
      <meta name="twitter:site" content="@marzelettech" />
      <meta name="twitter:creator" content="@marzelettech" />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Marzelet Info Technology Pvt Ltd" />
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content="13.0827;80.2707" />
      <meta name="ICBM" content="13.0827, 80.2707" />
      
      {/* International targeting */}
      {hreflang.map((link, index) => (
        <link key={index} rel="alternate" hrefLang={link.hreflang} href={link.href} />
      ))}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
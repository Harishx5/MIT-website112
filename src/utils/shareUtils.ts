// Utility functions for sharing and news-related operations - updated

export const validateNewsId = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export const extractNewsIdFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/news-detail\/([a-f0-9-]+)$/);
    return pathMatch ? pathMatch[1] : null;
  } catch {
    return null;
  }
};

// Get the correct base URL for sharing - prioritizes custom domain
export const getBaseUrl = (): string => {
  // Check if we're on the deployed domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If it's your custom domain or production deployment
    if (hostname === 'marzelet.info' || hostname === 'www.marzelet.info') {
      return 'https://marzelet.info';
    }
    
    // Check for other custom domains the user might be using
    if (hostname && !hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes('lovable.app')) {
      return `https://${hostname}`;
    }
    
    // For Lovable preview domains, use the current origin but preference real domain
    if (hostname.includes('lovable.app')) {
      // Try to detect if this is a production deployment
      return window.location.origin;
    }
    
    // For development, use localhost
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return window.location.origin;
    }
    
    // Default to current origin
    return window.location.origin;
  }
  
  // Fallback for server-side rendering - always use the production domain
  return 'https://marzelet.info';
};

export const generateNewsShareUrl = (newsId: string, baseUrl?: string): string => {
  const base = baseUrl || getBaseUrl();
  return `${base}/news-detail/${newsId}`;
};

export const isValidNewsUrl = (url: string): boolean => {
  const newsId = extractNewsIdFromUrl(url);
  return newsId ? validateNewsId(newsId) : false;
};

// Generate article slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .substring(0, 50); // Limit length
};

// Generate blog share URL for proper domain sharing
export const generateBlogShareUrl = (blogId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/blog/${blogId}`;
};

// Generate custom share URL for display (using real domain)
export const generateCustomShareUrl = (title: string, id: string): string => {
  const slug = generateSlug(title);
  const baseUrl = getBaseUrl();
  return `${baseUrl}/blog/${slug}`;
};

// Generate the actual shareable link (for copying/sharing) - uses correct domain
export const generateShareableLink = (title: string, newsId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/news-detail/${newsId}`;
};

// Format share data for different platforms with enhanced metadata
export const formatShareData = (title: string, excerpt: string, customUrl: string, actualUrl: string) => {
  const companyInfo = "Marzelet Info Technology - Leading software development company specializing in web development, mobile apps, and digital solutions.";
  
  return {
    title: `${title} - Marzelet Info Technology`,
    text: `${excerpt}\n\n${companyInfo}\n\nRead more: ${actualUrl}`,
    url: actualUrl
  };
};

// Blog-specific share data formatting with enhanced metadata
export const formatBlogShareData = (title: string, excerpt: string, blogUrl: string) => {
  const companyInfo = "🚀 Marzelet Info Technology - Expert insights on web development, mobile apps, and digital innovation.";
  
  return {
    title: `${title} - Marzelet Blog`,
    text: `${excerpt}\n\n${companyInfo}\n\nRead more: ${blogUrl}`,
    url: blogUrl
  };
};

// Generate case study share URL
export const generateCaseStudyShareUrl = (caseStudyId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/case-studies#${caseStudyId}`;
};

// Case study-specific share data formatting with enhanced metadata
export const formatCaseStudyShareData = (title: string, client: string, industry: string, overview: string, caseStudyUrl: string) => {
  const excerpt = overview.length > 150 ? overview.substring(0, 150) + '...' : overview;
  const companyInfo = "💼 Marzelet Info Technology - Transforming businesses through innovative software solutions.";
  
  return {
    title: `${title} - Case Study | Marzelet Info Technology`,
    text: `Case Study: ${title}\n🏢 Client: ${client}\n🏭 Industry: ${industry}\n\n${excerpt}\n\n${companyInfo}\n\nView case study: ${caseStudyUrl}`,
    url: caseStudyUrl
  };
};

// Validate and sanitize URLs
export const sanitizeUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
    }
    return urlObj.toString();
  } catch {
    return null;
  }
};

// Check if current environment is production
export const isProduction = (): boolean => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname === 'marzelet.info' || hostname === 'www.marzelet.info';
  }
  return false;
};
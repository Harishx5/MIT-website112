
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Create QueryClient with optimized settings for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Optimized loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load all pages with prefetch hints for critical pages
const Index = lazy(() => 
  import("./pages/Index").then(module => ({ default: module.default }))
);
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Products = lazy(() => import("./pages/Portfolio"));
const ProductDetail = lazy(() => import("./pages/PortfolioDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignUpConfirmation = lazy(() => import("./pages/SignUpConfirmation"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Reviews = lazy(() => import("./pages/Reviews"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const OurTeam = lazy(() => import("./pages/OurTeam"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

// Service pages - grouped loading
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const MobileDevelopment = lazy(() => import("./pages/MobileDevelopment"));
const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const CustomERPCRM = lazy(() => import("./pages/CustomERPCRM"));
const IoTEmbedded = lazy(() => import("./pages/IoTEmbedded"));
const SEOBranding = lazy(() => import("./pages/SEOBranding"));
const EmailMarketing = lazy(() => import("./pages/EmailMarketing"));
const UIUXDesign = lazy(() => import("./pages/UIUXDesign"));
const DataAnalytics = lazy(() => import("./pages/DataAnalytics"));
const ITInfrastructure = lazy(() => import("./pages/ITInfrastructure"));
const BusinessConsulting = lazy(() => import("./pages/BusinessConsulting"));
const CCTVBiometric = lazy(() => import("./pages/CCTVBiometric"));
const InternshipTraining = lazy(() => import("./pages/InternshipTraining"));
const InternshipsTraining = lazy(() => import("./pages/InternshipsTraining"));
const InternshipDetail = lazy(() => import("./pages/InternshipDetail"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Partners = lazy(() => import("./pages/Partners"));
const PartnerDetail = lazy(() => import("./pages/PartnerDetail"));
const VerifyIntern = lazy(() => import("./pages/VerifyIntern"));

// Legal and support pages - lowest priority
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance"));
const SupportCenter = lazy(() => import("./pages/SupportCenter"));
const Documentation = lazy(() => import("./pages/Documentation"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Main pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/our-team" element={<OurTeam />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  
                  {/* Products routes (new primary routes) */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  
                  {/* Portfolio routes (backward compatibility) */}
                  <Route path="/portfolio" element={<Products />} />
                  <Route path="/portfolio/:id" element={<ProductDetail />} />
                  
                  <Route path="/news" element={<News />} />
                  <Route path="/news-detail/:id" element={<NewsDetail />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:id" element={<JobDetail />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/case-studies" element={<CaseStudies />} />

                  {/* New pages */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Authentication pages */}
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route path="/auth/confirm" element={<SignUpConfirmation />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/profile" element={<ProfileSettings />} />

                  {/* Admin */}
                  <Route path="/admin" element={<AdminDashboard />} />

                  {/* Dynamic service detail route */}
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  
                  {/* Legacy static service routes for backward compatibility */}
                  <Route path="/services/web-development" element={<WebDevelopment />} />
                  <Route path="/services/mobile-development" element={<MobileDevelopment />} />
                  <Route path="/services/software-development" element={<SoftwareDevelopment />} />
                  <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                  <Route path="/services/erp-crm" element={<CustomERPCRM />} />
                  <Route path="/services/iot-embedded" element={<IoTEmbedded />} />
                  <Route path="/services/seo-branding" element={<SEOBranding />} />
                  <Route path="/services/email-marketing" element={<EmailMarketing />} />
                  <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                  <Route path="/services/data-analytics" element={<DataAnalytics />} />
                  <Route path="/services/it-infrastructure" element={<ITInfrastructure />} />
                  <Route path="/services/business-consulting" element={<BusinessConsulting />} />
                  <Route path="/services/cctv-biometric" element={<CCTVBiometric />} />
                  <Route path="/services/internship-training" element={<InternshipTraining />} />
                  
                  {/* New internship pages */}
                  <Route path="/internships-training" element={<InternshipsTraining />} />
                  <Route path="/internship/:id" element={<InternshipDetail />} />
                  <Route path="/internships-training/:id" element={<InternshipDetail />} />
                  <Route path="/verify-intern" element={<VerifyIntern />} />

                  {/* Partners */}
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/partners/:id" element={<PartnerDetail />} />

                  {/* Legal and support pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
                  <Route path="/support-center" element={<SupportCenter />} />
                  <Route path="/documentation" element={<Documentation />} />

                  {/* Catch all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

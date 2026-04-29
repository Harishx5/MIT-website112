<<<<<<< HEAD

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const currentPath = location.pathname;
    let shouldRedirect = false;
    let redirectPath = "";
    let message = "";

    // Check for news detail URL patterns
    const newsDetailPattern = /^\/news-detail\/([a-f0-9-]+)$/;
    const newsMatch = currentPath.match(newsDetailPattern);
    
    if (newsMatch) {
      const newsId = newsMatch[1];
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      if (uuidRegex.test(newsId)) {
        shouldRedirect = true;
        redirectPath = `/news-detail/${newsId}`;
        message = "Redirecting to news article...";
        console.log("Valid news ID detected, redirecting to:", newsId);
      } else {
        console.log("Invalid news ID format, redirecting to news page");
        shouldRedirect = true;
        redirectPath = "/news";
        message = "Invalid article ID, redirecting to news page...";
      }
    }

    // Check for blog detail URL patterns
    const blogDetailPattern = /^\/blog-detail\/([a-f0-9-]+)$|^\/blog\/([a-f0-9-]+)$/;
    const blogMatch = currentPath.match(blogDetailPattern);
    
    if (blogMatch && !newsMatch) {
      const blogId = blogMatch[1] || blogMatch[2];
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      if (uuidRegex.test(blogId)) {
        shouldRedirect = true;
        redirectPath = `/blog-detail/${blogId}`;
        message = "Redirecting to blog post...";
        console.log("Valid blog ID detected, redirecting to:", blogId);
      } else {
        console.log("Invalid blog ID format, redirecting to blog page");
        shouldRedirect = true;
        redirectPath = "/blog";
        message = "Invalid post ID, redirecting to blog page...";
      }
    }

    // Check for common misspellings or alternative paths
    const commonRedirects = {
      '/news-details': '/news',
      '/blog-details': '/blog',
      '/portfolio-detail': '/portfolio',
      '/portfolio-details': '/portfolio',
      '/about': '/about-us',
      '/contact': '/#contact',
      '/services': '/#services'
    };

    if (!shouldRedirect && commonRedirects[currentPath]) {
      shouldRedirect = true;
      redirectPath = commonRedirects[currentPath];
      message = "Redirecting to the correct page...";
      console.log("Common redirect detected:", currentPath, "->", redirectPath);
    }

    if (shouldRedirect) {
      setIsRedirecting(true);
      setRedirectMessage(message);
      
      // Redirect after a short delay to show the loading message
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
    }
  }, [location.pathname, navigate]);

  if (isRedirecting) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-semibold">{redirectMessage}</h2>
            <p className="text-muted-foreground">Please wait while we take you to the correct page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home Page
            </Button>
            
            <Button 
              onClick={() => navigate('/news')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse News
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>If you believe this is an error, please try refreshing the page or contact our support team.</p>
          </div>
        </div>
      </div>
    </Layout>
=======
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
  );
};

export default NotFound;

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Star, Check } from 'lucide-react';
import { shouldUse3DAnimation, getReducedMotionPreference, force3DAnimation } from '@/utils/deviceUtils';
import HeroAnimationFallback from './HeroAnimationFallback';
import ThreeDErrorBoundary from './ThreeDErrorBoundary';

// Lightweight, fast-loading fallback components
const SpaceBackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"></div>
);

// Enhanced lazy loading with better error handling
const SpaceBackground = lazy(() => 
  import('./SpaceBackground')
    .then(module => {
      console.log('SpaceBackground loaded successfully');
      return module;
    })
    .catch(error => {
      console.error('Failed to load SpaceBackground:', error);
      return { default: SpaceBackgroundFallback };
    })
);

const HeroAnimation = lazy(() => 
  import('./HeroAnimation')
    .then(module => {
      console.log('HeroAnimation loaded successfully');
      return module;
    })
    .catch(error => {
      console.error('Failed to load HeroAnimation:', error);
      return { default: HeroAnimationFallback };
    })
);

const HeroSection = () => {
  const [use3D, setUse3D] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [is3DForced, setIs3DForced] = useState(false);

  useEffect(() => {
    // Check device capabilities and user preferences
    const canUse3D = shouldUse3DAnimation();
    const reducedMotion = getReducedMotionPreference();
    const forced3D = force3DAnimation();
    
    console.log('Hero Section 3D Decision:', {
      canUse3D,
      reducedMotion,
      forced3D,
      finalDecision: (canUse3D || forced3D) && !reducedMotion
    });
    
    setUse3D((canUse3D || forced3D) && !reducedMotion);
    setPrefersReducedMotion(reducedMotion);
    setIs3DForced(forced3D);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Enhanced loading fallback for animations - conditionally show 3D loading message
  const AnimationFallback = () => (
    <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <Star className="w-16 h-16 text-white" />
        </div>
        <p className="text-muted-foreground">
          {use3D ? 'Loading 3D animation...' : 'Loading animation...'}
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs text-muted-foreground mt-2">
            3D Enabled: {use3D ? 'Yes' : 'No'} | Forced: {is3DForced ? 'Yes' : 'No'}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-20 pb-16">
      {/* Background - Use 3D or fallback based on device capability */}
      <ThreeDErrorBoundary fallback={<SpaceBackgroundFallback />}>
        {use3D ? (
          <Suspense fallback={<SpaceBackgroundFallback />}>
            <SpaceBackground />
          </Suspense>
        ) : (
          <SpaceBackgroundFallback />
        )}
      </ThreeDErrorBoundary>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your{' '}
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  Digital Vision
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
                We create exceptional digital experiences that drive growth, engage audiences, and deliver measurable results for forward-thinking businesses.
              </p>
            </div>

            {/* Feature boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="flex items-center space-x-3 p-4 md:p-5 rounded-lg bg-background/50 backdrop-blur-sm border">
                <div className="p-2 md:p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs md:text-sm">Cutting-edge</h3>
                  <p className="text-xs text-muted-foreground">Solutions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 md:p-5 rounded-lg bg-background/50 backdrop-blur-sm border">
                <div className="p-2 md:p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs md:text-sm">Results-driven</h3>
                  <p className="text-xs text-muted-foreground">Strategy</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 md:p-5 rounded-lg bg-background/50 backdrop-blur-sm border">
                <div className="p-2 md:p-3 rounded-lg bg-green-500/10 flex-shrink-0">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs md:text-sm">Client-focused</h3>
                  <p className="text-xs text-muted-foreground">Success</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center lg:justify-start pt-4 md:pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg"
                onClick={scrollToServices}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 px-8 md:px-10 py-3 md:py-4 bg-background hover:bg-muted/50 text-base md:text-lg"
                onClick={scrollToPortfolio}
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Side - Hero Animation */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg">
              <ThreeDErrorBoundary fallback={<AnimationFallback />}>
                {use3D ? (
                  <Suspense fallback={<AnimationFallback />}>
                    <HeroAnimation />
                  </Suspense>
                ) : (
                  <HeroAnimationFallback />
                )}
              </ThreeDErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

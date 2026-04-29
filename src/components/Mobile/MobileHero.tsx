
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

const MobileHero = () => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Floating 3D elements - reduced on mobile */}
      <div className="hidden lg:block absolute top-20 right-20 w-16 h-16 bg-blue-500 rounded-2xl opacity-20 animate-pulse" />
      <div className="hidden lg:block absolute top-40 right-40 w-12 h-12 bg-purple-500 rounded-full opacity-20 animate-pulse delay-300" />
      <div className="hidden lg:block absolute bottom-20 right-60 w-20 h-20 bg-green-500 rounded-3xl opacity-20 animate-pulse delay-700" />
      <div className="hidden lg:block absolute top-60 right-80 w-8 h-8 bg-orange-500 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="hidden lg:block absolute top-32 left-20 w-14 h-14 bg-pink-500 rounded-2xl opacity-20 animate-pulse delay-500" />
      <div className="hidden lg:block absolute bottom-40 left-40 w-10 h-10 bg-cyan-500 rounded-full opacity-20 animate-pulse delay-200" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 lg:mb-8">
            <Smartphone className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Mobile <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Development</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create powerful mobile applications that engage users and drive business growth with native 
            and cross-platform solutions. Our expert team delivers high-performance apps for iOS and Android platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-6 lg:px-8 py-3 text-base lg:text-lg">
              Start Your Project
            </Button>
            <Button variant="outline" size="lg" className="px-6 lg:px-8 py-3 text-base lg:text-lg border-border hover:bg-accent">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;

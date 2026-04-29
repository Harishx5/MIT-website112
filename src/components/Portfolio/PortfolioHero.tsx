
import React from 'react';
import { Button } from '@/components/ui/button';

const PortfolioHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Floating 3D elements - same as home page */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-blue-500 rounded-2xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-40 w-12 h-12 bg-purple-500 rounded-full opacity-20 animate-pulse delay-300" />
      <div className="absolute bottom-20 right-60 w-20 h-20 bg-green-500 rounded-3xl opacity-20 animate-pulse delay-700" />
      <div className="absolute top-60 right-80 w-8 h-8 bg-orange-500 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-32 left-20 w-14 h-14 bg-pink-500 rounded-2xl opacity-20 animate-pulse delay-500" />
      <div className="absolute bottom-40 left-40 w-10 h-10 bg-cyan-500 rounded-full opacity-20 animate-pulse delay-200" />
      
      <div className="container mx-auto px-4 relative z-10 pt-12 lg:pt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Products</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our latest projects showcasing cutting-edge technology solutions that 
            have transformed businesses across various industries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;

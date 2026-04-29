
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Shield, Lightbulb } from 'lucide-react';

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating Elements - Now Fixed */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full backdrop-blur-sm"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/20 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-green-500/20 rounded-full backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center min-h-screen">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm font-medium">Innovating Technology Solutions</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Future
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Empowering businesses with cutting-edge technology solutions. From web development to AI integration, we craft digital experiences that drive growth and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-purple-500/50 text-white hover:bg-purple-500/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-400 text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-slate-400 text-sm">Support</div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 lg:pl-12">
          <div className="relative">
            {/* Main Visual */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="w-full h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="w-3/4 h-2 bg-slate-600 rounded"></div>
                    <div className="w-1/2 h-2 bg-slate-600 rounded"></div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3"></div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-slate-600 rounded"></div>
                    <div className="w-2/3 h-2 bg-slate-600 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-1/3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  <div className="w-16 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-slate-600 rounded"></div>
                  <div className="w-5/6 h-2 bg-slate-600 rounded"></div>
                  <div className="w-4/6 h-2 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;

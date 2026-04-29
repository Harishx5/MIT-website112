
import React from 'react';
import { Shield, Zap, CheckCircle, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const HeroAnimationFallback = () => {
  const { theme } = useTheme();
  
  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
      {/* Main Container Box - Set to 480x480px */}
      <div className={`relative w-[480px] h-[480px] rounded-3xl border shadow-2xl overflow-hidden ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' 
          : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50'
      }`}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        {/* Central Main Element - with glow instead of rotation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className={`w-40 h-40 rounded-2xl flex items-center justify-center shadow-xl animate-float-no-rotate animate-glow-rainbow ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600' 
                : 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600'
            }`}>
              <Star className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-blue-600/30 rounded-2xl blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Floating Icons - glow effects instead of bounce */}
        {/* Top Left */}
        <div className="absolute top-12 left-12 animate-float-no-rotate" style={{ animationDelay: '0s' }}>
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          }`}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-xl blur-md animate-pulse"></div>
        </div>

        {/* Top Right */}
        <div className="absolute top-16 right-16 animate-float-no-rotate" style={{ animationDelay: '1s' }}>
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center shadow-lg animate-pulse-glow ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
              : 'bg-gradient-to-br from-purple-500 to-purple-600'
          }`}>
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/40 to-purple-600/40 rounded-lg blur-md animate-pulse"></div>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-16 left-16 animate-float-no-rotate" style={{ animationDelay: '2s' }}>
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : 'bg-gradient-to-br from-green-500 to-green-600'
          }`}>
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/40 to-green-600/40 rounded-xl blur-md animate-pulse"></div>
        </div>

        {/* Floating particles with glow animations */}
        <div className={`absolute top-28 right-12 w-3 h-3 rounded-full animate-ping opacity-60 ${
          theme === 'light' ? 'bg-blue-400' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute bottom-28 right-28 w-2 h-2 rounded-full animate-ping opacity-40 ${
          theme === 'light' ? 'bg-purple-400' : 'bg-purple-400'
        }`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute top-40 left-10 w-3 h-3 rounded-full animate-ping opacity-50 ${
          theme === 'light' ? 'bg-green-400' : 'bg-green-400'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default HeroAnimationFallback;

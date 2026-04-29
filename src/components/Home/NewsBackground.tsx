
import React from 'react';

const NewsBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-500/10 rounded-full animate-floating"></div>
      <div className="absolute top-1/4 right-10 w-60 h-60 bg-purple-500/10 rounded-full animate-floating" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-400/10 rounded-full animate-floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/10 rounded-full animate-floating" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full animate-floating" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default NewsBackground;


import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const FooterLogo = () => {
  const { theme } = useTheme();

  return (
    <Link to="/" className="flex items-center gap-0">
      <img 
        src="/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png" 
        alt="Marzelet Logo" 
        className="h-16 w-20 object-contain -mr-2"
      />
      <div className="flex flex-col">
        <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          MARZELET
        </span>
        <span className={`text-sm -mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>
          Info Technology
        </span>  
      </div>
    </Link>
  );
};

export default FooterLogo;


import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileOptimizedSkeletonProps {
  className?: string;
  height?: string;
  rows?: number;
}

const MobileOptimizedSkeleton: React.FC<MobileOptimizedSkeletonProps> = ({ 
  className = "", 
  height = "h-4", 
  rows = 3 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`${height} w-full ${
            theme === 'light' ? 'bg-gray-200' : 'bg-slate-700'
          }`} 
        />
      ))}
    </div>
  );
};

export default MobileOptimizedSkeleton;

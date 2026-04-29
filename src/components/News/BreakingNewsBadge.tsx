import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { isBreakingNews, getBreakingTimeRemaining } from '@/utils/breakingNewsUtils';

interface BreakingNewsBadgeProps {
  createdAt: string;
  isBreaking?: boolean;
  variant?: 'default' | 'compact' | 'corner';
  showTimeRemaining?: boolean;
  className?: string;
}

export const BreakingNewsBadge: React.FC<BreakingNewsBadgeProps> = ({
  createdAt,
  isBreaking = false,
  variant = 'default',
  showTimeRemaining = false,
  className = ''
}) => {
  // Check if this should show as breaking news
  const shouldShow = isBreakingNews(createdAt, isBreaking);
  
  if (!shouldShow) return null;

  const timeRemaining = showTimeRemaining ? getBreakingTimeRemaining(createdAt) : '';

  const baseClasses = "bg-red-600 hover:bg-red-700 text-white font-bold transition-colors animate-pulse";
  
  const variantClasses = {
    default: "px-2 py-1 rounded-full text-xs",
    compact: "px-1.5 py-0.5 rounded text-[10px]",
    corner: "px-2 py-1 rounded-full text-xs shadow-lg"
  };

  return (
    <Badge className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <Zap className="h-2 w-2 mr-1" />
      BREAKING
      {timeRemaining && (
        <span className="ml-1 text-[10px] opacity-80">
          ({timeRemaining})
        </span>
      )}
    </Badge>
  );
};

export default BreakingNewsBadge;

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  image?: string;
  created_at: string;
  is_breaking?: boolean;
  view_count?: number;
}

export const isBreakingNews = (createdAt: string, isBreaking?: boolean): boolean => {
  if (!isBreaking) return false;
  
  const createdDate = new Date(createdAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
  
  // Breaking news is only valid for 24 hours
  return hoursDiff < 24;
};

export const getBreakingTimeRemaining = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
  const hoursRemaining = Math.max(0, 24 - hoursDiff);
  
  if (hoursRemaining === 0) return '';
  
  if (hoursRemaining < 1) {
    const minutesRemaining = Math.floor(hoursRemaining * 60);
    return `${minutesRemaining}m`;
  }
  
  return `${Math.floor(hoursRemaining)}h`;
};

export const shouldShowBreakingBadge = (createdAt: string, isBreaking?: boolean): boolean => {
  return isBreakingNews(createdAt, isBreaking);
};

export const sortNewsWithBreaking = (newsItems: NewsItem[]): NewsItem[] => {
  return newsItems.sort((a, b) => {
    const aIsBreaking = isBreakingNews(a.created_at, a.is_breaking);
    const bIsBreaking = isBreakingNews(b.created_at, b.is_breaking);
    
    // Breaking news comes first
    if (aIsBreaking && !bIsBreaking) return -1;
    if (!aIsBreaking && bIsBreaking) return 1;
    
    // If both are breaking or both are not breaking, sort by creation date
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

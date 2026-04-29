
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateNewsId, extractNewsIdFromUrl } from '@/utils/shareUtils';

const NewsRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    console.log('NewsRedirect: Checking path:', currentPath);

    // Extract news ID from various possible URL patterns
    const newsId = extractNewsIdFromUrl(window.location.href);
    
    if (newsId && validateNewsId(newsId)) {
      console.log('NewsRedirect: Valid news ID found, redirecting to:', newsId);
      navigate(`/news-detail/${newsId}`, { replace: true });
    } else {
      console.log('NewsRedirect: Invalid or missing news ID, redirecting to news page');
      navigate('/news', { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default NewsRedirect;

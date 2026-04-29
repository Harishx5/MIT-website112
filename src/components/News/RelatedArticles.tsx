import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RelatedArticlesProps {
  currentArticleId: string;
  limit?: number;
}

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  created_at: string;
  view_count: number;
  author: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, limit = 3 }) => {
  const navigate = useNavigate();

  const { data: relatedArticles, isLoading } = useQuery({
    queryKey: ['related-news', currentArticleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, excerpt, image, created_at, view_count, author')
        .eq('is_published', true)
        .neq('id', currentArticleId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as NewsArticle[];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4">
            <div className="w-24 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Related Articles
      </h3>
      
      <div className="space-y-4">
        {relatedArticles.map((article) => (
          <Card 
            key={article.id} 
            className="cursor-pointer hover:shadow-md transition-all duration-300 border-0 shadow-none hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => navigate(`/news-detail/${article.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Thumbnail */}
                {article.image && (
                  <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                  
                  {article.excerpt && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.view_count || 0} views</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>3 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
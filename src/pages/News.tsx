
import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sortNewsWithBreaking, type NewsItem } from '@/utils/breakingNewsUtils';
import BreakingNewsBadge from '@/components/News/BreakingNewsBadge';
import { useNewsViews } from '@/hooks/useNewsViews';

const News = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { trackView } = useNewsViews();

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Filter news based on search and sort with breaking news first
  const processedNews = useMemo(() => {
    const filtered = newsItems?.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const sorted = sortNewsWithBreaking(filtered as NewsItem[]);
    
    return {
      latestNews: sorted.slice(0, 3),
      moreStories: sorted.slice(3)
    };
  }, [newsItems, searchTerm]);

  const getViewCounts = (viewCount: number) => {
    // For now, we'll use the view_count field
    // In the future, this can be enhanced with proper member tracking
    return {
      totalViews: viewCount || 0,
      uniqueMembers: 0 // Will be implemented when news_views table is created
    };
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 pt-32">
          <div className="text-center">Loading news...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Latest News <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">& Updates</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Stay informed with the latest developments and insights from our industry
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h2>
            </div>

            {processedNews.latestNews.length > 0 ? (
              <div className="space-y-8 mb-12">
                {processedNews.latestNews.map((item) => {
                  const { totalViews, uniqueMembers } = getViewCounts(item.view_count || 0);
                  
                  return (
                    <Card 
                      key={item.id} 
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-none"
                      onClick={() => {
                        trackView(item.id);
                        navigate(`/news-detail/${item.id}`);
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 p-4 md:p-6 relative">
                          {/* Breaking News Badge - Top Right Corner of Content */}
                          <div className="absolute top-2 right-2 z-10">
                            <BreakingNewsBadge 
                              createdAt={item.created_at}
                              isBreaking={(item as any).is_breaking}
                              variant="corner"
                            />
                          </div>
                          
                          {/* Image - Full width on mobile, side by side on desktop */}
                          {item.image && (
                            <div className="w-full md:w-40 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg md:order-2">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0 md:order-1">
                            {/* Author and publication info */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">
                                  {(item.author || 'M')[0].toUpperCase()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 min-w-0">
                                <span className="font-medium truncate">
                                  {item.author || 'Marzelet Team'}
                                </span>
                                <span className="hidden sm:inline">in</span>
                                <span className="text-gray-800 dark:text-gray-200 font-medium hidden sm:inline">
                                  Tech Insights
                                </span>
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="font-bold text-lg md:text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900 dark:text-white pr-8">
                              {item.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4">
                              {item.excerpt}
                            </p>
                            
                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                              </div>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                                <span>5 min read</span>
                              </div>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{totalViews} views</span>
                                {uniqueMembers > 0 && (
                                  <span className="text-blue-600 hidden sm:inline">({uniqueMembers} members)</span>
                                )}
                              </div>
                              <span className="text-yellow-500 hidden sm:inline">⭐</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No Latest News Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for the latest updates.'}
                </p>
              </div>
            )}

            {/* Separator */}
            {processedNews.moreStories.length > 0 && (
              <Separator className="my-12 bg-gray-200 dark:bg-gray-700" />
            )}

            {/* More Stories Section */}
            {processedNews.moreStories.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">More Stories</h2>
                <div className="space-y-6">
                  {processedNews.moreStories.map((item) => {
                    const { totalViews, uniqueMembers } = getViewCounts(item.view_count || 0);
                    
                    return (
                      <Card 
                        key={item.id} 
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-none"
                        onClick={() => {
                          trackView(item.id);
                          navigate(`/news-detail/${item.id}`);
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 p-4 md:p-6">
                            {/* Image - Full width on mobile, side by side on larger screens */}
                            {item.image && (
                              <div className="w-full sm:w-24 h-40 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg sm:order-2">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0 sm:order-1">
                              {/* Breaking News Badge */}
                              <div className="mb-2">
                                <BreakingNewsBadge 
                                  createdAt={item.created_at}
                                  isBreaking={(item as any).is_breaking}
                                  variant="default"
                                />
                              </div>
                              
                              {/* Author and publication info */}
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {(item.author || 'M')[0].toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 min-w-0">
                                  <span className="font-medium truncate">
                                    {item.author || 'Marzelet Team'}
                                  </span>
                                  <span className="hidden sm:inline">in</span>
                                  <span className="text-gray-800 dark:text-gray-200 font-medium hidden sm:inline">
                                    Tech Insights
                                  </span>
                                </div>
                              </div>
                              
                              {/* Title */}
                              <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              
                              {/* Meta info */}
                              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>4 min read</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{totalViews} views</span>
                                  {uniqueMembers > 0 && (
                                    <span className="text-blue-600 hidden sm:inline">({uniqueMembers} members)</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;

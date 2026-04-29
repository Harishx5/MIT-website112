
// NewsDetail component for displaying individual news articles
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageSquare, Share2, Eye, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import NewsComments from '@/components/News/NewsComments';
import RelatedArticles from '@/components/News/RelatedArticles';
import { useNewsViews } from '@/hooks/useNewsViews';
import { generateNewsShareUrl, formatShareData } from '@/utils/shareUtils';
import BreakingNewsBadge from '@/components/News/BreakingNewsBadge';

interface NewsArticle {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author: string;
  image: string;
  excerpt: string;
  is_published: boolean;
  is_breaking: boolean;
  likes_count: number;
  view_count: number;
  updated_at: string;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const commentsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { viewCounts, trackView } = useNewsViews(id);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setNews(data);
        setLikesCount(data.likes_count || 0);
        
        if (id) {
          trackView(id);
        }

        const { count } = await supabase
          .from('news_comments')
          .select('*', { count: 'exact', head: true })
          .eq('news_id', id)
          .eq('is_approved', true);
        
        setCommentsCount(count || 0);

      } catch (error: any) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error",
          description: "Failed to load news article",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, toast, trackView]);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like articles",
        variant: "destructive",
      });
      return;
    }

    try {
      const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
      
      const { error } = await supabase
        .from('news')
        .update({ likes_count: newLikesCount })
        .eq('id', id);

      if (error) throw error;

      setIsLiked(!isLiked);
      setLikesCount(newLikesCount);
      
      toast({
        title: isLiked ? "Like removed" : "Article liked!",
        description: isLiked ? "You unliked this article" : "Thank you for your feedback",
      });
    } catch (error: any) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareUrl = generateNewsShareUrl(id);
    const shareData = formatShareData(
      news?.title || '',
      news?.excerpt || news?.title || '',
      shareUrl,
      shareUrl
    );

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      const shareText = `${news?.title} - Marzelet Info Technology\n\n${news?.excerpt || news?.title}\n\nRead more: ${shareUrl}`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied!",
        description: "News content has been copied to clipboard",
      });
    }
  };

  const handleCommentClick = () => {
    setShowComments(true);
    // Scroll to comments section after state update
    setTimeout(() => {
      commentsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const renderRichContent = (content: string) => {
    let formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
    
    return { __html: formattedContent };
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/news')}>Back to News</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back to News Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/news')}
            className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>

          {/* Title with Breaking News Badge */}
          <div className="mb-6">
            <div className="mb-3">
              <BreakingNewsBadge 
                createdAt={news.created_at}
                isBreaking={news.is_breaking}
                variant="default"
                showTimeRemaining={true}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {news.title}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">{news.author || 'Marzelet Team'}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(news.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{viewCounts?.totalViews || news.view_count || 0} views</span>
            </div>

            {/* Engagement Buttons */}
            <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-1 hover:bg-red-50 hover:text-red-600 transition-colors ${
                  isLiked ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCommentClick}
                className={`flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  showComments ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{commentsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-1 hover:bg-green-50 hover:text-green-600 transition-colors text-gray-600 dark:text-gray-400"
              >
                <Share2 className="h-4 w-4" />
                <span className="font-medium">Share</span>
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            {news.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Excerpt */}
              {news.excerpt && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 dark:text-blue-200 italic text-lg leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>
              )}

              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert text-gray-900 dark:text-gray-100 leading-relaxed"
                dangerouslySetInnerHTML={renderRichContent(news.content)}
              />
            </div>
          </article>

          {/* Comments Section */}
          {showComments && (
            <div ref={commentsRef} className="mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Comments ({commentsCount})
                  </h3>
                </div>
                <div className="p-6">
                  <NewsComments newsId={news.id} />
                </div>
              </div>
            </div>
          )}

          {/* Related Articles Section */}
          <div className="mt-8">
            <RelatedArticles currentArticleId={news.id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, MessageSquare, Share2, Eye, Calendar, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import RelatedBlogs from '@/components/Blog/RelatedBlogs';
import { generateBlogShareUrl, formatBlogShareData } from '@/utils/shareUtils';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  created_at: string;
  reading_time: number;
  view_count: number;
  likes_count: number;
  is_published: boolean;
  tags: string[];
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) {
          throw error;
        }

        setBlog(data);
        setLikesCount(data.likes_count || 0);

        // Increment view count
        await supabase
          .from('blogs')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', id);

      } catch (error: any) {
        console.error('Error fetching blog:', error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, toast]);

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
        .from('blogs')
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
    const shareUrl = generateBlogShareUrl(id);
    const shareData = formatBlogShareData(
      blog?.title || '',
      blog?.excerpt || blog?.title || '',
      shareUrl
    );

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      const shareText = `${blog?.title} - Marzelet Info Technology Blog\n\n${blog?.excerpt || blog?.title}\n\nRead more: ${shareUrl}`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied!",
        description: "Blog content has been copied to clipboard",
      });
    }
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
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-32 bg-muted rounded"></div>
              </div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Blog Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-6 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Article Content */}
          <article className="bg-card rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            {blog.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{blog.category}</Badge>
                {blog.tags?.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-6 leading-tight break-words">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-medium truncate">{blog.author}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{new Date(blog.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{blog.reading_time || 5} min read</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{blog.view_count || 0} views</span>
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div 
                className="prose prose-sm sm:prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground text-foreground mb-8 leading-relaxed break-words overflow-wrap-anywhere"
                dangerouslySetInnerHTML={renderRichContent(blog.content)}
              />

              {/* Engagement Bar */}
              <div className="border-t border-border pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors ${
                        isLiked ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-muted-foreground'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{likesCount}</span>
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors text-muted-foreground self-start sm:self-auto"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Blogs Section */}
          <div className="mt-8">
            <RelatedBlogs currentBlogId={blog.id} category={blog.category} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;

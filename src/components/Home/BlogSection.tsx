
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import MobileOptimizedSkeleton from '@/components/MobileOptimizedSkeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  reading_time: number;
  image: string;
  tags: string[];
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [navigating, setNavigating] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedBlogs = data?.map(blog => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category: blog.category || 'General',
        author: blog.author || 'Marzelet Team',
        date: new Date(blog.date || blog.created_at).toLocaleDateString('en-GB'),
        reading_time: blog.reading_time || 5,
        image: blog.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
        tags: blog.tags || []
      })) || [];

      setBlogPosts(formattedBlogs);
      setDisplayedPosts(formattedBlogs.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = async (blog: BlogPost) => {
    console.log('Read more clicked for blog:', blog.id, 'Mobile:', isMobile);
    
    if (navigating) {
      console.log('Already navigating, ignoring click');
      return;
    }
    
    setNavigating(blog.id);
    
    try {
      if (isMobile) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setTimeout(() => {
        console.log('Navigating to blog:', blog.id);
        navigate(`/blog/${blog.id}`, { 
          replace: false,
          state: { fromBlogSection: true } 
        });
      }, isMobile ? 150 : 0);
      
    } catch (error) {
      console.error('Navigation error:', error);
      setNavigating(null);
    }
  };

  const handleViewMore = () => {
    const nextPosts = blogPosts.slice(currentIndex, currentIndex + 3);
    setDisplayedPosts([...displayedPosts, ...nextPosts]);
    setCurrentIndex(currentIndex + 3);
  };

  const hasMorePosts = currentIndex < blogPosts.length;

  if (loading) {
    return (
      <section id="blog-section" className={`py-20 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Our <span className="text-blue-500">Blog</span>
            </h2>
            <p className={`text-xl max-w-4xl mx-auto italic ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Stay updated with the latest trends, insights, and expert perspectives from the world 
              of technology and digital innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`backdrop-blur border rounded-2xl overflow-hidden ${
                theme === 'light'
                  ? 'bg-card/30 border-border/30'
                  : 'bg-slate-700/30 border-slate-600/30'
              }`}>
                <MobileOptimizedSkeleton height="h-48" rows={1} />
                <div className="p-4 lg:p-6">
                  <MobileOptimizedSkeleton rows={4} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-section" className={`py-12 lg:py-20 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className={`text-lg lg:text-xl max-w-4xl mx-auto italic ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Stay updated with the latest trends, insights, and expert perspectives from the world 
            of technology and digital innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-12 lg:mb-16">
          {displayedPosts.map((post) => (
            <article key={post.id} className={`backdrop-blur border rounded-2xl overflow-hidden transition-all duration-300 group ${
              theme === 'light'
                ? 'bg-card/30 border-border/30 hover:bg-card/50'
                : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50'
            }`}>
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-40 lg:h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {post.category}
                  </Badge>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-black/20 hover:bg-black/40 text-white w-8 h-8 lg:w-10 lg:h-10"
                >
                  <Share2 className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>

              <div className="p-4 lg:p-6">
                <h2 className={`text-lg lg:text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {post.title}
                </h2>
                
                <p className={`mb-4 line-clamp-2 text-sm lg:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center gap-3 lg:gap-4 text-xs lg:text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="truncate">{post.author}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-xs lg:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{post.reading_time} min read</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-blue-500 hover:text-blue-600 text-xs lg:text-sm p-2 ${
                      navigating === post.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleReadMore(post)}
                    disabled={navigating === post.id}
                  >
                    {navigating === post.id ? (
                      <>
                        <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-1" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Read More
                        <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          {hasMorePosts ? (
            <Button variant="outline" size="lg" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600" onClick={handleViewMore}>
              View More Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No more articles to show</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface RelatedBlogsProps {
  currentBlogId: string;
  category?: string;
  limit?: number;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  created_at: string;
  view_count: number;
  author: string;
  category: string;
  reading_time: number;
  tags: string[];
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ currentBlogId, category, limit = 4 }) => {
  const navigate = useNavigate();

  const { data: relatedBlogs, isLoading } = useQuery({
    queryKey: ['related-blogs', currentBlogId, category],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('id, title, excerpt, image, created_at, view_count, author, category, reading_time, tags')
        .eq('is_published', true)
        .neq('id', currentBlogId);

      // If category is provided, prioritize blogs from the same category
      if (category) {
        const { data: categoryBlogs } = await query
          .eq('category', category)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (categoryBlogs && categoryBlogs.length >= limit) {
          return categoryBlogs as BlogPost[];
        }

        // If not enough category blogs, fill with latest blogs
        const needed = limit - (categoryBlogs?.length || 0);
        const { data: latestBlogs } = await supabase
          .from('blogs')
          .select('id, title, excerpt, image, created_at, view_count, author, category, reading_time, tags')
          .eq('is_published', true)
          .neq('id', currentBlogId)
          .not('id', 'in', `(${categoryBlogs?.map(b => b.id).join(',') || ''})`)
          .order('created_at', { ascending: false })
          .limit(needed);

        return [...(categoryBlogs || []), ...(latestBlogs || [])] as BlogPost[];
      }

      // Default: get latest blogs
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-3 sm:gap-4">
            <div className="w-20 h-16 sm:w-24 sm:h-20 bg-muted rounded-lg flex-shrink-0"></div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-3 sm:h-4 bg-muted rounded w-3/4"></div>
              <div className="h-2 sm:h-3 bg-muted rounded w-1/2"></div>
              <div className="h-2 sm:h-3 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!relatedBlogs || relatedBlogs.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-foreground">
          {category ? 'Related Articles' : 'Latest Articles'}
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {relatedBlogs.map((blog) => (
            <Card 
              key={blog.id} 
              className="cursor-pointer hover:shadow-md transition-all duration-300 border-0 shadow-none hover:bg-accent/50 group"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  {blog.image && (
                    <div className="w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category Badge */}
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {blog.category}
                      </Badge>
                    </div>

                    <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors break-words">
                      {blog.title}
                    </h4>
                    
                    {blog.excerpt && (
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 break-words">
                        {blog.excerpt}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 min-w-0">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-primary-foreground" />
                        </div>
                        <span className="truncate">{blog.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="text-xs">{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="text-xs">{blog.reading_time || 5} min</span>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="text-xs">{blog.view_count || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;

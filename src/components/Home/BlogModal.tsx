
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, User, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateBlogShareUrl, formatBlogShareData } from '@/utils/shareUtils';

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

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, blog }) => {
  if (!blog) return null;

  const handleShare = (platform: string) => {
    const blogUrl = generateBlogShareUrl(blog.id);
    const shareData = formatBlogShareData(blog.title, blog.excerpt, blogUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(blogUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareData.text);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{blog.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Blog Image */}
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          {/* Blog Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {blog.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.reading_time} min read</span>
              </div>
            </div>
            
            {/* Share Button */}
            <div className="relative group">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="justify-start"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="justify-start"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="justify-start"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="justify-start"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('copy')}
                    className="justify-start"
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex items-center gap-2">
            {blog.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-4">{blog.excerpt}</p>
            <div className="whitespace-pre-wrap">{blog.content}</div>
          </div>
          
          {/* Share Links */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">Share this article:</p>
            <div className="text-sm text-muted-foreground break-all">
              {generateBlogShareUrl(blog.id)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;

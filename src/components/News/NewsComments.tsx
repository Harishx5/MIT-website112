
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Heart, Reply } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsComment {
  id: string;
  content: string;
  author_name: string | null;
  author_email: string | null;
  user_id: string | null;
  likes_count: number;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  parent_id: string | null;
}

interface NewsCommentsProps {
  newsId: string;
}

const NewsComments: React.FC<NewsCommentsProps> = ({ newsId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['news-comments', newsId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_comments')
        .select('*')
        .eq('news_id', newsId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as NewsComment[];
    }
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: any) => {
      const { error } = await supabase
        .from('news_comments')
        .insert([commentData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-comments', newsId] });
      toast({ 
        title: 'Comment submitted!', 
        description: 'Your comment is pending approval and will appear shortly.' 
      });
      setNewComment('');
      setReplyContent('');
      setReplyingTo(null);
      if (!user) {
        setAuthorName('');
        setAuthorEmail('');
      }
    },
    onError: () => {
      toast({ 
        title: 'Error submitting comment', 
        variant: 'destructive' 
      });
    }
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({ title: 'Please enter a comment', variant: 'destructive' });
      return;
    }

    if (!user && (!authorName.trim() || !authorEmail.trim())) {
      toast({ title: 'Please enter your name and email', variant: 'destructive' });
      return;
    }

    const commentData = {
      news_id: newsId,
      content: newComment.trim(),
      user_id: user?.id || null,
      author_name: user ? (user.user_metadata?.full_name || user.email?.split('@')[0]) : authorName.trim(),
      author_email: user ? user.email : authorEmail.trim(),
      parent_id: null
    };

    createCommentMutation.mutate(commentData);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) {
      toast({ title: 'Please enter a reply', variant: 'destructive' });
      return;
    }

    if (!user && (!authorName.trim() || !authorEmail.trim())) {
      toast({ title: 'Please enter your name and email', variant: 'destructive' });
      return;
    }

    const replyData = {
      news_id: newsId,
      content: replyContent.trim(),
      user_id: user?.id || null,
      author_name: user ? (user.user_metadata?.full_name || user.email?.split('@')[0]) : authorName.trim(),
      author_email: user ? user.email : authorEmail.trim(),
      parent_id: parentId
    };

    createCommentMutation.mutate(replyData);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const topLevelComments = comments.filter(comment => !comment.parent_id);
  const getReplies = (parentId: string) => comments.filter(comment => comment.parent_id === parentId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div>
              <Label htmlFor="comment">Add a comment</Label>
              <Textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this news..."
                rows={4}
                className="resize-none"
              />
            </div>
            
            {!user && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={createCommentMutation.isPending}
              className="w-full md:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              {createCommentMutation.isPending ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {topLevelComments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    {/* Main Comment */}
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(comment.author_name || 'Anonymous')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {comment.author_name || 'Anonymous'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment.created_at)}
                          </span>
                          {comment.is_featured && (
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="h-3 w-3 mr-1" />
                            {comment.likes_count || 0}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="ml-12 space-y-3">
                        <div className="space-y-2">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            rows={3}
                            className="resize-none"
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={createCommentMutation.isPending}
                            >
                              Reply
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {getReplies(comment.id).map((reply) => (
                      <div key={reply.id} className="ml-12 flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(reply.author_name || 'Anonymous')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {reply.author_name || 'Anonymous'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(reply.created_at)}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{reply.content}</p>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Heart className="h-3 w-3 mr-1" />
                            {reply.likes_count || 0}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsComments;

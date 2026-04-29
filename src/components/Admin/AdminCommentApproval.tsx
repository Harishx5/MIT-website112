import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Check, X, Clock, Eye } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  news_id: string;
  news?: {
    title: string;
  };
}

const AdminCommentApproval: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['admin-news-comments', selectedStatus],
    queryFn: async () => {
      let query = supabase
        .from('news_comments')
        .select(`
          *,
          news:news_id (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedStatus === 'pending') {
        query = query.eq('is_approved', false);
      } else if (selectedStatus === 'approved') {
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as NewsComment[];
    }
  });

  const approveCommentMutation = useMutation({
    mutationFn: async ({ commentId, isApproved }: { commentId: string; isApproved: boolean }) => {
      const { error } = await supabase
        .from('news_comments')
        .update({ is_approved: isApproved })
        .eq('id', commentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-comments'] });
      toast({ 
        title: 'Comment updated successfully!',
        description: 'The comment status has been updated.'
      });
    },
    onError: () => {
      toast({ 
        title: 'Error updating comment', 
        variant: 'destructive' 
      });
    }
  });

  const featureCommentMutation = useMutation({
    mutationFn: async ({ commentId, isFeatured }: { commentId: string; isFeatured: boolean }) => {
      const { error } = await supabase
        .from('news_comments')
        .update({ is_featured: isFeatured })
        .eq('id', commentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-comments'] });
      toast({ 
        title: 'Comment updated successfully!',
        description: 'The comment feature status has been updated.'
      });
    },
    onError: () => {
      toast({ 
        title: 'Error updating comment', 
        variant: 'destructive' 
      });
    }
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from('news_comments')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-comments'] });
      toast({ 
        title: 'Comment deleted successfully!',
        description: 'The comment has been permanently removed.'
      });
    },
    onError: () => {
      toast({ 
        title: 'Error deleting comment', 
        variant: 'destructive' 
      });
    }
  });

  const handleApprove = (commentId: string) => {
    approveCommentMutation.mutate({ commentId, isApproved: true });
  };

  const handleReject = (commentId: string) => {
    approveCommentMutation.mutate({ commentId, isApproved: false });
  };

  const handleFeature = (commentId: string, isFeatured: boolean) => {
    featureCommentMutation.mutate({ commentId, isFeatured });
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      deleteCommentMutation.mutate(commentId);
    }
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

  const pendingCount = comments.filter(c => !c.is_approved).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Comment Approval</h2>
          <p className="text-muted-foreground">
            Manage and moderate news comments
            {pendingCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingCount} pending
              </Badge>
            )}
          </p>
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="all">All Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 bg-muted rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No comments found</h3>
                <p className="text-muted-foreground">
                  {selectedStatus === 'pending' 
                    ? 'No comments are waiting for approval.'
                    : 'No comments match the selected filter.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(comment.author_name || 'Anonymous')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {comment.author_name || 'Anonymous'}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {comment.author_email}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(comment.created_at)}
                            </span>
                          </div>
                          
                          {comment.news && (
                            <div className="text-sm text-muted-foreground mt-1">
                              News: {comment.news.title}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {comment.is_approved ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          
                          {comment.is_featured && (
                            <Badge variant="outline">Featured</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        {!comment.is_approved ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(comment.id)}
                              disabled={approveCommentMutation.isPending}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(comment.id)}
                              disabled={deleteCommentMutation.isPending}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(comment.id)}
                              disabled={approveCommentMutation.isPending}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Unapprove
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleFeature(comment.id, !comment.is_featured)}
                              disabled={featureCommentMutation.isPending}
                            >
                              {comment.is_featured ? 'Unfeature' : 'Feature'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(comment.id)}
                              disabled={deleteCommentMutation.isPending}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminCommentApproval;

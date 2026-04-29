
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MessageSquare, Briefcase, Users, Star, Check, CheckCheck, Trash2, X } from 'lucide-react';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminNotifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAsRead,
    isMarkingAllAsRead,
    isDeletingNotification
  } = useAdminNotifications();

  const { data: newContactsCount } = useQuery({
    queryKey: ['new-contacts-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: newProjectsCount } = useQuery({
    queryKey: ['new-projects-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('project_inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: newJobApplicationsCount } = useQuery({
    queryKey: ['new-job-applications-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: newReviewsCount } = useQuery({
    queryKey: ['new-reviews-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      if (error) throw error;
      return count || 0;
    }
  });

  const summaryItems = [
    {
      icon: MessageSquare,
      label: 'New Contact Submissions',
      count: newContactsCount || 0,
      color: 'bg-blue-500'
    },
    {
      icon: Briefcase,
      label: 'New Project Inquiries',
      count: newProjectsCount || 0,
      color: 'bg-green-500'
    },
    {
      icon: Users,
      label: 'New Job Applications',
      count: newJobApplicationsCount || 0,
      color: 'bg-purple-500'
    },
    {
      icon: Star,
      label: 'New Reviews (7 days)',
      count: newReviewsCount || 0,
      color: 'bg-yellow-500'
    }
  ];

  const totalNewItems = (newContactsCount || 0) + (newProjectsCount || 0) + (newJobApplicationsCount || 0) + (newReviewsCount || 0);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'contact': return MessageSquare;
      case 'project_inquiry': return Briefcase;
      case 'job_application': return Users;
      case 'review': return Star;
      default: return Bell;
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

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            {showNotifications ? <X className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {showNotifications ? 'Hide' : 'Show'} Details
          </Button>
          
          {unreadCount > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => markAllAsRead()}
                disabled={isMarkingAllAsRead}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark All Read ({unreadCount})
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="bg-card p-4 rounded-lg border border-border/50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.color} text-white`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold">{item.count}</p>
                </div>
              </div>
              {item.count > 0 && (
                <Badge variant="destructive" className="ml-2">
                  New
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Notifications */}
      {showNotifications && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Notifications
              <Badge variant="outline">{notifications.length} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div 
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                        notification.is_read 
                          ? 'bg-muted/30 border-border/50' 
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${notification.is_read ? 'bg-muted' : 'bg-blue-500'} text-white`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTimeAgo(notification.created_at)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {!notification.is_read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                disabled={isMarkingAsRead}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              disabled={isDeletingNotification}
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminNotifications;

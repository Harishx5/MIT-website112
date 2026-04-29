
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Generate a simple device fingerprint
const generateDeviceFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Device fingerprint', 2, 2);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

export const useNewsViews = (newsId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: viewCounts, isLoading } = useQuery({
    queryKey: ['news-views', newsId],
    queryFn: async () => {
      if (!newsId) return null;
      
      // Get total views from news_views table
      const { count: totalViews, error: viewsError } = await supabase
        .from('news_views')
        .select('*', { count: 'exact', head: true })
        .eq('news_id', newsId);

      if (viewsError) throw viewsError;

      // Get unique user views (authenticated users only)
      const { count: uniqueMembers, error: membersError } = await supabase
        .from('news_views')
        .select('*', { count: 'exact', head: true })
        .eq('news_id', newsId)
        .not('user_id', 'is', null);

      if (membersError) throw membersError;

      // Update the news table view count
      if (totalViews !== null) {
        console.log('Updating news view count to:', totalViews, 'for news:', newsId);
        const { error: updateError } = await supabase
          .from('news')
          .update({ view_count: totalViews })
          .eq('id', newsId);
        
        if (updateError) {
          console.error('Error updating news view count:', updateError);
        } else {
          console.log('Successfully updated news view count');
        }
      }
      
      return {
        totalViews: totalViews || 0,
        uniqueMembers: uniqueMembers || 0,
        anonymousViews: (totalViews || 0) - (uniqueMembers || 0)
      };
    },
    enabled: !!newsId
  });

  const trackViewMutation = useMutation({
    mutationFn: async ({ newsId, deviceFingerprint }: { newsId: string; deviceFingerprint: string }) => {
      console.log('Starting view tracking mutation for news:', newsId);
      
      const viewData = {
        news_id: newsId,
        user_id: user?.id || null,
        device_fingerprint: deviceFingerprint,
        ip_address: null, // Could be populated server-side if needed
      };

      console.log('Inserting view data:', viewData);

      const { error } = await supabase
        .from('news_views')
        .insert([viewData]);

      // Ignore unique constraint violations (user/device already viewed)
      if (error && !error.message.includes('duplicate key value violates unique constraint')) {
        console.error('Error inserting news view:', error);
        throw error;
      } else if (error) {
        console.log('View already exists for this user/device');
        return; // Don't increment if already viewed
      } else {
        console.log('Successfully tracked news view');
        
        // Increment view count in news table for all users (including anonymous)
        const { error: updateError } = await supabase.rpc('increment_view_count', {
          table_name: 'news',
          record_id: newsId
        });
        
        if (updateError) {
          console.error('Error incrementing news view count:', updateError);
        } else {
          console.log('Successfully incremented news view count');
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-views'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  });

  // Set up real-time subscription for view counts
  useEffect(() => {
    if (!newsId) return;

    const channel = supabase
      .channel(`news-views-${newsId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'news_views',
          filter: `news_id=eq.${newsId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['news-views', newsId] });
          queryClient.invalidateQueries({ queryKey: ['news'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [newsId, queryClient]);

  const trackView = (newsId: string) => {
    const deviceFingerprint = generateDeviceFingerprint();
    
    // Check if this device/user has viewed this article recently
    const lastViewed = localStorage.getItem(`news_viewed_${newsId}_${deviceFingerprint}`);
    const now = Date.now();
    
    // Reduced cooldown to 10 seconds for better tracking
    if (!lastViewed || now - parseInt(lastViewed) > 10000) { // 10 seconds cooldown
      localStorage.setItem(`news_viewed_${newsId}_${deviceFingerprint}`, now.toString());
      console.log('Tracking view for news:', newsId, 'with fingerprint:', deviceFingerprint);
      trackViewMutation.mutate({ newsId, deviceFingerprint });
    } else {
      console.log('View not tracked due to cooldown for news:', newsId);
    }
  };

  return {
    viewCounts,
    isLoading,
    trackView,
    isTracking: trackViewMutation.isPending
  };
};

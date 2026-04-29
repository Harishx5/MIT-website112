
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

const AdminSystemStatus = () => {
  // Test contact form integration
  const { data: contactTest, isLoading: contactLoading } = useQuery({
    queryKey: ['system-status-contact'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .limit(1);
        return { success: !error, error: error?.message };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  });

  // Test project inquiries integration
  const { data: projectTest, isLoading: projectLoading } = useQuery({
    queryKey: ['system-status-project'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('project_inquiries')
          .select('*', { count: 'exact', head: true })
          .limit(1);
        return { success: !error, error: error?.message };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  });

  // Test job applications integration
  const { data: jobTest, isLoading: jobLoading } = useQuery({
    queryKey: ['system-status-job'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('job_applications')
          .select('*', { count: 'exact', head: true })
          .limit(1);
        return { success: !error, error: error?.message };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  });

  // Test reviews integration
  const { data: reviewTest, isLoading: reviewLoading } = useQuery({
    queryKey: ['system-status-review'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true })
          .limit(1);
        return { success: !error, error: error?.message };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  });

  // Test notifications integration
  const { data: notificationTest, isLoading: notificationLoading } = useQuery({
    queryKey: ['system-status-notification'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('admin_notifications')
          .select('*', { count: 'exact', head: true })
          .limit(1);
        return { success: !error, error: error?.message };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  });

  const systems = [
    {
      name: 'Contact Forms',
      test: contactTest,
      loading: contactLoading,
      description: 'Contact form submissions and processing'
    },
    {
      name: 'Project Inquiries',
      test: projectTest,
      loading: projectLoading,
      description: 'Project request forms and management'
    },
    {
      name: 'Job Applications',
      test: jobTest,
      loading: jobLoading,
      description: 'Job application submissions and tracking'
    },
    {
      name: 'Reviews System',
      test: reviewTest,
      loading: reviewLoading,
      description: 'Customer review submissions and display'
    },
    {
      name: 'Admin Notifications',
      test: notificationTest,
      loading: notificationLoading,
      description: 'Real-time admin notification system'
    }
  ];

  const getStatusIcon = (test: any, loading: boolean) => {
    if (loading) return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
    if (!test) return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    if (test.success) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (test: any, loading: boolean) => {
    if (loading) return <Badge variant="secondary">Checking...</Badge>;
    if (!test) return <Badge variant="secondary">Unknown</Badge>;
    if (test.success) return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Healthy</Badge>;
    return <Badge variant="destructive">Error</Badge>;
  };

  const allHealthy = systems.every(system => 
    !system.loading && system.test?.success
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Status</span>
          <div className="flex items-center gap-2">
            {getStatusIcon({ success: allHealthy }, systems.some(s => s.loading))}
            {getStatusBadge({ success: allHealthy }, systems.some(s => s.loading))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system) => (
            <div
              key={system.name}
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{system.name}</h4>
                {getStatusIcon(system.test, system.loading)}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {system.description}
              </p>
              <div className="flex items-center justify-between">
                {getStatusBadge(system.test, system.loading)}
                {system.test?.error && (
                  <span className="text-xs text-red-500 truncate ml-2">
                    {system.test.error}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Status Check:</strong> This panel tests database connectivity and basic functionality for all Supabase integrations. 
            All systems should show "Healthy" for optimal operation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSystemStatus;

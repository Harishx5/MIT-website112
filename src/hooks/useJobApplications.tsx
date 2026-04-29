
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useJobApplications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobPostings = [], isLoading, refetch } = useQuery({
    queryKey: ['job-postings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  const submitApplicationMutation = useMutation({
    mutationFn: async (applicationData: any) => {
      const { error } = await supabase
        .from('job_applications')
        .insert(applicationData);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-job-applications-count'] });
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll be in touch soon.",
      });
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Set up real-time subscription for job postings
  useEffect(() => {
    const channel = supabase
      .channel('job-postings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_postings'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['job-postings'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'job_applications'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['job-postings'] });
          queryClient.invalidateQueries({ queryKey: ['admin-job-applications-count'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    jobPostings,
    isLoading,
    refetch,
    submitApplication: submitApplicationMutation.mutate,
    isSubmitting: submitApplicationMutation.isPending
  };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useInternshipApplications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: internshipPostings = [], isLoading, refetch } = useQuery({
    queryKey: ['internship-postings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('internship_postings')
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
        .from('internship_applications')
        .insert(applicationData);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internship-postings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-internship-applications-count'] });
      toast({
        title: "Application Submitted!",
        description: "Thank you for your internship application. We'll be in touch soon.",
      });
    },
    onError: (error) => {
      console.error('Error submitting internship application:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Set up real-time subscription for internship postings
  useEffect(() => {
    const channel = supabase
      .channel('internship-postings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'internship_postings'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['internship-postings'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'internship_applications'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['internship-postings'] });
          queryClient.invalidateQueries({ queryKey: ['admin-internship-applications-count'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    internshipPostings,
    isLoading,
    refetch,
    submitApplication: submitApplicationMutation.mutate,
    isSubmitting: submitApplicationMutation.isPending
  };
};
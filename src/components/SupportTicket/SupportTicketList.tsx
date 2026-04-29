import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Ticket, Clock, MessageSquare, Send, User, RefreshCw, UserCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: string;
  priority: string;
  issue_details: string;
  status: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

interface TicketReply {
  id: string;
  ticket_id: string;
  sender_type: 'admin' | 'user';
  sender_name: string;
  sender_email: string;
  message: string;
  is_internal: boolean;
  created_at: string;
}

interface SupportTicketListProps {
  refreshTrigger: number;
}

const SupportTicketList = ({ refreshTrigger }: SupportTicketListProps) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [userReply, setUserReply] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [ticketReplies, setTicketReplies] = useState<Record<string, TicketReply[]>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserTickets = async () => {
    setLoading(true);
    try {
      let userEmail = user?.email;
      
      // For anonymous users, try to get email from session storage
      if (!userEmail) {
        userEmail = sessionStorage.getItem('supportTicketEmail');
      }
      
      if (!userEmail) {
        setTickets([]);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('support_inquiries')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
      
      // Fetch replies for each ticket
      if (data && data.length > 0) {
        const ticketIds = data.map(ticket => ticket.id);
        const { data: repliesData, error: repliesError } = await supabase
          .from('support_ticket_replies')
          .select('*')
          .in('ticket_id', ticketIds)
          .eq('is_internal', false)
          .order('created_at', { ascending: true });

        if (repliesError) throw repliesError;
        
        // Group replies by ticket_id
        const repliesByTicket: Record<string, TicketReply[]> = {};
        repliesData?.forEach(reply => {
          if (!repliesByTicket[reply.ticket_id]) {
            repliesByTicket[reply.ticket_id] = [];
          }
          repliesByTicket[reply.ticket_id].push({
            ...reply,
            sender_type: reply.sender_type as 'admin' | 'user'
          });
        });
        
        setTicketReplies(repliesByTicket);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch your tickets",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, [user, refreshTrigger]);

  const submitUserReply = async () => {
    if (!selectedTicket || !userReply.trim() || !user) return;

    setIsSubmittingReply(true);
    try {
      const { error } = await supabase
        .from('support_ticket_replies')
        .insert([{
          ticket_id: selectedTicket.id,
          sender_type: 'user',
          sender_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          sender_email: user.email,
          message: userReply.trim(),
          is_internal: false
        }]);

      if (error) throw error;

      toast({
        title: "Reply Sent",
        description: "Your reply has been sent to our support team."
      });

      setUserReply('');
      setSelectedTicket(null);
      fetchUserTickets(); // Refresh tickets and replies
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            Loading your tickets...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user && !sessionStorage.getItem('supportTicketEmail')) {
    return (
      <Card className="bg-card/50 backdrop-blur border border-border/50">
        <CardContent className="p-6">
          <div className="text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Please sign in or create a ticket to view your support tickets.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Your Support Tickets
            </div>
            <Button onClick={fetchUserTickets} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                You haven't submitted any support tickets yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="border border-border/50 hover:bg-card/70 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-4 w-4" />
                          <span>Created {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                          {ticket.issue_details.length > 200 
                            ? `${ticket.issue_details.substring(0, 200)}...` 
                            : ticket.issue_details
                          }
                        </p>

                        {/* Show conversation preview */}
                        {ticketReplies[ticket.id] && ticketReplies[ticket.id].length > 0 && (
                          <div className="bg-secondary/30 p-3 rounded-md mt-3">
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Latest Updates ({ticketReplies[ticket.id].length} {ticketReplies[ticket.id].length === 1 ? 'reply' : 'replies'})
                            </p>
                            <div className="space-y-2">
                              {ticketReplies[ticket.id].slice(-2).map((reply) => (
                                <div key={reply.id} className="flex items-start gap-2 text-sm">
                                  {reply.sender_type === 'admin' ? (
                                    <UserCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <User className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-xs">
                                        {reply.sender_type === 'admin' ? 'Support Team' : 'You'}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {reply.message.length > 100 ? `${reply.message.substring(0, 100)}...` : reply.message}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {ticket.admin_notes && (
                          <div className="bg-secondary/50 p-3 rounded-md mt-3">
                            <p className="text-sm font-medium mb-1">Support Notes:</p>
                            <p className="text-sm text-muted-foreground">{ticket.admin_notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Ticket className="h-5 w-5" />
                                Ticket #{ticket.id.substring(0, 8)} - {ticket.category}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Original Ticket */}
                              <div className="bg-secondary/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                  <User className="h-4 w-4 text-green-600" />
                                  <span className="font-medium text-sm">You</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                                  </span>
                                  <Badge className={getStatusColor(ticket.status)} variant="secondary">
                                    {ticket.status.replace('_', ' ').toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm">{ticket.issue_details}</p>
                              </div>

                              {/* Conversation Thread */}
                              {ticketReplies[ticket.id] && ticketReplies[ticket.id].length > 0 && (
                                <div className="space-y-3">
                                  <h4 className="font-medium text-sm flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Conversation ({ticketReplies[ticket.id].length} {ticketReplies[ticket.id].length === 1 ? 'reply' : 'replies'})
                                  </h4>
                                  {ticketReplies[ticket.id].map((reply) => (
                                    <div key={reply.id} className={`p-4 rounded-lg ${
                                      reply.sender_type === 'admin' 
                                        ? 'bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500' 
                                        : 'bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500'
                                    }`}>
                                      <div className="flex items-center gap-2 mb-2">
                                        {reply.sender_type === 'admin' ? (
                                          <UserCircle className="h-4 w-4 text-blue-600" />
                                        ) : (
                                          <User className="h-4 w-4 text-green-600" />
                                        )}
                                        <span className="font-medium text-sm">
                                          {reply.sender_type === 'admin' ? 'Support Team' : 'You'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                        </span>
                                      </div>
                                      <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Reply Form */}
                              <div className="border-t pt-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Add Reply</label>
                                  <Textarea
                                    value={userReply}
                                    onChange={(e) => setUserReply(e.target.value)}
                                    placeholder="Type your reply or additional information..."
                                    rows={4}
                                    className="resize-none"
                                  />
                                </div>

                                <Button 
                                  onClick={submitUserReply}
                                  disabled={isSubmittingReply || !userReply.trim()}
                                  className="w-full mt-3"
                                >
                                  {isSubmittingReply ? (
                                    <>
                                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                      Sending...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="mr-2 h-4 w-4" />
                                      Send Reply
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketList;
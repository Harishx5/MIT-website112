import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Ticket, Clock, User, Mail, Search, RefreshCw, MessageSquare, Send, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

const AdminSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const {
    toast
  } = useToast();

  const fetchTickets = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('support_inquiries').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch support tickets",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

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

  const updateTicket = async () => {
    if (!selectedTicket) return;
    setIsUpdating(true);
    try {
      const updateData: any = {};
      if (adminNotes.trim()) updateData.admin_notes = adminNotes;
      if (newStatus) updateData.status = newStatus;
      updateData.updated_at = new Date().toISOString();
      const {
        error
      } = await supabase.from('support_inquiries').update(updateData).eq('id', selectedTicket.id);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Ticket updated successfully"
      });
      fetchTickets();
      setSelectedTicket(null);
      setAdminNotes('');
      setNewStatus('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.issue_details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openTicketDialog = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setAdminNotes(ticket.admin_notes || '');
    setNewStatus(ticket.status);
  };

  const openReplyDialog = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage('');
    setReplyDialogOpen(true);
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;
    setIsUpdating(true);
    try {
      const {
        error
      } = await supabase.from('support_ticket_replies').insert([{
        ticket_id: selectedTicket.id,
        sender_type: 'admin',
        sender_name: 'Admin Support',
        sender_email: 'support@marzelet.info',
        message: replyMessage.trim(),
        is_internal: false
      }]);
      if (error) throw error;
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent to the customer."
      });
      setReplyMessage('');
      setReplyDialogOpen(false);
      fetchTickets(); // Refresh tickets
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <Card className="bg-card/50 backdrop-blur border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            Loading tickets...
          </div>
        </CardContent>
      </Card>;
  }

  return <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Support Tickets Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchTickets} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Ticket Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{tickets.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {tickets.filter(t => t.status === 'new').length}
                </div>
                <div className="text-sm text-muted-foreground">New</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {tickets.filter(t => t.status === 'in_progress').length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {tickets.filter(t => t.priority === 'high').length}
                </div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </CardContent>
            </Card>
          </div>

          {/* Tickets List */}
          {filteredTickets.length === 0 ? <div className="text-center py-8">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' ? 'No tickets found matching your filters.' : 'No support tickets found.'}
              </p>
            </div> : <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filteredTickets.map(ticket => <Card key={ticket.id} className="border border-border/50 hover:bg-card/70 transition-colors">
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
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{ticket.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{ticket.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Created {formatDistanceToNow(new Date(ticket.created_at), {
                            addSuffix: true
                          })}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {ticket.issue_details.length > 200 ? `${ticket.issue_details.substring(0, 200)}...` : ticket.issue_details}
                          </p>

                          {ticket.admin_notes && <div className="bg-secondary/50 p-3 rounded-md mt-3">
                              <p className="text-sm font-medium mb-1">Admin Notes:</p>
                              <p className="text-sm text-muted-foreground">{ticket.admin_notes}</p>
                            </div>}
                        </div>
                        
                        <div className="flex gap-2">
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => openTicketDialog(ticket)}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Manage
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Manage Ticket #{ticket.id.substring(0, 8)}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Customer:</label>
                                    <p className="text-sm">{ticket.name} ({ticket.email})</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Category:</label>
                                    <p className="text-sm">{ticket.category}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Issue Details:</label>
                                  <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                                    {ticket.issue_details}
                                  </p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select value={newStatus} onValueChange={setNewStatus}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="in_progress">In Progress</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Admin Notes</label>
                                  <Textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} placeholder="Add internal notes or customer response..." rows={4} />
                                </div>

                                <Button onClick={updateTicket} disabled={isUpdating} className="w-full">
                                  <Send className="h-4 w-4 mr-2" />
                                  {isUpdating ? 'Updating...' : 'Update Ticket'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </ScrollArea>}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Reply className="h-5 w-5" />
              Reply to Support Ticket
            </DialogTitle>
          </DialogHeader>
          
          {selectedTicket && <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Original Ticket:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>From:</strong> {selectedTicket.name} ({selectedTicket.email})
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Category:</strong> {selectedTicket.category}
                </p>
                <p className="text-sm">{selectedTicket.issue_details}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Reply</label>
                <Textarea value={replyMessage} onChange={e => setReplyMessage(e.target.value)} placeholder="Type your reply to the customer..." rows={6} className="resize-none" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReplyDialogOpen(false)} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button onClick={handleReply} disabled={isUpdating || !replyMessage.trim()} className="bg-green-600 hover:bg-green-700">
                  {isUpdating ? <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </> : <>
                      <Reply className="mr-2 h-4 w-4" />
                      Send Reply
                    </>}
                </Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
};

export default AdminSupportTickets;

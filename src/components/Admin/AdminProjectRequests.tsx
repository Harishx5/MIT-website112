
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Briefcase, User, Mail, Phone, Building, FileText, DollarSign, Clock, Eye, Edit, AlertTriangle, CheckCircle, XCircle, PlayCircle, Loader2, Search, MessageSquare, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';
import { AdminErrorBoundary } from './AdminErrorBoundary';

interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string;
  budget_range: string | null;
  timeline: string | null;
  project_description: string;
  status: string;
  priority: string | null;
  admin_notes: string | null;
  created_at: string;
}

const AdminProjectRequests = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const {
    toast
  } = useToast();
  const queryClient = useQueryClient();
  const {
    markTypeAsRead
  } = useAdminNotifications();

  // Auto-clear project inquiry notifications when this component is viewed
  useEffect(() => {
    markTypeAsRead('project_inquiry');
  }, [markTypeAsRead]);

  const {
    data: projectInquiries = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-inquiries'],
    queryFn: async () => {
      console.log('Fetching project inquiries...');
      const {
        data,
        error
      } = await supabase.from('project_inquiries').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching project inquiries:', error);
        toast({
          title: "Error",
          description: "Failed to fetch project inquiries",
          variant: "destructive"
        });
        return [];
      }
      console.log('Successfully fetched project inquiries:', data?.length);
      return data as ProjectInquiry[];
    }
  });

  const updateInquiryMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      priority,
      admin_notes
    }: {
      id: string;
      status: string;
      priority: string;
      admin_notes: string;
    }) => {
      console.log('Updating inquiry:', {
        id,
        status,
        priority
      });
      const {
        error
      } = await supabase.from('project_inquiries').update({
        status,
        priority,
        admin_notes
      }).eq('id', id);
      if (error) {
        console.error('Error updating inquiry:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project-inquiries']
      });
      toast({
        title: "Success",
        description: "Project inquiry updated successfully"
      });
      setEditDialogOpen(false);
    },
    onError: (error: any) => {
      console.error('Error updating project inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update project inquiry",
        variant: "destructive"
      });
    }
  });

  const handleViewInquiry = (inquiry: ProjectInquiry) => {
    setSelectedInquiry(inquiry);
    setIsDialogOpen(true);
  };

  const handleEditInquiry = (inquiry: ProjectInquiry) => {
    try {
      console.log('Opening edit dialog for inquiry:', inquiry.id);
      setDialogLoading(true);
      setSelectedInquiry(inquiry);
      setAdminNotes(inquiry.admin_notes || '');
      setSelectedStatus(inquiry.status);
      setSelectedPriority(inquiry.priority || 'medium');
      setEditDialogOpen(true);
    } catch (error) {
      console.error('Error opening edit dialog:', error);
      toast({
        title: "Error",
        description: "Failed to open inquiry details",
        variant: "destructive"
      });
    } finally {
      setDialogLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedInquiry) return;
    updateInquiryMutation.mutate({
      id: selectedInquiry.id,
      status: selectedStatus,
      priority: selectedPriority,
      admin_notes: adminNotes
    });
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'secondary';
      case 'unfinished':
        return 'default';
      case 'finished':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return AlertTriangle;
      case 'unfinished':
        return PlayCircle;
      case 'finished':
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  // Filter inquiries based on search and active tab
  const filteredInquiries = projectInquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inquiry.service_type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inquiry.project_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'new' && inquiry.status === 'new') ||
                      (activeTab === 'in_progress' && inquiry.status === 'unfinished') ||
                      (activeTab === 'completed' && inquiry.status === 'finished');
    
    return matchesSearch && matchesTab;
  });

  // Calculate statistics for current tab
  const getTabStats = () => {
    const tabInquiries = activeTab === 'all' ? projectInquiries : 
                        activeTab === 'new' ? projectInquiries.filter(i => i.status === 'new') :
                        activeTab === 'in_progress' ? projectInquiries.filter(i => i.status === 'unfinished') :
                        activeTab === 'completed' ? projectInquiries.filter(i => i.status === 'finished') :
                        projectInquiries;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return {
      total: tabInquiries.length,
      newThisWeek: tabInquiries.filter(inquiry => new Date(inquiry.created_at || '') > oneWeekAgo).length
    };
  };

  // Statistics by status
  const totalInquiries = projectInquiries.length;
  const newInquiries = projectInquiries.filter(inquiry => inquiry.status === 'new').length;
  const inProgressInquiries = projectInquiries.filter(inquiry => inquiry.status === 'unfinished').length;
  const completedInquiries = projectInquiries.filter(inquiry => inquiry.status === 'finished').length;

  const tabStats = getTabStats();

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading project requests...</span>
      </div>;
  }

  return <AdminErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Project Requests</h2>
            <p className="text-muted-foreground">Manage all project inquiries and requests</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={activeTab === 'all' ? 'ring-2 ring-primary' : 'cursor-pointer hover:shadow-md'} onClick={() => setActiveTab('all')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{totalInquiries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={activeTab === 'new' ? 'ring-2 ring-primary' : 'cursor-pointer hover:shadow-md'} onClick={() => setActiveTab('new')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">New</p>
                  <p className="text-2xl font-bold">{newInquiries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={activeTab === 'in_progress' ? 'ring-2 ring-primary' : 'cursor-pointer hover:shadow-md'} onClick={() => setActiveTab('in_progress')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressInquiries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={activeTab === 'completed' ? 'ring-2 ring-primary' : 'cursor-pointer hover:shadow-md'} onClick={() => setActiveTab('completed')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedInquiries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests by name, email, service type, or description..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({totalInquiries})</TabsTrigger>
            <TabsTrigger value="new">New ({newInquiries})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressInquiries})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedInquiries})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'all' ? 'All Project Requests' : 
                   activeTab === 'new' ? 'New Project Requests' :
                   activeTab === 'in_progress' ? 'In Progress Project Requests' :
                   'Completed Project Requests'} 
                  ({filteredInquiries.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredInquiries.map(inquiry => {
                    const StatusIcon = getStatusIcon(inquiry.status);
                    const displayStatus = inquiry.status === 'unfinished' ? 'in progress' : inquiry.status;
                    
                    return <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <StatusIcon className="w-4 h-4" />
                              <p className="font-semibold">{inquiry.name} - {inquiry.service_type}</p>
                              <Badge variant={getStatusBadgeVariant(inquiry.status)}>
                                {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                              </Badge>
                              {inquiry.priority && <Badge variant="outline" className={inquiry.priority === 'high' ? 'border-red-500 text-red-500' : inquiry.priority === 'medium' ? 'border-yellow-500 text-yellow-500' : 'border-green-500 text-green-500'}>
                                  {inquiry.priority}
                                </Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.project_description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>Submitted: {formatTimeAgo(inquiry.created_at)}</span>
                              {inquiry.budget_range && <span>Budget: {inquiry.budget_range}</span>}
                              {inquiry.timeline && <span>Timeline: {inquiry.timeline}</span>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditInquiry(inquiry)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleViewInquiry(inquiry)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>;
                  })}
                  </div>

                  {filteredInquiries.length === 0 && <div className="text-center py-8">
                      <p className="text-muted-foreground">No project requests found.</p>
                    </div>}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Request Details</DialogTitle>
            </DialogHeader>
            {selectedInquiry && <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Request Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p><strong>Name:</strong> {selectedInquiry.name}</p>
                      <p><strong>Email:</strong> {selectedInquiry.email}</p>
                      <p><strong>Phone:</strong> {selectedInquiry.phone || 'Not provided'}</p>
                      <p><strong>Company:</strong> {selectedInquiry.company || 'Not provided'}</p>
                    </div>
                    <div>
                      <p><strong>Service Type:</strong> {selectedInquiry.service_type}</p>
                      <p><strong>Budget Range:</strong> {selectedInquiry.budget_range || 'Not specified'}</p>
                      <p><strong>Timeline:</strong> {selectedInquiry.timeline || 'Not specified'}</p>
                      <p><strong>Status:</strong> {selectedInquiry.status === 'unfinished' ? 'In Progress' : selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p><strong>Project Description:</strong></p>
                    <p className="whitespace-pre-line mt-2">{selectedInquiry.project_description}</p>
                  </div>
                  <p className="mt-4"><strong>Submitted:</strong> {new Date(selectedInquiry.created_at).toLocaleString()}</p>
                  {selectedInquiry.admin_notes && <div className="mt-4">
                      <p><strong>Admin Notes:</strong></p>
                      <p className="whitespace-pre-line mt-2">{selectedInquiry.admin_notes}</p>
                    </div>}
                </div>
              </div>}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Project Request
                {dialogLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              </DialogTitle>
            </DialogHeader>
            {selectedInquiry && <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="unfinished">In Progress</SelectItem>
                        <SelectItem value="finished">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Admin Notes</label>
                  <Textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} placeholder="Add internal notes about this request..." className="resize-none" rows={4} />
                </div>
              </div>}
            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={updateInquiryMutation.isPending} className="flex items-center gap-2">
                {updateInquiryMutation.isPending ? <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </> : <>
                    <Edit className="w-4 h-4" />
                    Update Request
                  </>}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminErrorBoundary>;
};

export default AdminProjectRequests;

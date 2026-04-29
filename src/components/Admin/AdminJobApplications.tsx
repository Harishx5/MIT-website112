import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Briefcase, FileText, Calendar, Eye, Edit, Download, ExternalLink, CheckCircle, XCircle, Clock, Loader2, AlertTriangle, UserCheck, FileDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';
import jsPDF from 'jspdf';
import { AdminErrorBoundary } from './AdminErrorBoundary';


interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  applied_position: string;
  cover_letter: string | null;
  resume_url: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  // Optional fields that may exist on some rows
  role_type?: string | null;
  custom_role?: string | null;
  // Related job posting (fallback for role title)
  job_postings?: { title: string } | null;
}

// Define allowed statuses based on the current database constraints
const ALLOWED_STATUSES = ['new', 'shortlisted', 'rejected'] as const;

const AdminJobApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { markTypeAsRead } = useAdminNotifications();

  // Auto-clear job application notifications when this component is viewed
  useEffect(() => {
    markTypeAsRead('job_application');
  }, [markTypeAsRead]);

  const { data: jobApplications = [], isLoading } = useQuery({
    queryKey: ['job-applications'],
    queryFn: async () => {
      console.log('Fetching job applications...');
      const { data, error } = await supabase
        .from('job_applications')
        .select('*, job_postings(title)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching job applications:', error);
        toast({
          title: "Error",
          description: "Failed to fetch job applications",
          variant: "destructive",
        });
        return [];
      }
      console.log('Successfully fetched job applications:', data?.length);
      return data as JobApplication[];
    }
  });

  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Updating application status:', { id, status });
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast({ title: "Success", description: "Application status updated successfully" });
    },
    onError: (error: any) => {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  });

  const updateAdminNotesMutation = useMutation({
    mutationFn: async ({ id, admin_notes }: { id: string; admin_notes: string }) => {
      console.log('Updating admin notes:', { id });
      const { error } = await supabase
        .from('job_applications')
        .update({ admin_notes })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast({ title: "Success", description: "Admin notes updated successfully" });
    },
    onError: (error: any) => {
      console.error('Error updating admin notes:', error);
      toast({
        title: "Error",
        description: "Failed to update admin notes",
        variant: "destructive",
      });
    }
  });

  const downloadApplicationsAsCSV = (status: string, title: string) => {
    try {
      let applicationsToDownload;
      
      if (status === 'all') {
        applicationsToDownload = jobApplications;
      } else {
        applicationsToDownload = jobApplications.filter(app => app.status === status);
      }
      
      if (applicationsToDownload.length === 0) {
        toast({
          title: "No Data",
          description: `No ${status === 'all' ? '' : status + ' '}applications to download`,
          variant: "destructive",
        });
        return;
      }

      console.log(`Starting PDF download for ${applicationsToDownload.length} applications`);
      const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation for better table fit
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;
    
    // Add title
    doc.setFontSize(16);
    doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Table configuration
    const cellHeight = 8;
    const startX = 10;
    const columnWidths = [25, 45, 20, 35, 15, 20, 35, 30, 30, 30, 30]; // Adjust widths as needed
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Status', 'Applied', 'Cover Letter', 'Resume', 'LinkedIn', 'GitHub', 'Portfolio'];
    
    // Function to draw table headers
    const drawHeaders = () => {
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      let currentX = startX;
      
      headers.forEach((header, index) => {
        doc.rect(currentX, yPosition, columnWidths[index], cellHeight);
        doc.text(header, currentX + 2, yPosition + 5);
        currentX += columnWidths[index];
      });
      
      yPosition += cellHeight;
      doc.setFont(undefined, 'normal');
    };
    
    // Function to truncate text to fit in cell
    const truncateText = (text: string, maxWidth: number) => {
      if (!text) return '';
      const fontSize = 8;
      doc.setFontSize(fontSize);
      
      if (doc.getTextWidth(text) <= maxWidth - 4) {
        return text;
      }
      
      let truncated = text;
      while (doc.getTextWidth(truncated + '...') > maxWidth - 4 && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
      }
      return truncated + '...';
    };
    
    // Function to draw a table row
    const drawRow = (application: any) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
        drawHeaders();
      }
      
      doc.setFontSize(8);
      let currentX = startX;
      
      const rowData = [
        application.name,
        application.email,
        application.phone || 'N/A',
        application.applied_position?.trim() || application.job_postings?.title || application.custom_role || 'Unknown',
        application.status,
        new Date(application.created_at).toLocaleDateString(),
        application.cover_letter ? application.cover_letter.substring(0, 50) + '...' : 'N/A',
        application.resume_url ? 'Available' : 'N/A',
        application.linkedin_url ? 'Available' : 'N/A',
        application.github_url ? 'Available' : 'N/A',
        application.portfolio_url ? 'Available' : 'N/A'
      ];
      
      rowData.forEach((data, index) => {
        doc.rect(currentX, yPosition, columnWidths[index], cellHeight);
        const truncatedText = truncateText(data || '', columnWidths[index]);
        doc.text(truncatedText, currentX + 2, yPosition + 5);
        currentX += columnWidths[index];
      });
      
      yPosition += cellHeight;
    };
    
    // Draw headers for first page
    drawHeaders();
    
    // Draw data rows
    applicationsToDownload.forEach((application) => {
      drawRow(application);
    });
    
      // Save the PDF
      const fileName = status === 'all' ? 'all-applications' : `${status}-applications`;
      doc.save(`${fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Success",
        description: `Downloaded ${applicationsToDownload.length} ${status === 'all' ? '' : status + ' '}applications as PDF table`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Error",
        description: "Failed to generate PDF download. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenDialog = async (application: JobApplication) => {
    try {
      console.log('Opening dialog for application:', application.id);
      setDialogLoading(true);
      setSelectedApplication(application);
      setAdminNotes(application.admin_notes || '');
      setSelectedStatus(application.status);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error opening dialog:', error);
      toast({
        title: "Error",
        description: "Failed to open application details",
        variant: "destructive",
      });
    } finally {
      setDialogLoading(false);
    }
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setIsDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveNotes = async () => {
    if (!selectedApplication) return;
    await updateAdminNotesMutation.mutateAsync({ id: selectedApplication.id, admin_notes: adminNotes });
    handleCloseDialog();
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedApplication) return;
    await updateApplicationStatusMutation.mutateAsync({ id: selectedApplication.id, status });
    setSelectedStatus(status);
  };

  const handleQuickStatusUpdate = (id: string, status: string) => {
    updateApplicationStatusMutation.mutate({ id, status });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'reviewed': return 'default';
      case 'shortlisted': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return AlertTriangle;
      case 'reviewed': return Eye;
      case 'shortlisted': return UserCheck;
      case 'rejected': return XCircle;
      default: return AlertTriangle;
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

  const renderApplicationCard = (application: JobApplication) => {
    const StatusIcon = getStatusIcon(application.status);
    
    // Debug: Check what's in the applied_position field
    console.log('Application data:', {
      id: application.id,
      name: application.name,
      applied_position: application.applied_position,
      email: application.email
    });
    
    return (
      <Card key={application.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Briefcase className="w-4 h-4" />
                {(application.applied_position?.trim() || application.job_postings?.title || application.custom_role || 'Unknown Role')}
              </div>
              <CardTitle className="flex items-center gap-2 mt-1">
                <StatusIcon className="w-5 h-5" />
                {application.name}
                <Badge variant={getStatusBadgeVariant(application.status)}>
                  {application.status}
                </Badge>
              </CardTitle>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span>
                  <Mail className="w-4 h-4 mr-1 inline-block" />
                  {application.email}
                </span>
                {application.phone && (
                  <span>
                    <Phone className="w-4 h-4 mr-1 inline-block" />
                    {application.phone}
                  </span>
                )}
                <span>
                  <Calendar className="w-4 h-4 mr-1 inline-block" />
                  Applied {formatTimeAgo(application.created_at)}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* Quick Action Buttons */}
              {application.status === 'new' && (
                <>
                  {/* Change New -> Shortlisted (instead of New -> Reviewed) */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickStatusUpdate(application.id, 'shortlisted')}
                    disabled={updateApplicationStatusMutation.isPending}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    {updateApplicationStatusMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserCheck className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickStatusUpdate(application.id, 'rejected')}
                    disabled={updateApplicationStatusMutation.isPending}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenDialog(application)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Cover Letter</h4>
              <p className="text-muted-foreground">
                {application.cover_letter ? (
                  <>
                    {application.cover_letter.substring(0, 150)}
                    {application.cover_letter.length > 150 ? '...' : ''}
                  </>
                ) : (
                  'No cover letter provided'
                )}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Links</h4>
              <ul className="text-muted-foreground space-y-1">
                {application.resume_url && (
                  <li>
                    <a
                      href={application.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <Download className="w-4 h-4" />
                      Resume
                    </a>
                  </li>
                )}
                {application.linkedin_url && (
                  <li>
                    <a
                      href={application.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </li>
                )}
                {application.github_url && (
                  <li>
                    <a
                      href={application.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      GitHub
                    </a>
                  </li>
                )}
                {application.portfolio_url && (
                  <li>
                    <a
                      href={application.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <Briefcase className="w-4 h-4" />
                      Portfolio
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {application.admin_notes && (
            <div className="mt-4 p-3 bg-muted rounded text-sm">
              <strong>Admin Notes:</strong> {application.admin_notes.substring(0, 100)}...
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Filter applications based on active tab
  const filteredApplications = jobApplications.filter(application => {
    if (activeTab === 'all') return true;
    return application.status === activeTab;
  });

  // Get counts for each status
  const statusCounts = {
    all: jobApplications.length,
    new: jobApplications.filter(app => app.status === 'new').length,
    shortlisted: jobApplications.filter(app => app.status === 'shortlisted').length,
    rejected: jobApplications.filter(app => app.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading job applications...</span>
      </div>
    );
  }

  return (
    <AdminErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold">Job Applications Management</h2>
            <p className="text-muted-foreground">Manage job applications ({jobApplications.length} total)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusCounts.all > 0 && (
              <Button
                onClick={() => downloadApplicationsAsCSV('all', 'All Job Applications')}
                className="flex items-center gap-2"
                variant="outline"
                size="sm"
              >
                <FileDown className="w-4 h-4" />
                All ({statusCounts.all})
              </Button>
            )}
            {statusCounts.new > 0 && (
              <Button
                onClick={() => downloadApplicationsAsCSV('new', 'New Job Applications')}
                className="flex items-center gap-2"
                variant="outline"
                size="sm"
              >
                <FileDown className="w-4 h-4" />
                New ({statusCounts.new})
              </Button>
            )}
            {statusCounts.shortlisted > 0 && (
              <Button
                onClick={() => downloadApplicationsAsCSV('shortlisted', 'Shortlisted Job Applications')}
                className="flex items-center gap-2"
                variant="outline"
                size="sm"
              >
                <FileDown className="w-4 h-4" />
                Shortlisted ({statusCounts.shortlisted})
              </Button>
            )}
            {statusCounts.rejected > 0 && (
              <Button
                onClick={() => downloadApplicationsAsCSV('rejected', 'Rejected Job Applications')}
                className="flex items-center gap-2"
                variant="outline"
                size="sm"
              >
                <FileDown className="w-4 h-4" />
                Rejected ({statusCounts.rejected})
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All
              <Badge variant="secondary" className="ml-1">
                {statusCounts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              New
              <Badge variant="secondary" className="ml-1">
                {statusCounts.new}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="flex items-center gap-2">
              Shortlisted
              <Badge variant="outline" className="ml-1">
                {statusCounts.shortlisted}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              Rejected
              <Badge variant="destructive" className="ml-1">
                {statusCounts.rejected}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid gap-6">
                {filteredApplications.map(renderApplicationCard)}
              </div>

              {filteredApplications.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      {activeTab === 'all' 
                        ? 'No job applications found.' 
                        : `No ${activeTab} job applications found.`
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Enhanced Dialog for viewing/editing application details */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Application Details
                  {dialogLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
                {selectedApplication && (
                  <div className="text-lg font-medium text-primary">
                    Applied for: {(selectedApplication.applied_position?.trim() || selectedApplication.job_postings?.title || selectedApplication.custom_role || 'Unknown Role')}
                  </div>
                )}
              </DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6">
                {/* Header with Status */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedApplication.name}</h3>
                    <p className="text-lg text-muted-foreground">{(selectedApplication.applied_position?.trim() || selectedApplication.job_postings?.title || selectedApplication.custom_role || 'Unknown Role')}</p>
                    <p className="text-sm text-muted-foreground">Applied {formatTimeAgo(selectedApplication.created_at)}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(selectedApplication.status)} className="text-lg px-3 py-1">
                    {selectedApplication.status}
                  </Badge>
                </div>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-muted-foreground">{selectedApplication.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Position</label>
                      <p className="text-sm text-muted-foreground">{(selectedApplication.applied_position?.trim() || selectedApplication.job_postings?.title || selectedApplication.custom_role || 'Unknown Role')}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Cover Letter */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Cover Letter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={selectedApplication.cover_letter || 'No cover letter provided'}
                      readOnly
                      className="resize-none min-h-[120px]"
                    />
                  </CardContent>
                </Card>

                {/* Documents and Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Documents & Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium">Resume</label>
                      {selectedApplication.resume_url ? (
                        <a
                          href={selectedApplication.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download Resume
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">N/A</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">LinkedIn</label>
                      {selectedApplication.linkedin_url ? (
                        <a
                          href={selectedApplication.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Profile
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">N/A</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">GitHub</label>
                      {selectedApplication.github_url ? (
                        <a
                          href={selectedApplication.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View GitHub
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">N/A</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Portfolio</label>
                      {selectedApplication.portfolio_url ? (
                        <a
                          href={selectedApplication.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
                        >
                          <Briefcase className="w-4 h-4" />
                          View Portfolio
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">N/A</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Admin Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALLOWED_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Admin Notes</label>
                      <Textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add notes about this application..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNotes}
                disabled={updateAdminNotesMutation.isPending}
                className="flex items-center gap-2"
              >
                {updateAdminNotesMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminErrorBoundary>
  );
};

export default AdminJobApplications;

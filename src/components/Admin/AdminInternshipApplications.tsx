import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Mail, Phone, GraduationCap, FileText, Calendar, Eye, 
  Download, ExternalLink, CheckCircle, XCircle, Clock, Loader2, 
  AlertTriangle, UserCheck, FileDown, School
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';
import jsPDF from 'jspdf';
import { AdminErrorBoundary } from './AdminErrorBoundary';

interface InternshipApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  applied_position: string;
  college_name: string | null;
  degree: string | null;
  year_of_study: string | null;
  cgpa: string | null;
  skills: string[] | null;
  cover_letter: string | null;
  resume_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  internship_postings?: { title: string } | null;
}

const ALLOWED_STATUSES = ['new', 'shortlisted', 'rejected'] as const;

const AdminInternshipApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState<InternshipApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { markTypeAsRead } = useAdminNotifications();

  // Auto-clear internship application notifications when this component is viewed
  useEffect(() => {
    markTypeAsRead('internship_application');
  }, [markTypeAsRead]);

  const { data: internshipApplications = [], isLoading } = useQuery({
    queryKey: ['internship-applications'],
    queryFn: async () => {
      console.log('Fetching internship applications...');
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*, internship_postings(title)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching internship applications:', error);
        toast({
          title: "Error",
          description: "Failed to fetch internship applications",
          variant: "destructive",
        });
        return [];
      }
      console.log('Successfully fetched internship applications:', data?.length);
      return data as InternshipApplication[];
    }
  });

  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Updating internship application status:', { id, status });
      const { error } = await supabase
        .from('internship_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internship-applications'] });
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
        .from('internship_applications')
        .update({ admin_notes })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internship-applications'] });
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

  const downloadApplicationsAsPDF = (status: string, title: string) => {
    try {
      let applicationsToDownload;
      
      if (status === 'all') {
        applicationsToDownload = internshipApplications;
      } else {
        applicationsToDownload = internshipApplications.filter(app => app.status === status);
      }
      
      if (applicationsToDownload.length === 0) {
        toast({
          title: "No Data",
          description: `No ${status === 'all' ? '' : status + ' '}internship applications to download`,
          variant: "destructive",
        });
        return;
      }

      console.log(`Starting PDF download for ${applicationsToDownload.length} internship applications`);
      const doc = new jsPDF('l', 'mm', 'a4');
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
      const columnWidths = [25, 40, 20, 35, 25, 15, 20, 30, 25, 25, 25, 25];
      const headers = ['Name', 'Email', 'Phone', 'Position', 'College', 'Year', 'Status', 'Applied', 'Resume', 'LinkedIn', 'GitHub', 'Portfolio'];
      
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
          application.applied_position?.trim() || application.internship_postings?.title || 'Unknown',
          application.college_name || 'N/A',
          application.year_of_study || 'N/A',
          application.status,
          new Date(application.created_at).toLocaleDateString(),
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
      const fileName = status === 'all' ? 'all-internship-applications' : `${status}-internship-applications`;
      doc.save(`${fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Success",
        description: `Downloaded ${applicationsToDownload.length} ${status === 'all' ? '' : status + ' '}internship applications as PDF`,
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

  const handleOpenDialog = async (application: InternshipApplication) => {
    try {
      console.log('Opening dialog for internship application:', application.id);
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
      case 'shortlisted': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return AlertTriangle;
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

  const renderApplicationCard = (application: InternshipApplication) => {
    const StatusIcon = getStatusIcon(application.status);
    
    return (
      <Card key={application.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <GraduationCap className="w-4 h-4" />
                {application.applied_position?.trim() || application.internship_postings?.title || 'Unknown Position'}
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
              {application.college_name && (
                <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                  <School className="w-4 h-4" />
                  {application.college_name} {application.year_of_study && `(${application.year_of_study})`}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              {application.status === 'new' && (
                <>
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
              <h4 className="font-semibold text-blue-600 mb-2">Academic Background</h4>
              <div className="text-muted-foreground space-y-1">
                {application.degree && <p>Degree: {application.degree}</p>}
                {application.cgpa && <p>CGPA: {application.cgpa}</p>}
                {application.skills && application.skills.length > 0 && (
                  <div>
                    <p className="font-medium">Skills:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {application.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {application.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{application.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Links & Availability</h4>
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
              </ul>
            </div>
          </div>
          {application.cover_letter && (
            <div className="mt-4">
              <h4 className="font-semibold text-purple-600 mb-2">Cover Letter</h4>
              <p className="text-muted-foreground text-sm">
                {application.cover_letter.substring(0, 200)}
                {application.cover_letter.length > 200 ? '...' : ''}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const filteredApplications = activeTab === 'all' 
    ? internshipApplications 
    : internshipApplications.filter(app => app.status === activeTab);

  const statusCounts = {
    all: internshipApplications.length,
    new: internshipApplications.filter(app => app.status === 'new').length,
    shortlisted: internshipApplications.filter(app => app.status === 'shortlisted').length,
    rejected: internshipApplications.filter(app => app.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading internship applications...</span>
      </div>
    );
  }

  return (
    <AdminErrorBoundary>
      <div className="space-y-6">
        {/* Header with download buttons */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Internship Applications</h2>
            <p className="text-muted-foreground">Manage internship applications and candidate status</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadApplicationsAsPDF(activeTab, `${activeTab === 'all' ? 'All' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Internship Applications`)}
              className="flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All <Badge variant="secondary">{statusCounts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              New <Badge variant="secondary">{statusCounts.new}</Badge>
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="flex items-center gap-2">
              Shortlisted <Badge variant="secondary">{statusCounts.shortlisted}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              Rejected <Badge variant="secondary">{statusCounts.rejected}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No internship applications found for this category.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredApplications.map(renderApplicationCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Application Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Internship Application Details</DialogTitle>
            </DialogHeader>
            
            {selectedApplication && (
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-6">
                  {/* Application Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-3">Applicant Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {selectedApplication.name}</p>
                        <p><strong>Email:</strong> {selectedApplication.email}</p>
                        {selectedApplication.phone && <p><strong>Phone:</strong> {selectedApplication.phone}</p>}
                        <p><strong>Position Applied:</strong> {selectedApplication.applied_position}</p>
                        <p><strong>Applied Date:</strong> {new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Academic Details</h3>
                      <div className="space-y-2 text-sm">
                        {selectedApplication.college_name && <p><strong>College:</strong> {selectedApplication.college_name}</p>}
                        {selectedApplication.degree && <p><strong>Degree:</strong> {selectedApplication.degree}</p>}
                        {selectedApplication.year_of_study && <p><strong>Year of Study:</strong> {selectedApplication.year_of_study}</p>}
                        {selectedApplication.cgpa && <p><strong>CGPA:</strong> {selectedApplication.cgpa}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Skills & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}


                  {/* Cover Letter */}
                  {selectedApplication.cover_letter && (
                    <div>
                      <h3 className="font-semibold mb-3">Cover Letter</h3>
                      <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                        {selectedApplication.cover_letter}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div>
                    <h3 className="font-semibold mb-3">Documents & Links</h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedApplication.resume_url && (
                        <a
                          href={selectedApplication.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <Download className="w-4 h-4" />
                          Resume
                        </a>
                      )}
                      {selectedApplication.linkedin_url && (
                        <a
                          href={selectedApplication.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {selectedApplication.github_url && (
                        <a
                          href={selectedApplication.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {selectedApplication.portfolio_url && (
                        <a
                          href={selectedApplication.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h3 className="font-semibold mb-3">Update Status</h3>
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ALLOWED_STATUSES.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Admin Notes */}
                  <div>
                    <h3 className="font-semibold mb-3">Admin Notes</h3>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes about this application..."
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleSaveNotes}
                      className="mt-3"
                      disabled={updateAdminNotesMutation.isPending}
                    >
                      {updateAdminNotesMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Notes'
                      )}
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminErrorBoundary>
  );
};

export default AdminInternshipApplications;
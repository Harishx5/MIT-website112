import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/hooks/useAdmin';
import AdminOverview from '@/components/Admin/AdminOverview';
import AdminBlogPosts from '@/components/Admin/AdminBlogPosts';
import AdminContactSubmissions from '@/components/Admin/AdminContactSubmissions';
import AdminReviews from '@/components/Admin/AdminReviews';
import AdminProjectRequests from '@/components/Admin/AdminProjectRequests';
import AdminJobApplications from '@/components/Admin/AdminJobApplications';
import AdminInternshipApplications from '@/components/Admin/AdminInternshipApplications';
import AdminNews from '@/components/Admin/AdminNews';
import AdminJobPostings from '@/components/Admin/AdminJobPostings';
import AdminInternshipPostings from '@/components/Admin/AdminInternshipPostings';
import AdminPortfolioProjects from '@/components/Admin/AdminPortfolioProjects';
import AdminUsers from '@/components/Admin/AdminUsers';
import AdminTrustedPartners from '@/components/Admin/AdminTrustedPartners';
import AdminTrustedCompanies from '@/components/Admin/AdminTrustedCompanies';
import AdminCaseStudies from '@/components/Admin/AdminCaseStudies';
import AdminSupportTickets from '@/components/Admin/AdminSupportTickets';
import AdminCommentApproval from '@/components/Admin/AdminCommentApproval';
import AdminServices from '@/components/Admin/AdminServices';
import AdminInternDetails from '@/components/Admin/AdminInternDetails';
import { BarChart3, FileText, MessageSquare, Star, Briefcase, Users, Newspaper, PlusSquare, FolderOpen, UserCheck, Building2, BookOpen, Ticket, MessageCircle, Settings, GraduationCap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';

const AdminDashboard = () => {
  const {
    isAdmin,
    loading,
    user
  } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const {
    markTypeAsRead
  } = useAdminNotifications();

  // Log authentication status for debugging
  useEffect(() => {
    console.log('AdminDashboard - Auth status:', {
      user: user?.email,
      isAdmin,
      loading
    });
  }, [user, isAdmin, loading]);

  // Scroll to top when tab changes and mark notifications as read for specific tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Mark notifications as read when visiting specific tabs
    switch (value) {
      case 'contact':
        markTypeAsRead('contact');
        break;
      case 'projects':
        markTypeAsRead('project_inquiry');
        break;
      case 'jobs':
        markTypeAsRead('job_application');
        break;
      case 'internships':
        markTypeAsRead('internship_application');
        break;
      case 'reviews':
        markTypeAsRead('review');
        break;
    }
  };
  if (loading) {
    return <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </Layout>;
  }
  if (!user) {
    return <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
              <p className="text-muted-foreground mb-4">You must be signed in to access the admin dashboard.</p>
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>;
  }
  if (!isAdmin) {
    return <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
              <p className="text-muted-foreground mb-2">You don't have permission to access this page.</p>
              <p className="text-sm text-muted-foreground">Current user: {user.email}</p>
              <p className="text-sm text-muted-foreground">Required admin emails: gowthamj0055@gmail.com, marzeletinfotechnology@gmail.com</p>
            </CardContent>
          </Card>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 pt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Admin Dashboard</h1>
          <div>
            <p className="text-muted-foreground text-lg">Manage your website content and user interactions</p>
            <p className="text-sm text-muted-foreground">Logged in as: {user.email}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="flex flex-col w-full p-2 gap-2 h-auto">
            {/* First Row - 10 tabs */}
            <div className="flex w-full overflow-x-auto gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-3 text-sm px-4 py-3">
                <BarChart3 className="h-5 w-5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-3 text-sm px-4 py-3">
                <UserCheck className="h-5 w-5" />
                Users
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-3 text-sm px-4 py-3">
                <Settings className="h-5 w-5" />
                Services
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-3 text-sm px-4 py-3">
                <FileText className="h-5 w-5" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-3 text-sm px-4 py-3">
                <Newspaper className="h-5 w-5" />
                News
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-3 text-sm px-4 py-3">
                <FolderOpen className="h-5 w-5" />
                Products
              </TabsTrigger>
              <TabsTrigger value="case-studies" className="flex items-center gap-3 text-sm px-4 py-3">
                <BookOpen className="h-5 w-5" />
                Cases
              </TabsTrigger>
              <TabsTrigger value="partners" className="flex items-center gap-3 text-sm px-4 py-3">
                <Building2 className="h-5 w-5" />
                Partners
              </TabsTrigger>
              <TabsTrigger value="trusted-companies" className="flex items-center gap-3 text-sm px-4 py-3">
                <Building2 className="h-5 w-5" />
                Trusted Companies
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-3 text-sm px-4 py-3">
                <MessageSquare className="h-5 w-5" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-3 text-sm px-4 py-3">
                <Star className="h-5 w-5" />
                Reviews
              </TabsTrigger>
            </div>
            
            {/* Second Row */}
            <div className="flex w-full overflow-x-auto gap-2">
              <TabsTrigger value="projects" className="flex items-center gap-3 text-sm px-4 py-3">
                <Briefcase className="h-5 w-5" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-3 text-sm px-4 py-3">
                <Users className="h-5 w-5" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="job-postings" className="flex items-center gap-3 text-sm px-4 py-3">
                <PlusSquare className="h-5 w-5" />
                Job Postings
              </TabsTrigger>
              <TabsTrigger value="internship-postings" className="flex items-center gap-3 text-sm px-4 py-3">
                <PlusSquare className="h-5 w-5" />
                Internship Postings
              </TabsTrigger>
              <TabsTrigger value="internships" className="flex items-center gap-3 text-sm px-4 py-3">
                <GraduationCap className="h-5 w-5" />
                Internship Applications
              </TabsTrigger>
              <TabsTrigger value="intern-details" className="flex items-center gap-3 text-sm px-4 py-3">
                <Award className="h-5 w-5" />
                Intern Certificates
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-3 text-sm px-4 py-3">
                <Ticket className="h-5 w-5" />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-3 text-sm px-4 py-3">
                <MessageCircle className="h-5 w-5" />
                Comments
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="services">
            <AdminServices />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlogPosts />
          </TabsContent>

          <TabsContent value="news">
            <AdminNews />
          </TabsContent>

          <TabsContent value="portfolio">
            <AdminPortfolioProjects />
          </TabsContent>

          <TabsContent value="case-studies">
            <AdminCaseStudies />
          </TabsContent>

          <TabsContent value="partners">
            <AdminTrustedPartners />
          </TabsContent>

          <TabsContent value="trusted-companies">
            <AdminTrustedCompanies />
          </TabsContent>

          <TabsContent value="contact">
            <AdminContactSubmissions />
          </TabsContent>

          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjectRequests />
          </TabsContent>

          <TabsContent value="jobs">
            <AdminJobApplications />
          </TabsContent>

          <TabsContent value="job-postings">
            <AdminJobPostings />
          </TabsContent>

          <TabsContent value="internship-postings">
            <AdminInternshipPostings />
          </TabsContent>

          <TabsContent value="internships">
            <AdminInternshipApplications />
          </TabsContent>

          <TabsContent value="tickets">
            <AdminSupportTickets />
          </TabsContent>

          <TabsContent value="comments">
            <AdminCommentApproval />
          </TabsContent>

          <TabsContent value="intern-details">
            <AdminInternDetails />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>;
};

export default AdminDashboard;

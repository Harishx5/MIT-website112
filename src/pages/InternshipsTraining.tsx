import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Send, Calendar, AlertCircle, Building, GraduationCap, BookOpen, Award } from 'lucide-react';
import InternshipApplicationModal from '@/components/Internship/InternshipApplicationModal';
import { useInternshipApplications } from '@/hooks/useInternshipApplications';
import SEO from '@/components/SEO';

const InternshipsTraining = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<string>('');
  const [selectedInternshipId, setSelectedInternshipId] = useState<string>('');
  const { internshipPostings, isLoading } = useInternshipApplications();
  const navigate = useNavigate();

  const handleApplyClick = (internshipTitle: string, internshipId: string) => {
    setSelectedInternship(internshipTitle);
    setSelectedInternshipId(internshipId);
    setIsModalOpen(true);
  };

  const handleInternshipTitleClick = (internshipId: string) => {
    navigate(`/internship/${internshipId}`);
  };

  const isDeadlinePassed = (deadline: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    // Set both dates to midnight for date-only comparison
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return deadlineDate < today;
  };

  const getInternshipStatus = (internship: any) => {
    if (isDeadlinePassed(internship.deadline)) return { text: "Deadline Passed", variant: "destructive" as const };
    return { text: "Active", variant: "default" as const };
  };

  return (
    <Layout>
      <SEO 
        title="Internship & Training Programs - Marzelet Info Technology" 
        description="Launch your tech career with hands-on experience and professional mentorship through our comprehensive internship programs." 
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">Tech Career</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Start your journey in technology with hands-on experience, professional mentorship, and real-world projects. 
              Join our comprehensive internship programs designed to bridge the gap between academics and industry.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>500+ Program Graduates</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>Flexible Duration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Verify Intern Banner */}
        <section className="pb-4">
          <div className="container mx-auto px-4">
            <Card className="max-w-6xl mx-auto border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-emerald-500/10">
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Already an Intern with us?</h3>
                    <p className="text-sm text-muted-foreground">Verify your internship certificate authenticity instantly.</p>
                  </div>
                </div>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap"
                  onClick={() => navigate('/verify-intern')}
                >
                  Verify Intern Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internship Openings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Internship Opportunities</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-lg">Loading internship opportunities...</div>
              </div>
            ) : internshipPostings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No Current Opportunities</h3>
                <p className="text-muted-foreground">
                  We don't have any active internship postings at the moment, but we're always looking for talented students.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {internshipPostings.map((internship) => {
                  const deadlinePassed = isDeadlinePassed(internship.deadline);
                  const internshipStatus = getInternshipStatus(internship);
                  
                  return (
                    <Card 
                      key={internship.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleInternshipTitleClick(internship.id)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle 
                            className="text-xl hover:text-emerald-600 cursor-pointer transition-colors"
                            onClick={() => handleInternshipTitleClick(internship.id)}
                          >
                            {internship.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{internship.duration}</Badge>
                            <Badge variant={internshipStatus.variant}>
                              {internshipStatus.text}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {internship.location}
                          </span>
                          <span>{internship.experience_level}</span>
                          <span>{internship.department}</span>
                          {internship.vacancy_count && (
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <Building className="w-4 h-4" />
                              {internship.vacancy_count} {internship.vacancy_count === 1 ? 'Position' : 'Positions'}
                            </span>
                          )}
                        </div>
                        {internship.stipend_range && (
                          <div className="text-sm font-medium text-emerald-600">
                            {internship.stipend_range}
                          </div>
                        )}
                        {internship.deadline && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Apply by: {new Date(internship.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{internship.description}</p>
                        {internship.requirements && internship.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Key Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {internship.requirements.slice(0, 3).map((requirement, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {requirement}
                                </Badge>
                              ))}
                              {internship.requirements.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{internship.requirements.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {internship.application_count || 0} applications submitted
                          </div>
                          {deadlinePassed ? (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Deadline Passed</span>
                            </div>
                          ) : (
                            <Button 
                              className="bg-emerald-600 hover:bg-emerald-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplyClick(internship.title, internship.id);
                              }}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Why Join Our Program */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Internship Program?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Industry Mentorship</h3>
                <p className="text-muted-foreground">Learn from experienced professionals working on cutting-edge projects.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Project Experience</h3>
                <p className="text-muted-foreground">Work on actual client projects and build your professional portfolio.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Placement Support</h3>
                <p className="text-muted-foreground">Job placement assistance with our network of hiring partners.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InternshipApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        internshipTitle={selectedInternship}
        internshipId={selectedInternshipId}
      />
    </Layout>
  );
};

export default InternshipsTraining;
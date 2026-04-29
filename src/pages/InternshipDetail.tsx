import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Send, Calendar, AlertCircle, Building, Target, Award, ArrowLeft, GraduationCap, BookOpen, Lightbulb, Code, Database, Smartphone, Cloud, Shield } from 'lucide-react';
import InternshipApplicationModal from '@/components/Internship/InternshipApplicationModal';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
const InternshipDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchInternshipDetail = async () => {
      if (!id) return;
      try {
        const {
          data,
          error
        } = await supabase.from('internship_postings').select('*').eq('id', id).eq('is_active', true).single();
        if (error) throw error;
        setInternship(data);
      } catch (error) {
        console.error('Error fetching internship details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternshipDetail();
  }, [id]);
  const isDeadlinePassed = (deadline: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };
  const isInternshipClosed = (internship: any) => {
    return isDeadlinePassed(internship.deadline);
  };
  if (loading) {
    return <Layout>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading internship details...</div>
            </div>
          </div>
        </div>
      </Layout>;
  }
  if (!internship) {
    return <Layout>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Internship Not Found</h1>
              <p className="text-muted-foreground">This internship posting may have been removed or doesn't exist.</p>
            </div>
          </div>
        </div>
      </Layout>;
  }
  const internshipClosed = isInternshipClosed(internship);
  return <Layout>
      <SEO title={`${internship.title} - Internship at Marzelet`} description={internship.description} />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        {/* Internship Header */}
        <section className="pt-6 pb-12 bg-gradient-to-r from-emerald-600/10 via-green-600/10 to-emerald-600/10">
          {/* Back to Internships Button - Left Corner */}
          <div className="container mx-auto px-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/internships-training')} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Internships
            </Button>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">{internship.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Marzelet Info Technology
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {internship.department}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{internship.duration}</Badge>
                    <Badge variant="outline">{internship.experience_level}</Badge>
                    {internship.stipend_range && <Badge variant="outline" className="text-emerald-600">
                        {internship.stipend_range}
                      </Badge>}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                  {internship.deadline && <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Apply by: {new Date(internship.deadline).toLocaleDateString()}
                    </div>}
                  {internshipClosed ? <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Applications Closed</span>
                    </div> : <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsModalOpen(true)}>
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Internship Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Internship Content - Takes 2/3 of the space */}
              <div className="lg:col-span-2 space-y-8">
                {/* Internship Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Internship Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{internship.description}</p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                {internship.requirements && internship.requirements.length > 0 && <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {internship.requirements.map((requirement: string, index: number) => <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{requirement}</span>
                          </li>)}
                      </ul>
                    </CardContent>
                  </Card>}

                {/* Responsibilities */}
                {internship.responsibilities && internship.responsibilities.length > 0 && <Card>
                    <CardHeader>
                      <CardTitle>Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {internship.responsibilities.map((responsibility: string, index: number) => <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{responsibility}</span>
                          </li>)}
                      </ul>
                    </CardContent>
                  </Card>}

                {/* Learning Outcomes */}
                {internship.learning_outcomes && internship.learning_outcomes.length > 0 && <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        What You'll Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {internship.learning_outcomes.map((outcome: string, index: number) => <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{outcome}</span>
                          </li>)}
                      </ul>
                    </CardContent>
                  </Card>}
              </div>

              {/* Sidebar - Takes 1/3 of the space */}
              <div className="space-y-8">
                {/* Application Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Positions:</span>
                      <span className="font-medium text-emerald-600">{internship.vacancy_count || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applications Submitted:</span>
                      <span className="font-medium">{internship.application_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posted:</span>
                      <span>{new Date(internship.created_at).toLocaleDateString()}</span>
                    </div>
                    {internship.deadline && <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span>{new Date(internship.deadline).toLocaleDateString()}</span>
                      </div>}
                  </CardContent>
                </Card>

                {/* Quick Company Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Program Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">12+</div>
                        <div className="text-xs font-medium">Industry Partners</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">3 Months</div>
                        <div className="text-xs font-medium">Program Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">Live</div>
                        <div className="text-xs font-medium">Project Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* About Our Program */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    About Our Internship Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Our comprehensive internship program is designed to bridge the gap between academic learning 
                      and industry requirements. We provide hands-on experience with cutting-edge technologies, 
                      mentorship from experienced professionals, and real-world project exposure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Program Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Real Project Experience:</span>
                          <span className="text-muted-foreground ml-1">Work on actual client projects</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Industry Mentorship:</span>
                          <span className="text-muted-foreground ml-1">Learn from experienced professionals</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Career Support:</span>
                          <span className="text-muted-foreground ml-1">Job placement assistance</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Certification:</span>
                          <span className="text-muted-foreground ml-1">Industry-recognized certificates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Program Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Foundation Training</p>
                          <p className="text-xs text-muted-foreground">
                            Learn fundamental concepts and best practices in your chosen technology stack.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Hands-on Projects</p>
                          <p className="text-xs text-muted-foreground">
                            Work on real client projects under the guidance of experienced mentors.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Career Development</p>
                          <p className="text-xs text-muted-foreground">
                            Portfolio building, interview preparation, and job placement assistance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* About Marzelet */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    About Marzelet Info Technology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Marzelet Info Technology is a pioneering technology solutions provider based in Chennai, India, 
                      specializing in innovative software development, digital transformation, and comprehensive IT services. 
                      Founded with a vision to revolutionize how businesses leverage technology, we have established ourselves 
                      as a trusted partner for organizations seeking cutting-edge solutions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Our Mission</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      To empower businesses worldwide by delivering innovative, scalable, and secure technology solutions 
                      that drive digital transformation, enhance operational efficiency, and create sustainable competitive 
                      advantages in an ever-evolving digital landscape.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Our Vision</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      To become the global leader in comprehensive technology solutions, recognized for our innovation, 
                      reliability, and transformative impact on businesses across all industries. We envision a future 
                      where every organization, regardless of size, can harness the full potential of technology to 
                      achieve unprecedented growth and success.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Our Core Values</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Innovation:</span>
                          <span className="text-muted-foreground ml-1">Constantly pushing technological boundaries</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Excellence:</span>
                          <span className="text-muted-foreground ml-1">Delivering quality in every solution</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Collaboration:</span>
                          <span className="text-muted-foreground ml-1">Building lasting partnerships</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className="font-medium">Integrity:</span>
                          <span className="text-muted-foreground ml-1">Maintaining transparency and trust</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What We Do */}
              <Card>
                <CardHeader>
                  <CardTitle>What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Code className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Custom Software Development</p>
                          <p className="text-xs text-muted-foreground">
                            Full-stack web applications, mobile apps, and enterprise software solutions 
                            tailored to specific business requirements using modern frameworks and technologies.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Database className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Enterprise Solutions & ERP Systems</p>
                          <p className="text-xs text-muted-foreground">
                            Comprehensive ERP implementations, CRM platforms, business process automation, 
                            and enterprise integration solutions for streamlined operations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Smartphone className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Mobile App Development</p>
                          <p className="text-xs text-muted-foreground">
                            Native iOS and Android applications, cross-platform solutions using React Native 
                            and Flutter, ensuring optimal performance across all devices.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Cloud className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Cloud Solutions & DevOps</p>
                          <p className="text-xs text-muted-foreground">
                            Cloud migration, infrastructure management, CI/CD pipelines, containerization, 
                            and scalable cloud-native application development.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Digital Transformation & Consulting</p>
                          <p className="text-xs text-muted-foreground">
                            Strategic technology consulting, digital strategy development, process optimization, 
                            and comprehensive transformation roadmaps for modern businesses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ready to Apply Section */}
            <div className="bg-gradient-to-r from-emerald-600/10 via-green-600/10 to-emerald-600/10 rounded-xl p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join our comprehensive internship program and transform your academic knowledge into 
                  real-world expertise. Work on cutting-edge projects, learn from industry professionals, 
                  and build a portfolio that sets you apart in the competitive tech landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {internshipClosed ? <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Applications are now closed</span>
                    </div> : <>
                      <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsModalOpen(true)}>
                        <Send className="w-5 h-5 mr-2" />
                        Apply for This Position
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => navigate('/internships-training')}>
                        View All Internships
                      </Button>
                    </>}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Application process takes 5-10 minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certificate upon completion
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Professional Mentorship included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InternshipApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} internshipTitle={internship.title} internshipId={internship.id} />
      </div>
    </Layout>;
};
export default InternshipDetail;

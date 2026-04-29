import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Send, Calendar, AlertCircle, Building, Target, Award, ArrowLeft, Shield, Zap, Heart, TrendingUp, Globe, Code, Database, Smartphone, Cloud, Briefcase, GraduationCap } from 'lucide-react';
import JobApplicationModal from '@/components/Careers/JobApplicationModal';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';

const JobDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) return;
      try {
        const {
          data,
          error
        } = await supabase.from('job_postings').select('*').eq('id', id).eq('is_active', true).single();
        if (error) throw error;
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [id]);

  const isDeadlinePassed = (deadline: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const isJobClosed = (job: any) => {
    return isDeadlinePassed(job.deadline);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading job details...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
              <p className="text-muted-foreground">This job posting may have been removed or doesn't exist.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const jobClosed = isJobClosed(job);

  return (
    <Layout>
      <SEO title={`${job.title} - Careers at Marzelet`} description={job.description} />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        {/* Job Header */}
        <section className="pt-6 pb-12 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10">
          {/* Back to Careers Button - Left Corner */}
          <div className="container mx-auto px-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/careers')} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">{job.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Marzelet Info Technology
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {job.department}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.job_type}</Badge>
                    <Badge variant="outline">{job.experience_level}</Badge>
                    {job.salary_range && (
                      <Badge variant="outline" className="text-green-600">
                        {job.salary_range}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                  {job.deadline && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Apply by: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  )}
                  {jobClosed ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Job Closed</span>
                    </div>
                  ) : (
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Job Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Job Content - Takes 2/3 of the space */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Job Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Benefits & Perks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
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
                      <span className="font-medium text-green-600">{job.vacancy_count || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applications Submitted:</span>
                      <span className="font-medium">{job.application_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posted:</span>
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    {job.deadline && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span>{new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Company Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>At a Glance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">20+</div>
                        <div className="text-xs font-medium">Team Members</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">30+</div>
                        <div className="text-xs font-medium">Projects Delivered</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">1+</div>
                        <div className="text-xs font-medium">Years Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                        <Cloud className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Cloud & DevOps Solutions</p>
                          <p className="text-xs text-muted-foreground">
                            Cloud migration, infrastructure optimization, CI/CD pipeline setup, 
                            containerization, and automated deployment solutions for scalable operations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Smartphone className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Digital Transformation Services</p>
                          <p className="text-xs text-muted-foreground">
                            IT strategy consulting, digital transformation roadmaps, technology assessment, 
                            and modernization of legacy systems for enhanced business agility.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm mb-1">Cybersecurity & Data Analytics</p>
                          <p className="text-xs text-muted-foreground">
                            Security audits, penetration testing, data protection solutions, 
                            business intelligence platforms, and advanced analytics for data-driven decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Why Join Us Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Why Join Marzelet? Your Career Growth Awaits</CardTitle>
                <p className="text-muted-foreground">
                  Discover the unique advantages of building your career with a forward-thinking technology company 
                  that values innovation, personal growth, and work-life balance.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Collaborative Team Culture
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Work alongside passionate professionals in an inclusive environment that celebrates diversity, 
                      encourages knowledge sharing, and fosters collaborative problem-solving.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Cross-functional team collaboration</li>
                      <li>• Open communication culture</li>
                      <li>• Regular team building activities</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-green-600 bg-green-50/50 dark:bg-green-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      Work-Life Integration
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Enjoy flexible working arrangements, remote work options, and wellness programs 
                      designed to support your personal life and professional aspirations.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Flexible working hours</li>
                      <li>• Hybrid work model available</li>
                      <li>• Mental health support programs</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-purple-600 bg-purple-50/50 dark:bg-purple-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      Continuous Learning & Development
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Access to comprehensive training programs, certification courses, conferences, 
                      and mentorship opportunities to advance your skills and career.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Paid training and certifications</li>
                      <li>• Conference and workshop attendance</li>
                      <li>• Internal mentorship programs</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-orange-600 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      Cutting-Edge Technology Projects
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Work on innovative projects using the latest technologies, from AI and machine learning 
                      to cloud computing and blockchain solutions.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Latest technology stacks</li>
                      <li>• Innovation-driven projects</li>
                      <li>• Research & development opportunities</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-teal-600 bg-teal-50/50 dark:bg-teal-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal-600" />
                      Career Advancement Opportunities
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Clear career progression pathways with regular performance reviews, 
                      leadership development programs, and opportunities to lead projects.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Clear promotion pathways</li>
                      <li>• Leadership development programs</li>
                      <li>• Project ownership opportunities</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-rose-600 bg-rose-50/50 dark:bg-rose-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-600" />
                      Comprehensive Benefits Package
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Competitive compensation with comprehensive health benefits, retirement plans, 
                      paid time off, and additional perks for your well-being.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Health and dental insurance</li>
                      <li>• Performance-based bonuses</li>
                      <li>• Generous PTO policy</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-600" />
                      Global Impact & Recognition
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Contribute to projects that make a real difference globally, with opportunities 
                      for international collaboration and industry recognition.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• International client projects</li>
                      <li>• Industry award recognition</li>
                      <li>• Global team collaboration</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      Innovation & Entrepreneurship
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Encouraged to propose innovative solutions, lead R&D initiatives, 
                      and even develop internal startups with company support.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Innovation time allocation</li>
                      <li>• Internal startup incubation</li>
                      <li>• Patent and IP recognition</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-cyan-600 bg-cyan-50/50 dark:bg-cyan-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-600" />
                      Professional Network & Community
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Connect with industry leaders, join professional communities, 
                      and build lasting relationships that extend beyond the workplace.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Industry networking events</li>
                      <li>• Professional community access</li>
                      <li>• Alumni network programs</li>
                    </ul>
                  </div>
                </div>

                {/* Employee Testimonial Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg">
                  <h4 className="font-semibold mb-4 text-center">What Our Team Says</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground italic mb-2">
                        "Marzelet has provided me with incredible growth opportunities. The supportive culture 
                        and cutting-edge projects have accelerated my career beyond my expectations."
                      </p>
                      <p className="font-medium text-sm">- Senior Software Engineer</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground italic mb-2">
                        "The work-life balance here is exceptional. I can pursue my passion for technology 
                        while still having time for my family and personal interests."
                      </p>
                      <p className="font-medium text-sm">- Software Engineer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ready to Apply Section */}
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-xl p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Ready to Advance Your Career?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join our dynamic team and be part of innovative projects that shape the future of technology. 
                  Work with cutting-edge technologies, collaborate with industry experts, and grow your career 
                  in a supportive environment that values excellence and innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {jobClosed ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Applications are now closed</span>
                    </div>
                  ) : (
                    <>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                        <Send className="w-5 h-5 mr-2" />
                        Apply for This Position
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => navigate('/careers')}>
                        View All Openings
                      </Button>
                    </>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Application process takes 5-10 minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Competitive benefits package
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Professional growth opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <JobApplicationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          jobTitle={job.title} 
          jobId={job.id}
          isOtherRole={false} 
        />
      </div>
    </Layout>
  );
};

export default JobDetail;

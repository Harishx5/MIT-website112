
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Code, Briefcase, HeadphonesIcon, Award, Target, Zap, Heart } from 'lucide-react';

const OurTeam = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Meet the talented professionals behind Marzelet Info Technology who are 
              dedicated to delivering innovative solutions and exceptional service.
            </p>
          </div>

          {/* Team Structure */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">Leadership Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Experienced leaders guiding strategic vision and innovation
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CEO & Founder</li>
                    <li>• CTO</li>
                    <li>• Operations Director</li>
                    <li>• Strategy Advisor</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">Development Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Skilled developers creating cutting-edge solutions
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Full-Stack Developers</li>
                    <li>• Mobile App Developers</li>
                    <li>• UI/UX Designers</li>
                    <li>• DevOps Engineers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">Support Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Dedicated professionals ensuring client satisfaction
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Technical Support</li>
                    <li>• Customer Success</li>
                    <li>• Quality Assurance</li>
                    <li>• Documentation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">Business Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Driving growth and building partnerships
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Business Development</li>
                    <li>• Project Management</li>
                    <li>• Marketing</li>
                    <li>• Sales</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Technical Excellence</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>10+ years combined experience in software development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Expertise in modern frameworks and technologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Strong background in cloud architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Certified professionals in various technologies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Industry Knowledge</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Deep understanding of business processes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Experience across multiple industry verticals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Compliance and regulatory expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Market trend analysis and strategic planning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Excellent communication and collaboration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Problem-solving and critical thinking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Adaptability and continuous learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Leadership and mentoring capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 backdrop-blur border border-border/50 text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">15+</h3>
                  <p className="text-muted-foreground">Industry Certifications</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">98%</h3>
                  <p className="text-muted-foreground">Project Success Rate</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">24hrs</h3>
                  <p className="text-muted-foreground">Average Response Time</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border border-border/50 text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">95%</h3>
                  <p className="text-muted-foreground">Client Satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Philosophy */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Leadership Philosophy</h2>
              <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
                Our leadership believes in empowering every team member to reach their full potential. 
                We foster an environment of innovation, collaboration, and continuous growth where 
                everyone's contributions are valued and celebrated.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Empowerment</h3>
                  <p className="opacity-90">Giving team members autonomy and trust</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="opacity-90">Encouraging creative solutions and new ideas</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Growth</h3>
                  <p className="opacity-90">Investing in professional development</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Team Culture */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team Culture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Work Environment</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Flexible Work:</strong> Remote and hybrid options to support work-life balance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Open Communication:</strong> Transparent feedback and regular team meetings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Learning Opportunities:</strong> Training, conferences, and skill development programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Recognition:</strong> Celebrating achievements and milestones</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Team Values</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Collaboration:</strong> Working together towards common goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Quality:</strong> Taking pride in delivering excellent work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Innovation:</strong> Embracing new technologies and methodologies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Integrity:</strong> Maintaining honesty and ethical standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurTeam;

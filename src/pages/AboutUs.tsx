import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Lightbulb, Globe, Zap, Heart, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import SEO from '@/components/SEO';
import { createOrganizationSchema } from '@/utils/structuredData';
const AboutUs = () => {
  const {
    theme
  } = useTheme();
  return <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-white via-blue-50 to-purple-50' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'}`}>
      <Layout>
        <SEO
          title="About Us - Leading IT Company in Chennai"
          description="Learn about Marzelet Info Technology Pvt Ltd – a india-based IT company focused on innovation, secure infrastructure, and digital transformation across industries."
          keywords="about marzelet, IT company Chennai, software development team, technology solutions, digital transformation"
          structuredData={createOrganizationSchema()}
        />
        <section className="py-20 pt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                About <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Marzelet</span>
              </h1>
              <p className={`text-xl max-w-4xl mx-auto mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Empowering businesses through innovative technology solutions and digital transformation expertise.
              </p>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Story</h2>
                <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Founded with a vision to bridge the gap between traditional business practices and cutting-edge technology, 
                  Marzelet Info Technology has been at the forefront of digital innovation.
                </p>
                <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We specialize in creating comprehensive solutions that not only meet current business needs but also 
                  prepare organizations for future challenges and opportunities.
                </p>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Our team of experts combines technical excellence with business acumen to deliver solutions that drive 
                  real results and sustainable growth.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img src="/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png" alt="Marzelet Logo" className="w-80 h-80 object-contain animate-logo-float" />
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Constantly pushing boundaries to deliver cutting-edge solutions that drive business transformation.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Working closely with our clients as partners to understand their unique needs and challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Committed to delivering the highest quality solutions with attention to detail and precision.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Focused on delivering measurable outcomes that drive real business value and growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Company Background */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Background</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Founded in 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Established with a vision to democratize technology solutions for businesses of all sizes. 
                      We started as a small team of passionate developers and have grown into a comprehensive 
                      technology partner for organizations worldwide.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Global Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Based in Chennai, India, we serve clients across multiple countries and time zones. 
                      Our global perspective combined with local expertise enables us to deliver solutions 
                      that work in diverse business environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>30+</div>
                  <p className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Projects Completed</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Successfully delivered solutions</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>25+</div>
                  <p className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Happy Clients</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Satisfied business partners</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>1+</div>
                  <p className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Years Experience</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Industry expertise</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'}`}>10+</div>
                  <p className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Technologies</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Cutting-edge solutions</p>
                </div>
              </div>
            </div>

            {/* Company Culture */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Culture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Innovation-Driven</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      We encourage creative thinking and embrace new technologies to solve complex challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Client-Centric</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Our clients' success is our priority. We build lasting partnerships based on trust and results.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Continuous Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      We invest in our team's growth and stay ahead of industry trends and best practices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Client Success Stories */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Client Success Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Digital Transformation</span>
                    </div>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Helped businesses modernize their operations, resulting in 40% improved efficiency and 
                      reduced operational costs across multiple industries.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Revenue Growth</span>
                    </div>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Our e-commerce and digital marketing solutions have driven average revenue increases 
                      of 65% for our retail and service clients.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Security Enhancement</span>
                    </div>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Implemented robust security solutions that reduced security incidents by 90% and 
                      ensured 99.9% uptime for critical business systems.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`p-8 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Customer Satisfaction</span>
                    </div>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Our user-centric design approach has improved customer satisfaction scores by 80% 
                      and reduced support tickets by 50%.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className={`text-center py-16 rounded-2xl ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-700 to-purple-700'} text-white`}>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl max-w-2xl mx-auto opacity-90 px-6">
                  To empower businesses worldwide with innovative technology solutions that drive digital transformation, 
                  enhance operational efficiency, and create sustainable competitive advantages in an ever-evolving digital landscape.
                </p>
              </div>

              <div className={`text-center py-16 rounded-2xl ${theme === 'light' ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gradient-to-r from-green-700 to-blue-700'} text-white`}>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-xl max-w-2xl mx-auto opacity-90 px-6">
                  To become the global leader in comprehensive technology solutions, recognized for our innovation, 
                  reliability, and transformative impact on businesses across all industries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>;
};
export default AboutUs;
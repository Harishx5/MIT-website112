import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportTicketForm from '@/components/SupportTicket/SupportTicketForm';
import SupportTicketList from '@/components/SupportTicket/SupportTicketList';
import { HelpCircle, MessageCircle, Phone, Mail, Search, BookOpen, Users, Monitor, Clock, CheckCircle, PlayCircle, FileText, Download, Globe, TicketCheck } from 'lucide-react';
const SupportCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketRefresh, setTicketRefresh] = useState(0);
  const handleLiveChat = () => {
    window.open('https://wa.me/919629997391', '_blank');
  };
  const handlePhoneCall = () => {
    window.open('tel:+919629997391', '_self');
  };
  const handleEmailSupport = () => {
    window.open('mailto:info@marzelet.info', '_self');
  };
  const supportOptions = [{
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help through WhatsApp chat support',
    action: handleLiveChat,
    available: '24/7',
    response: 'Immediate',
    color: 'bg-green-600'
  }, {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call our technical support team directly',
    action: handlePhoneCall,
    available: 'Mon-Fri 9AM-6PM IST',
    response: 'Immediate',
    color: 'bg-blue-600'
  }, {
    icon: Mail,
    title: 'Email Support',
    description: 'Send detailed queries via email',
    action: handleEmailSupport,
    available: '24/7',
    response: 'Within 2 hours',
    color: 'bg-purple-600'
  }, {
    icon: TicketCheck,
    title: 'Support Tickets',
    description: 'Create and track support tickets',
    action: () => {
      const ticketSection = document.getElementById('support-tickets');
      if (ticketSection) {
        ticketSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    },
    available: '24/7',
    response: 'Within 4 hours',
    color: 'bg-orange-600'
  }];
  const knowledgeBaseItems = [{
    category: 'Getting Started',
    items: ['How to set up your first project', 'Understanding our development process', 'Account setup and management', 'Project requirements checklist']
  }, {
    category: 'Technical Support',
    items: ['Web development troubleshooting', 'Mobile app deployment guide', 'Database configuration help', 'API integration assistance']
  }, {
    category: 'Billing & Payments',
    items: ['Payment methods accepted', 'Refund and cancellation policy', 'Invoice and receipt management', 'Subscription plan changes']
  }, {
    category: 'Security & Privacy',
    items: ['Data security measures', 'Privacy policy compliance', 'GDPR compliance guide', 'SSL certificate setup']
  }];
  return <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Support <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Center</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Get comprehensive support from our expert team. We're here to help you succeed 24/7.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Search for help articles, guides, or FAQs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-3 text-lg" />
              </div>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportOptions.map((option, index) => <Card key={index} className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group" onClick={option.action}>
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{option.available}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>{option.response}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Knowledge Base */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Knowledge Base</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {knowledgeBaseItems.map((category, index) => <Card key={index} className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <CardTitle>Community Forum</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Join our community to get help from other users and share experiences.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('https://chat.whatsapp.com/KFt7fK01czrJVtuVAzvYyZ?mode=ac_t', '_blank')}>
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Download className="h-6 w-6 text-orange-600" />
                  <CardTitle>Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => window.location.href = '/documentation'}>
                    <FileText className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => {
                  window.location.href = '/documentation?tab=api';
                }}>
                    <Globe className="h-4 w-4 mr-2" />
                    API Reference
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Tickets Section */}
          <section id="support-tickets" className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <TicketCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Support Tickets</h2>
            </div>
            
            <Tabs defaultValue="create" className="w-full">
              
              
              <TabsContent value="create">
                <SupportTicketForm onTicketCreated={() => setTicketRefresh(prev => prev + 1)} />
              </TabsContent>
              
              <TabsContent value="view">
                <SupportTicketList refreshTrigger={ticketRefresh} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </section>
    </Layout>;
};
export default SupportCenter;
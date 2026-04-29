
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Shield, Eye, Lock, FileText, Users, AlertTriangle, Globe, Clock, Database, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  At Marzelet Info Technology Pvt Ltd, we are committed to protecting your privacy and personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services.
                </p>
                <p>
                  By using our services, you agree to the terms of this Privacy Policy. If you do not agree with the terms 
                  of this Privacy Policy, please do not access or use our services.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Company name and job title</li>
                    <li>Billing and payment information</li>
                    <li>Account credentials and profile information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and device identifiers</li>
                    <li>Browser type and version</li>
                    <li>Operating system and device information</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Pages visited and time spent on our website</li>
                    <li>Services used and features accessed</li>
                    <li>Search queries and interactions</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Service Provision</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and manage accounts</li>
                    <li>Deliver customer support and technical assistance</li>
                    <li>Customize and personalize your experience</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Communication</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Send service updates and security alerts</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Provide marketing communications (with consent)</li>
                    <li>Deliver newsletters and promotional content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Analytics and Improvement</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Analyze usage patterns and performance</li>
                    <li>Conduct research and development</li>
                    <li>Improve our website and services</li>
                    <li>Generate anonymized statistics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Retention</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Information:</strong> Retained while your account is active and for 7 years after closure</li>
                  <li><strong>Transaction Records:</strong> Retained for 7 years for tax and accounting purposes</li>
                  <li><strong>Support Communications:</strong> Retained for 3 years to improve customer service</li>
                  <li><strong>Marketing Data:</strong> Retained until you opt-out or for 5 years of inactivity</li>
                  <li><strong>Website Analytics:</strong> Anonymized data retained for 25 months</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Service Providers</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Cloud hosting and storage providers</li>
                    <li>Payment processors and financial institutions</li>
                    <li>Email and communication service providers</li>
                    <li>Analytics and monitoring services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Legal Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>When required by law or court order</li>
                    <li>To protect our rights and property</li>
                    <li>To investigate fraud or security issues</li>
                    <li>In connection with legal proceedings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Business Transfers</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>In case of merger, acquisition, or sale of assets</li>
                    <li>During bankruptcy or insolvency proceedings</li>
                    <li>With proper notice and consent requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Security</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement comprehensive security measures to protect your personal information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Technical Safeguards</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Multi-factor authentication</li>
                      <li>Regular security audits and penetration testing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Organizational Measures</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Employee training on data protection</li>
                      <li>Role-based access controls</li>
                      <li>Incident response procedures</li>
                      <li>Regular backup and recovery testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold">International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Your information may be transferred to and processed in countries other than your own:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We primarily process data within India and the European Union</li>
                  <li>Transfers are protected by adequate safeguards and agreements</li>
                  <li>We comply with applicable data protection laws</li>
                  <li>You can request information about specific transfer mechanisms</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Your Rights</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Access Rights</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Request copies of your personal data</li>
                      <li>Know what data we have about you</li>
                      <li>Understand how we use your data</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Control Rights</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your data</li>
                      <li>Object to data processing</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How to Exercise Your Rights</h3>
                  <p>To exercise any of these rights, please contact us at info@marzelet.info with your specific request. We will respond within 30 days.</p>
                </div>
              </div>
            </div>

            {/* Data Breach Notification */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Breach Notification</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>In the event of a data breach that may affect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We will notify relevant authorities within 72 hours</li>
                  <li>Affected individuals will be notified without undue delay</li>
                  <li>We will provide clear information about the breach and steps taken</li>
                  <li>Guidance on protective measures will be provided</li>
                </ul>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Third-Party Services</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use various third-party services that may collect information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Analytics Services</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Google Analytics</li>
                      <li>Microsoft Clarity</li>
                      <li>Hotjar</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Communication Services</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>WhatsApp Business</li>
                      <li>Mailchimp</li>
                      <li>Intercom</li>
                    </ul>
                  </div>
                </div>
                <p>Each service has its own privacy policy that governs their use of your information.</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Our Data Protection Officer</h2>
              <p className="text-muted-foreground mb-4">
                For any questions about this Privacy Policy or to exercise your rights, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> info@marzelet.info</p>
                <p><strong>Phone:</strong> +91-9629997391</p>
                <p><strong>Address:</strong> No.7, College Road, Opp. St. Peter's Engineering College, Avadi, Chennai - 600054</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;

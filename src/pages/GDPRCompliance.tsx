
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Shield, Users, Lock, FileText, CheckCircle, AlertTriangle, Globe, Database, UserCheck, Clock } from 'lucide-react';

const GDPRCompliance = () => {
  return (
    <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GDPR <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Compliance</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to protecting your personal data and privacy rights under GDPR.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">GDPR Overview</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect 
                  on May 25, 2018, in the European Union. It strengthens and unifies data protection for all individuals 
                  within the EU and the European Economic Area (EEA).
                </p>
                <p>
                  At Marzelet Info Technology Pvt Ltd, we are committed to full GDPR compliance and have implemented 
                  comprehensive measures to protect your personal data, regardless of where you are located.
                </p>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Our GDPR Commitment</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We have implemented a comprehensive GDPR compliance program that includes:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Privacy by Design</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Data protection integrated into all systems</li>
                      <li>Privacy impact assessments for new projects</li>
                      <li>Minimal data collection principles</li>
                      <li>Regular privacy audits and reviews</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Organizational Measures</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dedicated Data Protection Officer (DPO)</li>
                      <li>Staff training on GDPR requirements</li>
                      <li>Data processing agreements with vendors</li>
                      <li>Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data We Process */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Personal Data We Process</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Under GDPR, we process the following categories of personal data:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Identity Data</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>First name and last name</li>
                      <li>Username or similar identifier</li>
                      <li>Title and job position</li>
                      <li>Company name</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Contact Data</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Email address</li>
                      <li>Telephone numbers</li>
                      <li>Postal address</li>
                      <li>Billing address</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Technical Data</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>IP address</li>
                      <li>Login data</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Information about service usage</li>
                      <li>Website navigation patterns</li>
                      <li>Preferences and settings</li>
                      <li>Communication records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Basis */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Legal Basis for Processing</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We process your personal data based on the following legal grounds under GDPR:</p>
                <div className="space-y-4">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Consent (Article 6(1)(a))</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Marketing communications and newsletters</li>
                      <li>Non-essential cookies and tracking</li>
                      <li>Optional features and enhancements</li>
                    </ul>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Contract Performance (Article 6(1)(b))</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Providing services as agreed</li>
                      <li>Processing payments and billing</li>
                      <li>Customer account management</li>
                    </ul>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Legal Obligation (Article 6(1)(c))</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Tax and accounting requirements</li>
                      <li>Regulatory compliance</li>
                      <li>Court orders and legal requests</li>
                    </ul>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Legitimate Interests (Article 6(1)(f))</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Fraud prevention and security</li>
                      <li>Service improvement and analytics</li>
                      <li>Direct marketing to existing customers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Your Rights Under GDPR</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>As a data subject under GDPR, you have the following rights:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Information</h3>
                    <p className="text-sm">Transparent information about data processing</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right of Access</h3>
                    <p className="text-sm">Request copies of your personal data</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Rectification</h3>
                    <p className="text-sm">Request correction of inaccurate data</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Erasure</h3>
                    <p className="text-sm">Request deletion of your data ("right to be forgotten")</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Restrict Processing</h3>
                    <p className="text-sm">Request limitation of data processing</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Data Portability</h3>
                    <p className="text-sm">Request transfer of your data in a structured format</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Object</h3>
                    <p className="text-sm">Object to processing based on legitimate interests</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Right to Withdraw Consent</h3>
                    <p className="text-sm">Withdraw consent at any time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Retention Periods</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We retain personal data only for as long as necessary to fulfill the purposes for which it was collected:</p>
                <div className="space-y-3">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Customer Account Data</h3>
                    <p>Retained for the duration of the customer relationship plus 7 years for legal and tax purposes</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Marketing Data</h3>
                    <p>Retained until consent is withdrawn or for 3 years of inactivity, whichever is sooner</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Technical Logs</h3>
                    <p>Retained for 12 months for security and system optimization purposes</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Support Communications</h3>
                    <p>Retained for 3 years to improve customer service and resolve ongoing issues</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Security Measures</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate technical and organizational measures to ensure data security:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Technical Safeguards</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>End-to-end encryption for data transmission</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Multi-factor authentication systems</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Automated backup and disaster recovery</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Organizational Measures</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Role-based access controls</li>
                      <li>Regular staff training on data protection</li>
                      <li>Data processing agreements with vendors</li>
                      <li>Incident response and breach notification procedures</li>
                      <li>Regular privacy impact assessments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold">International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place:</p>
                <div className="space-y-3">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Adequacy Decisions</h3>
                    <p>Transfers to countries with adequate data protection as recognized by the European Commission</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Standard Contractual Clauses</h3>
                    <p>Using EU-approved standard contractual clauses for transfers to third countries</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Binding Corporate Rules</h3>
                    <p>Internal rules for multinational companies ensuring adequate data protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Breach Response */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Breach Response</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>In the event of a personal data breach, we have procedures in place to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Immediate Response</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Contain the breach within 1 hour</li>
                      <li>Assess the scope and impact</li>
                      <li>Preserve evidence for investigation</li>
                      <li>Implement remediation measures</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Notification Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Report to supervisory authority within 72 hours</li>
                      <li>Notify affected individuals without undue delay</li>
                      <li>Document all breaches and responses</li>
                      <li>Provide regular updates on remediation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Supervisory Authority */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Right to Lodge a Complaint</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with:</p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">EU Data Protection Authorities</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Your local data protection authority in the EU</li>
                    <li>The supervisory authority where the alleged infringement occurred</li>
                    <li>The supervisory authority where you have your habitual residence</li>
                  </ul>
                </div>
                <p>You can find contact details for EU data protection authorities at: <span className="text-blue-600">https://edpb.europa.eu/about-edpb/about-edpb/members_en</span></p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Exercise Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                To exercise any of your GDPR rights or if you have questions about our data practices, 
                please contact our Data Protection Officer:
              </p>
              <div className="space-y-2">
                <p><strong>Data Protection Officer:</strong> privacy@marzelet.info</p>
                <p><strong>General Contact:</strong> info@marzelet.info</p>
                <p><strong>Phone:</strong> +91-9629997391</p>
                <p><strong>Address:</strong> No.7, College Road, Opp. St. Peter's Engineering College, Avadi, Chennai - 600054</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                We will respond to your request within 30 days. In complex cases, we may extend this period by an additional 60 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GDPRCompliance;

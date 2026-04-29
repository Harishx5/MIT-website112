
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Phone, CreditCard, Shield, Users, Globe, Clock } from 'lucide-react';

const TermsOfService = () => {
  return (
    <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using our services.
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
                  Welcome to Marzelet Info Technology Pvt Ltd. These Terms of Service ("Terms") govern your use of our 
                  website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and Marzelet Info Technology Pvt Ltd. 
                  If you do not agree to these Terms, please do not use our services.
                </p>
              </div>
            </div>

            {/* Acceptance of Terms */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>By accessing and using our services, you accept and agree to be bound by these terms:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>These terms apply to all visitors, users, and customers of our services</li>
                  <li>By using our services, you acknowledge that you have read and understood these terms</li>
                  <li>You must be at least 18 years old or have parental consent to use our services</li>
                  <li>We reserve the right to update these terms at any time with proper notice</li>
                  <li>Continued use of our services after changes constitutes acceptance</li>
                </ul>
              </div>
            </div>

            {/* Services Description */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Our Services</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Marzelet Info Technology provides the following services:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Development Services</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Web application development</li>
                      <li>Mobile application development</li>
                      <li>Custom software development</li>
                      <li>E-commerce solutions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Digital Services</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Digital marketing and SEO</li>
                      <li>UI/UX design services</li>
                      <li>Business consulting</li>
                      <li>IT infrastructure support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not interfere with the operation of our services</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Report any security vulnerabilities or issues</li>
                </ul>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Payment Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Processing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payment terms are specified in individual service agreements</li>
                    <li>We accept various payment methods including bank transfers, credit cards, and digital payments</li>
                    <li>All payments are processed securely through encrypted channels</li>
                    <li>Late payments may incur additional charges as specified in the agreement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pricing and Billing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Prices are quoted in Indian Rupees (INR) unless otherwise specified</li>
                    <li>All prices are exclusive of applicable taxes unless stated otherwise</li>
                    <li>Billing cycles vary based on the service type and agreement</li>
                    <li>We reserve the right to change prices with 30 days' notice</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Refund Policy</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Refunds are subject to the terms of individual service agreements</li>
                    <li>Refund requests must be made within 30 days of service delivery</li>
                    <li>Custom development work may have different refund terms</li>
                    <li>Processing fees may apply to refund transactions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Use License */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Use License</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Permission is granted to use our services subject to the following conditions:</p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Permitted Uses</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Access to our web applications and services</li>
                    <li>Use of our documentation and resources</li>
                    <li>Communication through our support channels</li>
                    <li>Commercial use as specified in service agreements</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prohibited Uses</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Reverse engineering or copying our software</li>
                    <li>Unauthorized distribution of our materials</li>
                    <li>Use for illegal or harmful activities</li>
                    <li>Interference with service operation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold">Intellectual Property Rights</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Our Intellectual Property</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>All content, software, and materials are owned by Marzelet or licensed to us</li>
                    <li>Trademarks, logos, and brand names are protected intellectual property</li>
                    <li>Source code and proprietary technologies remain our property</li>
                    <li>Unauthorized use may result in legal action</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Client Intellectual Property</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Clients retain ownership of their data and content</li>
                    <li>We may use client materials only as necessary to provide services</li>
                    <li>Custom developments may have specific IP ownership terms</li>
                    <li>We respect and protect client confidential information</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Service Availability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We strive to provide reliable services, but cannot guarantee uninterrupted access:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services may be temporarily unavailable for maintenance</li>
                  <li>We target 99.9% uptime for our hosted services</li>
                  <li>Scheduled maintenance will be announced in advance</li>
                  <li>We are not liable for downtime due to circumstances beyond our control</li>
                  <li>Service level agreements may specify uptime guarantees</li>
                </ul>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Termination</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Termination by You</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You may terminate services with written notice as per agreement terms</li>
                    <li>Data export options will be provided before termination</li>
                    <li>Refunds will be processed according to our refund policy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Termination by Us</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We may terminate services for breach of terms</li>
                    <li>Non-payment may result in service suspension</li>
                    <li>30 days' notice will be provided for termination without cause</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Disclaimer</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>The information and services are provided on an 'as is' basis:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We make no warranties, expressed or implied, about service availability</li>
                  <li>Information may be updated without notice</li>
                  <li>Technical specifications are subject to change</li>
                  <li>External links are provided for convenience only</li>
                  <li>We do not guarantee specific results from our services</li>
                </ul>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Limitations of Liability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>In no event shall Marzelet Info Technology or its suppliers be liable for any damages:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Arising out of the use or inability to use our services</li>
                  <li>Loss of data or business interruption</li>
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Any damages exceeding the amount paid for our services</li>
                  <li>Damages resulting from third-party actions or services</li>
                </ul>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold">Governing Law & Dispute Resolution</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>These terms are governed by the laws of India</li>
                    <li>Chennai courts have exclusive jurisdiction</li>
                    <li>Indian Contract Act 1872 and IT Act 2000 apply</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Dispute Resolution</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Initial resolution through direct negotiation</li>
                    <li>Mediation before litigation</li>
                    <li>Arbitration as per Indian Arbitration Act</li>
                    <li>English language for all proceedings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService;

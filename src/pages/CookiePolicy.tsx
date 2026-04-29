
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Cookie, Settings, Shield, Info, ToggleLeft, Clock, Globe, Users, AlertTriangle } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookie <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Understand how we use cookies and similar technologies to enhance your experience.
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
                  This Cookie Policy explains how Marzelet Info Technology Pvt Ltd uses cookies and similar technologies 
                  when you visit our website or use our services. It explains what these technologies are, why we use them, 
                  and your rights to control their use.
                </p>
                <p>
                  By continuing to use our website, you consent to our use of cookies in accordance with this policy.
                </p>
              </div>
            </div>

            {/* What are Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Info className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">What are Cookies?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. They help us 
                  provide you with a better browsing experience by remembering your preferences and analyzing how you use our site.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Similar Technologies</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Local Storage:</strong> Data stored locally in your browser</li>
                    <li><strong>Session Storage:</strong> Temporary data for the current session</li>
                    <li><strong>Web Beacons:</strong> Transparent images that track user behavior</li>
                    <li><strong>Pixels:</strong> Tiny images used for tracking and analytics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Essential Cookies (Always Active)</h3>
                  <p className="mb-2">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Authentication and security cookies</li>
                      <li>Shopping cart and checkout functionality</li>
                      <li>Load balancing and performance optimization</li>
                      <li>CSRF protection tokens</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Performance Cookies</h3>
                  <p className="mb-2">These cookies help us understand how visitors interact with our website.</p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Google Analytics for website statistics</li>
                      <li>Page load times and error tracking</li>
                      <li>Most popular pages and content</li>
                      <li>User journey and navigation patterns</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Functionality Cookies</h3>
                  <p className="mb-2">These cookies enable enhanced functionality and personalization.</p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Language and region preferences</li>
                      <li>Theme and display settings</li>
                      <li>Form data and user preferences</li>
                      <li>Social media integration</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Marketing Cookies</h3>
                  <p className="mb-2">These cookies track your browsing habits to show relevant advertisements.</p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Targeted advertising based on interests</li>
                      <li>Retargeting campaigns</li>
                      <li>Social media advertising pixels</li>
                      <li>Conversion tracking and attribution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration of Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Cookie Duration</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Session Cookies</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Temporary cookies that expire when you close your browser</li>
                      <li>Used for authentication and shopping cart functionality</li>
                      <li>No personal data is stored permanently</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Persistent Cookies</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Stored on your device for a set period</li>
                      <li>Remember preferences and settings</li>
                      <li>Expire after 30 days to 2 years depending on purpose</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Specific Cookie Lifespans</h3>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Authentication:</strong> Session or 30 days</li>
                      <li><strong>Preferences:</strong> 1 year</li>
                      <li><strong>Analytics:</strong> 2 years</li>
                      <li><strong>Marketing:</strong> 90 days to 1 year</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We work with trusted third-party services that may set cookies on our website:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Analytics & Performance</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Google Analytics</li>
                      <li>Google Tag Manager</li>
                      <li>Microsoft Clarity</li>
                      <li>Hotjar</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Marketing & Advertising</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Google Ads</li>
                      <li>Facebook Pixel</li>
                      <li>LinkedIn Insight Tag</li>
                      <li>Twitter Universal Website Tag</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Social Media & Communication</h3>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>WhatsApp Business chat widgets</li>
                      <li>Social media sharing buttons</li>
                      <li>YouTube video embeds</li>
                      <li>Customer support chat services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Basis */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold">Legal Basis for Using Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies based on the following legal grounds:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Consent</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Marketing and advertising cookies</li>
                      <li>Non-essential functionality cookies</li>
                      <li>Third-party analytics cookies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Legitimate Interest</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Website security and fraud prevention</li>
                      <li>Basic website analytics</li>
                      <li>Service improvement and optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <ToggleLeft className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold">Managing Your Cookie Preferences</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cookie Preference Center</h3>
                  <p className="mb-2">You can manage your cookie preferences through our cookie banner and preference center:</p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Accept or reject optional cookies</li>
                      <li>View detailed information about each cookie type</li>
                      <li>Change your preferences at any time</li>
                      <li>Access the preference center from our website footer</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
                  <p className="mb-2">You can also control cookies through your browser settings:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Desktop Browsers</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Chrome: Settings → Privacy → Cookies</li>
                        <li>Firefox: Options → Privacy → Cookies</li>
                        <li>Safari: Preferences → Privacy → Cookies</li>
                        <li>Edge: Settings → Privacy → Cookies</li>
                      </ul>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Mobile Browsers</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>iOS Safari: Settings → Safari → Block Cookies</li>
                        <li>Android Chrome: Settings → Site Settings → Cookies</li>
                        <li>Check your mobile browser's privacy settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Opt-Out Tools</h3>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Network Advertising Initiative (NAI) opt-out</li>
                      <li>Digital Advertising Alliance (DAA) opt-out</li>
                      <li>Google Ads Settings for personalized ads</li>
                      <li>Facebook Ad Preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact of Disabling Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Impact of Disabling Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Disabling certain cookies may affect your experience on our website:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Login and authentication issues</li>
                      <li>Shopping cart functionality problems</li>
                      <li>Form submission errors</li>
                      <li>Security vulnerabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Optional Cookies</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Loss of personalized experience</li>
                      <li>Repeated preference settings</li>
                      <li>Less relevant content and ads</li>
                      <li>Reduced website performance insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Updates to This Policy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices, 
                  technology, or legal requirements. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                  <li>Displaying a notice on our website</li>
                </ul>
                <p>
                  We encourage you to review this policy periodically to stay informed about our cookie practices.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy;

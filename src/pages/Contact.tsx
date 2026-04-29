
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import { createLocalBusinessSchema } from '@/utils/structuredData';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database first
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          status: 'new'
        }]);

      if (dbError) throw dbError;

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: formData
        });
        
        if (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't throw error - we still want to show success since DB save worked
        } else {
          console.log('Contact email sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending contact email:', emailError);
        // Continue with success since database save worked
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact Us - Get in Touch"
        description="Have questions? Reach Marzelet Info Technology Pvt Ltd at info@marzelet.info or ‪+91 96299 97391‬. Located in Chennai, we're ready to assist with your IT needs."
        keywords="contact marzelet, IT support Chennai, software development contact, business inquiry, technology consultation"
        structuredData={createLocalBusinessSchema()}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ready to transform your business? Let's discuss your project and how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Send us a message</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                       <div>
                         <Label htmlFor="name">Name *</Label>
                         <Input
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           placeholder="Your full name"
                           required
                           className="w-full"
                         />
                       </div>
                       <div>
                         <Label htmlFor="email">Email *</Label>
                         <Input
                           id="email"
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           placeholder="your.email@example.com"
                           required
                           className="w-full"
                         />
                       </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                       <div>
                         <Label htmlFor="phone">Phone</Label>
                         <Input
                           id="phone"
                           name="phone"
                           value={formData.phone}
                           onChange={handleInputChange}
                           placeholder="+91 9876543210"
                           className="w-full"
                         />
                       </div>
                       <div>
                         <Label htmlFor="company">Company</Label>
                         <Input
                           id="company"
                           name="company"
                           value={formData.company}
                           onChange={handleInputChange}
                           placeholder="Your company name"
                           className="w-full"
                         />
                       </div>
                     </div>

                     <div>
                       <Label htmlFor="subject">Subject *</Label>
                       <Input
                         id="subject"
                         name="subject"
                         value={formData.subject}
                         onChange={handleInputChange}
                         placeholder="What's this about?"
                         required
                         className="w-full"
                       />
                     </div>

                     <div>
                       <Label htmlFor="message">Message *</Label>
                       <Textarea
                         id="message"
                         name="message"
                         value={formData.message}
                         onChange={handleInputChange}
                         placeholder="Tell us about your project or inquiry..."
                         rows={6}
                         required
                         className="w-full resize-none"
                       />
                     </div>

                     <Button
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full"
                     >
                       <Send className="mr-2 h-4 w-4" />
                       {isSubmitting ? 'Sending...' : 'Send Message'}
                     </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">info@marzelet.info</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">+91-9629997391</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        No.7, College Road, Opp. St. Peter's Engineering College,<br />
                        Avadi Chennai-54, Tamil Nadu, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <Card>
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4654657380406!2d80.1200133!3d13.1114651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263830208e4a1%3A0xeb688d6ba4faaa6!2sMarzelet%20Info%20Technology%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

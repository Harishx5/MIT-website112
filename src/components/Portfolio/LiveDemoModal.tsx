
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectId?: string;
}

const LiveDemoModal = ({ isOpen, onClose, projectTitle, projectId }: LiveDemoModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database first
      const { error: dbError } = await supabase
        .from('project_inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service_type: 'other',
          project_description: `Live demo request for ${projectTitle}. Additional details: ${formData.description}`,
          budget_range: 'discuss',
          timeline: 'asap',
          status: 'new'
        });

      if (dbError) throw dbError;

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            subject: `Live Demo Request - ${projectTitle}`,
            message: formData.description || `I would like to request a live demo of ${projectTitle}.`,
            type: 'demo_request',
            projectTitle: projectTitle
          }
        });
        
        if (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't throw error - we still want to show success since DB save worked
        } else {
          console.log('Demo request email sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending demo request email:', emailError);
        // Continue with success since database save worked
      }

      toast({
        title: "Demo Request Submitted!",
        description: "We'll contact you soon to schedule your live demo.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        description: ''
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[95vh] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            <span>Request Live Demo</span>
          </DialogTitle>
          <DialogDescription>
            Get a personalized demo of <strong>{projectTitle}</strong>. Fill out the form below and we'll schedule a live demonstration for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Company Name</span>
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter your company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Additional Details</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell us about your specific requirements or questions about this project..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What to Expect:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Personalized 30-minute live demonstration</li>
              <li>• Q&A session with our technical team</li>
              <li>• Customization options discussion</li>
              <li>• Next steps and pricing information</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Request Demo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LiveDemoModal;

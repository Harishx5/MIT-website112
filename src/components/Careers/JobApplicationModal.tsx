import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResumeUpload from './ResumeUpload';
import { useJobApplications } from '@/hooks/useJobApplications';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  jobId?: string;
  isOtherRole?: boolean;
}

const JobApplicationModal = ({ isOpen, onClose, jobTitle, jobId, isOtherRole = false }: JobApplicationModalProps) => {
  const { submitApplication, isSubmitting } = useJobApplications();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appliedPosition: jobTitle || '',
    roleType: isOtherRole ? 'Other' : 'Full-time',
    customRole: '',
    experienceLevel: '',
    profession: '',
    coverLetter: '',
    resumeUrl: '',
    resumeFileName: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (url: string, fileName: string) => {
    setFormData(prev => ({ 
      ...prev, 
      resumeUrl: url,
      resumeFileName: fileName 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resumeUrl) {
      return;
    }

    if (formData.roleType === 'Other' && !formData.customRole) {
      return;
    }

    const applicationData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      applied_position: formData.roleType === 'Other' ? formData.customRole : formData.appliedPosition,
      role_type: formData.roleType,
      custom_role: formData.roleType === 'Other' ? formData.customRole : null,
      experience_level: formData.experienceLevel,
      cover_letter: `Profession: ${formData.profession}\n\n${formData.coverLetter}`,
      resume_url: formData.resumeUrl,
      linkedin_url: formData.linkedinUrl || null,
      github_url: formData.githubUrl || null,
      portfolio_url: formData.portfolioUrl || null,
      job_posting_id: jobId || null
    };

    submitApplication(applicationData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      appliedPosition: '',
      roleType: 'Full-time',
      customRole: '',
      experienceLevel: '',
      profession: '',
      coverLetter: '',
      resumeUrl: '',
      resumeFileName: '',
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: ''
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl mx-auto h-auto max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {isOtherRole ? 'Submit Your Resume' : `Apply for ${jobTitle}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role Type *
              </label>
              <Select
                value={formData.roleType}
                onValueChange={(value) => handleInputChange('roleType', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experience Level
              </label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => handleInputChange('experienceLevel', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Profession/Background *
            </label>
            <Select
              value={formData.profession}
              onValueChange={(value) => handleInputChange('profession', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your profession/background" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="College Student">College Student</SelectItem>
                <SelectItem value="Recent Graduate">Recent Graduate</SelectItem>
                <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                <SelectItem value="Working Professional">Working Professional</SelectItem>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Career Changer">Career Changer</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.roleType === 'Other' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Desired Role *
              </label>
              <Input
                value={formData.customRole}
                onChange={(e) => handleInputChange('customRole', e.target.value)}
                placeholder="Specify the role you're interested in"
                required
                className="w-full"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                LinkedIn Profile
              </label>
              <Input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GitHub Profile
              </label>
              <Input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                placeholder="https://github.com/yourusername"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Portfolio Website
              </label>
              <Input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full"
              />
            </div>
          </div>

          <ResumeUpload
            onFileUpload={handleResumeUpload}
            currentFile={formData.resumeFileName}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cover Letter / Message
            </label>
            <Textarea
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Tell us why you're interested in this position..."
              rows={4}
              className="w-full resize-none"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;

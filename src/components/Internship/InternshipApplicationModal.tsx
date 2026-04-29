import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResumeUpload from '../Careers/ResumeUpload';
import { useInternshipApplications } from '@/hooks/useInternshipApplications';

interface InternshipApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internshipTitle?: string;
  internshipId?: string;
}

const InternshipApplicationModal = ({ isOpen, onClose, internshipTitle, internshipId }: InternshipApplicationModalProps) => {
  const { submitApplication, isSubmitting } = useInternshipApplications();
  const [skillsInput, setSkillsInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appliedPosition: internshipTitle || '',
    collegeName: '',
    degree: '',
    yearOfStudy: '',
    cgpa: '',
    skills: [] as string[],
    coverLetter: '',
    resumeUrl: '',
    resumeFileName: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Auto-format with commas after every skill
    const words = value.split(' ').filter(word => word.trim());
    let formattedValue = '';
    
    for (let i = 0; i < words.length; i++) {
      if (i > 0 && i % 1 === 0 && !words[i-1].endsWith(',')) {
        formattedValue += ', ';
      } else if (i > 0) {
        formattedValue += ' ';
      }
      formattedValue += words[i];
    }
    
    // Handle ongoing typing (preserve space if user is still typing)
    if (value.endsWith(' ') && !formattedValue.endsWith(', ')) {
      formattedValue += ' ';
    }
    
    setSkillsInput(formattedValue);
  };

  const handleSkillsBlur = () => {
    const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
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
    
    // Process any remaining skills in the input
    const finalSkills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    if (!formData.name || !formData.email || !formData.resumeUrl || !formData.collegeName) {
      return;
    }

    const applicationData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      applied_position: formData.appliedPosition,
      college_name: formData.collegeName,
      degree: formData.degree || null,
      year_of_study: formData.yearOfStudy || null,
      cgpa: formData.cgpa || null,
      skills: finalSkills,
      cover_letter: formData.coverLetter || null,
      resume_url: formData.resumeUrl,
      portfolio_url: formData.portfolioUrl || null,
      linkedin_url: formData.linkedinUrl || null,
      github_url: formData.githubUrl || null,
      internship_posting_id: internshipId || null
    };

    submitApplication(applicationData);

    // Reset form
    setSkillsInput('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      appliedPosition: '',
      collegeName: '',
      degree: '',
      yearOfStudy: '',
      cgpa: '',
      skills: [],
      coverLetter: '',
      resumeUrl: '',
      resumeFileName: '',
      portfolioUrl: '',
      linkedinUrl: '',
      githubUrl: ''
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl mx-auto h-auto max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Apply for {internshipTitle}
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
                College/University *
              </label>
              <Input
                value={formData.collegeName}
                onChange={(e) => handleInputChange('collegeName', e.target.value)}
                placeholder="Enter your college/university name"
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Degree/Course
              </label>
              <Input
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="e.g., B.Tech Computer Science"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Year of Study
              </label>
              <Select
                value={formData.yearOfStudy}
                onValueChange={(value) => handleInputChange('yearOfStudy', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="Final Year">Final Year</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                CGPA/Percentage
              </label>
              <Input
                value={formData.cgpa}
                onChange={(e) => handleInputChange('cgpa', e.target.value)}
                placeholder="e.g., 8.5 CGPA or 85%"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Skills & Technologies
            </label>
            <Input
              value={skillsInput}
              onChange={handleSkillsInputChange}
              onBlur={handleSkillsBlur}
              placeholder="e.g., React, Node.js, Python, MySQL (separate by commas)"
              className="w-full"
            />
          </div>


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
              Why do you want this internship?
            </label>
            <Textarea
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Tell us why you're interested in this internship and what you hope to learn..."
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
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipApplicationModal;
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X, Calendar, Users, Building } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string | null;
  job_type: string;
  experience_level: string;
  description: string;
  requirements: string[] | null;
  responsibilities: string[] | null;
  benefits: string[] | null;
  salary_range: string | null;
  deadline: string | null;
  is_active: boolean | null;
  application_count: number | null;
  vacancy_count: number | null;
  created_at: string;
  updated_at: string;
  multiple_choice_questions: any;
};

const AdminJobPostings = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: 'Chennai, Tamil Nadu',
    job_type: 'full-time',
    experience_level: 'entry',
    description: '',
    requirements: [] as string[],
    responsibilities: [] as string[],
    benefits: [] as string[],
    salary_range: '',
    deadline: '',
    vacancy_count: '1'
  });

  const fetchJobPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobPostings(data || []);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      toast.error('Failed to fetch job postings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.map((item: string, i: number) => 
          i === index ? value : item
        )
      };
    });
  };

  const addArrayItem = (field: keyof typeof formData) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: [...currentArray, '']
      };
    });
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.filter((_, i) => i !== index)
      };
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: 'Chennai, Tamil Nadu',
      job_type: 'full-time',
      experience_level: 'entry',
      description: '',
      requirements: [],
      responsibilities: [],
      benefits: [],
      salary_range: '',
      deadline: '',
      vacancy_count: '1'
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.department || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        job_type: formData.job_type,
        experience_level: formData.experience_level,
        description: formData.description,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
        salary_range: formData.salary_range || null,
        deadline: formData.deadline || null,
        vacancy_count: parseInt(formData.vacancy_count) || 1,
        is_active: true
      };

      if (editingId) {
        const { error } = await supabase
          .from('job_postings')
          .update(jobData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Job posting updated successfully');
      } else {
        const { error } = await supabase
          .from('job_postings')
          .insert([jobData]);

        if (error) throw error;
        toast.success('Job posting created successfully');
      }

      fetchJobPostings();
      resetForm();
    } catch (error) {
      console.error('Error saving job posting:', error);
      toast.error('Failed to save job posting');
    }
  };

  const handleEdit = (job: JobPosting) => {
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location || 'Chennai, Tamil Nadu',
      job_type: job.job_type,
      experience_level: job.experience_level,
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      benefits: job.benefits || [],
      salary_range: job.salary_range || '',
      deadline: job.deadline || '',
      vacancy_count: job.vacancy_count?.toString() || '1'
    });
    setEditingId(job.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Job posting deleted successfully');
      fetchJobPostings();
    } catch (error) {
      console.error('Error deleting job posting:', error);
      toast.error('Failed to delete job posting');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Job posting ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchJobPostings();
    } catch (error) {
      console.error('Error updating job posting status:', error);
      toast.error('Failed to update job posting status');
    }
  };

  if (isLoading) {
    return <div>Loading job postings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Postings Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Job
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Job Posting' : 'Add New Job Posting'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Software Developer"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., Engineering"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="job_type">Job Type</Label>
                <Select value={formData.job_type} onValueChange={(value) => handleInputChange('job_type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience_level">Experience Level</Label>
                <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary_range">Salary Range</Label>
                <Input
                  id="salary_range"
                  value={formData.salary_range}
                  onChange={(e) => handleInputChange('salary_range', e.target.value)}
                  placeholder="e.g., ₹5,00,000 - ₹8,00,000"
                />
              </div>
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>
               <div>
                 <Label htmlFor="vacancy_count">Number of Positions *</Label>
                 <Input
                   id="vacancy_count"
                   type="number"
                   min="1"
                   value={formData.vacancy_count}
                   onChange={(e) => handleInputChange('vacancy_count', e.target.value)}
                   placeholder="How many positions to fill?"
                 />
               </div>
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe the job role, responsibilities, and what you're looking for..."
              />
            </div>

            {/* Requirements Section */}
            <div>
              <Label>Requirements</Label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    placeholder="e.g., Bachelor's degree in Computer Science"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('requirements', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('requirements')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Requirement
              </Button>
            </div>

            {/* Responsibilities Section */}
            <div>
              <Label>Responsibilities</Label>
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={resp}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    placeholder="e.g., Develop and maintain web applications"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('responsibilities', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('responsibilities')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Responsibility
              </Button>
            </div>

            {/* Benefits Section */}
            <div>
              <Label>Benefits</Label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    placeholder="e.g., Health insurance, Flexible working hours"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('benefits', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('benefits')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Update' : 'Create'} Job Posting
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {jobPostings.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <Badge variant="outline">{job.job_type}</Badge>
                    <Badge variant="outline">{job.experience_level}</Badge>
                    {job.vacancy_count && (
                      <Badge variant="default" className="bg-green-600">
                        <Building className="w-3 h-3 mr-1" />
                        {job.vacancy_count} {job.vacancy_count === 1 ? 'Position' : 'Positions'}
                      </Badge>
                    )}
                    <Badge variant={job.is_active ? "default" : "destructive"}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Switch
                    checked={job.is_active || false}
                    onCheckedChange={() => toggleActive(job.id, job.is_active || false)}
                  />
                  <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {job.location || 'Not specified'}
                </div>
                <div>
                  <strong>Applications:</strong> {job.application_count || 0}
                </div>
                <div>
                  <strong>Salary:</strong> {job.salary_range || 'Not specified'}
                </div>
                {job.deadline && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mt-2 line-clamp-2">{job.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobPostings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No job postings found. Create your first job posting!</p>
        </div>
      )}
    </div>
  );
};

export default AdminJobPostings;

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

type InternshipPosting = {
  id: string;
  title: string;
  department: string;
  location: string | null;
  duration: string;
  experience_level: string;
  description: string;
  requirements: string[] | null;
  responsibilities: string[] | null;
  learning_outcomes: string[] | null;
  stipend_range: string | null;
  deadline: string | null;
  is_active: boolean | null;
  application_count: number | null;
  vacancy_count: number | null;
  created_at: string;
  updated_at: string;
};

const AdminInternshipPostings = () => {
  const [internshipPostings, setInternshipPostings] = useState<InternshipPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: 'Chennai, Tamil Nadu',
    duration: '3 months',
    experience_level: 'fresher',
    description: '',
    requirements: [] as string[],
    responsibilities: [] as string[],
    learning_outcomes: [] as string[],
    stipend_range: '',
    deadline: '',
    vacancy_count: '1'
  });

  const fetchInternshipPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('internship_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInternshipPostings(data || []);
    } catch (error) {
      console.error('Error fetching internship postings:', error);
      toast.error('Failed to fetch internship postings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInternshipPostings();
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
      duration: '3 months',
      experience_level: 'fresher',
      description: '',
      requirements: [],
      responsibilities: [],
      learning_outcomes: [],
      stipend_range: '',
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
      const internshipData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        duration: formData.duration,
        experience_level: formData.experience_level,
        description: formData.description,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
        learning_outcomes: formData.learning_outcomes.filter(outcome => outcome.trim() !== ''),
        stipend_range: formData.stipend_range || null,
        deadline: formData.deadline || null,
        vacancy_count: parseInt(formData.vacancy_count) || 1,
        is_active: true
      };

      if (editingId) {
        const { error } = await supabase
          .from('internship_postings')
          .update(internshipData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Internship posting updated successfully');
      } else {
        const { error } = await supabase
          .from('internship_postings')
          .insert([internshipData]);

        if (error) throw error;
        toast.success('Internship posting created successfully');
      }

      fetchInternshipPostings();
      resetForm();
    } catch (error) {
      console.error('Error saving internship posting:', error);
      toast.error('Failed to save internship posting');
    }
  };

  const handleEdit = (internship: InternshipPosting) => {
    setFormData({
      title: internship.title,
      department: internship.department,
      location: internship.location || 'Chennai, Tamil Nadu',
      duration: internship.duration,
      experience_level: internship.experience_level,
      description: internship.description,
      requirements: internship.requirements || [],
      responsibilities: internship.responsibilities || [],
      learning_outcomes: internship.learning_outcomes || [],
      stipend_range: internship.stipend_range || '',
      deadline: internship.deadline || '',
      vacancy_count: internship.vacancy_count?.toString() || '1'
    });
    setEditingId(internship.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this internship posting?')) return;

    try {
      const { error } = await supabase
        .from('internship_postings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Internship posting deleted successfully');
      fetchInternshipPostings();
    } catch (error) {
      console.error('Error deleting internship posting:', error);
      toast.error('Failed to delete internship posting');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('internship_postings')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Internship posting ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchInternshipPostings();
    } catch (error) {
      console.error('Error updating internship posting status:', error);
      toast.error('Failed to update internship posting status');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading internship postings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Internship Postings Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Internship
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Internship Posting' : 'Create New Internship Posting'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Frontend Development Intern"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., Web Development, Mobile Development, UI/UX Design"
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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 3 months, 6 months, 1 year"
                />
              </div>
              <div>
                <Label htmlFor="experience_level">Experience Level</Label>
                <Input
                  id="experience_level"
                  value={formData.experience_level}
                  onChange={(e) => handleInputChange('experience_level', e.target.value)}
                  placeholder="e.g., Fresher, Beginner, Intermediate"
                />
              </div>
              <div>
                <Label htmlFor="stipend_range">Stipend Range</Label>
                <Input
                  id="stipend_range"
                  value={formData.stipend_range}
                  onChange={(e) => handleInputChange('stipend_range', e.target.value)}
                  placeholder="e.g., ₹5000 - ₹10000"
                />
              </div>
              <div>
                <Label htmlFor="vacancy_count">Number of Positions</Label>
                <Input
                  id="vacancy_count"
                  type="number"
                  min="1"
                  value={formData.vacancy_count}
                  onChange={(e) => handleInputChange('vacancy_count', e.target.value)}
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
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe the internship role and expectations..."
              />
            </div>

            {/* Requirements */}
            <div>
              <Label>Requirements</Label>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={requirement}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('requirements', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('requirements')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>

            {/* Responsibilities */}
            <div>
              <Label>Responsibilities</Label>
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={responsibility}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    placeholder="Enter responsibility"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('responsibilities', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('responsibilities')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Responsibility
              </Button>
            </div>

            {/* Learning Outcomes */}
            <div>
              <Label>Learning Outcomes</Label>
              {formData.learning_outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={outcome}
                    onChange={(e) => handleArrayChange('learning_outcomes', index, e.target.value)}
                    placeholder="What will students learn?"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('learning_outcomes', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('learning_outcomes')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Outcome
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update' : 'Create'} Internship
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {internshipPostings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No internship postings found. Create your first internship posting to get started.</p>
            </CardContent>
          </Card>
        ) : (
          internshipPostings.map((internship) => (
            <Card key={internship.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {internship.title}
                      <Badge variant={internship.is_active ? "default" : "secondary"}>
                        {internship.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {internship.department}
                      </span>
                      <span>{internship.location}</span>
                      <span>{internship.duration}</span>
                      <span>{internship.experience_level}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {internship.vacancy_count} {internship.vacancy_count === 1 ? 'position' : 'positions'}
                      </span>
                      {internship.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Deadline: {new Date(internship.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {internship.stipend_range && (
                      <div className="text-sm font-medium text-green-600">
                        Stipend: {internship.stipend_range}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Switch
                      checked={internship.is_active || false}
                      onCheckedChange={() => toggleActive(internship.id, internship.is_active || false)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(internship)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(internship.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{internship.description}</p>
                
                {internship.requirements && internship.requirements.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {internship.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {internship.learning_outcomes && internship.learning_outcomes.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold mb-2 text-green-600">Learning Outcomes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {internship.learning_outcomes.map((outcome, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {outcome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Applications: {internship.application_count || 0}</span>
                  <span>Created: {new Date(internship.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminInternshipPostings;
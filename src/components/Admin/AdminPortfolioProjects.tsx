import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import PortfolioImageUpload from './PortfolioImageUpload';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  technologies: string[];
  challenge: string | null;
  solution: string | null;
  features: string[];
  results: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  client: string | null;
  duration: string | null;
  team: string | null;
  completion_date: string | null;
  created_at: string;
  updated_at: string;
}

// Helper function to safely parse results from database
const parseResults = (results: any): Array<{
  metric: string;
  value: string;
  description: string;
}> => {
  if (!results) return [{
    metric: '',
    value: '',
    description: ''
  }];
  if (Array.isArray(results)) {
    return results.map(result => ({
      metric: result.metric || '',
      value: result.value || '',
      description: result.description || ''
    }));
  }
  if (typeof results === 'string') {
    try {
      const parsed = JSON.parse(results);
      if (Array.isArray(parsed)) {
        return parsed.map(result => ({
          metric: result.metric || '',
          value: result.value || '',
          description: result.description || ''
        }));
      }
    } catch (e) {
      console.error('Error parsing results:', e);
    }
  }
  return [{
    metric: '',
    value: '',
    description: ''
  }];
};

const AdminPortfolioProjects = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: '',
    category: '',
    description: '',
    image: '',
    technologies: [],
    challenge: '',
    solution: '',
    features: [],
    results: [{
      metric: '',
      value: '',
      description: ''
    }],
    client: '',
    duration: '',
    team: '',
    completion_date: ''
  });
  const {
    toast
  } = useToast();
  const queryClient = useQueryClient();
  const {
    data: projects = [],
    isLoading
  } = useQuery({
    queryKey: ['admin-portfolio-projects'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('admin_portfolio_projects').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      // Transform the data to match our PortfolioProject interface
      return (data || []).map((project: any): PortfolioProject => ({
        ...project,
        technologies: project.technologies || [],
        features: project.features || [],
        results: parseResults(project.results)
      }));
    }
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: any) => {
      console.log('Creating project with data:', projectData);
      const {
        data,
        error
      } = await supabase.from('admin_portfolio_projects').insert([projectData]).select().single();
      if (error) {
        console.error('Create error details:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-portfolio-projects']
      });
      queryClient.invalidateQueries({
        queryKey: ['portfolio-projects']
      });
      toast({
        title: "Success",
        description: "Project created successfully"
      });
      resetForm();
      setIsCreateMode(false);
    },
    onError: (error: any) => {
      console.error('Create error:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create project",
        variant: "destructive"
      });
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      projectData
    }: {
      id: string;
      projectData: any;
    }) => {
      console.log('Updating project:', id, 'with data:', projectData);

      // Ensure results is properly formatted as JSONB
      const formattedData = {
        ...projectData,
        results: projectData.results ? JSON.stringify(projectData.results) : null,
        updated_at: new Date().toISOString()
      };
      console.log('Formatted data for update:', formattedData);
      const {
        data,
        error
      } = await supabase.from('admin_portfolio_projects').update(formattedData).eq('id', id).select().single();
      if (error) {
        console.error('Update error details:', error);
        throw error;
      }
      console.log('Update successful:', data);
      return data;
    },
    onSuccess: data => {
      console.log('Update mutation success:', data);
      queryClient.invalidateQueries({
        queryKey: ['admin-portfolio-projects']
      });
      queryClient.invalidateQueries({
        queryKey: ['portfolio-projects']
      });
      toast({
        title: "Success",
        description: "Project updated successfully"
      });
      resetForm();
      setEditingProject(null);
      setIsCreateMode(false);
    },
    onError: (error: any) => {
      console.error('Update mutation error:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update project",
        variant: "destructive"
      });
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const {
        error
      } = await supabase.from('admin_portfolio_projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-portfolio-projects']
      });
      queryClient.invalidateQueries({
        queryKey: ['portfolio-projects']
      });
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    },
    onError: (error: any) => {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to delete project",
        variant: "destructive"
      });
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    const newResults = [...(formData.results || [])];
    newResults[index] = {
      ...newResults[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      results: newResults
    }));
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...(prev.results || []), {
        metric: '',
        value: '',
        description: ''
      }]
    }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: (prev.results || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log('Submit clicked, form data:', formData);
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Filter out empty results
    const validResults = (formData.results || []).filter(result => result.metric && result.value && result.description);
    const projectData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      image: formData.image || null,
      technologies: formData.technologies || [],
      challenge: formData.challenge || null,
      solution: formData.solution || null,
      features: formData.features || [],
      results: validResults,
      client: formData.client || null,
      duration: formData.duration || null,
      team: formData.team || null,
      completion_date: formData.completion_date || null
    };
    console.log('Processed project data:', projectData);
    if (editingProject) {
      updateProjectMutation.mutate({
        id: editingProject,
        projectData
      });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleEdit = (project: PortfolioProject) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      challenge: project.challenge,
      solution: project.solution,
      features: project.features,
      results: project.results,
      client: project.client,
      duration: project.duration,
      team: project.team,
      completion_date: project.completion_date
    });
    setEditingProject(project.id);
    setIsCreateMode(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      technologies: [],
      challenge: '',
      solution: '',
      features: [],
      results: [{
        metric: '',
        value: '',
        description: ''
      }],
      client: '',
      duration: '',
      team: '',
      completion_date: ''
    });
  };

  const handleCancel = () => {
    setIsCreateMode(false);
    setEditingProject(null);
    resetForm();
  };

  const getImageUrl = (image: string | null) => {
    if (!image) return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=180';
    if (image.startsWith('/')) {
      return image;
    }
    if (image.startsWith('http')) {
      return image;
    }
    return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=300&h=180`;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Our Projects</h2>
        <Button onClick={() => setIsCreateMode(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {isCreateMode && <Card>
          <CardHeader>
            <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={formData.title || ''} onChange={e => handleInputChange('title', e.target.value)} placeholder="Project title" />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input id="category" value={formData.category || ''} onChange={e => handleInputChange('category', e.target.value)} placeholder="e.g., AI/Machine Learning" />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={formData.description || ''} onChange={e => handleInputChange('description', e.target.value)} placeholder="Project description" rows={3} />
            </div>

            <div>
              <PortfolioImageUpload value={formData.image || ''} onChange={value => handleInputChange('image', value)} label="Project Image" />
            </div>

            <div>
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input id="technologies" value={(formData.technologies || []).join(', ')} onChange={e => handleArrayInputChange('technologies', e.target.value)} placeholder="React, Node.js, MongoDB" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client">Client</Label>
                <Input id="client" value={formData.client || ''} onChange={e => handleInputChange('client', e.target.value)} placeholder="Client name" />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" value={formData.duration || ''} onChange={e => handleInputChange('duration', e.target.value)} placeholder="e.g., 6 months" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team">Team Size</Label>
                <Input id="team" value={formData.team || ''} onChange={e => handleInputChange('team', e.target.value)} placeholder="e.g., 8 developers" />
              </div>
              <div>
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input id="completionDate" type="date" value={formData.completion_date || ''} onChange={e => handleInputChange('completion_date', e.target.value)} />
              </div>
            </div>

            <div>
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea id="challenge" value={formData.challenge || ''} onChange={e => handleInputChange('challenge', e.target.value)} placeholder="What was the main challenge?" rows={3} />
            </div>

            <div>
              <Label htmlFor="solution">Solution</Label>
              <Textarea id="solution" value={formData.solution || ''} onChange={e => handleInputChange('solution', e.target.value)} placeholder="How was the challenge solved?" rows={3} />
            </div>

            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea id="features" value={(formData.features || []).join(', ')} onChange={e => handleArrayInputChange('features', e.target.value)} placeholder="Feature 1, Feature 2, Feature 3" rows={3} />
            </div>

            <div>
              <Label>Results</Label>
              {(formData.results || []).map((result, index) => <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <Input placeholder="Metric" value={result.metric} onChange={e => handleResultChange(index, 'metric', e.target.value)} />
                  <Input placeholder="Value" value={result.value} onChange={e => handleResultChange(index, 'value', e.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="Description" value={result.description} onChange={e => handleResultChange(index, 'description', e.target.value)} />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeResult(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>)}
              <Button type="button" variant="outline" onClick={addResult}>
                Add Result
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingProject ? 'Update Project' : 'Create Project'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">{project.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/products/${project.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.image && <div>
                    <p className="text-xs text-muted-foreground mb-1">Primary Image</p>
                    <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-24 object-cover rounded-lg" onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=180';
              }} />
                  </div>}
              </div>
              <p className="text-sm text-muted-foreground mb-4 mt-4">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>)}
                {project.technologies.length > 3 && <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPortfolioProjects;

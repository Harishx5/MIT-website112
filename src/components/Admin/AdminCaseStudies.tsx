
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import CaseStudyImageUpload from './CaseStudyImageUpload';

interface CaseStudy {
  id: string;
  title: string;
  client: string | null;
  industry: string | null;
  duration: string | null;
  team_size: string | null;
  project_overview: string | null;
  challenge_title: string | null;
  challenge_description: string | null;
  challenge_pain_points: string[] | null;
  solution_title: string | null;
  solution_description: string | null;
  solution_approach: string[] | null;
  technologies: string[] | null;
  results_metrics: any;
  results_testimonial: string | null;
  results_client_role: string | null;
  image_url: string | null;
  is_published: boolean | null;
  display_order: number | null;
  created_at: string | null;
}

const AdminCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: '',
    duration: '',
    team_size: '',
    project_overview: '',
    challenge_title: '',
    challenge_description: '',
    challenge_pain_points: '',
    solution_title: '',
    solution_description: '',
    solution_approach: '',
    technologies: '',
    results_metrics: '',
    results_testimonial: '',
    results_client_role: '',
    image_url: '',
    is_published: true,
    display_order: 0
  });

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const processedData = {
        ...formData,
        challenge_pain_points: formData.challenge_pain_points ? formData.challenge_pain_points.split('\n').filter(p => p.trim()) : null,
        solution_approach: formData.solution_approach ? formData.solution_approach.split('\n').filter(a => a.trim()) : null,
        technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(t => t) : null,
        results_metrics: formData.results_metrics ? (() => {
          try {
            return JSON.parse(formData.results_metrics);
          } catch (e) {
            console.error('Invalid JSON in results_metrics:', e);
            return null;
          }
        })() : null,
      };

      if (editingId) {
        const { error } = await supabase
          .from('case_studies')
          .update(processedData)
          .eq('id', editingId);
        
        if (error) throw error;
        toast({ title: "Success", description: "Case study updated successfully" });
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([processedData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Case study created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: "Failed to save case study",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setFormData({
      title: caseStudy.title,
      client: caseStudy.client || '',
      industry: caseStudy.industry || '',
      duration: caseStudy.duration || '',
      team_size: caseStudy.team_size || '',
      project_overview: caseStudy.project_overview || '',
      challenge_title: caseStudy.challenge_title || '',
      challenge_description: caseStudy.challenge_description || '',
      challenge_pain_points: caseStudy.challenge_pain_points?.join('\n') || '',
      solution_title: caseStudy.solution_title || '',
      solution_description: caseStudy.solution_description || '',
      solution_approach: caseStudy.solution_approach?.join('\n') || '',
      technologies: caseStudy.technologies?.join(', ') || '',
      results_metrics: caseStudy.results_metrics ? JSON.stringify(caseStudy.results_metrics, null, 2) : '',
      results_testimonial: caseStudy.results_testimonial || '',
      results_client_role: caseStudy.results_client_role || '',
      image_url: caseStudy.image_url || '',
      is_published: caseStudy.is_published || false,
      display_order: caseStudy.display_order || 0
    });
    setEditingId(caseStudy.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Case study deleted successfully" });
      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Case study status updated" });
      fetchCaseStudies();
    } catch (error) {
      console.error('Error updating case study:', error);
      toast({
        title: "Error",
        description: "Failed to update case study",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      client: '',
      industry: '',
      duration: '',
      team_size: '',
      project_overview: '',
      challenge_title: '',
      challenge_description: '',
      challenge_pain_points: '',
      solution_title: '',
      solution_description: '',
      solution_approach: '',
      technologies: '',
      results_metrics: '',
      results_testimonial: '',
      results_client_role: '',
      image_url: '',
      is_published: true,
      display_order: 0
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Case Studies Management</h2>
          <p className="text-muted-foreground">Create and manage case studies</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Case Study' : 'Create New Case Study'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="challenge">Challenge</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData({...formData, client: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="team_size">Team Size</Label>
                      <Input
                        id="team_size"
                        value={formData.team_size}
                        onChange={(e) => setFormData({...formData, team_size: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="display_order">Display Order</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="project_overview">Project Overview</Label>
                    <Textarea
                      id="project_overview"
                      value={formData.project_overview}
                      onChange={(e) => setFormData({...formData, project_overview: e.target.value})}
                      rows={4}
                      placeholder="Provide a brief overview of the project, its goals, and key objectives..."
                    />
                  </div>
                  <CaseStudyImageUpload
                    onImageUploaded={(url) => setFormData({...formData, image_url: url})}
                    currentImageUrl={formData.image_url}
                    onImageRemoved={() => setFormData({...formData, image_url: ''})}
                  />
                  <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="challenge" className="space-y-4">
                  <div>
                    <Label htmlFor="challenge_title">Challenge Title</Label>
                    <Input
                      id="challenge_title"
                      value={formData.challenge_title}
                      onChange={(e) => setFormData({...formData, challenge_title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="challenge_description">Challenge Description</Label>
                    <Textarea
                      id="challenge_description"
                      value={formData.challenge_description}
                      onChange={(e) => setFormData({...formData, challenge_description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="challenge_pain_points">Pain Points (one per line)</Label>
                    <Textarea
                      id="challenge_pain_points"
                      value={formData.challenge_pain_points}
                      onChange={(e) => setFormData({...formData, challenge_pain_points: e.target.value})}
                      rows={6}
                      placeholder="Patient data scattered across multiple systems&#10;Manual data entry leading to errors"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="space-y-4">
                  <div>
                    <Label htmlFor="solution_title">Solution Title</Label>
                    <Input
                      id="solution_title"
                      value={formData.solution_title}
                      onChange={(e) => setFormData({...formData, solution_title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="solution_description">Solution Description</Label>
                    <Textarea
                      id="solution_description"
                      value={formData.solution_description}
                      onChange={(e) => setFormData({...formData, solution_description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="solution_approach">Solution Approach (one per line)</Label>
                    <Textarea
                      id="solution_approach"
                      value={formData.solution_approach}
                      onChange={(e) => setFormData({...formData, solution_approach: e.target.value})}
                      rows={6}
                      placeholder="API-first architecture for seamless integration&#10;Cloud-native microservices for scalability"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                  <div>
                    <Label htmlFor="results_metrics">Results Metrics (JSON format)</Label>
                    <Textarea
                      id="results_metrics"
                      value={formData.results_metrics}
                      onChange={(e) => setFormData({...formData, results_metrics: e.target.value})}
                      rows={8}
                      placeholder='[{"label": "Data Error Reduction", "value": "89%", "icon": "Target"}]'
                    />
                  </div>
                  <div>
                    <Label htmlFor="results_testimonial">Client Testimonial</Label>
                    <Textarea
                      id="results_testimonial"
                      value={formData.results_testimonial}
                      onChange={(e) => setFormData({...formData, results_testimonial: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="results_client_role">Client Role</Label>
                    <Input
                      id="results_client_role"
                      value={formData.results_client_role}
                      onChange={(e) => setFormData({...formData, results_client_role: e.target.value})}
                      placeholder="CTO, Company Name"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({...formData, is_published: checked})}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Create'} Case Study
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {caseStudies.map((caseStudy) => (
          <Card key={caseStudy.id} className="max-w-5xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <CardTitle className="flex items-center gap-2">
                    {caseStudy.title}
                    <Badge variant={caseStudy.is_published ? "default" : "secondary"}>
                      {caseStudy.is_published ? "Published" : "Draft"}
                    </Badge>
                  </CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                    {caseStudy.client && <span>Client: {caseStudy.client}</span>}
                    {caseStudy.industry && <span>Industry: {caseStudy.industry}</span>}
                    {caseStudy.duration && <span>Duration: {caseStudy.duration}</span>}
                  </div>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublished(caseStudy.id, caseStudy.is_published || false)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(caseStudy)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(caseStudy.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {caseStudy.project_overview && (
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-600 mb-2">Project Overview</h4>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {caseStudy.project_overview}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Challenge</h4>
                  <p className="text-muted-foreground line-clamp-2">
                    {caseStudy.challenge_title || 'No challenge title'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Solution</h4>
                  <p className="text-muted-foreground line-clamp-2">
                    {caseStudy.solution_title || 'No solution title'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Results</h4>
                  <p className="text-muted-foreground line-clamp-2">
                    {caseStudy.results_client_role || 'No results available'}
                  </p>
                </div>
              </div>
              {caseStudy.technologies && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {caseStudy.technologies.slice(0, 6).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {caseStudy.technologies.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{caseStudy.technologies.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {caseStudies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No case studies found. Create your first case study!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminCaseStudies;

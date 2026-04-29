
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Upload, Eye, EyeOff, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TrustedPartner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminTrustedPartners = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<TrustedPartner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website_url: '',
    description: '',
    long_description: '',
    partner_since: '',
    services: '',
    achievements: '',
    category: '',
    location: '',
    employees: '',
    founded: '',
    display_order: 0,
    logo_file: null as File | null,
    hero_files: [] as File[],
    existing_hero_urls: [] as string[],
    info_image_file: null as File | null,
    existing_info_url: '' as string,
  });
  const [uploading, setUploading] = useState(false);

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['trusted-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trusted_partners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as TrustedPartner[];
    }
  });

  const createPartnerMutation = useMutation({
    mutationFn: async (partnerData: any) => {
      let logoUrl = '';
      
      if (formData.logo_file) {
        setUploading(true);
        const fileExt = formData.logo_file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('partner-logos')
          .upload(fileName, formData.logo_file);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('partner-logos')
          .getPublicUrl(fileName);
        
        logoUrl = publicUrl;
        setUploading(false);
      }

      const { error } = await supabase
        .from('trusted_partners')
        .insert([{ ...partnerData, logo_url: logoUrl }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-partners'] });
      toast({ title: 'Partner added successfully!' });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Error adding partner:', error);
      toast({ title: 'Error adding partner', variant: 'destructive' });
      setUploading(false);
    }
  });

  const updatePartnerMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      let logoUrl = editingPartner?.logo_url;
      
      if (formData.logo_file) {
        setUploading(true);
        const fileExt = formData.logo_file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('partner-logos')
          .upload(fileName, formData.logo_file);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('partner-logos')
          .getPublicUrl(fileName);
        
        logoUrl = publicUrl;
        setUploading(false);
      }

      const { error } = await supabase
        .from('trusted_partners')
        .update({ ...updates, logo_url: logoUrl })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-partners'] });
      toast({ title: 'Partner updated successfully!' });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Error updating partner:', error);
      toast({ title: 'Error updating partner', variant: 'destructive' });
      setUploading(false);
    }
  });

  const deletePartnerMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('trusted_partners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-partners'] });
      toast({ title: 'Partner deleted successfully!' });
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('trusted_partners')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-partners'] });
      toast({ title: 'Partner status updated!' });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      website_url: '',
      description: '',
      long_description: '',
      partner_since: '',
      services: '',
      achievements: '',
      category: '',
      location: '',
      employees: '',
      founded: '',
      display_order: 0,
      logo_file: null,
      hero_files: [],
      existing_hero_urls: [],
      info_image_file: null,
      existing_info_url: '',
    });
    setEditingPartner(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (partner: TrustedPartner) => {
    setEditingPartner(partner);
    const existingUrls: string[] =
      ((partner as any).hero_image_urls && (partner as any).hero_image_urls.length > 0)
        ? (partner as any).hero_image_urls
        : ((partner as any).hero_image_url ? [(partner as any).hero_image_url] : []);
    setFormData({
      name: partner.name,
      website_url: partner.website_url || '',
      description: partner.description || '',
      long_description: (partner as any).long_description || '',
      partner_since: (partner as any).partner_since || '',
      services: ((partner as any).services || []).join('\n'),
      achievements: (partner as any).achievements || '',
      category: (partner as any).category || '',
      location: (partner as any).location || '',
      employees: (partner as any).employees || '',
      founded: (partner as any).founded || '',
      display_order: partner.display_order,
      logo_file: null,
      hero_files: [],
      existing_hero_urls: existingUrls,
      info_image_file: null,
      existing_info_url: (partner as any).info_image_url || '',
    });
    setIsDialogOpen(true);
  };

  const uploadHeroFiles = async (): Promise<string[]> => {
    if (formData.hero_files.length === 0) return [];
    const urls: string[] = [];
    for (const file of formData.hero_files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('partner-logos')
        .upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('partner-logos').getPublicUrl(fileName);
      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({ title: 'Partner name is required', variant: 'destructive' });
      return;
    }

    if (!editingPartner && !formData.logo_file) {
      toast({ title: 'Logo image is required', variant: 'destructive' });
      return;
    }

    let newHeroUrls: string[] = [];
    try {
      newHeroUrls = await uploadHeroFiles();
    } catch (err: any) {
      toast({ title: 'Hero image upload failed', description: err.message, variant: 'destructive' });
      return;
    }

    // Upload single info image if provided
    let infoImageUrl: string | null = formData.existing_info_url || null;
    if (formData.info_image_file) {
      try {
        const file = formData.info_image_file;
        const fileExt = file.name.split('.').pop();
        const fileName = `info-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('partner-logos')
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('partner-logos').getPublicUrl(fileName);
        infoImageUrl = publicUrl;
      } catch (err: any) {
        toast({ title: 'Info image upload failed', description: err.message, variant: 'destructive' });
        return;
      }
    }

    const allHeroUrls = [...formData.existing_hero_urls, ...newHeroUrls];

    const partnerData: any = {
      name: formData.name.trim(),
      website_url: formData.website_url.trim() || null,
      description: formData.description.trim() || null,
      long_description: formData.long_description.trim() || null,
      partner_since: formData.partner_since.trim() || null,
      services: formData.services
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      achievements: formData.achievements.trim() || null,
      category: formData.category.trim() || null,
      location: formData.location.trim() || null,
      employees: formData.employees.trim() || null,
      founded: formData.founded.trim() || null,
      display_order: formData.display_order,
      hero_image_urls: allHeroUrls,
      info_image_url: infoImageUrl,
    };

    // Keep first as legacy hero_image_url for backwards compatibility
    if (allHeroUrls.length > 0) partnerData.hero_image_url = allHeroUrls[0];

    if (editingPartner) {
      updatePartnerMutation.mutate({ id: editingPartner.id, updates: partnerData });
    } else {
      createPartnerMutation.mutate(partnerData);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Trusted Technology Partners</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPartner ? 'Edit Partner' : 'Add New Partner'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Partner Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter partner name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo">Logo Image {!editingPartner && '*'}</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, logo_file: e.target.files?.[0] || null })}
                    required={!editingPartner}
                  />
                </div>

                <div>
                  <Label htmlFor="hero">Hero Images (gallery — flips like a book)</Label>
                  <Input
                    id="hero"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero_files: e.target.files ? Array.from(e.target.files).slice(0, 6) : [],
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload 2–6 landscape images (e.g. 1200×800). They will auto-flip on the partner detail
                    view. Falls back to the logo if none set.
                  </p>

                  {(formData.existing_hero_urls.length > 0 || formData.hero_files.length > 0) && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {formData.existing_hero_urls.map((url, i) => (
                        <div key={`existing-${i}`} className="relative group">
                          <img
                            src={url}
                            alt={`Hero ${i + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                existing_hero_urls: formData.existing_hero_urls.filter(
                                  (_, idx) => idx !== i
                                ),
                              })
                            }
                            className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-0.5"
                            aria-label="Remove image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {formData.hero_files.map((file, i) => (
                        <div key={`new-${i}`} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-20 object-cover rounded border ring-2 ring-blue-500"
                          />
                          <span className="absolute bottom-1 left-1 text-[10px] bg-blue-500 text-white px-1 rounded">
                            new
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="info_image">Detail Page Info Image (single)</Label>
                  <Input
                    id="info_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, info_image_file: e.target.files?.[0] || null })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    A dedicated standalone image shown at the top of the partner's detail page
                    (separate from the rotating background gallery).
                  </p>
                  {(formData.existing_info_url || formData.info_image_file) && (
                    <div className="mt-3 relative inline-block">
                      <img
                        src={
                          formData.info_image_file
                            ? URL.createObjectURL(formData.info_image_file)
                            : formData.existing_info_url
                        }
                        alt="Info preview"
                        className={`w-40 h-24 object-cover rounded border ${
                          formData.info_image_file ? 'ring-2 ring-blue-500' : ''
                        }`}
                      />
                      {formData.existing_info_url && !formData.info_image_file && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, existing_info_url: '' })}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-0.5"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Technology Consulting"
                    />
                  </div>
                  <div>
                    <Label htmlFor="founded">Founded</Label>
                    <Input
                      id="founded"
                      value={formData.founded}
                      onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                      placeholder="e.g. 2015"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employees">Employees</Label>
                    <Input
                      id="employees"
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      placeholder="500+"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="One-line summary shown on the card"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="partner_since">Partner Since</Label>
                  <Input
                    id="partner_since"
                    value={formData.partner_since}
                    onChange={(e) => setFormData({ ...formData, partner_since: e.target.value })}
                    placeholder="e.g. 2018"
                  />
                </div>

                <div>
                  <Label htmlFor="long_description">Long Description / About</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    placeholder="Full About text shown in the partner detail popup"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="services">Key Services (one per line)</Label>
                  <Textarea
                    id="services"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    placeholder={'Cloud Infrastructure\nData Analytics\nAI Solutions'}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="achievements">Achievements</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="Notable achievements or recognitions"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={uploading || createPartnerMutation.isPending || updatePartnerMutation.isPending}
                    className="flex-1"
                  >
                    {uploading ? 'Uploading...' : (editingPartner ? 'Update' : 'Add') + ' Partner'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No partners added yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name}
                          className="h-12 w-12 object-contain rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>
                        {partner.website_url ? (
                          <a 
                            href={partner.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={partner.is_active ? 'default' : 'secondary'}>
                          {partner.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{partner.display_order}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActiveMutation.mutate({ 
                              id: partner.id, 
                              is_active: !partner.is_active 
                            })}
                          >
                            {partner.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(partner)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePartnerMutation.mutate(partner.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTrustedPartners;

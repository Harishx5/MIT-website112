import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, DollarSign, Code, Smartphone, Database, BarChart3, Server, Shield, Settings, Zap, Search, Palette, Monitor, Headphones, GraduationCap, Mail, Camera } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  icon: string;
  image?: string;
  features: string[];
  technologies: string[];
  delivery_time: string;
  category: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Available SVG icons for auto-assignment
  const availableIcons = [
    'Code', 'Smartphone', 'Database', 'BarChart3', 'Server', 
    'Shield', 'Settings', 'Zap', 'Search', 'Palette', 
    'Monitor', 'Headphones', 'GraduationCap', 'Mail', 'Camera'
  ];

  // Get next available icon for new services
  const getNextAvailableIcon = () => {
    const usedIcons = services.map(service => service.icon).filter(Boolean);
    const availableUnusedIcons = availableIcons.filter(icon => !usedIcons.includes(icon.toLowerCase()));
    
    if (availableUnusedIcons.length > 0) {
      return availableUnusedIcons[0].toLowerCase();
    }
    
    // If all icons are used, cycle through them
    const serviceCount = services.length;
    return availableIcons[serviceCount % availableIcons.length].toLowerCase();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Refresh services to maintain proper order
      await fetchServices();

      toast({
        title: "Success",
        description: `Service ${!currentStatus ? 'published' : 'unpublished'}`,
      });
    } catch (error) {
      console.error('Error updating service status:', error);
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (serviceData: Service) => {
    try {
      console.log('🟢 handleSave called with data:', serviceData);
      
      if (editingService) {
        // Check if display_order has changed and handle smart swapping
        if (editingService.display_order !== serviceData.display_order) {
          // Use the smart swapping function
          const { error: swapError } = await supabase.rpc('swap_service_display_order', {
            service_id: editingService.id,
            new_display_order: serviceData.display_order
          });

          if (swapError) {
            console.error('🔴 Swap error:', swapError);
            throw swapError;
          }
        }

        // Update other service data (excluding display_order as it's handled above)
        const updateData = {
          name: serviceData.name?.trim() || '',
          short_description: serviceData.short_description?.trim() || '',
          long_description: serviceData.long_description?.trim() || null,
          icon: serviceData.icon?.trim() || null,
          image: serviceData.image?.trim() || null,
          features: serviceData.features || [],
          technologies: serviceData.technologies || [],
          delivery_time: serviceData.delivery_time?.trim() || null,
          category: serviceData.category?.trim() || null,
          meta_title: serviceData.meta_title?.trim() || null,
          meta_description: serviceData.meta_description?.trim() || null,
          is_featured: serviceData.is_featured || false,
        };

        console.log('🟢 Updating service with data:', updateData);

        const { error } = await supabase
          .from('services')
          .update(updateData)
          .eq('id', editingService.id);

        if (error) {
          console.error('🔴 Update error:', error);
          throw error;
        }

        // Refresh services to maintain proper order
        await fetchServices();

        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        // Create new service with auto-assigned icon
        const slug = serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const autoIcon = getNextAvailableIcon();
        
        const insertData = {
          name: serviceData.name?.trim() || '',
          slug: slug,
          short_description: serviceData.short_description?.trim() || '',
          long_description: serviceData.long_description?.trim() || null,
          icon: autoIcon, // Auto-assign icon
          image: null, // Remove image functionality
          features: serviceData.features || [],
          technologies: serviceData.technologies || [],
          delivery_time: serviceData.delivery_time?.trim() || null,
          category: serviceData.category?.trim() || null,
          meta_title: serviceData.meta_title?.trim() || null,
          meta_description: serviceData.meta_description?.trim() || null,
          is_featured: serviceData.is_featured || false,
          display_order: serviceData.display_order || 0,
          is_active: true // New services are active by default
        };

        console.log('🟢 Creating service with data:', insertData);

        const { data, error } = await supabase
          .from('services')
          .insert(insertData)
          .select()
          .single();

        if (error) {
          console.error('🔴 Insert error:', error);
          throw error;
        }

        console.log('🟢 Service created successfully:', data);

        // Refresh services to maintain proper order
        await fetchServices();

        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }

      setEditingService(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingService ? 'update' : 'create'} service: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== id));

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const ServiceForm = ({ service, onSave, onCancel }: {
    service?: Service;
    onSave: (data: Service) => void;
    onCancel: () => void;
  }) => {
    console.log('🔵 ServiceForm rendered with service:', service?.name || 'NEW');
    
    const predefinedCategories = [
      'web-development',
      'mobile-development',
      'ui-ux-design',
      'digital-marketing',
      'seo-branding',
      'email-marketing',
      'business-consulting',
      'custom-erp-crm',
      'data-analytics',
      'it-infrastructure',
      'iot-embedded',
      'cctv-biometric',
      'internship-training'
    ];
    
    const [formData, setFormData] = useState<Service>({
      id: service?.id || '',
      name: service?.name || '',
      slug: service?.slug || '',
      short_description: service?.short_description || '',
      long_description: service?.long_description || '',
      icon: service?.icon || '',
      image: service?.image || '',
      features: service?.features || [],
      technologies: service?.technologies || [],
      delivery_time: service?.delivery_time || '',
      category: service?.category || '',
      meta_title: service?.meta_title || '',
      meta_description: service?.meta_description || '',
      is_active: service?.is_active ?? true,
      is_featured: service?.is_featured ?? false,
      display_order: service?.display_order || 0,
      created_at: service?.created_at || '',
      updated_at: service?.updated_at || '',
    });

    console.log('🔵 Initial form data set:', formData);

    // Add useEffect to sync form data when service prop changes
    useEffect(() => {
      if (service) {
        console.log('🔵 ServiceForm syncing with service prop:', service.name);
        setFormData({
          id: service.id || '',
          name: service.name || '',
          slug: service.slug || '',
          short_description: service.short_description || '',
          long_description: service.long_description || '',
          icon: service.icon || '',
          image: service.image || '',
          features: service.features || [],
          technologies: service.technologies || [],
          delivery_time: service.delivery_time || '',
          category: service.category || '',
          meta_title: service.meta_title || '',
          meta_description: service.meta_description || '',
          is_active: service.is_active ?? true,
          is_featured: service.is_featured ?? false,
          display_order: service.display_order || 0,
          created_at: service.created_at || '',
          updated_at: service.updated_at || '',
        });
      } else {
        console.log('🔵 ServiceForm: No service prop, keeping current formData');
        // Don't reset formData when service is undefined/null for new service creation
      }
    }, [service]);

    const [featuresInput, setFeaturesInput] = useState(() => formData.features.join('\n'));
    const [technologiesInput, setTechnologiesInput] = useState(() => formData.technologies.join('\n'));
    const [useCustomCategory, setUseCustomCategory] = useState(() => !predefinedCategories.includes(formData.category));

    // Update derived state when formData changes
    useEffect(() => {
      setFeaturesInput(formData.features.join('\n'));
      setTechnologiesInput(formData.technologies.join('\n'));
      setUseCustomCategory(!predefinedCategories.includes(formData.category));
    }, [formData.features, formData.technologies, formData.category]);

    // Get icon component function
    const getIconComponent = (iconName: string) => {
      const icons: { [key: string]: React.ComponentType<any> } = {
        'code': Code,
        'smartphone': Smartphone,
        'bar-chart': BarChart3,
        'palette': Palette,
        'monitor': Monitor,
        'search': Search,
        'server': Server,
        'headphones': Headphones,
        'shield': Shield,
        'settings': Settings,
        'zap': Zap,
        'graduation-cap': GraduationCap,
        'mail': Mail,
        'camera': Camera,
        'database': Database,
      };
      return icons[iconName] || Monitor;
    };

    // Get color for service category using semantic tokens
    const getServiceColor = (category: string) => {
      const colors: { [key: string]: string } = {
        'web-development': 'bg-service-web',
        'mobile-development': 'bg-service-mobile',
        'ui-ux-design': 'bg-service-design',
        'digital-marketing': 'bg-service-mobile',
        'seo-branding': 'bg-service-iot',
        'email-marketing': 'bg-service-security',
        'business-consulting': 'bg-service-consulting',
        'custom-erp-crm': 'bg-service-automation',
        'data-analytics': 'bg-service-analytics',
        'it-infrastructure': 'bg-service-infrastructure',
        'iot-embedded': 'bg-service-iot',
        'cctv-biometric': 'bg-service-surveillance',
        'internship-training': 'bg-service-training',
        'cybersecurity': 'bg-service-security',
        'software-development': 'bg-service-software',
        'default': 'bg-service-web'
      };
      return colors[category] || colors.default;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('🟢 Form submitted with data:', formData);
      
      // Validate required fields
      if (!formData.name?.trim()) {
        toast({
          title: "Validation Error",
          description: "Service name is required",
          variant: "destructive",
        });
        return;
      }

      if (!formData.short_description?.trim()) {
        toast({
          title: "Validation Error",
          description: "Short description is required",
          variant: "destructive",
        });
        return;
      }

      const finalData = {
        ...formData,
        features: featuresInput.split('\n').filter(f => f.trim()),
        technologies: technologiesInput.split('\n').filter(t => t.trim()),
      };
      console.log('🟢 Final data being saved:', finalData);
      onSave(finalData);
    };

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{service ? 'Edit Service' : 'Create New Service'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useCustomCategory"
                      checked={useCustomCategory}
                      onChange={(e) => {
                        setUseCustomCategory(e.target.checked);
                        if (!e.target.checked) {
                          setFormData(prev => ({ ...prev, category: '' }));
                        }
                      }}
                    />
                    <Label htmlFor="useCustomCategory">Use custom category</Label>
                  </div>
                  
                  {useCustomCategory ? (
                    <Input
                      placeholder="Enter custom category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  ) : (
                    <Select 
                      value={formData.category || undefined} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="seo-branding">SEO & Branding</SelectItem>
                        <SelectItem value="email-marketing">Email Marketing</SelectItem>
                        <SelectItem value="business-consulting">Business Consulting</SelectItem>
                        <SelectItem value="custom-erp-crm">Custom ERP/CRM</SelectItem>
                        <SelectItem value="data-analytics">Data Analytics</SelectItem>
                        <SelectItem value="it-infrastructure">IT Infrastructure</SelectItem>
                        <SelectItem value="iot-embedded">IoT & Embedded</SelectItem>
                        <SelectItem value="cctv-biometric">CCTV & Biometric</SelectItem>
                        <SelectItem value="internship-training">Internship & Training</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description *</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="long_description">Long Description</Label>
              <Textarea
                id="long_description"
                value={formData.long_description}
                onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
                rows={6}
              />
            </div>

            {/* Service Visual Preview */}
            <div className="border rounded-lg p-6 bg-muted/30">
              <Label className="text-sm font-medium mb-4 block">Service Preview</Label>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${getServiceColor(formData.category)} rounded-2xl flex items-center justify-center shadow-xl`}>
                  {React.createElement(getIconComponent(formData.icon), { 
                    className: "h-8 w-8 text-white" 
                  })}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{formData.name || 'Service Name'}</h3>
                  <p className="text-sm text-muted-foreground">{formData.category || 'Category'}</p>
                  {!service && (
                    <p className="text-xs text-blue-600 mt-1">
                      Icon will be auto-assigned: {getNextAvailableIcon()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service && (
                <div>
                  <Label htmlFor="icon">Icon (Lucide Icon Name)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="e.g., code, palette, globe"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use Lucide icon names (lowercase)
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="delivery_time">Delivery Time</Label>
                <Input
                  id="delivery_time"
                  value={formData.delivery_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, delivery_time: e.target.value }))}
                  placeholder="e.g., 2-4 weeks"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                rows={4}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <div>
              <Label htmlFor="technologies">Technologies (one per line)</Label>
              <Textarea
                id="technologies"
                value={technologiesInput}
                onChange={(e) => setTechnologiesInput(e.target.value)}
                rows={4}
                placeholder="React&#10;Node.js&#10;MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description (SEO)</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured">Featured Service</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {service ? 'Update' : 'Create'} Service
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  if (isCreating || editingService) {
    return (
      <ServiceForm
        service={editingService || undefined}
        onSave={handleSave}
        onCancel={() => {
          setEditingService(null);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No services found. Create your first service to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {services.map((service) => {
              
              // Get icon component function for service list
              const getIconComponent = (iconName: string) => {
                const icons: { [key: string]: React.ComponentType<any> } = {
                  'code': Code,
                  'smartphone': Smartphone,
                  'bar-chart': BarChart3,
                  'palette': Palette,
                  'monitor': Monitor,
                  'search': Search,
                  'server': Server,
                  'headphones': Headphones,
                  'shield': Shield,
                  'settings': Settings,
                  'zap': Zap,
                  'graduation-cap': GraduationCap,
                  'mail': Mail,
                  'camera': Camera,
                  'database': Database,
                };
                return icons[iconName] || Monitor;
              };

              // Get color for service category using semantic tokens  
              const getServiceColor = (category: string) => {
                const colors: { [key: string]: string } = {
                  'web-development': 'bg-service-web',
                  'mobile-development': 'bg-service-mobile',
                  'ui-ux-design': 'bg-service-design',
                  'digital-marketing': 'bg-service-mobile',
                  'seo-branding': 'bg-service-iot',
                  'email-marketing': 'bg-service-security',
                  'business-consulting': 'bg-service-consulting',
                  'custom-erp-crm': 'bg-service-automation',
                  'data-analytics': 'bg-service-analytics',
                  'it-infrastructure': 'bg-service-infrastructure',
                  'iot-embedded': 'bg-service-iot',
                  'cctv-biometric': 'bg-service-surveillance',
                  'internship-training': 'bg-service-training',
                  'cybersecurity': 'bg-service-security',
                  'software-development': 'bg-service-software',
                  'default': 'bg-service-web'
                };
                return colors[category] || colors.default;
              };

              return (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                      {service.is_featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{service.short_description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {service.category && (
                        <Badge variant="outline">{service.category}</Badge>
                      )}
                      {service.delivery_time && (
                        <Badge variant="outline">{service.delivery_time}</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(service.created_at).toLocaleDateString()} | 
                      Order: {service.display_order}
                    </div>
                  </div>
                  
                  {/* Service Icon Display */}
                  <div className="ml-4">
                    <div className={`w-24 h-24 ${getServiceColor(service.category)} rounded-2xl flex items-center justify-center shadow-xl`}>
                      {React.createElement(getIconComponent(service.icon), { 
                        className: "h-12 w-12 text-white" 
                      })}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                    {service.technologies.length > 3 && (
                      <Badge variant="outline">+{service.technologies.length - 3} more</Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePublishToggle(service.id, service.is_active)}
                    >
                      {service.is_active ? (
                        <><EyeOff className="h-4 w-4 mr-2" />Deactivate</>
                      ) : (
                        <><Eye className="h-4 w-4 mr-2" />Activate</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingService(service)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        </div>
      )}
    </div>
  );
};

export default AdminServices;

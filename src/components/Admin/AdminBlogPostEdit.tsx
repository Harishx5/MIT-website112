
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  author: string | null;
  category: string | null;
  image: string | null;
  is_published: boolean | null;
  tags: string[] | null;
  meta_description: string | null;
}

interface AdminBlogPostEditProps {
  blogPost: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

const AdminBlogPostEdit = ({ blogPost, onSave, onCancel }: AdminBlogPostEditProps) => {
  const [formData, setFormData] = useState<BlogPost>(blogPost);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          author: formData.author,
          category: formData.category,
          image: formData.image,
          is_published: formData.is_published,
          tags: formData.tags,
          meta_description: formData.meta_description,
        })
        .eq('id', formData.id);

      if (error) throw error;

      toast({
        title: "Blog post updated successfully!",
        description: "Your changes have been saved.",
      });

      onSave();
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error updating blog post",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    handleFieldChange('tags', tags);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <Input
              value={formData.author || ''}
              onChange={(e) => handleFieldChange('author', e.target.value)}
              placeholder="Marzelet Team"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              value={formData.category || ''}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              placeholder="General"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <Textarea
              value={formData.excerpt || ''}
              onChange={(e) => handleFieldChange('excerpt', e.target.value)}
              rows={2}
              placeholder="Brief summary of the blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              value={formData.image || ''}
              onChange={(e) => handleFieldChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <Input
              value={formData.tags?.join(', ') || ''}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="technology, web development, react"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meta Description</label>
            <Textarea
              value={formData.meta_description || ''}
              onChange={(e) => handleFieldChange('meta_description', e.target.value)}
              rows={2}
              placeholder="SEO meta description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <Textarea
              value={formData.content || ''}
              onChange={(e) => handleFieldChange('content', e.target.value)}
              rows={12}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_published || false}
              onCheckedChange={(checked) => handleFieldChange('is_published', checked)}
            />
            <label className="text-sm font-medium">Published</label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminBlogPostEdit;

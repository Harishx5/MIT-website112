
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image } from 'lucide-react';

interface PortfolioImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const PortfolioImageUpload = ({ value, onChange, label = "Project Image" }: PortfolioImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `portfolio-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio-images/${fileName}`;

      console.log('Uploading file:', fileName);

      // Use the job-applications bucket which we know exists and is public
      const { data, error } = await supabase.storage
        .from('job-applications')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      console.log('Upload result:', { data, error });

      if (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('job-applications')
        .getPublicUrl(data.path);

      console.log('Public URL:', publicUrl);

      onChange(publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while uploading",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes('supabase')) {
      try {
        // Extract filename from URL
        const urlParts = value.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        console.log('Removing file:', fileName);
        
        const { error } = await supabase.storage
          .from('job-applications')
          .remove([`portfolio-images/${fileName}`]);
          
        if (error) {
          console.error('Error removing file:', error);
        }
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
    onChange('');
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
            style={{ aspectRatio: '5/3' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.error('Image failed to load:', value);
              target.src = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=240';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="space-y-2">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button type="button" variant="outline" disabled={uploading} asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </Button>
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <p className="text-sm text-muted-foreground">
              Upload an image (max 5MB, recommended 800x480px)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioImageUpload;

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServiceImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  onImageRemoved?: () => void;
}

const ServiceImageUpload: React.FC<ServiceImageUploadProps> = ({
  onImageUploaded,
  currentImage,
  onImageRemoved
}) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🔵 File upload started');
    const file = event.target.files?.[0];
    if (!file) {
      console.log('🔴 No file selected');
      return;
    }
    console.log('🔵 File selected:', file.name, file.size);

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      });
      event.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      event.target.value = '';
      return;
    }

    setUploading(true);

    try {
      // If there's an existing image, remove it first
      if (currentImage) {
        try {
          const url = new URL(currentImage);
          const pathParts = url.pathname.split('/');
          const bucketIndex = pathParts.indexOf('service-images');
          
          if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
            const oldFilePath = pathParts.slice(bucketIndex + 1).join('/');
            await supabase.storage
              .from('service-images')
              .remove([oldFilePath]);
          }
        } catch (deleteError) {
          console.log('Could not delete old image:', deleteError);
          // Continue with upload anyway
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('🔴 Upload error:', uploadError);
        throw uploadError;
      }

      console.log('🟢 File uploaded successfully to:', filePath);

      const { data: { publicUrl } } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);

      console.log('🟢 Public URL generated:', publicUrl);

      // Don't clear the input immediately - let the callback handle the state update first
      console.log('🔵 Calling onImageUploaded with URL:', publicUrl);
      onImageUploaded(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      
      // Clear the input after a small delay to prevent form reset issues
      setTimeout(() => {
        if (event.target) {
          event.target.value = '';
        }
      }, 100);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      event.target.value = '';
    } finally {
      setUploading(false);
    }
  }, [currentImage, onImageUploaded, toast]);

  const handleRemoveImage = async () => {
    if (!currentImage) return;
    
    try {
      // Extract file path from URL
      const url = new URL(currentImage);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.indexOf('service-images');
      
      if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
        const filePath = pathParts.slice(bucketIndex + 1).join('/');
        
        // Delete from storage
        const { error } = await supabase.storage
          .from('service-images')
          .remove([filePath]);
          
        if (error) {
          console.error('Error deleting file:', error);
          // Continue anyway since the main goal is to remove from form
        }
      }
      
      onImageRemoved?.();
      toast({
        title: "Image removed",
        description: "Service image has been removed",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      // Still remove from form even if storage deletion fails
      onImageRemoved?.();
      toast({
        title: "Image removed",
        description: "Service image has been removed from form",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="service-image">Service Image</Label>
      
      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Service preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemoveImage}
            disabled={uploading}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Upload a service image (PNG, JPG, WebP, SVG - Max 5MB)
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Input
          id="service-image"
          key={currentImage ? `with-image-${Date.now()}` : `no-image-${Date.now()}`}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById('service-image')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : currentImage ? 'Replace' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default ServiceImageUpload;
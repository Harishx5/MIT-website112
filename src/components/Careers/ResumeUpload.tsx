
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ResumeUploadProps {
  onFileUpload: (url: string, fileName: string) => void;
  currentFile?: string;
}

const ResumeUpload = ({ onFileUpload, currentFile }: ResumeUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data, error } = await supabase.storage
        .from('job-applications')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('job-applications')
        .getPublicUrl(filePath);

      setFileName(file.name);
      onFileUpload(publicUrl, file.name);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFileName('');
    onFileUpload('', '');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        Resume/CV *
      </label>
      
      {!fileName && !currentFile ? (
        <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary/50 transition-colors">
          <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
          <div className="text-sm text-muted-foreground mb-3 sm:mb-4">
            <p>Upload your resume (PDF, DOC, DOCX)</p>
            <p className="text-xs mt-1">Maximum file size: 5MB</p>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="relative w-full sm:w-auto"
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            {uploading ? 'Uploading...' : 'Choose File'}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <span className="text-sm text-foreground truncate">{fileName || currentFile}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;

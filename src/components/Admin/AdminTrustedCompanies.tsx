import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, Eye, EyeOff } from 'lucide-react';

interface TrustedCompany {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

const AdminTrustedCompanies = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['trusted-companies-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trusted_companies')
        .select('id, name, logo_url, website_url, display_order, is_active')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return (data || []) as TrustedCompany[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!logoFile || !name.trim()) {
        throw new Error('Company name and logo are required');
      }
      // Client-side duplicate guard (case-insensitive name + filename)
      const nameKey = name.trim().toLowerCase();
      if (companies.some((c) => c.name.trim().toLowerCase() === nameKey)) {
        throw new Error(`A company named "${name.trim()}" already exists.`);
      }
      const fileNameKey = logoFile.name.trim().toLowerCase();
      if (
        companies.some((c) =>
          (c.logo_url || '').toLowerCase().includes(fileNameKey.replace(/\.[^.]+$/, ''))
        )
      ) {
        throw new Error('This logo image appears to already be used by another company.');
      }
      setUploading(true);
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `company-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('partner-logos')
        .upload(fileName, logoFile);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from('partner-logos')
        .getPublicUrl(fileName);

      const { error } = await supabase.from('trusted_companies').insert({
        name: name.trim(),
        logo_url: publicUrl,
        website_url: websiteUrl.trim() || null,
        display_order: companies.length,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-public'] });
      setName('');
      setWebsiteUrl('');
      setLogoFile(null);
      setUploading(false);
      toast({ title: 'Company added', description: 'Logo will appear in the home page loop.' });
    },
    onError: (err: any) => {
      setUploading(false);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('trusted_companies')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-public'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('trusted_companies').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['trusted-companies-public'] });
      toast({ title: 'Company removed' });
    },
    onError: (err: any) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Trusted Company Logo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Logos added here appear in the moving "Trusted by Leading Companies" loop on the home page.
            (Separate from the Partners page.)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tc-name">Company Name *</Label>
              <Input id="tc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Microsoft" />
            </div>
            <div>
              <Label htmlFor="tc-url">Website URL (optional)</Label>
              <Input id="tc-url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div>
            <Label htmlFor="tc-logo">Logo Image *</Label>
            <Input
              id="tc-logo"
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />
            {logoFile && (
              <p className="text-xs text-muted-foreground mt-1">Selected: {logoFile.name}</p>
            )}
          </div>
          <Button
            onClick={() => createMutation.mutate()}
            disabled={uploading || createMutation.isPending || !logoFile || !name.trim()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading || createMutation.isPending ? 'Uploading...' : 'Add Company'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Companies ({companies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : companies.length === 0 ? (
            <p className="text-muted-foreground">No companies yet. Add one above.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {companies.map((c) => (
                <div
                  key={c.id}
                  className={`relative border rounded-lg p-3 flex flex-col items-center gap-2 ${
                    c.is_active ? 'bg-card' : 'bg-muted opacity-60'
                  }`}
                >
                  <div className="w-full h-20 flex items-center justify-center bg-white rounded">
                    <img src={c.logo_url} alt={c.name} className="max-h-16 max-w-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-center truncate w-full">{c.name}</p>
                  <div className="flex gap-1 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => toggleActiveMutation.mutate({ id: c.id, is_active: !c.is_active })}
                    >
                      {c.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        if (confirm(`Delete ${c.name}?`)) deleteMutation.mutate(c.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTrustedCompanies;

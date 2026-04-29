
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface InternCertificate {
  id: string;
  certificate_code: string;
  intern_name: string;
  email: string | null;
  phone: string | null;
  college: string | null;
  degree: string | null;
  internship_program: string;
  project_title: string | null;
  project_description: string | null;
  technologies: string[] | null;
  mentor: string | null;
  start_date: string | null;
  end_date: string | null;
  duration: string | null;
  performance_grade: string | null;
  certificate_url: string | null;
  is_active: boolean;
  created_at: string;
}

const emptyForm = {
  certificate_code: '',
  intern_name: '',
  email: '',
  phone: '',
  college: '',
  degree: '',
  internship_program: '',
  project_title: '',
  project_description: '',
  technologies: '',
  mentor: '',
  start_date: '',
  end_date: '',
  duration: '',
  performance_grade: '',
  certificate_url: '',
};

const AdminInternDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<InternCertificate | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [importResult, setImportResult] = useState<{ success: number; failed: { row: number; reason: string }[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ['intern-certificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('intern_certificates')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as InternCertificate[];
    },
  });

  const buildPayload = (f: typeof emptyForm) => ({
    certificate_code: f.certificate_code.trim(),
    intern_name: f.intern_name.trim(),
    email: f.email.trim() || null,
    phone: f.phone.trim() || null,
    college: f.college.trim() || null,
    degree: f.degree.trim() || null,
    internship_program: f.internship_program.trim(),
    project_title: f.project_title.trim() || null,
    project_description: f.project_description.trim() || null,
    technologies: f.technologies.trim()
      ? f.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : null,
    mentor: f.mentor.trim() || null,
    start_date: f.start_date || null,
    end_date: f.end_date || null,
    duration: f.duration.trim() || null,
    performance_grade: f.performance_grade.trim() || null,
    certificate_url: f.certificate_url.trim() || null,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = buildPayload(form);
      if (editing) {
        const { error } = await supabase
          .from('intern_certificates')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('intern_certificates').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intern-certificates'] });
      toast({ title: editing ? 'Certificate updated' : 'Certificate added' });
      setIsOpen(false);
      setForm(emptyForm);
      setEditing(null);
    },
    onError: (err: any) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('intern_certificates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intern-certificates'] });
      toast({ title: 'Certificate deleted' });
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('intern_certificates')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['intern-certificates'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (c: InternCertificate) => {
    setEditing(c);
    setForm({
      certificate_code: c.certificate_code,
      intern_name: c.intern_name,
      email: c.email || '',
      phone: c.phone || '',
      college: c.college || '',
      degree: c.degree || '',
      internship_program: c.internship_program,
      project_title: c.project_title || '',
      project_description: c.project_description || '',
      technologies: (c.technologies || []).join(', '),
      mentor: c.mentor || '',
      start_date: c.start_date || '',
      end_date: c.end_date || '',
      duration: c.duration || '',
      performance_grade: c.performance_grade || '',
      certificate_url: c.certificate_url || '',
    });
    setIsOpen(true);
  };

  const downloadTemplate = () => {
    const headers = [
      'certificate_code', 'intern_name', 'email', 'phone', 'college', 'degree',
      'internship_program', 'project_title', 'project_description', 'technologies',
      'mentor', 'start_date', 'end_date', 'duration', 'performance_grade', 'certificate_url',
    ];
    const sample = [
      {
        certificate_code: 'MARZ-2025-0001',
        intern_name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+91-9999999999',
        college: 'Anna University',
        degree: 'B.E. Computer Science',
        internship_program: 'Full Stack Development',
        project_title: 'E-commerce Dashboard',
        project_description: 'Built a React + Supabase admin dashboard.',
        technologies: 'React, TypeScript, Supabase',
        mentor: 'John Smith',
        start_date: '2025-01-15',
        end_date: '2025-04-15',
        duration: '3 Months',
        performance_grade: 'A+',
        certificate_url: 'https://example.com/cert.pdf',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(sample, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Intern Certificates');
    XLSX.writeFile(wb, 'intern_certificates_template.xlsx');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportResult(null);

    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any>(ws, { defval: '' });

      let success = 0;
      const failed: { row: number; reason: string }[] = [];

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const code = String(r.certificate_code || '').trim();
        const name = String(r.intern_name || '').trim();
        const program = String(r.internship_program || '').trim();
        if (!code || !name || !program) {
          failed.push({ row: i + 2, reason: 'Missing certificate_code, intern_name, or internship_program' });
          continue;
        }
        const payload = {
          certificate_code: code,
          intern_name: name,
          email: String(r.email || '').trim() || null,
          phone: String(r.phone || '').trim() || null,
          college: String(r.college || '').trim() || null,
          degree: String(r.degree || '').trim() || null,
          internship_program: program,
          project_title: String(r.project_title || '').trim() || null,
          project_description: String(r.project_description || '').trim() || null,
          technologies: String(r.technologies || '').trim()
            ? String(r.technologies).split(',').map((t: string) => t.trim()).filter(Boolean)
            : null,
          mentor: String(r.mentor || '').trim() || null,
          start_date: r.start_date ? String(r.start_date).trim() || null : null,
          end_date: r.end_date ? String(r.end_date).trim() || null : null,
          duration: String(r.duration || '').trim() || null,
          performance_grade: String(r.performance_grade || '').trim() || null,
          certificate_url: String(r.certificate_url || '').trim() || null,
        };
        const { error } = await supabase.from('intern_certificates').insert([payload]);
        if (error) {
          failed.push({ row: i + 2, reason: error.message });
        } else {
          success++;
        }
      }

      setImportResult({ success, failed });
      queryClient.invalidateQueries({ queryKey: ['intern-certificates'] });
      toast({ title: `Import complete: ${success} added, ${failed.length} failed` });
    } catch (err: any) {
      toast({ title: 'Import failed', description: err.message, variant: 'destructive' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <CardTitle>Intern Certificates</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" /> Template
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Import Excel
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleImport}
              className="hidden"
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-2" /> Add Intern
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editing ? 'Edit Certificate' : 'Add Intern Certificate'}</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveMutation.mutate();
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Certificate Code *</Label>
                      <Input
                        value={form.certificate_code}
                        onChange={(e) => setForm({ ...form, certificate_code: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Intern Name *</Label>
                      <Input
                        value={form.intern_name}
                        onChange={(e) => setForm({ ...form, intern_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                      <Label>College</Label>
                      <Input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <Label>Internship Program *</Label>
                      <Input
                        value={form.internship_program}
                        onChange={(e) => setForm({ ...form, internship_program: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Project Title</Label>
                      <Input
                        value={form.project_title}
                        onChange={(e) => setForm({ ...form, project_title: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Project Description</Label>
                      <Textarea
                        rows={3}
                        value={form.project_description}
                        onChange={(e) => setForm({ ...form, project_description: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Technologies (comma separated)</Label>
                      <Input
                        value={form.technologies}
                        onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                        placeholder="React, TypeScript, Supabase"
                      />
                    </div>
                    <div>
                      <Label>Mentor</Label>
                      <Input value={form.mentor} onChange={(e) => setForm({ ...form, mentor: e.target.value })} />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        placeholder="3 Months"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={form.start_date}
                        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={form.end_date}
                        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Performance Grade</Label>
                      <Input
                        value={form.performance_grade}
                        onChange={(e) => setForm({ ...form, performance_grade: e.target.value })}
                        placeholder="A+"
                      />
                    </div>
                    <div>
                      <Label>Certificate URL</Label>
                      <Input
                        type="url"
                        value={form.certificate_url}
                        onChange={(e) => setForm({ ...form, certificate_url: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saveMutation.isPending}>
                      {saveMutation.isPending ? 'Saving...' : editing ? 'Update' : 'Add'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {importResult && (
            <div className="mb-4 p-4 rounded-md border bg-muted/30">
              <p className="font-semibold mb-2">
                Import Result: {importResult.success} successful, {importResult.failed.length} failed
              </p>
              {importResult.failed.length > 0 && (
                <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                  {importResult.failed.map((f, i) => (
                    <li key={i} className="text-red-600">
                      Row {f.row}: {f.reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No certificates added yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Intern</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.certificate_code}</TableCell>
                      <TableCell className="font-medium">{c.intern_name}</TableCell>
                      <TableCell>{c.internship_program}</TableCell>
                      <TableCell className="text-xs">
                        {c.start_date && new Date(c.start_date).toLocaleDateString()}
                        {c.end_date && ` - ${new Date(c.end_date).toLocaleDateString()}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.is_active ? 'default' : 'secondary'}>
                          {c.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleActive.mutate({ id: c.id, is_active: !c.is_active })}
                          >
                            {c.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEdit(c)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm('Delete this certificate?')) deleteMutation.mutate(c.id);
                            }}
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

export default AdminInternDetails;


import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Calendar,
  User,
  Building,
  FileText,
  ExternalLink,
  Search,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface InternCertificate {
  id: string;
  certificate_code: string;
  intern_name: string;
  email: string | null;
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
  issued_at: string | null;
}

const VerifyIntern = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InternCertificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast({ title: 'Please enter a certificate code', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setSearched(true);

    try {
      const { data, error: queryError } = await supabase
        .from('intern_certificates')
        .select('*')
        .ilike('certificate_code', code.trim())
        .eq('is_active', true)
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data) {
        setError('Invalid certificate code. Please check the code and try again.');
      } else {
        setResult(data as InternCertificate);
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setError('An error occurred while verifying. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Verify Intern Certificate - Marzelet Info Technology"
        description="Verify the authenticity of internship certificates issued by Marzelet Info Technology."
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-6">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Verify{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                Intern Certificate
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confirm the authenticity of any internship certificate issued by Marzelet Info Technology.
            </p>
          </div>
        </section>

        {/* Program Info */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center">About Our Internship Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Industry Mentorship</h3>
                    <p className="text-sm text-muted-foreground">
                      Hands-on guidance from professionals on real projects.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Real Project Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Work on actual client deliverables and grow your portfolio.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Verified Certification</h3>
                    <p className="text-sm text-muted-foreground">
                      Each completion is issued with a unique verifiable certificate code.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Verification Form */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl">Enter Certificate Code</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <Label htmlFor="cert-code">Certificate Code</Label>
                    <Input
                      id="cert-code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. MARZ-2025-XXXX"
                      className="mt-2"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {loading ? (
                      'Verifying...'
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Verify Certificate
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Error */}
            {searched && error && (
              <Card className="max-w-2xl mx-auto mt-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                <CardContent className="p-6 flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">Verification Failed</h3>
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result popup */}
            <Dialog open={!!result} onOpenChange={(open) => !open && setResult(null)}>
              <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0">
                {result && (
                  <>
                    <DialogHeader className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-900 p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                        <div className="text-left">
                          <DialogTitle className="text-xl text-emerald-900 dark:text-emerald-300">
                            Certificate Verified
                          </DialogTitle>
                          <DialogDescription className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                            Code: <span className="font-mono">{result.certificate_code}</span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="p-6 space-y-6">
                      {/* Intern Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <User className="w-5 h-5" /> Intern Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name</span>
                            <p className="font-medium">{result.intern_name}</p>
                          </div>
                          {result.college && (
                            <div>
                              <span className="text-muted-foreground">College</span>
                              <p className="font-medium flex items-center gap-1">
                                <Building className="w-4 h-4" /> {result.college}
                              </p>
                            </div>
                          )}
                          {result.degree && (
                            <div>
                              <span className="text-muted-foreground">Degree</span>
                              <p className="font-medium">{result.degree}</p>
                            </div>
                          )}
                          {result.mentor && (
                            <div>
                              <span className="text-muted-foreground">Mentor</span>
                              <p className="font-medium">{result.mentor}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Program Details */}
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" /> Program Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Internship Program</span>
                            <p className="font-medium">{result.internship_program}</p>
                          </div>
                          {result.duration && (
                            <div>
                              <span className="text-muted-foreground">Duration</span>
                              <p className="font-medium flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {result.duration}
                              </p>
                            </div>
                          )}
                          {result.start_date && (
                            <div>
                              <span className="text-muted-foreground">Start Date</span>
                              <p className="font-medium flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {new Date(result.start_date).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {result.end_date && (
                            <div>
                              <span className="text-muted-foreground">End Date</span>
                              <p className="font-medium flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {new Date(result.end_date).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {result.performance_grade && (
                            <div>
                              <span className="text-muted-foreground">Performance Grade</span>
                              <p className="font-medium">
                                <Badge className="bg-emerald-600">{result.performance_grade}</Badge>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project */}
                      {(result.project_title || result.project_description) && (
                        <div className="border-t pt-6">
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Project
                          </h3>
                          {result.project_title && (
                            <p className="font-medium mb-2">{result.project_title}</p>
                          )}
                          {result.project_description && (
                            <p className="text-sm text-muted-foreground mb-3">{result.project_description}</p>
                          )}
                          {result.technologies && result.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {result.technologies.map((tech) => (
                                <Badge key={tech} variant="outline">{tech}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Certificate Link */}
                      {result.certificate_url && (
                        <div className="border-t pt-6">
                          <Button asChild variant="outline" className="w-full">
                            <a href={result.certificate_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" /> View Certificate Document
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VerifyIntern;

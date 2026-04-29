import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Users, Calendar, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CaseStudyModal from '@/components/Home/CaseStudyModal';
import OptimizedImage from '@/components/OptimizedImage';
import { useTheme } from '@/contexts/ThemeContext';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  project_overview: string;
  challenge_title: string;
  challenge_description: string;
  challenge_pain_points: string[];
  solution_title: string;
  solution_description: string;
  solution_approach: string[];
  results_metrics: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  results_testimonial: string;
  results_client_role: string;
  technologies: string[];
  team_size: string;
  duration: string;
  image_url: string;
  display_order: number;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData: CaseStudy[] = (data || []).map(study => ({
        id: study.id,
        title: study.title || '',
        client: study.client || '',
        industry: study.industry || '',
        project_overview: study.project_overview || '',
        challenge_title: study.challenge_title || '',
        challenge_description: study.challenge_description || '',
        challenge_pain_points: study.challenge_pain_points || [],
        solution_title: study.solution_title || '',
        solution_description: study.solution_description || '',
        solution_approach: study.solution_approach || [],
        results_metrics: Array.isArray(study.results_metrics) 
          ? (study.results_metrics as any[]).map(metric => ({
              metric: metric.metric || '',
              value: metric.value || '',
              description: metric.description || ''
            })) 
          : [],
        results_testimonial: study.results_testimonial || '',
        results_client_role: study.results_client_role || '',
        technologies: study.technologies || [],
        team_size: study.team_size || '',
        duration: study.duration || '',
        image_url: study.image_url || '',
        display_order: study.display_order || 0
      }));

      setCaseStudies(transformedData);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openCaseStudyModal = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const closeCaseStudyModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-[85%] mx-auto px-4 py-12 pt-24 lg:pt-12">
          <div className="text-center">Loading case studies...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-slate-50 to-blue-50' 
          : 'bg-gradient-to-br from-slate-900 to-slate-800'
      }`}>
        {/* Hero Section with improved mobile spacing */}
        <div className={`pt-24 lg:pt-20 mt-4 lg:mt-8 pb-0 mx-0 ${
          theme === 'light' 
            ? 'text-gray-900 bg-slate-50' 
            : 'text-gray-100 bg-slate-900'
        }`}>
          <div className="w-[85%] mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Success <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Stories</span>
            </h1>
            <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Explore how we've helped businesses transform their operations and achieve remarkable results through innovative technology solutions.
            </p>
          </div>
        </div>

        {/* Case Studies with improved mobile structure */}
        <div className="w-[90%] lg:w-[85%] mx-auto px-2 lg:px-4 py-8 lg:py-16">
          <div className="space-y-8 lg:space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={study.id} className={`overflow-hidden shadow-lg ${
                theme === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <CardContent className="p-0">
                  {/* Mobile-optimized layout */}
                  <div className="flex flex-col lg:grid lg:gap-8 lg:p-8 lg:grid-cols-2">
                    {/* Image section - mobile first */}
                    <div className="order-1 lg:order-1">
                      <div className={`w-full h-48 lg:h-64 xl:h-80 overflow-hidden lg:rounded-lg ${
                        theme === 'light' ? 'bg-muted' : 'bg-slate-700'
                      }`}>
                        <OptimizedImage 
                          src={study.image_url || '/placeholder.svg'} 
                          alt={study.title} 
                          className="w-full h-full object-cover object-center" 
                          priority={index < 2} 
                        />
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="order-2 lg:order-2 p-4 lg:p-0 space-y-4 lg:space-y-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-xs lg:text-sm">
                          Case Study {index + 1}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{study.industry}</Badge>
                      </div>
                      
                      <div>
                        <h2 className={`text-xl lg:text-3xl font-bold mb-2 break-words leading-tight ${
                          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                        }`}>
                          {study.title}
                        </h2>
                        <p className={`text-sm lg:text-lg mb-4 break-words ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          Client: {study.client}
                        </p>
                      </div>

                      <div className="space-y-3 lg:space-y-4">
                        <h3 className={`text-lg lg:text-xl font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                        }`}>Project Overview</h3>
                        <p className={`text-sm lg:text-base leading-relaxed break-words overflow-hidden line-clamp-3 lg:line-clamp-none ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {study.project_overview}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                          <span className={`text-xs lg:text-sm break-words ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Team: {study.team_size}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                          <span className={`text-xs lg:text-sm break-words ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Duration: {study.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-600" />
                          <span className={`text-xs lg:text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Success Story</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className={`font-semibold text-sm lg:text-base ${
                          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                        }`}>Technologies Used:</h4>
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {study.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => openCaseStudyModal(study)} 
                        className="w-full text-sm lg:text-base"
                        size="sm"
                      >
                        View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Study Modal */}
        <CaseStudyModal 
          isOpen={isModalOpen} 
          onClose={closeCaseStudyModal} 
          caseStudy={selectedCaseStudy} 
        />
      </div>
    </Layout>
  );
};

export default CaseStudies;

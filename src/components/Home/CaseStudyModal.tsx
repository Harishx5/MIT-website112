
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, User, Users, Trophy, Share2, Twitter, Linkedin, Facebook, MessageCircle, Copy, Check, Target, TrendingUp, Award, Zap, Clock, DollarSign, Users2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { generateCaseStudyShareUrl, formatCaseStudyShareData } from '@/utils/shareUtils';
import { useToast } from '@/hooks/use-toast';

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
    label?: string;
    value: string;
    icon?: string;
    metric?: string;
    description?: string;
  }>;
  results_testimonial: string;
  results_client_role: string;
  technologies: string[];
  team_size: string;
  duration: string;
  image_url: string;
  display_order: number;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  caseStudy
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!caseStudy) return null;

  // Icon mapping for results metrics
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Target,
      TrendingUp,
      Award,
      Zap,
      Clock,
      DollarSign,
      Users2,
      BarChart3,
      Trophy,
      Users
    };
    
    const IconComponent = iconMap[iconName] || Trophy;
    return <IconComponent className="w-5 h-5 text-green-600" />;
  };

  const handleShare = (platform: string) => {
    const caseStudyUrl = generateCaseStudyShareUrl(caseStudy.id);
    const shareData = formatCaseStudyShareData(caseStudy.title, caseStudy.client, caseStudy.industry, caseStudy.project_overview, caseStudyUrl);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareData.url).then(() => {
          setCopied(true);
          toast({
            title: "Link copied!",
            description: "Case study link has been copied to clipboard"
          });
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          toast({
            title: "Copy failed",
            description: "Unable to copy link to clipboard",
            variant: "destructive"
          });
        });
        return;
      case 'native':
        if (navigator.share) {
          navigator.share(shareData).catch(error => {
            console.error('Error sharing:', error);
            toast({
              title: "Share failed",
              description: "Unable to share case study",
              variant: "destructive"
            });
          });
        }
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{caseStudy.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Case Study Image */}
          <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg bg-muted">
            <img 
              src={caseStudy.image_url || '/placeholder.svg'} 
              alt={caseStudy.title} 
              className="w-full h-full object-cover object-center" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }} 
            />
          </div>
          
          {/* Case Study Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {caseStudy.industry}
              </Badge>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="truncate">{caseStudy.client}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{caseStudy.team_size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{caseStudy.duration}</span>
              </div>
            </div>
            
            {/* Share Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 flex-shrink-0">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share this case study</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')} className="justify-start">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')} className="justify-start">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')} className="justify-start">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('whatsapp')} className="justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('copy')} className="justify-start col-span-2">
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>
                  {navigator.share && (
                    <Button variant="outline" size="sm" onClick={() => handleShare('native')} className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share via...
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Technologies */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Technologies:</span>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Project Overview */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">{caseStudy.project_overview}</p>
          </div>
          
          {/* Challenge Section */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                1
              </div>
              {caseStudy.challenge_title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed break-words overflow-wrap-anywhere">{caseStudy.challenge_description}</p>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-800 dark:text-red-200">Key Pain Points:</h4>
              <ul className="space-y-1">
                {caseStudy.challenge_pain_points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 break-words overflow-wrap-anywhere">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solution Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                2
              </div>
              {caseStudy.solution_title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed break-words overflow-wrap-anywhere">{caseStudy.solution_description}</p>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Our Approach:</h4>
              <ul className="space-y-1">
                {caseStudy.solution_approach.map((approach, approachIndex) => (
                  <li key={approachIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 break-words overflow-wrap-anywhere">{approach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3 flex items-center">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                3
              </div>
              Results & Impact
            </h3>
            
            <div className="space-y-3 mb-4">
              {caseStudy.results_metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    {metric.icon && getIcon(metric.icon)}
                    <div className="flex-1">
                      <div className="text-lg font-bold text-green-600 break-words overflow-wrap-anywhere">{metric.value}</div>
                      <div className="font-medium text-gray-900 dark:text-white break-words overflow-wrap-anywhere">
                        {metric.label || metric.metric}
                      </div>
                      {metric.description && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 break-words overflow-wrap-anywhere">{metric.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {caseStudy.results_testimonial && (
              <div className="bg-white dark:bg-gray-800 border-l-4 border-green-600 p-3 rounded-r-lg">
                <blockquote className="text-gray-700 dark:text-gray-300 italic mb-2 break-words overflow-wrap-anywhere">
                  "{caseStudy.results_testimonial}"
                </blockquote>
                <div className="text-sm text-green-600 font-semibold break-words overflow-wrap-anywhere">
                  - {caseStudy.results_client_role}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;

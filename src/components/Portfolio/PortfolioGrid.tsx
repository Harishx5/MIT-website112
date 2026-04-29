
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  technologies: string[];
  client: string | null;
  duration: string | null;
  team: string | null;
  completion_date: string | null;
}

const PortfolioGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 6;

  const { data: portfolioItems = [], isLoading } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching portfolio projects:', error);
        throw error;
      }

      return data?.map((project): PortfolioProject => ({
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        technologies: project.technologies || [],
        client: project.client,
        duration: project.duration,
        team: project.team,
        completion_date: project.completion_date
      })) || [];
    }
  });

  // Pagination logic
  const totalItems = portfolioItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getImageUrl = (image: string | null) => {
    if (!image) return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=240';
    
    if (image.startsWith('/')) {
      return image;
    }
    
    if (image.startsWith('http')) {
      return image;
    }
    
    return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&h=240`;
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayedItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: '16/10' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=240';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 group-hover:bg-blue-600 group-hover:text-white transition-colors" 
                    asChild
                  >
                    <Link to={`/products/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {!showAll && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* View All Projects Button */}
        {!showAll && totalItems > itemsPerPage && (
          <div className="text-center">
            <Button 
              onClick={() => setShowAll(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              View All Projects ({totalItems})
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && totalItems > itemsPerPage && (
          <div className="text-center">
            <Button 
              variant="outline"
              onClick={() => {
                setShowAll(false);
                setCurrentPage(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3"
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;

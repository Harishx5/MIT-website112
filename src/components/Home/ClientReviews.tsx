
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTheme } from '@/contexts/ThemeContext';

const ClientReviews = () => {
  const navigate = useNavigate();
  const { user } = useAdmin();
  const { theme } = useTheme();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_user_id_fkey(avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  const displayedReviews = reviews || [];

  const handleViewAllReviews = () => {
    navigate('/reviews');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleWriteReview = () => {
    navigate('/reviews');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 cursor-pointer hover:text-blue-600 transition-colors ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} onClick={handleViewAllReviews}>
            What Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className={`text-xl max-w-4xl mx-auto mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Read testimonials from our satisfied clients who have experienced the quality
            and excellence of our services.
          </p>
          
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={handleWriteReview}>
            <MessageSquare className="mr-2 h-5 w-5" />
            Write Review
          </Button>
        </div>

        {isLoading ? (
          <div className={`text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Loading reviews...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedReviews.map((review, index) => (
              <Card key={index} className={`backdrop-blur border transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-card/50 border-border/50 hover:bg-card/70'
                  : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                      {review.profiles?.avatar_url ? (
                        <img 
                          src={review.profiles.avatar_url} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{review.name}</h4>
                        {review.is_verified && <span className="text-blue-500 text-sm">✓</span>}
                      </div>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{review.company}</p>
                    </div>
                    <div className="text-blue-500 text-2xl">"</div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className={`text-sm ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{review.rating}/5</span>
                  </div>
                  
                  <p className={`italic mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>"{review.comment}"</p>
                  
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3"
            onClick={handleViewAllReviews}
          >
            View All Reviews →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;

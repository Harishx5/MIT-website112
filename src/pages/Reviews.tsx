
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Star, User, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ReviewForm from '@/components/Reviews/ReviewForm';

const Reviews = () => {
  const navigate = useNavigate();
  const { user } = useAdmin();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_user_id_fkey(avatar_url)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const handleWriteReview = () => {
    if (user) {
      setShowReviewForm(true);
    } else {
      navigate('/auth');
    }
  };

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Reviews</span>
          </nav>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            {/* Added spacing between header and logo */}
            <div className="mb-12">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Read what our clients say about working with us and the results we've delivered
              for their businesses.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={handleWriteReview}>
                <MessageSquare className="mr-2 h-5 w-5" />
                {user ? 'Write Review' : 'Sign in to Write Review'}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-3"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </div>
          </div>

          {showReviewForm && user && (
            <div className="mb-8">
              <ReviewForm onClose={() => setShowReviewForm(false)} />
            </div>
          )}

          {isLoading ? (
            <div className="text-center">Loading reviews...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews?.map((review, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
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
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            {review.is_verified && <span className="text-blue-500 text-sm">✓</span>}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.company}</p>
                        </div>
                        <div className="text-blue-500 text-2xl">"</div>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">{review.rating}/5</span>
                      </div>
                      
                      <p className="text-muted-foreground italic mb-4">"{review.comment}"</p>
                      
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;

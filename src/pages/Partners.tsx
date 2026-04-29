import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;
import { ArrowUpRight, Building2, MapPin, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import SEO from '@/components/SEO';

interface TrustedPartner {
  id: string;
  name: string;
  logo_url: string;
  hero_image_url: string | null;
  hero_image_urls: string[] | null;
  website_url: string | null;
  description: string | null;
  category: string | null;
  location: string | null;
  employees: string | null;
  display_order: number;
}

const Partners = () => {
  const { theme } = useTheme();

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trusted_partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) {
        console.error('Error fetching partners:', error);
        return [];
      }
      return (data || []) as TrustedPartner[];
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Layout>
      <SEO
        title="Our Partners - Marzelet Info Technology"
        description="Discover the innovative companies and organizations that partner with Marzelet to deliver exceptional technology solutions."
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Trusted Partners
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We proudly collaborate with industry-leading companies and innovators who trust Marzelet
              to power their digital transformation journey.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse overflow-hidden">
                    <div className="h-48 bg-muted" />
                    <CardContent className="p-6">
                      <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-3 bg-muted rounded w-full mb-2" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : partners.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No partners listed yet</h3>
                <p className="text-muted-foreground">Check back soon to discover our trusted partners.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {partners.map((partner) => {
                  const heroSrc =
                    (partner.hero_image_urls && partner.hero_image_urls[0]) ||
                    partner.hero_image_url;
                  return (
                    <Link
                      key={partner.id}
                      to={`/partners/${partner.id}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                    >
                      <Card
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                      >
                        <div
                          className={`relative w-full h-48 overflow-hidden ${
                            theme === 'light' ? 'bg-gray-50' : 'bg-slate-800/40'
                          }`}
                        >
                          {heroSrc ? (
                            <img
                              src={heroSrc}
                              alt={partner.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img
                                src={partner.logo_url}
                                alt={partner.name}
                                className="max-h-24 max-w-[70%] object-contain"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold">{partner.name}</h3>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                          </div>

                          {partner.category && (
                            <Badge
                              variant="secondary"
                              className="self-start mb-3 inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/15"
                            >
                              <Building2 className="w-3 h-3" />
                              {partner.category}
                            </Badge>
                          )}

                          {partner.description && (
                            <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed line-clamp-3">
                              {partner.description}
                            </p>
                          )}

                          {(partner.location || partner.employees) && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
                              {partner.location && (
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {partner.location}
                                </span>
                              )}
                              {partner.employees && (
                                <span className="flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5" />
                                  {partner.employees}
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Partners;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import PartnerProfile from '@/components/Partners/PartnerProfile';
import SEO from '@/components/SEO';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;

const PartnerDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: partner } = useQuery({
    queryKey: ['partner-bg', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('trusted_partners')
        .select('hero_image_urls, hero_image_url, logo_url')
        .eq('id', id)
        .maybeSingle();
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const bgImages: string[] =
    (partner?.hero_image_urls && partner.hero_image_urls.length > 0)
      ? partner.hero_image_urls
      : (partner?.hero_image_url ? [partner.hero_image_url] : []);

  const cycleSeconds = bgImages.length * 5; // 5s per image total cycle

  return (
    <Layout>
      <SEO title="Partner | Marzelet" description="Learn more about our trusted partners." />
      <div className="relative min-h-screen pt-20 pb-10 overflow-hidden">
        {/* Animated cross-fade background */}
        <div className="absolute inset-0 -z-10 bg-muted overflow-hidden">
          {bgImages.map((src, i) => {
            const total = bgImages.length;
            const slot = 100 / total;
            const visibleEnd = slot; // shown for its slot, then hidden
            const keyframes =
              total > 1
                ? `@keyframes bg-swap-${i}-${total} {` +
                  `0% { opacity: 1; } ` +
                  `${visibleEnd}% { opacity: 1; } ` +
                  `${visibleEnd + 0.001}% { opacity: 0; } ` +
                  `100% { opacity: 0; } }`
                : '';
            return (
              <React.Fragment key={`${src}-${i}`}>
                {keyframes && <style>{keyframes}</style>}
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="bg-fade-layer"
                  style={
                    total > 1
                      ? {
                          animation: `bg-swap-${i}-${total} ${cycleSeconds}s infinite step-end`,
                          animationDelay: `${i * (cycleSeconds / total) - cycleSeconds}s`,
                        }
                      : { opacity: 1 }
                  }
                />
              </React.Fragment>
            );
          })}
          {/* Dark overlay + blur for legibility */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="rounded-2xl border bg-card/85 backdrop-blur-md overflow-hidden shadow-2xl">
            {id && <PartnerProfile partnerId={id} variant="page" />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerDetail;

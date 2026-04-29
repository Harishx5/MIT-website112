import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;

interface TrustedCompany {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

const normalizeLogo = (url: string) =>
  (url || '').trim().toLowerCase().split('?')[0];

const TrustedPartners = () => {
  const { theme } = useTheme();

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['trusted-companies-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trusted_companies')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) {
        console.error('Error fetching trusted companies:', error);
        return [];
      }
      return (data || []) as TrustedCompany[];
    }
  });

  if (isLoading) return null;

  // Deduplicate by id, case-insensitive name, AND normalized logo URL
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const seenLogos = new Set<string>();
  const uniqueCompanies = companies.filter((c) => {
    const nameKey = c.name.trim().toLowerCase();
    const logoKey = normalizeLogo(c.logo_url);
    if (seenIds.has(c.id) || seenNames.has(nameKey) || (logoKey && seenLogos.has(logoKey))) {
      return false;
    }
    seenIds.add(c.id);
    seenNames.add(nameKey);
    if (logoKey) seenLogos.add(logoKey);
    return true;
  });

  if (uniqueCompanies.length === 0) return null;

  const renderTile = (company: TrustedCompany) => (
    <div
      className={`flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 ${
        theme === 'light'
          ? 'bg-white shadow-sm hover:shadow-md border border-gray-100'
          : 'bg-slate-700 hover:bg-slate-600'
      }`}
      style={{ width: '200px', height: '100px' }}
    >
      <img
        src={company.logo_url}
        alt={company.name}
        className="max-h-16 max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  );

  const wrapWithLink = (company: TrustedCompany, key: string, ariaHidden = false) => {
    const tile = renderTile(company);
    return company.website_url ? (
      <a
        key={key}
        href={company.website_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaHidden ? undefined : company.name}
        aria-hidden={ariaHidden || undefined}
        className="shrink-0"
      >
        {tile}
      </a>
    ) : (
      <div key={key} className="shrink-0" aria-hidden={ariaHidden || undefined}>
        {tile}
      </div>
    );
  };

  // For a single logo: render once, centered, no marquee.
  // For 2+ logos: duplicate the list so the scroll loop is seamless.
  const showMarquee = uniqueCompanies.length >= 2;

  return (
    <section className={`py-16 overflow-hidden ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-800'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Leading Companies
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            We're proud to work with innovative companies that trust us with their digital transformation.
          </p>
        </div>
      </div>

      {showMarquee ? (
        <div className="relative w-full overflow-hidden">
          <div className={`pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r ${theme === 'light' ? 'from-gray-50' : 'from-slate-800'} to-transparent`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l ${theme === 'light' ? 'from-gray-50' : 'from-slate-800'} to-transparent`} />
          <div
            className="flex gap-8 animate-scroll-right-to-left hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {uniqueCompanies.map((company) => wrapWithLink(company, `${company.id}-a`))}
            {uniqueCompanies.map((company) => wrapWithLink(company, `${company.id}-b`, true))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 flex justify-center">
          {wrapWithLink(uniqueCompanies[0], uniqueCompanies[0].id)}
        </div>
      )}
    </section>
  );
};

export default TrustedPartners;

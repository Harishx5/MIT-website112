import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
const supabase = supabaseClient as any;
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react';

interface TrustedPartner {
  id: string;
  name: string;
  logo_url: string;
  hero_image_url: string | null;
  hero_image_urls: string[] | null;
  info_image_url: string | null;
  website_url: string | null;
  description: string | null;
  long_description: string | null;
  partner_since: string | null;
  services: string[] | null;
  achievements: string | null;
  category: string | null;
  location: string | null;
  employees: string | null;
  founded: string | null;
}

interface Props {
  partnerId: string;
  variant?: 'modal' | 'page';
}

const StatCard = ({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  tone: 'blue' | 'rose' | 'emerald' | 'amber';
}) => {
  const tones: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  };
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-sm">{value || '—'}</p>
    </div>
  );
};

const PartnerProfile: React.FC<Props> = ({ partnerId, variant = 'page' }) => {
  const { data: partner, isLoading } = useQuery({
    queryKey: ['partner-detail', partnerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trusted_partners')
        .select('*')
        .eq('id', partnerId)
        .maybeSingle();
      if (error) throw error;
      return data as TrustedPartner | null;
    },
    enabled: !!partnerId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="h-10 w-2/3 bg-muted rounded" />
        <div className="h-48 w-full bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold mb-2">Partner not found</h2>
        <Link to="/partners">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Partners
          </Button>
        </Link>
      </div>
    );
  }

  const achievementItems =
    partner.achievements
      ?.split('\n')
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const services = partner.services ?? [];
  const isPage = variant === 'page';
  const infoImage = partner.info_image_url || partner.hero_image_url;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      {isPage && (
        <Link
          to="/partners"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Partners
        </Link>
      )}

      {infoImage && (
        <div className="mb-6 overflow-hidden rounded-xl border aspect-[16/7] bg-muted">
          <img
            src={infoImage}
            alt={partner.name}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {partner.category && (
        <Badge
          variant="secondary"
          className="mb-4 inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/15"
        >
          <Building2 className="w-3 h-3" />
          {partner.category}
        </Badge>
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{partner.name}</h1>
      {(partner.long_description || partner.description) && (
        <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
          {partner.long_description || partner.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard icon={<CalendarDays className="w-4 h-4" />} label="Founded" value={partner.founded} tone="blue" />
        <StatCard icon={<MapPin className="w-4 h-4" />} label="Location" value={partner.location} tone="rose" />
        <StatCard icon={<Users className="w-4 h-4" />} label="Employees" value={partner.employees} tone="emerald" />
        <StatCard
          icon={<Briefcase className="w-4 h-4" />}
          label="Partnership"
          value={partner.partner_since ? `Since ${partner.partner_since}` : null}
          tone="amber"
        />
      </div>

      {services.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Services & Expertise
          </h3>
          <ul className="space-y-2">
            {services.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {achievementItems.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Key Achievements
          </h3>
          <ul className="space-y-2">
            {achievementItems.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {partner.website_url && (
        <Button
          asChild
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
        >
          <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
            <Globe className="w-4 h-4 mr-2" />
            Visit Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      )}
    </div>
  );
};

export default PartnerProfile;

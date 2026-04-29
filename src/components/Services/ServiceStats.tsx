
import React from 'react';

interface Stat {
  number: string;
  label: string;
}

interface ServiceStatsProps {
  stats: Stat[];
}

const ServiceStats: React.FC<ServiceStatsProps> = ({ stats }) => {
  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;

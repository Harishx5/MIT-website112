
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Offering {
  title: string;
  description: string;
}

interface ServiceOfferingsProps {
  offerings: Offering[];
  bgColor?: string;
}

const ServiceOfferings: React.FC<ServiceOfferingsProps> = ({ offerings, bgColor = 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600' }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Service Offerings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-200 bg-card border-border">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 will-change-transform`}>
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <CardTitle className="text-xl">{offering.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{offering.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferings;

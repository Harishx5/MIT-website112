
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const benefits = [
  {
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed with user experience as the top priority for maximum engagement.',
    color: 'bg-purple-500'
  },
  {
    title: 'Performance Optimized',
    description: 'Apps built for speed and efficiency across all device types and OS versions.',
    color: 'bg-purple-500'
  },
  {
    title: 'Platform Guidelines',
    description: 'Following iOS and Android design guidelines for native user experiences.',
    color: 'bg-purple-500'
  },
  {
    title: 'Faster Time to Market',
    description: 'Agile development process to get your app to market quickly and efficiently.',
    color: 'bg-purple-500'
  }
];

const MobileBenefits = () => {
  return (
    <section className="py-16 bg-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Mobile Development
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the benefits of professional mobile app development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mr-4`}>
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileBenefits;

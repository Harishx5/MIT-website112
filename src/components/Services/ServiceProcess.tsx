
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  process: ProcessStep[];
  bgColor?: string;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ process, bgColor = 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600' }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures successful delivery from concept to completion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const processSteps = [
  {
    number: '1',
    title: 'Strategy & Research',
    description: 'Market research and competitor analysis to define your app strategy and target audience.'
  },
  {
    number: '2', 
    title: 'UX/UI Design',
    description: 'Creating engaging designs that follow platform-specific guidelines and best practices.'
  },
  {
    number: '3',
    title: 'Development & QA',
    description: 'Building and testing your app across multiple devices and OS versions.'
  },
  {
    number: '4',
    title: 'Launch & Growth', 
    description: 'App store submission and post-launch optimization strategies for user acquisition.'
  }
];

const MobileProcess = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures successful app delivery from concept to app store
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

export default MobileProcess;

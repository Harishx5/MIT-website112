
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download, ArrowLeft } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Native iOS Development',
    description: 'High-performance iOS apps built with Swift and optimized for Apple devices.',
    color: 'bg-purple-500'
  },
  {
    icon: Smartphone,
    title: 'Native Android Development', 
    description: 'Feature-rich Android apps using Kotlin for optimal performance and user experience.',
    color: 'bg-purple-500'
  },
  {
    icon: Download,
    title: 'Cross-Platform Development',
    description: 'Build once, deploy everywhere with React Native and Flutter frameworks.',
    color: 'bg-purple-500'
  }
];

const MobileServices = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Mobile Development Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mobile development services for iOS and Android platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileServices;

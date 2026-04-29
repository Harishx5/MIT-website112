
import React from 'react';

interface ServiceTechnologiesProps {
  technologies: string[];
}

const ServiceTechnologies: React.FC<ServiceTechnologiesProps> = ({ technologies }) => {
  return (
    <section className="py-16 bg-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technologies We Use
          </h2>
          <p className="text-xl text-muted-foreground">
            Cutting-edge tools and frameworks for optimal results
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTechnologies;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'All',
  'AI/Machine Learning',
  'IoT/Tracking',
  'Enterprise Software', 
  'Web Application',
  'Enterprise ERP',
  'E-commerce'
];

const PortfolioCategories = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section className="py-8 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioCategories;

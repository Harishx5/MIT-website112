
import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/contexts/ThemeContext';

const faqData = {
  all: [
    {
      category: 'General',
      question: 'What services does Marzelet offer?',
      answer: 'Marzelet offers comprehensive digital solutions including web design & development, mobile app development, software development, digital marketing, UI/UX design, and enterprise solutions. We specialize in creating innovative technology solutions that drive business growth.'
    },
    {
      category: 'Process',
      question: 'What is your typical project timeline?',
      answer: 'Our project timelines vary based on complexity and scope. Typically, web development projects take 4-8 weeks, mobile apps 8-16 weeks, and enterprise solutions 12-24 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.'
    },
    {
      category: 'Technical',
      question: 'Which technologies do you work with?',
      answer: 'We work with cutting-edge technologies including React, Node.js, Python, Java, React Native, Flutter, AWS, Docker, and modern databases. Our team stays updated with the latest tech trends to deliver scalable and efficient solutions.'
    },
    {
      category: 'Pricing',
      question: 'How do you structure your pricing?',
      answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Our pricing is transparent and based on project scope, complexity, and timeline. We provide detailed quotes after understanding your specific requirements.'
    },
    {
      category: 'Process',
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive post-launch support and maintenance services. This includes regular updates, security patches, performance optimization, and feature enhancements. We provide different support packages to match your needs and budget.'
    },
    {
      category: 'General',
      question: 'Can you work with existing teams?',
      answer: 'Absolutely! We excel at integrating with existing development teams and workflows. Whether you need additional developers, specialized expertise, or project leadership, we adapt to your team structure and processes seamlessly.'
    },
    {
      category: 'Technical',
      question: 'Do you handle hosting and deployment?',
      answer: 'Yes, we provide end-to-end solutions including hosting setup, deployment automation, and infrastructure management. We work with leading cloud providers like AWS, Google Cloud, and Azure to ensure reliable and scalable hosting solutions.'
    },
    {
      category: 'Pricing',
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans to accommodate different budget requirements. Options include milestone-based payments, monthly installments, and custom payment schedules. We work with you to find a payment structure that fits your cash flow needs.'
    },
    {
      category: 'Process',
      question: 'How do you ensure project quality?',
      answer: 'We maintain high quality through rigorous testing, code reviews, agile development practices, and continuous client feedback. Our QA process includes automated testing, manual testing, performance optimization, and security audits before deployment.'
    },
    {
      category: 'General',
      question: 'What makes Marzelet different from other agencies?',
      answer: 'Our unique combination of technical expertise, creative design, and business understanding sets us apart. We focus on long-term partnerships, deliver scalable solutions, and provide exceptional post-launch support. Our team stays ahead of technology trends to give you a competitive advantage.'
    }
  ]
};

const categories = ['All', 'General', 'Process', 'Technical', 'Pricing'];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const filteredFAQs = activeCategory === 'All' 
    ? faqData.all 
    : faqData.all.filter(faq => faq.category === activeCategory);

  const handleContactClick = () => {
    if (window.location.pathname === '/') {
      // If on home page, scroll to contact section
      const element = document.getElementById('contact-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page and then scroll to contact section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className={`text-xl max-w-4xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Find answers to common questions about our services, process, and approach.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeCategory.toLowerCase()} onValueChange={(value) => setActiveCategory(value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1))} className="w-full max-w-2xl">
            <TabsList className={`grid w-full grid-cols-5 backdrop-blur border ${
              theme === 'light'
                ? 'bg-card/50 border-border/50'
                : 'bg-slate-700/50 border-slate-600/50'
            }`}>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category.toLowerCase()}
                  className="text-sm font-medium"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`backdrop-blur border rounded-xl px-6 ${
                  theme === 'light'
                    ? 'bg-card/30 border-border/30'
                    : 'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      {faq.category}
                    </span>
                    <span className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`pb-6 pl-20 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              We're here to help! Get in touch with our team for personalized answers.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={handleContactClick}
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

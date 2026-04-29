import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin, Clock, Headphones } from 'lucide-react';
import FooterLogo from './FooterLogo';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const navigate = useNavigate();
  const {
    theme
  } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBlogClick = () => {
    navigate('/blog');
  };

  const handleCaseStudiesClick = () => {
    navigate('/case-studies');
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleLiveChat = () => {
    window.open('https://wa.me/919629997391', '_blank');
  };

  return <footer className={`${theme === 'light' ? 'bg-white text-gray-600 border-gray-200' : 'bg-slate-900 text-gray-300 border-slate-700'} border-t relative z-30`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <FooterLogo />
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">info@marzelet.info</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">+91-9629997391</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium text-green-600">24/7 Available</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps/place/Marzelet+Info+Technology+Pvt+Ltd/@13.1114651,80.1200133,17z/data=!4m15!1m8!3m7!1s0x3a5263830208e4a1:0xeb688d6ba4faaa6!2sMarzelet+Info+Technology+Pvt+Ltd!8m2!3d13.111537!4d80.1200416!10e5!16s%2Fg%2F11yg39r8mq!3m5!1s0x3a5263830208e4a1:0xeb688d6ba4faaa6!8m2!3d13.111537!4d80.1200416!16s%2Fg%2F11yg39r8mq?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={`text-sm hover:text-blue-600 transition-colors leading-relaxed ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>
                  No.7, College Road,<br />
                  Opp. St. Peter's Engineering College,<br />
                  Avadi, Chennai - 600054
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors font-medium ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>All Services</Link></li>
              <li><Link to="/services/web-development" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Web Development</Link></li>
              <li><Link to="/services/mobile-development" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Mobile Development</Link></li>
              <li><Link to="/services/software-development" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Software Development</Link></li>
              <li><Link to="/services/it-infrastructure" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>IT Infrastructure & Services</Link></li>
              <li><Link to="/services/iot-embedded" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>IoT & Embedded Solutions</Link></li>
              <li><Link to="/services/ui-ux-design" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>About Us</Link></li>
              <li><Link to="/our-team" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Our Team</Link></li>
              <li><Link to="/careers" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Careers</Link></li>
              <li><Link to="/internships-training" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Internships & Programs</Link></li>
              <li><Link to="/products" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Products</Link></li>
              <li><Link to="/news" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>News</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Resources</h3>
            <ul className="space-y-2">
              <li><button onClick={handleBlogClick} className={`text-sm hover:text-blue-600 transition-colors text-left ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Blog</button></li>
              <li><button onClick={handleCaseStudiesClick} className={`text-sm hover:text-blue-600 transition-colors text-left ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Case Studies</button></li>
              <li><Link to="/documentation" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Documentation</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Support & Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors font-medium ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Contact Us</Link></li>
              <li>
                <button onClick={handleLiveChat} className={`text-sm hover:text-blue-600 transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>
                  <Headphones className="h-3 w-3" />
                  Live Chat Support
                </button>
              </li>
              <li><Link to="/support-center" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Support Center</Link></li>
              <li><Link to="/privacy-policy" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Terms of Service</Link></li>
              <li><Link to="/cookie-policy" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>Cookie Policy</Link></li>
              <li><Link to="/gdpr-compliance" onClick={scrollToTop} className={`text-sm hover:text-blue-600 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}>GDPR Compliance</Link></li>
            </ul>
            
            {/* Support Hours */}
            
          </div>
        </div>

        {/* Emergency Support Banner */}
        

        {/* Bottom Section */}
        <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'} mt-8 pt-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`text-sm text-center md:text-left ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 Marzelet Info Technology Pvt Ltd. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <a href="https://x.com/Marzelet_Info" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'} transition-colors`}>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/marzelet_info?igsh=Z21kZ2MxbXR6c2ht" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'} transition-colors`}>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/marzelet-info-technology-pvt-ltd/" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'} transition-colors`}>
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <button onClick={scrollToTop} className="ml-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;

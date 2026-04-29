
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderUserMenu from './HeaderUserMenu';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderThemeToggle from './HeaderThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    const performScroll = () => {
      let targetElement = null;
      
      // Define specific selectors for each section to target the exact heading text
      switch (sectionId) {
        case 'about-section':
          // Look for "About Marzelet" heading
          targetElement = document.querySelector('h2')?.textContent?.includes('About') 
            ? document.querySelector('h2') 
            : document.getElementById('about-section');
          break;
        case 'services-section':
          // Look for "Our Services" heading
          targetElement = Array.from(document.querySelectorAll('h2')).find(h2 => 
            h2.textContent?.includes('Our Services') || h2.textContent?.includes('Services')
          ) || document.getElementById('services-section');
          break;
        case 'portfolio-section':
          // Look for "Our Products" heading
          targetElement = Array.from(document.querySelectorAll('h2')).find(h2 => 
            h2.textContent?.includes('Portfolio') || h2.textContent?.includes('Products')
          ) || document.getElementById('portfolio-section');
          break;
        case 'contact-section':
          // Look for "Get In Touch" heading
          targetElement = Array.from(document.querySelectorAll('h2')).find(h2 => 
            h2.textContent?.includes('Get In Touch') || h2.textContent?.includes('Touch')
          ) || document.getElementById('contact-section');
          break;
        case 'blog-section':
          targetElement = document.getElementById('blog-section');
          break;
        case 'hero-section':
          targetElement = document.getElementById('hero-section');
          break;
        default:
          targetElement = document.getElementById(sectionId);
      }

      if (targetElement) {
        const headerHeight = 80; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 200); // Increased delay for page load
    } else {
      performScroll();
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToSection('hero-section');
    } else {
      navigate('/');
    }
  };

  const handleAboutClick = () => {
    scrollToSection('about-section');
  };

  const handleReviewsClick = () => {
    if (location.pathname === '/reviews') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/reviews');
    }
    setIsMenuOpen(false);
  };

  const handleNewsClick = () => {
    navigate('/news');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const handleCareersClick = () => {
    navigate('/careers');
    setIsMenuOpen(false);
  };

  const handleNavClick = (itemName: string, action: () => void) => {
    setActiveNavItem(itemName);
    action();
    setTimeout(() => {
      setActiveNavItem(null);
    }, 300);
  };

  const handleInternshipClick = () => {
    navigate('/internships-training');
    setIsMenuOpen(false);
  };

  const handleVerifyInternClick = () => {
    navigate('/verify-intern');
    setIsMenuOpen(false);
  };

  const handlePartnersClick = () => {
    navigate('/partners');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', action: handleHomeClick },
    { name: 'About', path: '/about-us', action: handleAboutClick },
    { name: 'Services', path: '/services', action: () => scrollToSection('services-section') },
    { name: 'Products', path: '/products', action: () => scrollToSection('portfolio-section') },
    { name: 'Partners', path: '/partners', action: handlePartnersClick },
    { name: 'Careers', path: '/careers', action: handleCareersClick },
    {
      name: 'Internships',
      path: '/internships-training',
      action: handleInternshipClick,
      children: [
        { name: 'Apply Internship', path: '/internships-training', action: handleInternshipClick },
        { name: 'Verify Intern', path: '/verify-intern', action: handleVerifyInternClick },
      ],
    },
    { name: 'Contact', path: '/#contact', action: () => scrollToSection('contact-section') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'light' ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700'}`}>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <HeaderLogo />
          </div>
          
          {/* Navigation in the center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <HeaderNavigation 
              navItems={navItems}
              activeNavItem={activeNavItem}
              handleNavClick={handleNavClick}
              isActivePath={isActivePath}
            />
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <HeaderThemeToggle />
            <HeaderUserMenu />
          </div>

          {/* Mobile Menu */}
          <HeaderMobileMenu 
            navItems={navItems}
            activeNavItem={activeNavItem}
            handleNavClick={handleNavClick}
            isActivePath={isActivePath}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;

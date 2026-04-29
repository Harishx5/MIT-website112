
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  action: () => void;
  children?: NavigationItem[];
}

interface HeaderNavigationProps {
  navItems: NavigationItem[];
  activeNavItem: string | null;
  handleNavClick: (itemName: string, action: () => void) => void;
  isActivePath: (path: string) => boolean;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  navItems,
  activeNavItem,
  handleNavClick,
  isActivePath,
}) => {
  const { theme } = useTheme();

  // Prefetch lazy route chunks on hover for faster navigation
  const prefetchRoute = (path: string) => {
    const map: Record<string, () => Promise<unknown>> = {
      '/': () => import('@/pages/Index'),
      '/about': () => import('@/pages/AboutUs'),
      '/about-us': () => import('@/pages/AboutUs'),
      '/our-team': () => import('@/pages/OurTeam'),
      '/services': () => import('@/pages/Services'),
      '/portfolio': () => import('@/pages/Portfolio'),
      '/products': () => import('@/pages/Portfolio'),
      '/case-studies': () => import('@/pages/CaseStudies'),
      '/blog': () => import('@/pages/Blog'),
      '/news': () => import('@/pages/News'),
      '/careers': () => import('@/pages/Careers'),
      '/internships-training': () => import('@/pages/InternshipsTraining'),
      '/partners': () => import('@/pages/Partners'),
      '/reviews': () => import('@/pages/Reviews'),
      '/contact': () => import('@/pages/Contact'),
      '/verify-intern': () => import('@/pages/VerifyIntern'),
    };
    const loader = map[path];
    if (loader) loader().catch(() => {});
  };

  const getNavButtonClass = (itemName: string, isActive: boolean) => {
    const baseClass = "text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-md inline-flex items-center gap-1";
    const isClicked = activeNavItem === itemName;

    if (isClicked) {
      return `${baseClass} transform scale-105 shadow-md`
        + ` ${theme === 'light' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'}`;
    }
    if (isActive) {
      return `${baseClass} ${theme === 'light' ? 'text-black' : 'text-white'}`;
    }
    return `${baseClass} ${
      theme === 'light'
        ? 'text-gray-700 hover:text-black hover:bg-gray-100'
        : 'text-gray-300 hover:text-white hover:bg-slate-800'
    }`;
  };

  return (
    <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
      <div className="flex items-center space-x-2">
        {navItems.map((item) => {
          if (item.children && item.children.length > 0) {
            return (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => {
                  prefetchRoute(item.path);
                  item.children?.forEach((c) => prefetchRoute(c.path));
                }}
              >
                <span
                  className={`${getNavButtonClass(item.name, isActivePath(item.path))} cursor-default select-none`}
                >
                  {item.name}
                  <ChevronDown className="h-3.5 w-3.5" />
                </span>
                <div
                  className={`absolute left-0 top-full pt-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                >
                  <div
                    className={`rounded-md shadow-lg border overflow-hidden ${
                      theme === 'light'
                        ? 'bg-white border-gray-200'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.name}
                        onClick={() => handleNavClick(child.name, child.action)}
                        onMouseEnter={() => prefetchRoute(child.path)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                            : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name, item.action)}
              onMouseEnter={() => prefetchRoute(item.path)}
              onFocus={() => prefetchRoute(item.path)}
              className={getNavButtonClass(item.name, isActivePath(item.path))}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderNavigation;

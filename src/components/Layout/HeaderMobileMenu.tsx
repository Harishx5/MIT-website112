
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import HeaderThemeToggle from './HeaderThemeToggle';

interface NavigationItem {
  name: string;
  path: string;
  action: () => void;
  children?: NavigationItem[];
}

interface HeaderMobileMenuProps {
  navItems: NavigationItem[];
  activeNavItem: string | null;
  handleNavClick: (itemName: string, action: () => void) => void;
  isActivePath: (path: string) => boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  navItems,
  activeNavItem,
  handleNavClick,
  isActivePath,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const { theme } = useTheme();
  const { user, isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
      {/* Mobile Menu Button with improved spacing */}
      <div className="lg:hidden flex items-center space-x-4">
        <div className="flex-shrink-0">
          <HeaderThemeToggle />
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-md flex-shrink-0 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-800'}`}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden mt-4 pb-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'}`}>
          <div className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              return (
              <div key={item.name} className="flex flex-col">
                {hasChildren ? (
                  <span
                    className={`text-sm font-semibold uppercase tracking-wide text-left px-3 py-2 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {item.name}
                  </span>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.name, item.action)}
                    className={`text-sm font-medium transition-all duration-300 text-left px-3 py-2 rounded-md ${
                      activeNavItem === item.name
                        ? `${theme === 'light' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'} transform scale-105`
                        : isActivePath(item.path)
                        ? `${theme === 'light' ? 'text-black' : 'text-white'}`
                        : theme === 'light'
                        ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </button>
                )}
                {hasChildren && (
                  <div className="ml-4 mt-1 flex flex-col space-y-1 border-l border-gray-300 dark:border-slate-700 pl-3">
                    {item.children!.map((child) => (
                      <button
                        key={child.name}
                        onClick={() => handleNavClick(child.name, child.action)}
                        className={`text-sm text-left px-3 py-2 rounded-md transition-colors ${
                          theme === 'light'
                            ? 'text-gray-600 hover:text-black hover:bg-gray-100'
                            : 'text-gray-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              );
            })}
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <div className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Welcome, {getUserDisplayName()}
                </div>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="outline" size="sm" className="w-fit">
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                  </Button>
                )}
                <Button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  variant="outline" 
                  size="sm" 
                  className="w-fit"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-fit">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMobileMenu;

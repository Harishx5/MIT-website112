
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';

const HeaderUserMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user, isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  if (!user) {
    return (
      <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'
        }`}
      >
        <User className="h-4 w-4" />
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {getUserDisplayName()}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isUserMenuOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'
        }`}>
          <div className="py-2">
            <Link
              to="/support-center"
              onClick={() => setIsUserMenuOpen(false)}
              className={`flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Support Center
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsUserMenuOpen(false)}
              className={`flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <Settings className="h-4 w-4 mr-2" />
              Profile
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsUserMenuOpen(false)}
                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                  theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUserMenu;

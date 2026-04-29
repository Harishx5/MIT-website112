import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Add login-page class to body for 100% size and full height
    document.body.classList.add('login-page');
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Check if user came from email confirmation
    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      toast({
        title: "Email Confirmed Successfully!",
        description: "Your account has been verified. You can now sign in with your credentials.",
      });
    }

    // Load saved credentials only if not arriving from signup
    const fromSignup = (window.history.state?.usr?.fromSignup) === true;
    if (!fromSignup) {
      const savedEmail = localStorage.getItem('rememberedEmail');
      const savedPassword = localStorage.getItem('rememberedPassword');
      const wasRemembered = localStorage.getItem('rememberMe') === 'true';
      if (wasRemembered && savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
        if (savedPassword) setPassword(savedPassword);
      }
    } else {
      setEmail('');
      setPassword('');
    }

    // Cleanup function to remove login-page class
    return () => {
      document.body.classList.remove('login-page');
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, [navigate, searchParams, toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
      }

      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Branding */}
      <div className="w-1/2 bg-slate-800 flex flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden">
            <img 
              src="/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png" 
              alt="Marzelet Info Technology Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-md">
            Sign in to access your Marzelet account and continue your journey with us
          </p>
          
          <div className="space-y-6 text-left max-w-md">
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Secure authentication
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Your data is protected
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Access all features
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign In form */}
      <div className="w-1/2 bg-white dark:bg-slate-900 flex flex-col justify-center p-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="self-start mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Sign In
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signin-email" className="text-gray-900 dark:text-white font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password" className="text-gray-900 dark:text-white font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-500 border-gray-300 dark:border-slate-600 rounded focus:ring-orange-500 bg-white dark:bg-slate-800"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/forgot-password')}
                className="text-orange-500 hover:text-orange-600 p-0 text-sm"
              >
                Forgot password?
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            
            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  navigate('/auth/signup', { state: { fromSignin: true } });
                }}
                className="text-orange-500 hover:text-orange-600 p-0 font-semibold"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

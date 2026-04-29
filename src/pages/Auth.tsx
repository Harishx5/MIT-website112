
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
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

    // Cleanup function
    return () => {
      document.body.classList.remove('login-page');
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, [navigate]);

  const switchTab = (tab: string) => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setRememberMe(false);
    setActiveTab(tab);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully."
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Top/Left side - Branding */}
      <div className="w-full lg:w-1/2 bg-slate-800 flex flex-col justify-center items-center p-6 lg:p-12 relative min-h-[200px] lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl hidden lg:block"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-8 overflow-hidden">
            <img 
              src="/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png" 
              alt="Marzelet Info Technology Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-6">
            Marzelet Info Technology
          </h1>
          
          <p className="text-base lg:text-xl text-slate-300 mb-6 lg:mb-12 max-w-md px-4 lg:px-0">
            Innovating the future with cutting-edge technology solutions
          </p>
          
          <div className="space-y-3 lg:space-y-6 text-left max-w-md hidden lg:block">
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Enterprise-grade security
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              24/7 expert support
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Global reach, local expertise
            </div>
          </div>
        </div>
      </div>

      {/* Bottom/Right side - Auth forms */}
      <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center p-6 lg:p-12 min-h-screen lg:min-h-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="self-start mb-6 lg:mb-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              {activeTab === 'signin' ? 'Sign in to access your account' : 'Join us and start your journey'}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={switchTab} className="w-full">
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="pl-12 h-10 lg:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm lg:text-base" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      id="signin-password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="pl-12 pr-12 h-10 lg:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm lg:text-base" 
                      required 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      checked={rememberMe} 
                      onChange={e => setRememberMe(e.target.checked)} 
                      className="w-4 h-4 text-orange-500 border-border rounded focus:ring-orange-500 bg-card" 
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
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
                  className="w-full h-10 lg:h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm lg:text-base" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                
                <div className="text-center">
                  <span className="text-sm lg:text-base text-muted-foreground">Don't have an account? </span>
                  <button 
                    type="button" 
                    onClick={() => switchTab('signup')} 
                    className="text-sm lg:text-base text-orange-500 hover:text-orange-600 p-0 font-semibold bg-transparent border-none cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="pl-12 h-10 lg:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm lg:text-base" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      id="signup-password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="pl-12 pr-12 h-10 lg:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm lg:text-base" 
                      required 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-foreground font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm your password" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      className="pl-12 pr-12 h-10 lg:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm lg:text-base" 
                      required 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-10 lg:h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm lg:text-base" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="text-center">
                  <span className="text-sm lg:text-base text-muted-foreground">Already have an account? </span>
                  <button 
                    type="button" 
                    onClick={() => switchTab('signin')} 
                    className="text-sm lg:text-base text-orange-500 hover:text-orange-600 p-0 font-semibold bg-transparent border-none cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;

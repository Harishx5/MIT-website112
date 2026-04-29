import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form when arriving fresh from sign-in page
    const fromSignin = (window.history.state?.usr?.fromSignin) === true;
    if (fromSignin) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailSent(false);
    }
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Check for existing cooldown
    const lastSignupAttempt = localStorage.getItem('signup_last_attempt');
    if (lastSignupAttempt) {
      const timeDiff = Date.now() - parseInt(lastSignupAttempt);
      const remainingCooldown = Math.max(0, 60000 - timeDiff); // 1 minute cooldown
      if (remainingCooldown > 0) {
        setCooldown(Math.ceil(remainingCooldown / 1000));
        const timer = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              localStorage.removeItem('signup_last_attempt');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      } else {
        localStorage.removeItem('signup_last_attempt');
      }
    }
  }, [navigate, searchParams, toast]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const clearCooldown = () => {
    localStorage.removeItem('signup_last_attempt');
    setCooldown(0);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0) {
      toast({
        title: "Please wait",
        description: `You can try signing up again in ${cooldown} seconds.`,
        variant: "destructive",
      });
      return;
    }
    
    // Enhanced validation
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Clear any existing session first
      await supabase.auth.signOut();
      
      console.log('Attempting to sign up user with email confirmation:', email);
      
      // Configure the redirect URL to point to the confirmation page
      const redirectUrl = `${window.location.origin}/auth/confirm`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error details:', error);
        
        // Handle specific error cases
        if (error.message.includes('rate limit') || error.message.includes('too many') || error.status === 429) {
          localStorage.setItem('signup_last_attempt', Date.now().toString());
          setCooldown(60); // 1 minute cooldown
          
          const timer = setInterval(() => {
            setCooldown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                localStorage.removeItem('signup_last_attempt');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          toast({
            title: "Rate Limit Reached",
            description: "Too many signup attempts. Please wait 1 minute before trying again.",
            variant: "destructive",
          });
        } else if (error.message.toLowerCase().includes('already') || error.message.includes('registered')) {
          toast({
            title: "Account Already Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
          setTimeout(() => {
            navigate('/auth/signin');
          }, 2000);
        } else {
          toast({
            title: "Signup Failed",
            description: error.message || "Unable to create account. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user && !data.user.email_confirmed_at) {
        console.log('User created, email confirmation required:', data.user);
        
        // Clear cooldown on successful signup
        localStorage.removeItem('signup_last_attempt');
        setCooldown(0);
        
        // Set email sent state
        setEmailSent(true);
        
        toast({
          title: "Confirmation Email Sent!",
          description: "Please check your email and click the confirmation link to verify your account.",
        });
      } else if (data.user && data.user.email_confirmed_at) {
        // If email is already confirmed (unlikely but possible)
        toast({
          title: "Account Created and Confirmed!",
          description: "Your account is ready. Redirecting to home page...",
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      
      toast({
        title: "Network Error",
        description: "Unable to connect to our servers. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/auth/confirm`;
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Resend Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Confirmation Email Resent",
          description: "A new confirmation email has been sent. Please check your inbox.",
        });
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast({
        title: "Resend Failed",
        description: "Unable to resend confirmation email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Branding */}
      <div className="w-1/2 bg-slate-800 flex flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden">
            <img 
              src="/lovable-uploads/ea4b0375-50fd-4c5e-83fd-3830452ef78b.png" 
              alt="Marzelet Info Technology Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Marzelet Info Technology
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-md">
            Innovating the future with cutting-edge technology solutions
          </p>
          
          <div className="space-y-6 text-left max-w-md">
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

      {/* Right side - Sign Up form */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="self-start mb-8 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {emailSent ? 'Check Your Email' : 'Create Account'}
            </h2>
            <p className="text-slate-600">
              {emailSent 
                ? 'We\'ve sent you a confirmation link' 
                : 'Join Marzelet and start your journey with us'
              }
            </p>
          </div>

          {cooldown > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-amber-800">
                    Rate Limit Active
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Please wait {cooldown} seconds before trying again.
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={clearCooldown}
                    className="text-amber-600 hover:text-amber-700 p-0 mt-2 text-sm"
                  >
                    Clear cooldown (if you think this is an error)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {emailSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-green-800">
                    Confirmation Email Sent!
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    We've sent a confirmation email to <strong>{email}</strong>. 
                    Please check your inbox and click the "Confirm your mail" link to verify your account.
                    You'll be automatically logged in and redirected to the home page after confirmation.
                  </p>
                  <p className="text-sm text-green-600 mt-2 italic">
                    If email is not received, check the spam email folder.
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={resendConfirmation}
                    className="text-green-600 hover:text-green-700 p-0 mt-2 text-sm"
                  >
                    Didn't receive the email? Resend it
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!emailSent && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800">
                    Email Verification Required
                  </h4>
                  <ul className="text-sm text-blue-600 mt-1 space-y-1">
                    <li>• Use a valid email address you can access</li>
                    <li>• Password must be at least 6 characters</li>
                    <li>• You'll receive a confirmation email with a link</li>
                    <li>• Click the link to verify and get logged in automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!emailSent ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                    disabled={isLoading || cooldown > 0}
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                    disabled={isLoading || cooldown > 0}
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || cooldown > 0}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-700 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                    disabled={isLoading || cooldown > 0}
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading || cooldown > 0}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || cooldown > 0}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </span>
                ) : cooldown > 0 ? (
                  `Wait ${cooldown}s`
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-8">
                <Mail className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Confirmation Email Sent
                </h3>
                <p className="text-slate-600 mb-4">
                  We've sent a confirmation link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-slate-500">
                  After clicking the confirmation link, you'll be automatically logged in and redirected to the home page.
                </p>
              </div>
              
              <Button
                type="button"
                variant="link"
                onClick={() => setEmailSent(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                ← Back to signup form
              </Button>
            </div>
          )}
          
          {!emailSent && (
            <div className="text-center mt-6">
              <span className="text-slate-600">Already have an account? </span>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setEmailSent(false);
                  navigate('/auth/signin', { state: { fromSignup: true } });
                }}
                className="text-orange-500 hover:text-orange-600 p-0 font-semibold"
                disabled={isLoading}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Info, Mail, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Add login-page class to body for 100% size and full height
    document.body.classList.add('login-page');
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';

    // Check for existing cooldown - set to exactly 60 seconds
    const lastEmailSent = localStorage.getItem('password_reset_last_sent');
    if (lastEmailSent) {
      const timeDiff = Date.now() - parseInt(lastEmailSent);
      const remainingCooldown = Math.max(0, 60000 - timeDiff); // Exactly 60 seconds (60000ms)
      if (remainingCooldown > 0) {
        setCooldown(Math.ceil(remainingCooldown / 1000));
        const timer = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('login-page');
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0) {
      toast({
        title: "Please wait",
        description: `You can request another reset link in ${cooldown} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        // Handle different types of errors
        if (error.message.includes('rate limit') || error.message.includes('too many requests') || error.message.includes('Email rate limit exceeded')) {
          toast({
            title: "Email rate limit exceeded",
            description: "Too many reset requests. Please wait 60 seconds before requesting another reset link. Check your email for any previous reset links.",
            variant: "destructive",
          });
          // Set exactly 60 seconds cooldown for rate limiting
          localStorage.setItem('password_reset_last_sent', Date.now().toString());
          setCooldown(60); // Exactly 60 seconds
          const timer = setInterval(() => {
            setCooldown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else if (error.message.includes('User not found')) {
          toast({
            title: "User not found",
            description: "No account found with this email address. Please check your email or sign up for a new account.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        localStorage.setItem('password_reset_last_sent', Date.now().toString());
        setCooldown(60); // Set exactly 60 seconds
        setEmailSent(true);
        const timer = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions. If you don't see it, check your spam folder.",
        });
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Branding */}
      <div className="w-1/2 bg-slate-800 flex flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden">
            <img 
              src="/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png" 
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
            Secure password reset for your account
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

      {/* Right side - Reset Form */}
      <div className="w-1/2 bg-background flex flex-col justify-center p-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="self-start mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Reset Password
            </h2>
            <p className="text-muted-foreground">
              Enter your email to receive a reset link
            </p>
          </div>

          {emailSent && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Email Sent Successfully
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    We've sent a password reset link to your email. Please check your inbox and spam folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  Password Reset Instructions
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Enter your email address and we'll send you a secure link to reset your password. 
                  The link will expire in 1 hour for security purposes. Check your spam folder if you don't see the email.
                </p>
              </div>
            </div>
          </div>

          {cooldown > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                    Rate Limit Active
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    Please wait {cooldown} seconds before requesting another reset link.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-12 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || cooldown > 0}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Sending...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send Reset Link'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-muted-foreground">
              Remember your password? 
            </span>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate('/auth')}
              className="text-orange-500 hover:text-orange-600 p-0 font-semibold ml-1"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

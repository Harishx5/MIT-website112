
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignUpConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationStatus, setConfirmationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        console.log('Starting email confirmation process...');
        
        // Get the current session to check if user is already logged in
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session && session.user) {
          console.log('User is already logged in:', session.user);
          
          // Check if the user's email is confirmed
          if (session.user.email_confirmed_at) {
            console.log('Email already confirmed, redirecting to home...');
            setConfirmationStatus('success');
            
            toast({
              title: "Welcome to Marzelet!",
              description: "Your email has been confirmed and you're now logged in.",
            });

            // Redirect to home page after a short delay
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            console.log('Email not yet confirmed, waiting for confirmation...');
            // The email confirmation might still be processing
            // We'll wait and check again
            setTimeout(handleEmailConfirmation, 1000);
          }
        } else {
          console.log('No session found, checking URL parameters...');
          
          // Check if there are any auth-related URL parameters
          const error = searchParams.get('error');
          const errorDescription = searchParams.get('error_description');
          
          if (error) {
            console.error('URL error:', error, errorDescription);
            setConfirmationStatus('error');
            setErrorMessage(errorDescription || error);
            return;
          }

          // If there's an access_token or refresh_token in the URL, 
          // it means the email confirmation was successful
          const accessToken = searchParams.get('access_token');
          const refreshToken = searchParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('Tokens found in URL, setting session...');
            
            const { data, error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (setSessionError) {
              console.error('Set session error:', setSessionError);
              throw setSessionError;
            }

            if (data.user) {
              console.log('Session set successfully, user logged in:', data.user);
              setConfirmationStatus('success');
              
              toast({
                title: "Email Confirmed Successfully!",
                description: "Welcome to Marzelet! You're now logged in.",
              });

              // Redirect to home page after a short delay
              setTimeout(() => {
                navigate('/');
              }, 2000);
            }
          } else {
            // No tokens in URL, might be a direct visit to the confirmation page
            console.log('No tokens in URL, checking for existing session...');
            
            // Wait a bit and try again in case the confirmation is still processing
            setTimeout(handleEmailConfirmation, 1000);
          }
        }
      } catch (error: any) {
        console.error('Email confirmation error:', error);
        setConfirmationStatus('error');
        setErrorMessage(error.message || 'An unexpected error occurred during email confirmation.');
        
        toast({
          title: "Confirmation Failed",
          description: error.message || "There was an error confirming your email. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          console.log('User signed in with confirmed email');
          setConfirmationStatus('success');
          
          toast({
            title: "Welcome to Marzelet!",
            description: "Your email has been confirmed and you're now logged in.",
          });

          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
    );

    // Start the confirmation process
    handleEmailConfirmation();

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [searchParams, navigate, toast]);

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
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Marzelet Info Technology
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-md">
            Welcome to the future of technology solutions
          </p>
        </div>
      </div>

      {/* Right side - Confirmation status */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-12">
        <div className="max-w-md mx-auto w-full text-center">
          {confirmationStatus === 'loading' && (
            <div className="space-y-6">
              <Loader2 className="w-16 h-16 text-orange-500 mx-auto animate-spin" />
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Confirming Your Email
                </h2>
                <p className="text-slate-600">
                  Please wait while we verify your email address...
                </p>
              </div>
            </div>
          )}

          {confirmationStatus === 'success' && (
            <div className="space-y-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Email Confirmed!
                </h2>
                <p className="text-slate-600 mb-4">
                  Your email has been successfully verified and you're now logged in.
                </p>
                <p className="text-sm text-slate-500">
                  Redirecting you to the home page...
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            </div>
          )}

          {confirmationStatus === 'error' && (
            <div className="space-y-6">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Confirmation Failed
                </h2>
                <p className="text-slate-600 mb-4">
                  {errorMessage || 'There was an error confirming your email address.'}
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/auth/signup')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Try Signing Up Again
                  </Button>
                  <Button
                    onClick={() => navigate('/auth/signin')}
                    variant="outline"
                    className="w-full"
                  >
                    Sign In Instead
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="w-full text-slate-600 hover:text-slate-900"
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;


import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const ADMIN_EMAILS = [
  'gowthamj0055@gmail.com',
  'marzeletinfotechnology@gmail.com',
  'harishkanna068@gmail.com',
  'info@marzelet.info',
];

const isAdminEmail = (email: string | undefined | null) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());

export const useAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsAdmin(isAdminEmail(session.user.email));
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(isAdminEmail(session.user.email));
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAdmin, loading };
};

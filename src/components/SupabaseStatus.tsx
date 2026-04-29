
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SupabaseStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        if (error) {
          setError(error.message);
          setIsConnected(false);
        } else {
          setIsConnected(true);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  const getStatusIcon = () => {
    if (isConnected === null) return <Loader2 className="h-4 w-4 animate-spin" />;
    return isConnected ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = () => {
    if (isConnected === null) return <Badge variant="secondary">Checking...</Badge>;
    return isConnected ? <Badge variant="default" className="bg-green-500">Connected</Badge> : <Badge variant="destructive">Disconnected</Badge>;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Supabase Status</CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <CardDescription>Database Connection</CardDescription>
          {getStatusBadge()}
        </div>
        {error && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded">
            Error: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseStatus;

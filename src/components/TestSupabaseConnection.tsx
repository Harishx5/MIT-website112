import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const TestSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [tableCount, setTableCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection by querying system tables
        const { data, error } = await supabase
          .from('blogs')
          .select('count')
          .limit(1);
        
        if (error) {
          setError(error.message);
          setIsConnected(false);
        } else {
          setIsConnected(true);
          
          // Get table count
          const { count } = await supabase
            .from('blogs')
            .select('*', { count: 'exact', head: true });
          
          setTableCount(count || 0);
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
    if (isConnected === null) return <Badge variant="secondary">Testing...</Badge>;
    return isConnected ? <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge> : <Badge variant="destructive">Disconnected</Badge>;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Supabase Integration Status</CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <CardDescription>Database Connection</CardDescription>
          {getStatusBadge()}
        </div>
        
        {isConnected && tableCount !== null && (
          <div className="flex items-center justify-between">
            <CardDescription>Blog Posts Count</CardDescription>
            <Badge variant="outline">{tableCount}</Badge>
          </div>
        )}
        
        {error && (
          <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/50 p-2 rounded border">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {isConnected && (
          <div className="text-xs text-green-600 bg-green-50 dark:bg-green-950/50 p-2 rounded border">
            ✅ Supabase integration is working correctly!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestSupabaseConnection;
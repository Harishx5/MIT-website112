import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export default function ConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    try {
      const { data, error } = await supabase.from('blogs').select('count').limit(1);
      if (error) throw error;
      setStatus('success');
      setMessage('✅ Supabase connection working perfectly!');
    } catch (err) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Supabase Connection Test</h3>
      <div className="space-y-4">
        <div className={`p-3 rounded ${
          status === 'success' ? 'bg-green-100 text-green-800' :
          status === 'error' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {message || 'Testing connection...'}
        </div>
        <Button onClick={testConnection} disabled={status === 'testing'}>
          Test Again
        </Button>
      </div>
    </div>
  );
}
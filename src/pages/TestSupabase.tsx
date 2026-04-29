import TestSupabaseConnection from '@/components/TestSupabaseConnection';

const TestSupabase = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Supabase Connection Test</h1>
      <TestSupabaseConnection />
    </div>
  );
};

export default TestSupabase;
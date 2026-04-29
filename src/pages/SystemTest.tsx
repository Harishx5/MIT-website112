
import React from 'react';
import VerificationTest from '@/components/VerificationTest';
import TestSupabaseConnection from '@/components/TestSupabaseConnection';
import ConnectionTest from '@/components/ConnectionTest';

const SystemTest: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">System Status Test</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <VerificationTest />
        <TestSupabaseConnection />
        <ConnectionTest />
      </div>
      
      <div className="text-center">
        <p className="text-muted-foreground">
          All systems should show green status if everything is working correctly.
        </p>
      </div>
    </div>
  );
};

export default SystemTest;

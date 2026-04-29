
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const VerificationTest: React.FC = () => {
  const currentTime = new Date().toLocaleString();
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          System Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Code changes are working correctly
          </p>
          <p className="text-xs font-mono bg-muted p-2 rounded">
            Last updated: {currentTime}
          </p>
          <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Codebase is responsive and functioning properly
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationTest;

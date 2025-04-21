'use client';

import { useState } from 'react';
import { testSheetsConnection } from '@/lib/sheets-service';

export default function TestSheetsPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await testSheetsConnection();
      setTestResult(result ? 'Connection successful!' : 'Connection failed');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error testing connection:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Google Sheets Integration Test</h1>
      
      <button 
        onClick={handleTestConnection} 
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Google Sheets Connection'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h2 className="font-semibold">Test Result:</h2>
          <p>{testResult}</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
          <h2 className="font-semibold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Troubleshooting Tips:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Verify your Google Spreadsheet ID is correct</li>
          <li>Make sure your service account email has edit access to the spreadsheet</li>
          <li>Check that your private key is properly formatted in .env.local</li>
          <li>Look at server logs (in the terminal) for more detailed error messages</li>
        </ul>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResponseData {
  // Define a comprehensive structure based on your survey data
  [key: string]: any;
}

export default function ResponseViewer() {
  const searchParams = useSearchParams();
  const responseId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!responseId) {
      setError('No response ID provided.');
      setLoading(false);
      return;
    }

    const fetchResponse = async () => {
      try {
        setLoading(true);
        const responseRef = doc(db, 'responses', responseId);
        const docSnap = await getDoc(responseRef);

        if (docSnap.exists()) {
          setResponse(docSnap.data() as ResponseData);
        } else {
          setError('Response not found.');
        }
      } catch (err) {
        console.error('Error fetching response:', err);
        setError('Failed to fetch response data.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading response...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Survey Response: {responseId}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <pre className="p-4 bg-gray-700/50 rounded-lg overflow-x-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <p>No data available for this response.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface ResponseData {
  user_info: {
    completion_status: string;
    last_updated: string;
    completion_time?: number;
  };
  // Add other fields as necessary
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalResponses, setTotalResponses] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [responsesToday, setResponsesToday] = useState(0);
  const [averageCompletionTime, setAverageCompletionTime] = useState(0);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const router = useRouter();

  // Helper functions
  const calculateCompletionRate = (responses: ResponseData[]) => {
    const completedResponses = responses.filter(response => response.user_info.completion_status === 'completed');
    console.log('Completed Responses:', completedResponses);
    return (completedResponses.length / responses.length) * 100 || 0;
  };

  const calculateResponsesToday = (responses: ResponseData[]) => {
    const today = new Date();
    return responses.filter(response => {
        const responseDate = new Date(response.user_info.last_updated);
        return responseDate.getDate() === today.getDate() && 
               responseDate.getMonth() === today.getMonth() && 
               responseDate.getFullYear() === today.getFullYear();
    }).length;
  };

  const calculateAverageCompletionTime = (responses: ResponseData[]) => {
    const totalCompletionTime = responses.reduce((total: number, response: ResponseData) => {
        return total + (response.user_info.completion_time || 0);
    }, 0);
    return (totalCompletionTime / responses.length) || 0;
  };

  const fetchData = useCallback(async () => {
    try {
      const responsesCollection = collection(db, 'responses');
      const responseSnapshot = await getDocs(responsesCollection);
      const responsesData = responseSnapshot.docs.map(doc => doc.data() as ResponseData);
      console.log('Fetched Responses:', responsesData);
      setTotalResponses(responsesData.length);
      setCompletionRate(calculateCompletionRate(responsesData));
      setResponsesToday(calculateResponsesToday(responsesData));
      setAverageCompletionTime(calculateAverageCompletionTime(responsesData));
      setResponses(responsesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [calculateCompletionRate, calculateResponsesToday, calculateAverageCompletionTime]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin-view/login');
      } else {
        fetchData();
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kreo Gamer Survey Dashboard</h1>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => router.push('/admin-view/')}>Back to Admin View</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalResponses}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{completionRate}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Responses Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{responsesToday}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Average Completion Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{averageCompletionTime}m</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-none">
          <CardHeader>
            <CardTitle>Survey Responses</CardTitle>
          </CardHeader>
          <CardContent>
            {responses.length > 0 ? (
              responses.map((response, index) => (
                <p key={index} className="text-gray-400">{JSON.stringify(response)}</p>
              ))
            ) : (
              <p className="text-gray-400">No responses yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
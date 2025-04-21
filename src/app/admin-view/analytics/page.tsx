'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResponseData {
  user_info: {
    completion_status: string;
    last_updated: string;
    completion_time?: number;
  };
  question1: number; // Example question field
  question2: number; // Example question field
  question3: number; // Example question field
  // Add other fields as necessary
}

export default function Analytics() {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const responsesCollection = collection(db, 'responses');
      const responseSnapshot = await getDocs(responsesCollection);
      const responsesList = responseSnapshot.docs.map(doc => doc.data() as ResponseData);
      setResponses(responsesList);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const processDataForChart = (question: keyof ResponseData) => {
    const labels = responses.map((_, index) => `Response ${index + 1}`);
    const data = responses.map(response => response[question] || 0);

    return {
      labels,
      datasets: [{
        label: question,
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }],
    };
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Survey Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['question1', 'question2', 'question3'].map((question) => (
          <Card className="bg-gray-700 border-none" key={question}>
            <CardHeader>
              <CardTitle className="text-lg">{question}</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={processDataForChart(question as keyof ResponseData)} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
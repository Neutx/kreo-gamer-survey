"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type for Firestore timestamp
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface ResponseData {
  user_info: {
    completion_status: string;
    last_updated: string | FirestoreTimestamp;
    completion_time?: number;
    completion_percentage?: number;
    current_section?: string;
    email?: string;
    session_id?: string;
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
  const [filteredResponses, setFilteredResponses] = useState<ResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const router = useRouter();

  // Helper functions
  const calculateCompletionRate = (responses: ResponseData[]) => {
    const completedResponses = responses.filter(response => 
      response.user_info.completion_status === 'completed' || 
      (response.user_info.completion_percentage === 100)
    );
    console.log('Completed Responses:', completedResponses);
    return (completedResponses.length / responses.length) * 100 || 0;
  };

  const calculateResponsesToday = (responses: ResponseData[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return responses.filter(response => {
        // Convert Firestore timestamp to Date if needed
        let responseDate;
        if (typeof response.user_info.last_updated === 'string') {
          responseDate = new Date(response.user_info.last_updated);
        } else if (response.user_info.last_updated && 'seconds' in response.user_info.last_updated) {
          const timestamp = response.user_info.last_updated as FirestoreTimestamp;
          responseDate = new Date(timestamp.seconds * 1000);
        } else {
          return false;
        }
        
        const responseDateOnly = new Date(responseDate);
        responseDateOnly.setHours(0, 0, 0, 0);
        return responseDateOnly.getTime() === today.getTime();
    }).length;
  };

  const calculateAverageCompletionTime = (responses: ResponseData[]) => {
    const completedResponses = responses.filter(response => 
      response.user_info.completion_status === 'completed' || 
      response.user_info.completion_percentage === 100
    );
    
    const totalCompletionTime = completedResponses.reduce((total: number, response: ResponseData) => {
        return total + (response.user_info.completion_time || 0);
    }, 0);
    
    return completedResponses.length > 0 ? Math.round(totalCompletionTime / completedResponses.length) : 0;
  };

  // Format the date properly from Firestore timestamp or string
  const formatDate = (timestamp: FirestoreTimestamp | string | undefined): string => {
    if (!timestamp) return 'N/A';
    
    try {
      let date;
      if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      } else if ('seconds' in timestamp) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        return 'Invalid Date';
      }
      
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const responsesCollection = collection(db, 'responses');
      const responseSnapshot = await getDocs(responsesCollection);
      const responsesData = responseSnapshot.docs.map(doc => {
        const data = doc.data() as ResponseData;
        const id = doc.id;
        
        // Ensure responses with 100% progress are marked as completed
        if (data.user_info && data.user_info.completion_percentage === 100 && data.user_info.completion_status !== 'completed') {
          data.user_info.completion_status = 'completed';
        }
        
        // Add document ID to the data
        return { ...data, id };
      });
      
      console.log('Fetched Responses:', responsesData);
      setTotalResponses(responsesData.length);
      setCompletionRate(calculateCompletionRate(responsesData));
      setResponsesToday(calculateResponsesToday(responsesData));
      setAverageCompletionTime(calculateAverageCompletionTime(responsesData));
      setResponses(responsesData);
      setFilteredResponses(responsesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  // Handle deleting a response
  const handleDelete = async (responseId: string | undefined) => {
    if (!responseId) return;
    
    if (window.confirm('Are you sure you want to delete this response? This action cannot be undone.')) {
      try {
        const responseRef = doc(db, 'responses', responseId);
        await deleteDoc(responseRef);
        await fetchData(); // Refresh data after delete
      } catch (error) {
        console.error('Error deleting response:', error);
      }
    }
  };

  // Filter responses based on search term and status
  useEffect(() => {
    let filtered = [...responses];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(response => {
        const email = response.user_info?.email?.toLowerCase() || '';
        const sessionId = response.user_info?.session_id?.toLowerCase() || '';
        const section = response.user_info?.current_section?.toLowerCase() || '';
        
        return email.includes(term) || sessionId.includes(term) || section.includes(term);
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(response => 
        statusFilter === 'completed' 
          ? response.user_info.completion_status === 'completed' || response.user_info.completion_percentage === 100
          : response.user_info.completion_status !== 'completed' && response.user_info.completion_percentage !== 100
      );
    }
    
    setFilteredResponses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, responses]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin-view/login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [router, fetchData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResponses = filteredResponses.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            How India Games Dashboard
          </h1>
          <div className="flex space-x-4">
            <Button 
              onClick={() => auth.signOut().then(() => router.push('/admin-view/login'))}
              variant="destructive"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{totalResponses}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{Math.round(completionRate)}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Responses Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{responsesToday}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">Avg. Completion Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{averageCompletionTime} min</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Survey Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <Input
                  placeholder="Search by email or section..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="w-full md:w-1/4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/4">
                <Button 
                  onClick={() => fetchData()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Refresh Data
                </Button>
              </div>
            </div>
            
            {filteredResponses.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-2 text-left font-medium text-gray-300">Email/ID</th>
                        <th className="py-2 text-left font-medium text-gray-300">Submitted</th>
                        <th className="py-2 text-left font-medium text-gray-300">Status</th>
                        <th className="py-2 text-left font-medium text-gray-300">Progress</th>
                        <th className="py-2 text-left font-medium text-gray-300">Current Section</th>
                        <th className="py-2 text-left font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedResponses.map((response: ResponseData & { id?: string }, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                          <td className="py-3 text-gray-200">
                            {response.user_info?.email || response.user_info?.session_id || `Response ${index + 1}`}
                          </td>
                          <td className="py-3 text-gray-200">
                            {formatDate(response.user_info?.last_updated)}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              response.user_info?.completion_status === 'completed' || response.user_info?.completion_percentage === 100
                                ? 'bg-green-600/30 text-green-400'
                                : 'bg-yellow-600/30 text-yellow-400'
                            }`}>
                              {response.user_info?.completion_status === 'completed' || response.user_info?.completion_percentage === 100 
                                ? 'Completed' 
                                : 'In Progress'}
                            </span>
                          </td>
                          <td className="py-3 text-gray-200">{response.user_info?.completion_percentage || 0}%</td>
                          <td className="py-3 text-gray-200">
                            {response.user_info?.current_section 
                              ? response.user_info.current_section.replace(/_/g, ' ').replace(/^\w/, (c: string) => c.toUpperCase())
                              : 'Unknown'}
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-blue-400 border-blue-400 hover:bg-blue-900/20"
                                onClick={() => window.open(`/admin-view/response?id=${response.id}`, '_blank')}
                              >
                                View
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDelete(response.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-400">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredResponses.length)} of {filteredResponses.length} responses
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button 
                            key={i}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={currentPage === pageNum ? "bg-purple-600" : ""}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-400 text-xl">No matching responses found.</p>
                {searchTerm || statusFilter !== 'all' ? (
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    variant="link"
                    className="text-purple-400 mt-2"
                  >
                    Clear filters
                  </Button>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
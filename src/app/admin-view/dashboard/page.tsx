'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SurveyData } from '@/types/survey';
import { FileDown } from 'lucide-react';

// Define types for conditional sections
type ConditionalSectionData = Record<string, string | string[] | number | boolean | null>;

// Define a more specific index signature type
type ResponseValue = string | number | boolean | null | string[] | Timestamp | Record<string, unknown>;

// Update the ResponseData interface
interface ResponseData {
  id: string;
  user_info: {
    email?: string;
    session_id: string;
    start_time: Timestamp;
    last_updated: Timestamp;
    completion_status: string;
    completion_percentage: number;
    current_section: string;
    completion_time?: Timestamp;
  };
  demographics?: Partial<SurveyData['demographics']>;
  demographics_under18?: ConditionalSectionData;
  demographics_18to24?: ConditionalSectionData;
  demographics_25plus?: ConditionalSectionData;
  gaming_preferences?: Partial<SurveyData['gaming_preferences']>;
  gaming_habits?: Partial<SurveyData['gaming_habits']>;
  gaming_lifestyle?: Partial<SurveyData['gaming_lifestyle']>;
  gaming_family_under18_male?: Partial<SurveyData['gaming_family_under18_male']>;
  gaming_family_under18_female?: Partial<SurveyData['gaming_family_under18_female']>;
  gaming_family_18to24_male?: Partial<SurveyData['gaming_family_18to24_male']>;
  gaming_family_18to24_female?: Partial<SurveyData['gaming_family_18to24_female']>;
  gaming_family_25plus_male?: Partial<SurveyData['gaming_family_25plus_male']>;
  gaming_family_25plus_female?: Partial<SurveyData['gaming_family_25plus_female']>;
  future_gaming?: Partial<SurveyData['future_gaming']>;
  [key: string]: ResponseValue | undefined; // Replace any with more specific union type
}

export default function Dashboard() {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<ResponseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const responsesCollection = collection(db, 'responses');
      const responsesSnapshot = await getDocs(responsesCollection);
      
      const responsesList = responsesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResponseData[];
      
      // Sort by last updated timestamp, newest first
      responsesList.sort((a, b) => {
        return b.user_info.last_updated.toMillis() - a.user_info.last_updated.toMillis();
      });
      
      setResponses(responsesList);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResponse = async (response: ResponseData) => {
    setLoading(true);
    try {
      // Fetch the complete response to ensure all data is available
      const responseDoc = await getDoc(doc(db, 'responses', response.id));
      if (responseDoc.exists()) {
        const fullResponse = {
          id: responseDoc.id,
          ...responseDoc.data()
        } as ResponseData;
        
        // Log the response to help with debugging
        console.log('Full response data:', fullResponse);
        
        setSelectedResponse(fullResponse);
        setIsDialogOpen(true);
      } else {
        console.warn('Response document not found, using limited data');
        setSelectedResponse(response);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching complete response:', error);
      // Fallback to using the existing response data
      setSelectedResponse(response);
      setIsDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResponse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this response? This action cannot be undone.')) {
      return;
    }
    
    setDeleteLoading(id);
    try {
      await deleteDoc(doc(db, 'responses', id));
      setResponses(responses.filter(response => response.id !== id));
    } catch (error) {
      console.error('Error deleting response:', error);
      alert('Failed to delete response. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.toMillis()).toLocaleString();
  };

  const formatSectionName = (section: string) => {
    return section
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Fix the flattenObject function
  const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
    return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
      const prefixedKey = prefix ? `${prefix}_${key}` : key;
      
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !(obj[key] instanceof Timestamp)) {
        Object.assign(acc, flattenObject(obj[key] as Record<string, unknown>, prefixedKey));
      } else if (obj[key] instanceof Timestamp) {
        acc[prefixedKey] = formatDate(obj[key] as Timestamp);
      } else if (Array.isArray(obj[key])) {
        acc[prefixedKey] = (obj[key] as unknown[]).join(', ');
      } else {
        acc[prefixedKey] = String(obj[key] ?? '');
      }
      
      return acc;
    }, {} as Record<string, string>);
  };

  // Improved CSV export function to ensure all data is included
  const exportToCSV = async () => {
    setExportLoading(true);
    try {
      // Ensure we have the latest data with a fresh fetch
      const responsesCollection = collection(db, 'responses');
      const responsesSnapshot = await getDocs(responsesCollection);
      
      const fullResponsesList = await Promise.all(
        responsesSnapshot.docs.map(async (docSnapshot) => {
          // Get the full document for each response
          const fullDoc = await getDoc(doc(db, 'responses', docSnapshot.id));
          return {
            id: docSnapshot.id,
            ...fullDoc.data()
          } as ResponseData;
        })
      );
      
      // Create CSV header
      const headers = new Set<string>();
      const flattenedResponses = fullResponsesList.map(response => {
        const flat = flattenObject(response);
        Object.keys(flat).forEach(key => headers.add(key));
        return flat;
      });
      
      const headerRow = Array.from(headers).join(',');
      const csvRows = [headerRow];
      
      // Add data rows
      flattenedResponses.forEach(response => {
        const row = Array.from(headers).map(header => {
          const value = response[header] !== undefined ? response[header] : '';
          // Wrap values in quotes and escape any quotes inside the value
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',');
        csvRows.push(row);
      });
      
      // Combine rows into a single CSV string
      const csvString = csvRows.join('\n');
      
      // Create a download link and trigger the download
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `kreo_survey_responses_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export responses. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Export Survey Data</h3>
              <p className="text-gray-400">Download all survey responses in CSV format for analysis</p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              onClick={exportToCSV}
              disabled={exportLoading || loading || responses.length === 0}
            >
              <FileDown size={18} />
              {exportLoading ? 'Exporting...' : 'Export All Responses (CSV)'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Survey Responses</CardTitle>
            <CardDescription className="text-gray-400">
              View and manage all survey submissions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : responses.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No responses found. When users complete the survey, their responses will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Submitted</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Progress</TableHead>
                    <TableHead className="text-gray-300">Current Section</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow 
                      key={response.id} 
                      className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => handleViewResponse(response)}
                    >
                      <TableCell className="font-medium text-gray-200">
                        {response.demographics?.email || response.user_info.email || 'Anonymous'}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(response.user_info.last_updated)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          response.user_info.completion_status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {response.user_info.completion_status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {response.user_info.completion_percentage}%
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatSectionName(response.user_info.current_section || '')}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewResponse(response);
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          disabled={deleteLoading === response.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteResponse(response.id);
                          }}
                        >
                          {deleteLoading === response.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Response Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Submitted on {formatDate(selectedResponse?.user_info.last_updated)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResponse && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Email:</span>{' '}
                  <span className="text-white">{selectedResponse.demographics?.email || selectedResponse.user_info.email || 'Anonymous'}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Status:</span>{' '}
                  <span className={selectedResponse.user_info.completion_status === 'completed' ? 'text-green-400' : 'text-amber-400'}>
                    {selectedResponse.user_info.completion_status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Started:</span>{' '}
                  <span className="text-white">{formatDate(selectedResponse.user_info.start_time)}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Last Updated:</span>{' '}
                  <span className="text-white">{formatDate(selectedResponse.user_info.last_updated)}</span>
                </div>
                {selectedResponse.user_info.completion_time && (
                  <div className="bg-gray-800 p-3 rounded-md">
                    <span className="text-gray-400">Completed:</span>{' '}
                    <span className="text-white">{formatDate(selectedResponse.user_info.completion_time)}</span>
                  </div>
                )}
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Progress:</span>{' '}
                  <span className="text-white">{selectedResponse.user_info.completion_percentage}%</span>
                </div>
              </div>

              {/* Function to render any section */}
              {Object.entries(selectedResponse).map(([sectionKey, sectionData]) => {
                // Skip non-section data
                if (sectionKey === 'id' || sectionKey === 'user_info') {
                  return null;
                }
                
                // Skip empty sections
                if (!sectionData || typeof sectionData !== 'object' || Object.keys(sectionData).length === 0) {
                  return null;
                }
                
                // Format section title
                const sectionTitle = formatSectionName(sectionKey);
                
                return (
                  <div key={sectionKey} className="border border-gray-800 rounded-md p-4">
                    <h3 className="text-lg font-medium text-purple-400 mb-3">{sectionTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(sectionData).map(([key, value]) => (
                        <div key={`${sectionKey}-${key}`} className="bg-gray-800/50 p-3 rounded-md">
                          <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                          <span className="text-white">
                            {Array.isArray(value) 
                              ? value.join(', ') 
                              : typeof value === 'object' && value !== null
                                ? JSON.stringify(value)
                                : String(value)
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 
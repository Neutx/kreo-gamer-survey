"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { findSpamSubmissions, deleteSpamSubmissions, getSpamStats } from '@/lib/cleanup-spam';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Inline alert components with proper TypeScript types
const Alert = ({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "destructive";
}) => (
  <div
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4",
      variant === "destructive" ? "border-red-400 bg-red-50" : "bg-green-50 border-green-200",
      className
    )}
    {...props}
  />
);

const AlertTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={cn("mb-1 font-medium leading-none", className)}
    {...props}
  />
);

const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-sm", className)}
    {...props}
  />
);

export default function SpamManagement() {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [spamIds, setSpamIds] = useState<string[]>([]);
  const [stats, setStats] = useState<{
    totalSubmissions: number;
    spamSubmissions: number;
    spamPercentage: number;
  }>({
    totalSubmissions: 0,
    spamSubmissions: 0,
    spamPercentage: 0,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin-view/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Load spam data
  useEffect(() => {
    loadSpamData();
  }, []);

  const loadSpamData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get spam entries
      const ids = await findSpamSubmissions();
      setSpamIds(ids);
      
      // Get stats
      const spamStats = await getSpamStats();
      setStats(spamStats);
      
    } catch (err) {
      setError('Failed to load spam data. Please try again.');
      console.error('Error loading spam data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSpamData();
    setRefreshing(false);
  };

  const handleDeleteSpam = async () => {
    try {
      setDeleting(true);
      setError(null);
      setSuccess(null);
      
      const deletedCount = await deleteSpamSubmissions();
      
      if (deletedCount > 0) {
        setSuccess(`Successfully deleted ${deletedCount} spam submissions.`);
      } else {
        setSuccess('No spam submissions found to delete.');
      }
      
      // Refresh data
      await loadSpamData();
      
    } catch (err) {
      setError('Failed to delete spam submissions. Please try again.');
      console.error('Error deleting spam:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Spam Management</h1>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="flex items-center gap-2"
        >
          {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh Data
        </Button>
      </div>

      {success && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Spam Overview</CardTitle>
          <CardDescription>Summary of spam submissions in the database</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Total Submissions</h3>
                <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Spam Submissions</h3>
                <p className="text-3xl font-bold text-red-600">{stats.spamSubmissions}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Spam Percentage</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.spamPercentage.toFixed(1)}%</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spam Cleanup</CardTitle>
          <CardDescription>Remove all spam submissions from the database</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {spamIds.length > 0 
              ? `Found ${spamIds.length} spam submissions. These can be deleted to clean up your database.` 
              : 'No spam submissions found.'}
          </p>
          
          <Button 
            variant="destructive" 
            onClick={handleDeleteSpam}
            disabled={deleting || loading || spamIds.length === 0}
            className="flex items-center gap-2"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete All Spam ({spamIds.length})
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spam Detection Criteria</CardTitle>
          <CardDescription>Current rules for detecting spam submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email pattern: <code>divyansh.b20pubgg+entry[numbers]@gmail.com</code></li>
            <li>Email pattern: <code>sayen@gmail.com</code></li>
            <li>Email pattern: <code>bhadrakshb+[numbers]@gmail.com</code></li>
            <li>IGN &quot;Sam&quot; combined with email containing &quot;divyansh.b20pubgg+entry&quot;</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 
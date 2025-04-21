'use client';

import React, { useEffect, useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Button } from '@/components/ui/button';

// Constants
const LOCAL_STORAGE_KEYS = {
  LEFT_PAGE: 'survey_left_page',
  FIRST_TIME: 'survey_first_time',
};

export default function ResumePrompt() {
  const { responses, currentSection, resetSurvey, forceSave } = useSurvey();
  const [showPrompt, setShowPrompt] = useState(false);
  const hasResponses = Object.keys(responses).length > 0;
  const isFirstSection = currentSection === 'demographics';

  useEffect(() => {
    // Don't show prompt on first section or if this is the first time loading the survey
    if (isFirstSection) {
      return;
    }

    // Check if user is returning to the page (after a refresh/closing/etc)
    const isReturningUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LEFT_PAGE) === 'true';
    const isFirstTime = localStorage.getItem(LOCAL_STORAGE_KEYS.FIRST_TIME) !== 'false';
    
    // On first visit, set the first time flag to false
    if (isFirstTime) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FIRST_TIME, 'false');
      return;
    }
    
    if (isReturningUser && hasResponses && !isFirstSection) {
      setShowPrompt(true);
      // Reset the flag
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LEFT_PAGE);
    }
  }, [hasResponses, isFirstSection]);

  // Add page leave detection
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only set the LEFT_PAGE flag for actual page unloads (refresh, close, navigate away)
      if (event.type === 'beforeunload' && hasResponses) {
        // This saves a flag that the user left the page with data
        localStorage.setItem(LOCAL_STORAGE_KEYS.LEFT_PAGE, 'true');
        // Force save the current state
        forceSave();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasResponses, forceSave]);

  // Handle "Start Over" click
  const handleStartOver = () => {
    resetSurvey();
    setShowPrompt(false);
    // Force page reload to ensure clean state
    window.location.reload();
  };

  // Don't show in first section or if flag not set
  if (!showPrompt || isFirstSection) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-amber-100 border-b border-amber-300 p-3 pt-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
        <div className="w-full sm:w-auto">
          <h3 className="font-medium text-lg">Welcome back!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We&apos;ve restored your previous progress. You left off at the{' '}
            <span className="font-medium">
              {currentSection.replace('_', ' ')}
            </span>{' '}
            section.
          </p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleStartOver}
            className="flex-1 sm:flex-none"
          >
            Start Over
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowPrompt(false)}
            className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
} 
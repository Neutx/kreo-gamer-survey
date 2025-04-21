'use client';

import React from 'react';
import { useSurvey } from '@/context/SurveyContext';

export default function SavingIndicator() {
  const { isSaving, lastSaved } = useSurvey();
  
  if (!lastSaved && !isSaving) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-md shadow-md px-3 py-2 text-sm">
      {isSaving ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Saving...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-600">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Saved {lastSaved && new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }).format(lastSaved)}
          </span>
        </div>
      )}
    </div>
  );
} 
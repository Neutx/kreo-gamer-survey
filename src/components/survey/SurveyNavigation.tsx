'use client';

import React from 'react';
import { useSurvey } from '@/context/SurveyContext';

export default function SurveyNavigation() {
  const { goToNextSection, goToPreviousSection, currentSection, isLastSection } = useSurvey();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // Add any async validation here if needed
      goToNextSection();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={goToPreviousSection}
        disabled={currentSection === 'demographics' || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous Level
      </button>
      <button
        onClick={handleNext}
        disabled={isLoading || isLastSection}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastSection ? 'Submit' : 'Level Up!'}
      </button>
    </div>
  );
} 

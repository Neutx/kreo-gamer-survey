'use client';

import React, { useMemo } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Progress } from '@/components/ui/progress';

// Section labels for display in the progress bar
const sectionLabels: Record<string, string> = {
  'demographics': 'Basic Demographics',
  'demographics_under18': 'School Info',
  'demographics_18to24': 'College & Occupation',
  'demographics_25plus': 'Work & Relationships',
  'gaming_preferences': 'Gaming Preferences',
  'gaming_habits': 'Gaming Habits',
  'gaming_lifestyle': 'Gaming Lifestyle',
  'gaming_family_under18_male': 'Gaming & Family',
  'gaming_family_under18_female': 'Gaming & Family',
  'gaming_family_18to24_male': 'Gaming & Social Life',
  'gaming_family_18to24_female': 'Gaming & Social Life',
  'gaming_family_25plus_male': 'Gaming & Work-Life',
  'gaming_family_25plus_female': 'Gaming & Life Balance',
  'future_gaming': 'Future of Gaming',
};

// Main display sections (for progress calculation)
const mainSections = [
  'demographics',
  'gaming_preferences',
  'gaming_habits',
  'gaming_lifestyle', 
  'gaming_family',
  'future_gaming'
];

export default function ProgressIndicator() {
  const { currentSection } = useSurvey();

  // Calculate the total number of sections to visit (including the current conditional section)
  const totalSections = useMemo(() => {
    // Base sections + conditional sections (demographic and family)
    return mainSections.length + 1;
  }, []);
  
  // Calculate the current section index (accounting for conditional sections)
  const currentIndex = useMemo(() => {
    // Basic demographics is always first
    if (currentSection === 'demographics') {
      return 0;
    }
    
    // Conditional demographic sections come after basic demographics
    if (currentSection.startsWith('demographics_')) {
      return 1;
    }
    
    // For other main sections, calculate based on position in mainSections
    const mainIndex = mainSections.indexOf(currentSection);
    if (mainIndex > 0) {
      // Add 1 to account for both demographic sections (main + conditional)
      return mainIndex + 1;
    }
    
    // For family sections, they come before future_gaming
    if (currentSection.startsWith('gaming_family_')) {
      // Position is based on the 'gaming_family' entry in mainSections
      const familyIndex = mainSections.indexOf('gaming_family');
      return familyIndex + 1; // Add 1 for demographic section
    }
    
    // Future gaming is the last section
    if (currentSection === 'future_gaming') {
      return totalSections - 1;
    }
    
    return 0;
  }, [currentSection, totalSections]);
  
  // Calculate progress percentage
  const progress = ((currentIndex + 1) / totalSections) * 100;
  
  // Get the display label for the current section
  const currentLabel = sectionLabels[currentSection] || 'Survey';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {totalSections}
          </span>
          <span className="text-sm font-medium">{currentLabel}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
} 
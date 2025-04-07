'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { SurveySection, SurveyData } from '@/types/survey';
import { saveSurveyResponses, markSurveyCompleted } from '@/lib/survey-service';

interface SurveyContextType {
  currentSection: SurveySection;
  responses: Partial<SurveyData>;
  setCurrentSection: (section: SurveySection) => void;
  updateResponses: (sectionId: SurveySection, data: Record<string, unknown>) => void;
  isLastSection: boolean;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  resetSurvey: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
  getDemographicSection: () => SurveySection;
  getFamilySection: () => SurveySection;
  forceSave: () => void;
}

const LOCAL_STORAGE_KEYS = {
  RESPONSES: 'kreo_survey_responses',
  CURRENT_SECTION: 'kreo_survey_current_section',
  LEFT_PAGE: 'survey_left_page',
  RESPONSE_ID: 'survey_response_id',
  FIRST_TIME: 'survey_first_time',
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<SurveyData>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Ref for tracking user inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Determine the demographic section based on age
  const getDemographicSection = (): SurveySection => {
    const age = responses.demographics?.age;
    if (!age) return 'demographics';
    
    if (age === 'Under 18') return 'demographics_under18';
    if (age === '18-24') return 'demographics_18to24';
    return 'demographics_25plus';
  };
  
  // Determine the family section based on age and gender
  const getFamilySection = (): SurveySection => {
    const age = responses.demographics?.age;
    const gender = responses.demographics?.gender;
    
    if (!age || !gender) {
      console.log('Missing age or gender, using default section');
      return 'gaming_family_under18_male';
    }
    
    console.log('Determining family section for:', { age, gender });
    
    // Check if user is female, otherwise use male/non-binary version
    const isFemale = gender.toLowerCase() === 'female';
    
    if (age === 'Under 18') {
      const section = isFemale ? 'gaming_family_under18_female' : 'gaming_family_under18_male';
      console.log('Selected section for Under 18:', section);
      return section;
    }
    
    if (age === '18-24') {
      const section = isFemale ? 'gaming_family_18to24_female' : 'gaming_family_18to24_male';
      console.log('Selected section for 18-24:', section);
      return section;
    }
    
    const section = isFemale ? 'gaming_family_25plus_female' : 'gaming_family_25plus_male';
    console.log('Selected section for 25+:', section);
    return section;
  };
  
  // Get dynamic section order based on current responses
  const getSectionOrder = (): SurveySection[] => {
    const demographicSection = getDemographicSection();
    const familySection = getFamilySection();
    
    // Define the correct order of sections
    const sectionOrder: SurveySection[] = [
      'demographics',
      demographicSection,
      'gaming_preferences',
      'gaming_habits',
      'gaming_lifestyle',
      familySection,
      'future_gaming',
    ];
    
    console.log('Section order determined:', sectionOrder);
    return sectionOrder;
  };

  // Force save all data immediately to localStorage and Firebase
  const forceSave = useCallback(async () => {
    if (typeof window !== 'undefined' && isInitialized) {
      // Save to localStorage first
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_SECTION, 
        getSectionOrder()[currentSectionIndex]
      );
      localStorage.setItem(LOCAL_STORAGE_KEYS.LEFT_PAGE, 'true');
      
      // Then save to Firebase
      await saveToFirebase();
    }
  }, [responses, currentSectionIndex, isInitialized]);
  
  // Setup page unload/refresh handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Only set the LEFT_PAGE flag for actual page unloads (refresh, close, navigate away)
        // This check helps distinguish between navigation within the app and actual page unloads
        if (event.type === 'beforeunload') {
          // Mark that user left the page
          localStorage.setItem(LOCAL_STORAGE_KEYS.LEFT_PAGE, 'true');
          
          // Force sync save to localStorage
          localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.CURRENT_SECTION, 
            getSectionOrder()[currentSectionIndex]
          );
        }
      };
      
      // Setup listeners for page unload/refresh
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [responses, currentSectionIndex]);
  
  // Load saved data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Check if this is the first time the user is visiting
        if (!localStorage.getItem(LOCAL_STORAGE_KEYS.FIRST_TIME)) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.FIRST_TIME, 'true');
        }
        
        // Load saved responses
        const savedResponses = localStorage.getItem(LOCAL_STORAGE_KEYS.RESPONSES);
        if (savedResponses) {
          setResponses(JSON.parse(savedResponses));
        }

        // Load saved section
        const savedSection = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_SECTION);
        if (savedSection) {
          const sectionIndex = getSectionOrder().indexOf(savedSection as SurveySection);
          if (sectionIndex !== -1) {
            setCurrentSectionIndex(sectionIndex);
          }
        }
      } catch (error) {
        console.error('Error loading saved survey data:', error);
      }
      setIsInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
      
      // Start inactivity timer for auto-save
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      inactivityTimerRef.current = setTimeout(() => {
        saveToFirebase();
      }, 10000); // 10 seconds of inactivity
    }
    
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses, isInitialized]);

  // Save current section to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_SECTION, 
        getSectionOrder()[currentSectionIndex]
      );
      
      // Save to Firebase when section changes
      saveToFirebase();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionIndex, isInitialized]);
  
  // Function to save data to Firebase
  const saveToFirebase = async () => {
    if (Object.keys(responses).length === 0) return;
    
    setIsSaving(true);
    try {
      await saveSurveyResponses(responses, getSectionOrder()[currentSectionIndex]);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const currentSection = getSectionOrder()[currentSectionIndex];
  const isLastSection = currentSectionIndex === getSectionOrder().length - 1;

  const goToNextSection = () => {
    console.log('goToNextSection called');
    const sectionOrder = getSectionOrder();
    const currentSection = sectionOrder[currentSectionIndex];
    console.log('Current section index:', currentSectionIndex);
    console.log('Section order:', sectionOrder);
    console.log('Current section:', currentSection);
    
    if (currentSectionIndex < sectionOrder.length - 1) {
      // If we're on demographics, we need to go to the appropriate next section
      if (currentSection === 'demographics') {
        const demographicSection = getDemographicSection();
        console.log('Going to demographic section:', demographicSection);
        const nextIndex = sectionOrder.indexOf(demographicSection);
        setCurrentSectionIndex(nextIndex);
      } else {
        // Normal progression
        const nextIndex = currentSectionIndex + 1;
        const nextSection = sectionOrder[nextIndex];
        console.log('Going to next section, new index:', nextIndex);
        console.log('Next section:', nextSection);
        setCurrentSectionIndex(nextIndex);
      }
    } else if (currentSectionIndex === sectionOrder.length - 1) {
      // If this is the last section, mark as completed
      console.log('This is the last section, marking as completed');
      const responseId = localStorage.getItem(LOCAL_STORAGE_KEYS.RESPONSE_ID);
      if (responseId) {
        markSurveyCompleted(responseId);
      }
    }
    
    // Force save after navigation
    forceSave();
  };

  const goToPreviousSection = () => {
    const sectionOrder = getSectionOrder();
    if (currentSectionIndex > 0) {
      // If we're in a demographic conditional section, go back to main demographics
      if (['demographics_under18', 'demographics_18to24', 'demographics_25plus'].includes(currentSection)) {
        const demographicsIndex = sectionOrder.indexOf('demographics');
        setCurrentSectionIndex(demographicsIndex);
      } else {
        // Normal progression
        setCurrentSectionIndex(prev => prev - 1);
      }
    }
  };

  const setCurrentSection = (section: SurveySection) => {
    const index = getSectionOrder().indexOf(section);
    if (index !== -1) {
      setCurrentSectionIndex(index);
    }
  };

  const updateResponses = (sectionId: SurveySection, data: Record<string, unknown>) => {
    setResponses(prev => {
      const newResponses = {
        ...prev,
        [sectionId]: data,
      };
      
      if (isInitialized && typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSES, JSON.stringify(newResponses));
      }
      
      return newResponses;
    });
  };
  
  const resetSurvey = () => {
    if (typeof window !== 'undefined') {
      // Clear all survey data from localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEYS.RESPONSES);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_SECTION);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.RESPONSE_ID);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LEFT_PAGE);
      
      // Additional cleanup for any other related keys
      for (const key in localStorage) {
        if (key.startsWith('kreo_') || key.startsWith('survey_')) {
          localStorage.removeItem(key);
        }
      }
    }
    
    // Reset state
    setResponses({});
    setCurrentSectionIndex(0);
    setLastSaved(null);
  };

  return (
    <SurveyContext.Provider
      value={{
        currentSection,
        responses,
        setCurrentSection,
        updateResponses,
        isLastSection,
        goToNextSection,
        goToPreviousSection,
        resetSurvey,
        isSaving,
        lastSaved,
        getDemographicSection,
        getFamilySection,
        forceSave,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
} 
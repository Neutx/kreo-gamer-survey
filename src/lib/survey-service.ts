import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp, 
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { SurveyData, SurveySection } from '@/types/survey';

// Constants for localStorage keys
const LOCAL_STORAGE_KEYS = {
  RESPONSE_ID: 'survey_response_id',
};

// Generate a unique ID for the survey response
const generateResponseId = () => {
  return `response_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Get or create a response ID from localStorage
const getResponseId = () => {
  if (typeof window === 'undefined') return null;
  
  let responseId = localStorage.getItem(LOCAL_STORAGE_KEYS.RESPONSE_ID);
  if (!responseId) {
    responseId = generateResponseId();
    localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSE_ID, responseId);
  }
  return responseId;
};

// Save survey responses to Firestore
export const saveSurveyResponses = async (
  responses: Partial<SurveyData>,
  currentSection: SurveySection
) => {
  try {
    const responseId = getResponseId();
    if (!responseId) return;

    const responseRef = doc(collection(db, 'responses'), responseId);
    
    // Check if document exists
    const docSnap = await getDoc(responseRef);
    
    if (!docSnap.exists()) {
      // Create new document with user info
      await setDoc(responseRef, {
        user_info: {
          session_id: responseId,
          start_time: serverTimestamp(),
          last_updated: serverTimestamp(),
          completion_status: 'in_progress',
          completion_percentage: calculateCompletionPercentage(responses),
          current_section: currentSection
        },
        ...responses
      });
    } else {
      // Update existing document
      await updateDoc(responseRef, {
        ...responses,
        'user_info.last_updated': serverTimestamp(),
        'user_info.completion_percentage': calculateCompletionPercentage(responses),
        'user_info.current_section': currentSection
      });
    }
    
    return responseId;
  } catch (error) {
    // Handle permission errors gracefully - continue with localStorage only
    console.error('Error saving survey responses:', error);
    
    // Don't let Firebase errors disrupt the user experience
    // Just return the ID so the app continues to work with localStorage
    return getResponseId();
  }
};

// Calculate completion percentage based on filled sections
const calculateCompletionPercentage = (responses: Partial<SurveyData>) => {
  const totalSections = 7; // Updated to 7 sections total including family section
  const completedSections = Object.keys(responses).length;
  return Math.round((completedSections / totalSections) * 100);
};

// Mark survey as completed
export const markSurveyCompleted = async (responseId: string) => {
  try {
    const responseRef = doc(collection(db, 'responses'), responseId);
    await updateDoc(responseRef, {
      'user_info.completion_status': 'completed',
      'user_info.completion_percentage': 100,
      'user_info.completion_time': serverTimestamp()
    });
    return true;
  } catch (error) {
    // Handle permission errors gracefully
    console.error('Error marking survey as completed:', error);
    // Don't let Firebase errors disrupt the user experience
    // Just return success so the app continues to work with localStorage
    return true;
  }
}; 
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
import { syncToGoogleSheets } from './sheets-service';

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
    
    // Extract user_info from responses to handle it separately
    const { user_info = {}, ...otherResponses } = responses;
    
    if (!docSnap.exists()) {
      // Create new document with user info
      await setDoc(responseRef, {
        user_info: {
          session_id: responseId,
          start_time: serverTimestamp(),
          last_updated: serverTimestamp(),
          completion_status: 'in_progress',
          completion_percentage: calculateCompletionPercentage(responses),
          current_section: currentSection,
          email: responses.demographics?.email || '',
          // Preserve IP and device info if provided
          ...(user_info.ip_address ? { ip_address: user_info.ip_address } : {}),
          ...(user_info.device_fingerprint ? { device_fingerprint: user_info.device_fingerprint } : {})
        },
        ...otherResponses
      });
    } else {
      // Get existing data to preserve any fields not in the current update
      const existingData = docSnap.data();
      const existingUserInfo = existingData?.user_info || {};
      
      // Update document preserving existing user_info fields
      await updateDoc(responseRef, {
        ...otherResponses,
        'user_info.last_updated': serverTimestamp(),
        'user_info.completion_percentage': calculateCompletionPercentage(responses),
        'user_info.current_section': currentSection,
        'user_info.email': responses.demographics?.email || existingUserInfo.email || '',
        // Preserve IP and device info if provided
        ...(user_info.ip_address ? { 'user_info.ip_address': user_info.ip_address } : 
            existingUserInfo.ip_address ? { 'user_info.ip_address': existingUserInfo.ip_address } : {}),
        ...(user_info.device_fingerprint ? { 'user_info.device_fingerprint': user_info.device_fingerprint } :
            existingUserInfo.device_fingerprint ? { 'user_info.device_fingerprint': existingUserInfo.device_fingerprint } : {})
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
    
    // Get the current response data
    const docSnap = await getDoc(responseRef);
    if (!docSnap.exists()) {
      throw new Error('Response not found');
    }
    
    const responseData = docSnap.data();
    
    // Update the document
    await updateDoc(responseRef, {
      'user_info.completion_status': 'completed',
      'user_info.completion_percentage': 100,
      'user_info.completion_time': serverTimestamp()
    });
    
    // Sync the updated data to Google Sheets
    await syncToGoogleSheets({
      ...responseData,
      user_info: {
        ...responseData.user_info,
        completion_status: 'completed',
        completion_percentage: 100,
      }
    }, responseId);
    
    return true;
  } catch (error) {
    // Handle permission errors gracefully
    console.error('Error marking survey as completed:', error);
    // Don't let Firebase errors disrupt the user experience
    // Just return success so the app continues to work with localStorage
    return true;
  }
}; 
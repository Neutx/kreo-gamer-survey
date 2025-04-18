import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SurveyData } from '@/types/survey';

// The serviceAccountAuth should be created using environment variables
// These should be added to your .env.local file and deployment environment
const createJWT = () => {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

/**
 * Syncs a survey response to Google Sheets
 * @param responseData The survey response data from Firebase
 * @param responseId The Firebase response ID
 */
export const syncToGoogleSheets = async (
  responseData: any,
  responseId: string
) => {
  try {
    // Check if Google Sheets integration is configured
    if (
      !process.env.GOOGLE_SPREADSHEET_ID ||
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      console.warn('Google Sheets integration not configured');
      return;
    }

    const jwt = createJWT();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, jwt);
    
    // Load document properties and sheets
    await doc.loadInfo();
    
    // Access the first sheet
    const sheet = doc.sheetsByIndex[0];
    
    // Prepare the row data
    const rowData = {
      response_id: responseId,
      timestamp: new Date().toISOString(),
      completion_status: responseData.user_info?.completion_status || 'unknown',
      completion_percentage: responseData.user_info?.completion_percentage || 0,
      // Add specific fields from your survey data
      // For example:
      age: responseData.demographics?.age || '',
      gender: responseData.demographics?.gender || '',
      // Add more fields as needed based on your survey structure
    };
    
    // Add a row to the sheet
    await sheet.addRow(rowData);
    
    console.log(`Survey response ${responseId} synced to Google Sheets`);
    return true;
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    // Don't let Google Sheets errors disrupt the user experience
    return false;
  }
}; 
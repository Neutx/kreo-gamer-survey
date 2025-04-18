const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Create a JWT for Google Sheets API authentication
const createJWT = () => {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Function to sync a survey response to Google Sheets
const syncResponseToSheet = async (responseData, responseId) => {
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

    // Initialize the Google Sheets document
    const jwt = createJWT();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, jwt);
    
    // Load document properties and sheets
    await doc.loadInfo();
    
    // Access the first sheet (or create a specific sheet for survey responses)
    const sheet = doc.sheetsByIndex[0];
    
    // Prepare the row data
    // Flatten the nested objects for easier spreadsheet viewing
    const flattenedData = flattenObject(responseData);
    
    // Add metadata
    const rowData = {
      response_id: responseId,
      timestamp: new Date().toISOString(),
      ...flattenedData
    };
    
    // Add a row to the sheet
    await sheet.addRow(rowData);
    
    console.log(`Survey response ${responseId} synced to Google Sheets`);
    return true;
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    return false;
  }
};

// Helper function to flatten nested objects
const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}_` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      // Handle arrays by joining the values
      acc[pre + k] = obj[k].join(', ');
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

// Cloud Function triggered when a survey response is created
exports.onSurveyResponseCreated = onDocumentCreated(
  'responses/{responseId}',
  async (event) => {
    try {
      const responseId = event.params.responseId;
      const responseData = event.data.data();
      
      await syncResponseToSheet(responseData, responseId);
    } catch (error) {
      console.error('Error in onSurveyResponseCreated:', error);
    }
  }
);

// Cloud Function triggered when a survey response is updated
exports.onSurveyResponseUpdated = onDocumentUpdated(
  'responses/{responseId}',
  async (event) => {
    try {
      const responseId = event.params.responseId;
      const responseData = event.data.after.data();
      
      // Only sync completed surveys
      if (responseData.user_info?.completion_status === 'completed') {
        await syncResponseToSheet(responseData, responseId);
      }
    } catch (error) {
      console.error('Error in onSurveyResponseUpdated:', error);
    }
  }
); 
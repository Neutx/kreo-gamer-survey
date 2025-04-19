import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const dynamic = "force-static";

// Create a JWT for Google Sheets API authentication
const createJWT = () => {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Define the standard headers we want to use for our data
const STANDARD_HEADERS = [
  'response_id', 
  'timestamp', 
  'completion_status',
  'completion_percentage',
  'demographics_age',
  'demographics_gender',
  'demographics_location',
  'platform_preferences',
  'gaming_frequency',
  'genre_preferences'
];

// Helper function to flatten nested objects
const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, string | number | boolean> => {
  return Object.keys(obj).reduce((acc: Record<string, string | number | boolean>, k) => {
    const pre = prefix.length ? `${prefix}_` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k] as Record<string, unknown>, pre + k));
    } else if (Array.isArray(obj[k])) {
      // Handle arrays by joining the values
      acc[pre + k] = (obj[k] as unknown[]).join(', ');
    } else {
      acc[pre + k] = obj[k] as string | number | boolean;
    }
    return acc;
  }, {});
};

export async function POST(request: Request) {
  try {
    const { responseData, responseId } = await request.json();

    // Check if Google Sheets integration is configured
    if (
      !process.env.GOOGLE_SPREADSHEET_ID ||
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      return NextResponse.json(
        { error: 'Google Sheets integration not configured' },
        { status: 500 }
      );
    }

    // Initialize the Google Sheets document
    const jwt = createJWT();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, jwt);
    
    // Load document properties and sheets
    await doc.loadInfo();
    
    // Access the first sheet (or create a specific sheet for survey responses)
    const sheet = doc.sheetsByIndex[0];
    
    // Check if the sheet has headers
    await sheet.loadCells('A1:Z1'); // Load the first row to check headers
    const hasHeaders = sheet.getCell(0, 0).value !== null;
    
    // If no headers, set them
    if (!hasHeaders) {
      console.log('No headers found, adding standard headers');
      await sheet.setHeaderRow(STANDARD_HEADERS);
      console.log('Headers added successfully');
    }
    
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
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error syncing to Google Sheets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to sync to Google Sheets', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 
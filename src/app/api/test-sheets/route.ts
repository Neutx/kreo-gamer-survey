import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Create a JWT for Google Sheets API authentication
const createJWT = () => {
  try {
    return new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (error) {
    console.error('Error creating JWT:', error);
    throw error;
  }
};

// Define the standard headers we want to use for our data
const STANDARD_HEADERS = [
  'response_id', 
  'timestamp', 
  'completion_status',
  'completion_percentage',
  'test_message',
  'demographics_age',
  'demographics_gender',
  'demographics_location',
  'platform_preferences',
  'gaming_frequency',
  'genre_preferences'
];

export async function GET() {
  try {
    // Debug environment variables
    const envVars = {
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKeyFirstChars: process.env.GOOGLE_PRIVATE_KEY ? 
        process.env.GOOGLE_PRIVATE_KEY.substring(0, 20) + '...' : undefined,
    };

    console.log('Environment variables:', envVars);

    // Check if Google Sheets integration is configured
    if (
      !process.env.GOOGLE_SPREADSHEET_ID ||
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      return NextResponse.json(
        { 
          error: 'Google Sheets integration not configured',
          configStatus: {
            spreadsheetId: !!process.env.GOOGLE_SPREADSHEET_ID,
            serviceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            privateKey: !!process.env.GOOGLE_PRIVATE_KEY,
          }
        },
        { status: 500 }
      );
    }

    // Initialize the Google Sheets document
    const jwt = createJWT();
    console.log('JWT created successfully');
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, jwt);
    console.log('GoogleSpreadsheet instance created');
    
    // Load document properties and sheets
    await doc.loadInfo();
    console.log('Document info loaded successfully');
    
    // Access the first sheet
    const sheet = doc.sheetsByIndex[0];
    console.log('Sheet accessed successfully', {
      title: sheet.title,
      rowCount: sheet.rowCount,
    });
    
    // Check if the sheet has headers
    await sheet.loadCells('A1:Z1'); // Load the first row to check headers
    const hasHeaders = sheet.getCell(0, 0).value !== null;
    
    // If no headers, set them
    if (!hasHeaders) {
      console.log('No headers found, adding standard headers');
      await sheet.setHeaderRow(STANDARD_HEADERS);
      console.log('Headers added successfully');
    } else {
      console.log('Headers already exist');
    }
    
    // Add a test row
    await sheet.addRow({
      response_id: 'test_' + Date.now(),
      timestamp: new Date().toISOString(),
      test_message: 'Connection test successful',
      completion_status: 'test',
      completion_percentage: 100
    });
    console.log('Test row added successfully');
    
    return NextResponse.json({ 
      success: true, 
      spreadsheetTitle: doc.title,
      sheetTitle: sheet.title
    });
  } catch (error: unknown) {
    console.error('Error testing Google Sheets connection:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to Google Sheets',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 
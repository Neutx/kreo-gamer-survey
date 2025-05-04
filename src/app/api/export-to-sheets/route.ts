import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { collection, query, getDocs, limit, startAfter, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = "force-static";

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

// Helper function to flatten a nested object
const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
  return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
    const prefixedKey = prefix ? `${prefix}_${key}` : key;
    
    // Handle Firestore timestamps
    if (obj[key] && typeof obj[key] === 'object' && 'toMillis' in obj[key]) {
      acc[prefixedKey] = new Date((obj[key] as { toMillis: () => number }).toMillis()).toISOString();
    }
    // Handle nested objects
    else if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key] as Record<string, unknown>, prefixedKey));
    }
    // Handle arrays
    else if (Array.isArray(obj[key])) {
      acc[prefixedKey] = (obj[key] as unknown[]).join(', ');
    }
    // Handle primitive values
    else {
      acc[prefixedKey] = String(obj[key] ?? '');
    }
    
    return acc;
  }, {});
};

// Format a header name for better readability
const formatHeaderName = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'initialize';
    const exportId = url.searchParams.get('exportId');
    const skipStr = url.searchParams.get('skip');
    const skip = skipStr ? parseInt(skipStr, 10) : 0;
    
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
    
    // Action: Initialize a new export
    if (action === 'initialize') {
      // Create a new sheet for this export
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const newExportId = `Export_${timestamp}`;
      
      // Create sheet with no initial header values
      await doc.addSheet({ 
        title: newExportId,
        headerValues: [] 
      });
      
      return NextResponse.json({
        success: true,
        exportId: newExportId,
        message: 'Export initialized',
        spreadsheetTitle: doc.title,
      });
    }
    
    // Action: Get sample data and create headers
    else if (action === 'create-headers') {
      if (!exportId) {
        return NextResponse.json(
          { error: 'Export ID is required for creating headers' },
          { status: 400 }
        );
      }
      
      // Get the sheet by ID
      const sheet = doc.sheetsByTitle[exportId];
      if (!sheet) {
        return NextResponse.json(
          { error: 'Sheet not found' },
          { status: 404 }
        );
      }
      
      // Fetch sample data for headers
      const responsesCollection = collection(db, 'responses');
      const sampleQuery = query(
        responsesCollection,
        orderBy('user_info.last_updated', 'desc'),
        limit(5)
      );
      
      const sampleSnapshot = await getDocs(sampleQuery);
      if (sampleSnapshot.empty) {
        return NextResponse.json(
          { error: 'No data found to extract headers' },
          { status: 404 }
        );
      }
      
      // Get sample documents and collect all possible headers
      const allHeaderKeys = new Set<string>();
      
      sampleSnapshot.docs.forEach(doc => {
        const data = doc.data();
        const flatData = flattenObject({ id: doc.id, ...data });
        Object.keys(flatData).forEach(key => allHeaderKeys.add(key));
      });
      
      const headerKeys = Array.from(allHeaderKeys);
      console.log(`Generated ${headerKeys.length} header keys`);
      
      // Clear any existing content from sheet (important for header consistency)
      try {
        await sheet.clear();
        console.log('Cleared existing sheet content');
      } catch (error) {
        console.warn('Could not clear sheet:', error);
        // Continue anyway
      }
      
      // Add headers directly as first row (bypassing setHeaderRow)
      const formattedHeaders = headerKeys.map(key => formatHeaderName(key));
      
      // Create rows array with a single row for headers
      const headerRow: Record<number, string> = {};
      headerKeys.forEach((key, index) => {
        // Use numeric indices for direct cell access
        headerRow[index + 1] = formattedHeaders[index];
      });
      
      try {
        // Add the header row manually
        await sheet.addRow(headerRow);
        console.log('Added header row manually');
        
        // Freeze the first row and style it (optional)
        try {
          await sheet.loadCells('A1:Z1');
          // Style the headers
          for (let i = 0; i < Math.min(headerKeys.length, 26); i++) {
            const cell = sheet.getCell(0, i);
            cell.textFormat = { bold: true };
            cell.backgroundColor = { red: 0.9, green: 0.9, blue: 0.9 };
          }
          await sheet.saveUpdatedCells();
        } catch (error) {
          console.warn('Could not style headers:', error);
          // Non-critical error
        }
        
        // Save the raw header keys for data matching
        // Store them in the sheet's metadata
        // We'll use this technique to pass the raw keys to the next steps
        
        // Return both formatted and raw headers
        return NextResponse.json({
          success: true,
          exportId,
          headerCount: headerKeys.length,
          message: `Headers created successfully (${headerKeys.length} columns)`,
          rawKeys: headerKeys,
          formattedHeaders: formattedHeaders
        });
      } catch (error) {
        console.error('Error creating headers:', error);
        return NextResponse.json(
          { error: 'Failed to create headers', message: error instanceof Error ? error.message : String(error) },
          { status: 500 }
        );
      }
    }
    
    // Action: Process a batch of data
    else if (action === 'process-batch') {
      if (!exportId) {
        return NextResponse.json(
          { error: 'Export ID is required for processing data' },
          { status: 400 }
        );
      }
      
      // Get the sheet by ID
      const sheet = doc.sheetsByTitle[exportId];
      if (!sheet) {
        return NextResponse.json(
          { error: 'Sheet not found' },
          { status: 404 }
        );
      }
      
      // Get the raw header keys from the request
      const headerKeysParam = url.searchParams.get('rawKeys');
      let rawHeaderArray: string[] = [];
      
      try {
        if (headerKeysParam) {
          rawHeaderArray = JSON.parse(decodeURIComponent(headerKeysParam));
        }
      } catch (error) {
        console.warn('Could not parse rawKeys:', error);
      }
      
      // If we don't have raw keys, try to get them from the first row
      if (rawHeaderArray.length === 0) {
        try {
          // Read the first row to get header values
          await sheet.loadHeaderRow();
          rawHeaderArray = sheet.headerValues || [];
          
          if (rawHeaderArray.length === 0) {
            // As a last resort, read the first row cells directly
            await sheet.loadCells('A1:Z1');
            rawHeaderArray = [];
            
            for (let i = 0; i < 26; i++) {
              const cell = sheet.getCell(0, i);
              if (cell.value) {
                rawHeaderArray.push(String(cell.value));
              } else {
                break; // Stop at first empty cell
              }
            }
          }
        } catch (error) {
          console.error('Could not load headers from sheet:', error);
          return NextResponse.json(
            { error: 'Failed to load headers from sheet. Please recreate headers.' },
            { status: 400 }
          );
        }
      }
      
      if (rawHeaderArray.length === 0) {
        return NextResponse.json(
          { error: 'No headers found in sheet. Create headers first.' },
          { status: 400 }
        );
      }
      
      console.log(`Using ${rawHeaderArray.length} headers for data mapping`);
      
      // Batch size for processing
      const BATCH_SIZE = 50;
      
      // Get total count (approximate) if this is the first batch
      let total = parseInt(url.searchParams.get('total') || '0', 10);
      
      if (skip === 0 && total === 0) {
        try {
          // Get a count estimate
          const countQuery = query(collection(db, 'responses'), limit(1000));
          const countSnapshot = await getDocs(countQuery);
          total = countSnapshot.size;
        } catch (error) {
          console.warn('Could not get total count:', error);
          total = 5000; // Default estimate
        }
      }
      
      // Query for this batch
      let batchQuery = query(
        collection(db, 'responses'),
        orderBy('user_info.last_updated', 'desc'),
        limit(BATCH_SIZE)
      );
      
      // If not the first batch, we need to skip records
      if (skip > 0) {
        try {
          // For pagination, use limit + skip approach
          const skipQuery = query(
            collection(db, 'responses'),
            orderBy('user_info.last_updated', 'desc'),
            limit(skip)
          );
          
          const skipSnapshot = await getDocs(skipQuery);
          
          if (!skipSnapshot.empty && skipSnapshot.docs.length > 0) {
            const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
            
            // Create a new query starting after the last doc
            batchQuery = query(
              collection(db, 'responses'),
              orderBy('user_info.last_updated', 'desc'),
              startAfter(lastDoc),
              limit(BATCH_SIZE)
            );
          }
        } catch (error) {
          console.error('Error with pagination:', error);
          // Fall back to simple limit query
        }
      }
      
      // Get this batch of data
      const batchSnapshot = await getDocs(batchQuery);
      
      if (batchSnapshot.empty) {
        return NextResponse.json({
          success: true,
          exportId,
          processed: skip,
          total,
          complete: true,
          message: 'Export complete. No more data to process.',
        });
      }
      
      // Process the documents
      const batchData = batchSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Format the data for Google Sheets - create an array of rows
      const rows = [];
      
      for (const item of batchData) {
        const flatItem = flattenObject(item);
        const row: Record<number, string> = {};
        
        // Map each header index to its corresponding data value (using 1-based index for sheet)
        rawHeaderArray.forEach((header, index) => {
          const value = flatItem[header];
          // Google Sheets expects 1-indexed columns
          row[index + 1] = value !== undefined ? value : '';
        });
        
        rows.push(row);
      }
      
      try {
        // Add rows to the sheet, starting at row 2 (after headers)
        
        // Process each row individually to ensure proper placement
        for (const row of rows) {
          await sheet.addRow(row);
        }
        
        console.log(`Added ${rows.length} rows to the sheet`);
        
        const newProcessed = skip + batchSnapshot.docs.length;
        const isComplete = batchSnapshot.docs.length < BATCH_SIZE;
        
        return NextResponse.json({
          success: true,
          exportId,
          processed: newProcessed,
          total,
          complete: isComplete,
          message: isComplete
            ? `Export complete. Processed ${newProcessed} records.`
            : `Processed ${newProcessed} of approximately ${total} records.`,
          rawKeys: rawHeaderArray,
        });
      } catch (error) {
        console.error('Error adding rows to sheet:', error);
        return NextResponse.json({
          error: 'Failed to add data to sheet',
          message: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
      }
    }
    
    // Invalid action
    else {
      return NextResponse.json(
        { error: `Invalid action: ${action}` },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in export to Google Sheets API:', error);
    return NextResponse.json(
      { 
        error: 'Export operation failed',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 
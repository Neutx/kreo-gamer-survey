/**
 * Client-side service for syncing survey data to Google Sheets
 * This uses the API routes to avoid importing server-only libraries on the client
 */

/**
 * Syncs a survey response to Google Sheets via API route
 * @param responseData The survey response data from Firebase
 * @param responseId The Firebase response ID
 */
export const syncToGoogleSheets = async (
  responseData: Record<string, unknown>,
  responseId: string
) => {
  try {
    const response = await fetch('/api/sync-to-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        responseData,
        responseId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error syncing to Google Sheets:', errorData);
      return false;
    }

    console.log(`Survey response ${responseId} synced to Google Sheets`);
    return true;
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    // Don't let Google Sheets errors disrupt the user experience
    return false;
  }
};

/**
 * Tests the connection to Google Sheets
 * @returns {Promise<boolean>} Whether the connection was successful
 */
export const testSheetsConnection = async () => {
  try {
    const response = await fetch('/api/test-sheets');

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error testing Google Sheets connection:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Test connection to Google Sheets successful:', data);
    return true;
  } catch (error) {
    console.error('Error testing Google Sheets connection:', error);
    return false;
  }
};

/**
 * Interface for export progress
 */
export interface ExportProgress {
  exportId?: string;
  total: number;
  processed: number;
  complete: boolean;
  success: boolean;
  message?: string;
  error?: string;
  spreadsheetTitle?: string;
  sheetTitle?: string;
  headerCount?: number;
  rawKeys?: string[];
  formattedHeaders?: string[];
}

/**
 * Initializes a new Google Sheets export
 * @returns Promise<ExportProgress> Initial export information
 */
export const initializeGoogleSheetsExport = async (): Promise<ExportProgress> => {
  try {
    // Step 1: Initialize a new export with a fresh sheet
    const initResponse = await fetch('/api/export-to-sheets?action=initialize');
    
    if (!initResponse.ok) {
      const errorData = await initResponse.json();
      console.error('Error initializing Google Sheets export:', errorData);
      return {
        success: false,
        total: 0,
        processed: 0,
        complete: false,
        error: errorData.message || 'Failed to initialize export to Google Sheets',
      };
    }
    
    const initData = await initResponse.json();
    const exportId = initData.exportId;
    
    if (!initData.success || !exportId) {
      return {
        success: false,
        total: 0,
        processed: 0,
        complete: false,
        error: 'Failed to create export sheet',
      };
    }
    
    // Step 2: Create headers for the export
    const headersResponse = await fetch(`/api/export-to-sheets?action=create-headers&exportId=${encodeURIComponent(exportId)}`);
    
    if (!headersResponse.ok) {
      const errorData = await headersResponse.json();
      console.error('Error creating headers for export:', errorData);
      return {
        success: false,
        exportId,
        total: 0,
        processed: 0,
        complete: false,
        error: errorData.message || 'Failed to create headers',
      };
    }
    
    const headersData = await headersResponse.json();
    
    return {
      success: true,
      exportId,
      total: 0,
      processed: 0,
      complete: false,
      message: headersData.message || 'Export initialized with headers',
      spreadsheetTitle: initData.spreadsheetTitle,
      headerCount: headersData.headerCount,
    };
  } catch (error) {
    console.error('Error initializing Google Sheets export:', error);
    return {
      success: false,
      total: 0,
      processed: 0,
      complete: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Processes a batch of data for the Google Sheets export
 * @param exportId Export ID from the initial export
 * @param skip Number of records already processed
 * @param total Total number of records (estimate)
 * @param rawKeys Array of header keys for data mapping
 * @returns Promise<ExportProgress> Progress information
 */
export const processExportBatch = async (
  exportId: string,
  skip: number,
  total: number,
  rawKeys?: string[]
): Promise<ExportProgress> => {
  try {
    // Build the URL with all parameters
    let url = `/api/export-to-sheets?action=process-batch&exportId=${encodeURIComponent(exportId)}&skip=${skip}&total=${total}`;
    
    // Add raw keys if available
    if (rawKeys && rawKeys.length > 0) {
      const encodedKeys = encodeURIComponent(JSON.stringify(rawKeys));
      url += `&rawKeys=${encodedKeys}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error processing export batch:', errorData);
      return {
        success: false,
        exportId,
        total,
        processed: skip,
        complete: false,
        error: errorData.message || 'Failed to process export batch',
      };
    }
    
    const data = await response.json();
    
    return {
      success: true,
      exportId: data.exportId,
      total: data.total || total,
      processed: data.processed || skip,
      complete: !!data.complete,
      message: data.message,
      spreadsheetTitle: data.spreadsheetTitle,
      sheetTitle: data.sheetTitle,
      rawKeys: data.rawKeys,
    };
  } catch (error) {
    console.error('Error processing export batch:', error);
    return {
      success: false,
      exportId,
      total,
      processed: skip,
      complete: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 
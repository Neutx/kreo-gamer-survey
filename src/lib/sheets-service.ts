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
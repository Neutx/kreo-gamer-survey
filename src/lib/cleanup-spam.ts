import { db } from './firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { isSpamEmail } from './spam-detection';

/**
 * Finds and returns all spam submissions based on email pattern
 * @returns Promise with array of spam document IDs
 */
export const findSpamSubmissions = async (): Promise<string[]> => {
  try {
    const spamIds: string[] = [];
    
    // Get all submissions
    const responsesRef = collection(db, 'responses');
    const snapshot = await getDocs(responsesRef);
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const email = data.demographics?.email;
      
      // Check known patterns for spam
      if (
        // Divyansh pattern
        (email && isSpamEmail(email)) ||
        // IGN "Sam" with specific email pattern
        (data.demographics?.ign?.toLowerCase() === "sam" && 
         email && 
         email.includes("divyansh.b20pubgg+entry"))
      ) {
        spamIds.push(docSnap.id);
      }
    });
    
    return spamIds;
  } catch (error) {
    console.error('Error finding spam submissions:', error);
    return [];
  }
};

/**
 * Deletes all spam submissions from the database
 * @returns Promise with number of deleted entries
 */
export const deleteSpamSubmissions = async (): Promise<number> => {
  try {
    const spamIds = await findSpamSubmissions();
    
    // Delete all spam entries
    for (const id of spamIds) {
      await deleteDoc(doc(db, 'responses', id));
    }
    
    return spamIds.length;
  } catch (error) {
    console.error('Error deleting spam submissions:', error);
    return 0;
  }
};

/**
 * Returns statistics about spam in the database
 */
export const getSpamStats = async (): Promise<{
  totalSubmissions: number;
  spamSubmissions: number;
  spamPercentage: number;
}> => {
  try {
    const responsesRef = collection(db, 'responses');
    const snapshot = await getDocs(responsesRef);
    const totalSubmissions = snapshot.size;
    
    const spamIds = await findSpamSubmissions();
    const spamSubmissions = spamIds.length;
    
    return {
      totalSubmissions,
      spamSubmissions,
      spamPercentage: totalSubmissions > 0 ? (spamSubmissions / totalSubmissions) * 100 : 0,
    };
  } catch (error) {
    console.error('Error getting spam stats:', error);
    return {
      totalSubmissions: 0,
      spamSubmissions: 0,
      spamPercentage: 0,
    };
  }
}; 
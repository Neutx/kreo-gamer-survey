import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Get client IP address using a public service
export const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return '';
  }
};

// Get a simple device fingerprint
export const getDeviceFingerprint = (): string => {
  if (typeof window === 'undefined') return '';
  
  // Create a simple device fingerprint from user agent and screen properties
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const colorDepth = window.screen.colorDepth;
  
  // Combine and hash these values to create a simple device fingerprint
  const fingerprint = `${userAgent}_${screenWidth}_${screenHeight}_${colorDepth}`;
  return btoa(fingerprint).substring(0, 32); // Base64 encode and truncate
};

// Check if a submission exists from this IP address
export const checkExistingSubmission = async (ip: string): Promise<boolean> => {
  if (!ip) return false;
  
  try {
    // Query Firestore for submissions with this IP
    const responsesRef = collection(db, 'responses');
    const ipQuery = query(responsesRef, where('user_info.ip_address', '==', ip));
    
    const querySnapshot = await getDocs(ipQuery);
    
    // If we find any documents with this IP, a submission exists
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking existing submission:', error);
    return false;
  }
};

// Check if a submission exists from this device
export const checkExistingDeviceSubmission = async (deviceFingerprint: string): Promise<boolean> => {
  if (!deviceFingerprint) return false;
  
  try {
    // Query Firestore for submissions with this device fingerprint
    const responsesRef = collection(db, 'responses');
    const deviceQuery = query(responsesRef, where('user_info.device_fingerprint', '==', deviceFingerprint));
    
    const querySnapshot = await getDocs(deviceQuery);
    
    // If we find any documents with this device fingerprint, a submission exists
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking existing device submission:', error);
    return false;
  }
}; 
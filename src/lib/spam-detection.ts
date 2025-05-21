import { SurveyData } from '@/types/survey';

// Blocked email patterns (using regex)
const BLOCKED_EMAIL_PATTERNS = [
  /^divyansh\.b20pubgg\+entry\d+@gmail\.com$/i,  // Block divyansh.b20pubgg+entry[numbers]@gmail.com
  /^sayen@gmail\.com$/i,  // Block sayen@gmail.com
  /bhadrakshb\+\d+@gmail\.com$/i,  // Block bhadrakshb+[numbers]@gmail.com
];

// Array to store blocked IPs
const blockedIPs: string[] = [];

/**
 * Check if an email matches any blocked pattern
 * @param email Email to check
 * @returns true if the email is from a spam source
 */
export const isSpamEmail = (email: string): boolean => {
  if (!email) return false;
  
  return BLOCKED_EMAIL_PATTERNS.some(pattern => pattern.test(email));
};

/**
 * Add an IP to the blocked list
 * @param ip IP address to block
 */
export const blockIP = (ip: string): void => {
  if (!blockedIPs.includes(ip)) {
    blockedIPs.push(ip);
    console.log(`Blocked IP: ${ip}`);
  }
};

/**
 * Check if an IP is blocked
 * @param ip IP address to check
 * @returns true if the IP is blocked
 */
export const isIPBlocked = (ip: string): boolean => {
  return blockedIPs.includes(ip);
};

/**
 * Check if survey data contains spam indicators
 * @param data Survey data to analyze
 * @returns true if the submission appears to be spam
 */
export const isSpamSubmission = (data: Partial<SurveyData>): boolean => {
  // Exempt first-time users from spam detection
  if (!data.demographics?.email) {
    return false;
  }

  // Check for spam email
  const email = data.demographics.email;
  if (isSpamEmail(email)) {
    return true;
  }
  
  // Check for known spammer pattern (IGN "Sam" with specific email)
  if (
    data.demographics?.ign?.toLowerCase() === "sam" && 
    email.includes("divyansh.b20pubgg+entry")
  ) {
    return true;
  }
  
  // Detect bhadrakshb+ pattern emails as spam
  if (email.includes("bhadrakshb+")) {
    return true;
  }
  
  return false;
}; 
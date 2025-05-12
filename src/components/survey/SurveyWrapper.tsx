'use client';
// This wrapper checks if the user has already submitted a survey response

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';
import { motion } from 'framer-motion';

export default function SurveyWrapper({ children }: { children: React.ReactNode }) {
  const { isChecking, hasSubmitted } = useSurvey();
  const router = useRouter();
  
  // Redirect if user has already submitted
  React.useEffect(() => {
    if (hasSubmitted) {
      router.push('/survey/already-submitted');
    }
  }, [hasSubmitted, router]);
  
  // Show loading state while checking for existing submissions
  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl flex flex-col items-center"
        >
          <div className="h-16 w-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin mb-8"></div>
          <h3 className="text-white text-xl">Checking your survey eligibility...</h3>
          <p className="text-gray-400 mt-2">Please wait a moment</p>
        </motion.div>
      </div>
    );
  }
  
  // If we're not checking or the user has not submitted, show the survey
  return <>{children}</>;
} 
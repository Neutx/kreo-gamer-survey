'use client';
// This wrapper checks if the user has already submitted a survey response

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';
import { motion } from 'framer-motion';

export default function SurveyWrapper({ children }: { children: React.ReactNode }) {
  const { isChecking } = useSurvey();
  const pathname = usePathname();
  const [shouldCheck, setShouldCheck] = useState(true);
  
  // Check if we're on the main survey page
  useEffect(() => {
    const isSurveyMainPage = pathname === '/survey' || pathname === '/survey/';
    setShouldCheck(isSurveyMainPage);
  }, [pathname]);
  
  // Show loading state while checking for existing submissions
  if (isChecking && shouldCheck) {
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
  
  // If we're not checking or the user has not submitted, show the children
  return <>{children}</>;
} 
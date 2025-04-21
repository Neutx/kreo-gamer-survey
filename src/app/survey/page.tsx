'use client';

import React from 'react';
import { SurveyProvider } from '@/context/SurveyContext';
import SurveyLayout from '@/components/survey/SurveyLayout';
import Background from '@/components/survey/Background';

export default function SurveyPage() {
  return (
    <SurveyProvider>
      <Background />
      <SurveyLayout />
    </SurveyProvider>
  );
} 